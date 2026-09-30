import { expect, test } from "@playwright/test";

import { ROUTES } from "../content/routes";

/**
 * Design-overhaul regressions (04-IMPLEMENTATION.md §3).
 *
 * These assert geometry, semantics and state — the things that broke before:
 * helper text inflating a sibling button's height, a table whose headers did
 * not line up with its cells, and a type scale that drifted per page. They are
 * structural checks, not a visual pass/fail verdict.
 */

const HERO = ".hero .cta-block";
const CLOSING = ".closing .cta-block";

test.describe("action row geometry", () => {
  for (const width of [320, 390, 768, 1440]) {
    for (const theme of ["light", "dark"] as const) {
      test(`hero and closing actions align at ${width}px (${theme})`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme });
        await page.goto("/");

        for (const scope of [HERO, CLOSING]) {
          const block = page.locator(scope);
          await expect(block).toBeVisible();

          const controls = block.locator(".action-row .btn");
          const count = await controls.count();
          expect(count, `${scope} must expose both actions`).toBe(2);

          const boxes = await controls.evaluateAll((els) =>
            els.map((el) => {
              const rect = el.getBoundingClientRect();
              return {
                top: rect.top,
                left: rect.left,
                bottom: rect.bottom,
                right: rect.right,
                height: rect.height,
                clipped: (el as HTMLElement).scrollWidth > (el as HTMLElement).clientWidth + 1,
              };
            }),
          );

          // Same-row controls match in height and top edge within 1 CSS px.
          const heights = boxes.map((b) => b.height);
          const tops = boxes.map((b) => b.top);
          expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
          if (width > 480) {
            expect(
              Math.max(...tops) - Math.min(...tops),
              `${scope} tops differ`,
            ).toBeLessThanOrEqual(1);
          } else {
            // Below 480px the row stacks: each control spans the full row width.
            expect(
              Math.max(...boxes.map((b) => b.left)) - Math.min(...boxes.map((b) => b.left)),
            ).toBeLessThanOrEqual(1);
            expect(
              Math.max(...boxes.map((b) => b.right)) - Math.min(...boxes.map((b) => b.right)),
            ).toBeLessThanOrEqual(1);
          }

          // Labels are never clipped, and controls never fall below the minimum.
          for (const box of boxes) {
            expect(box.clipped, `${scope} clipped a label`).toBe(false);
            expect(box.height).toBeGreaterThanOrEqual(48);
          }

          // The availability note sits outside the row, below every control.
          const status = block.locator(".cta-status");
          await expect(status).toHaveCount(1);
          const rowBottom = Math.max(...boxes.map((b) => b.bottom));
          const statusTop = await status.evaluate((el) => el.getBoundingClientRect().top);
          expect(statusTop).toBeGreaterThanOrEqual(rowBottom - 0.5);
        }
      });
    }
  }
});

test("the unavailable store state offers a real action and no fake install link", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Coming to Chrome Web Store").first()).toBeVisible();
  expect(await page.getByRole("link", { name: /install from chrome web store/i }).count()).toBe(0);
  expect(await page.getByRole("button", { name: /coming to chrome/i }).count()).toBe(0);
});

test.describe("privacy storage table", () => {
  test("header and body columns share one grid at desktop widths", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/privacy");

    const table = page.locator(".table-scroll table");
    await expect(table).toBeVisible();

    const starts = await table.evaluate((el) => {
      const cells = (selector: string) =>
        Array.from(el.querySelectorAll(selector)).map(
          (node) => Math.round(node.getBoundingClientRect().left * 100) / 100,
        );
      return { headers: cells("thead th"), firstRow: cells("tbody tr:first-child td") };
    });

    expect(starts.headers.length).toBe(3);
    expect(starts.firstRow.length).toBe(3);
    for (let index = 0; index < 3; index += 1) {
      expect(Math.abs(starts.headers[index]! - starts.firstRow[index]!)).toBeLessThanOrEqual(2);
    }

    // Header cells stay associated with their column.
    const scopes = await page
      .locator(".table-scroll thead th")
      .evaluateAll((els) => els.map((el) => el.getAttribute("scope")));
    expect(scopes).toEqual(["col", "col", "col"]);
  });

  test("narrow screens scroll the table locally and reach every cell", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/privacy");

    const wrapper = page.locator(".table-scroll");
    await expect(wrapper).toHaveAttribute("role", "region");
    await expect(wrapper).toHaveAttribute("tabindex", "0");

    const before = await wrapper.evaluate((el) => ({
      max: el.scrollWidth - el.clientWidth,
    }));
    expect(before.max, "table should scroll inside its wrapper at 320px").toBeGreaterThan(0);

    const after = await wrapper.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
      const last = el.querySelector("tbody tr:first-child td:last-child")!;
      const rect = last.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      return {
        scrollLeft: el.scrollLeft,
        insideRight: rect.right <= box.right + 1,
        text: last.textContent?.trim() ?? "",
      };
    });
    expect(after.scrollLeft).toBeGreaterThan(0);
    expect(after.insideRight).toBe(true);
    expect(after.text.length).toBeGreaterThan(0);

    // The page itself never scrolls horizontally.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test("illustrative feed restore is keyboard operable, local, and reversible", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!url.hostname.match(/^(127\.0\.0\.1|localhost)$/)) external.push(url.hostname);
  });

  await page.goto("/");
  const hiddenTitle = page.locator(".feed-item--hidden .feed-item__title");
  await expect(hiddenTitle).toHaveText("Hidden by your rules");

  const restore = page.getByRole("button", { name: "Restore example video" });
  await restore.focus();
  await expect(restore).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(hiddenTitle).toHaveText("Example video restored");
  await expect(page.locator(".feed__status")).toHaveText(/restored/i);

  const reset = page.getByRole("button", { name: "Reset illustration" });
  await reset.click();
  await expect(hiddenTitle).toHaveText("Hidden by your rules");

  // It is a drawing: nothing is fetched while using it.
  expect(external).toEqual([]);
});

test("semantic type roles stay consistent across routes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  const measured: Record<string, { h1: number; h2: number; body: number; footer: number }> = {};

  for (const route of ROUTES) {
    await page.goto(route.path);
    measured[route.path] = await page.evaluate(() => {
      const size = (selector: string, minimum: number) => {
        const el = document.querySelector(selector);
        if (!el) return minimum;
        return Number.parseFloat(getComputedStyle(el).fontSize);
      };
      return {
        h1: size("h1", 32),
        h2: size("main h2", 26),
        body: size("main article p:not([class]), main .feature-row__body, main .rows p", 17),
        footer: size(".site-footer__list a", 14),
      };
    });
  }

  // Inner page titles share one role; body copy never drops below 16px and
  // footer text stays at the 14px metadata role.
  const innerTitles = ROUTES.filter((route) => route.path !== "/").map(
    (route) => measured[route.path]!.h1,
  );
  expect(new Set(innerTitles).size).toBe(1);
  expect(measured["/"]!.h1).toBeGreaterThanOrEqual(Math.max(...innerTitles));

  for (const route of ROUTES) {
    const roles = measured[route.path]!;
    expect(roles.h2, `${route.path} section heading`).toBeGreaterThanOrEqual(26);
    expect(roles.body, `${route.path} body copy`).toBeGreaterThanOrEqual(16);
    expect(roles.footer, `${route.path} footer text`).toBeGreaterThanOrEqual(14);
  }
});

test("200% zoom equivalent: every route reflows without horizontal overflow", async ({
  browser,
}) => {
  /*
   * A 1280px window at 200% browser zoom lays out at 640 CSS px with
   * devicePixelRatio 2 — the state a page observes (innerWidth, media queries,
   * dpr). Drivable Ctrl+plus zoom is not available in this headless runtime,
   * so the context below reproduces that exact state in a real Chromium.
   * accessibility.spec.ts keeps the supplemental CDP page-scale check.
   */
  const context = await browser.newContext({
    viewport: { width: 640, height: 450 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("/");
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    dpr: window.devicePixelRatio,
  }));
  expect(metrics.innerWidth).toBe(640);
  expect(metrics.dpr).toBe(2);

  for (const route of ROUTES) {
    await page.goto(route.path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${route.path} overflows at 200% zoom equivalent`).toBeLessThanOrEqual(0);
  }
  await context.close();
});

test("header and footer share one shell edge on every route", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ROUTES) {
    await page.goto(route.path);
    const edges = await page.evaluate(() => {
      const box = (selector: string) => {
        const el = document.querySelector(selector);
        return el ? Math.round(el.getBoundingClientRect().left) : null;
      };
      return {
        header: box("header.site-header .container"),
        main: box("main .container"),
        footer: box(".site-footer > .container"),
      };
    });
    expect(edges.header).not.toBeNull();
    expect(edges.main).not.toBeNull();
    expect(edges.footer).toBe(edges.header);
    // Inner pages inset their contents deliberately; the shell must not.
    expect(Math.abs(edges.main! - edges.header!)).toBeLessThanOrEqual(2);
  }
});

test("compact shared links keep a usable pointer target", async ({ page }) => {
  /*
   * WCAG 2.2 AA target-size (2.5.8) exempts links that sit inline in a sentence,
   * so this covers the compact links that stand alone: the header wordmark and
   * the support link cards. Their painted size is unchanged — the hit area is
   * padded out and pulled back with matching negative spacing — so the 23px
   * wordmark run and the 22px card headings still meet the 24px minimum.
   */
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/support");
    const boxes = await page.evaluate(() => {
      const scope = (selector: string) =>
        Array.from(document.querySelectorAll(selector)).map((el) => {
          const rect = el.getBoundingClientRect();
          return { h: Math.round(rect.height), w: Math.round(rect.width) };
        });
      return { wordmark: scope("header .wordmark"), cards: scope(".link-grid a") };
    });
    // Guard against a selector that silently stops matching anything.
    expect(boxes.wordmark.length).toBe(1);
    expect(boxes.cards.length).toBe(3);
    for (const box of [...boxes.wordmark, ...boxes.cards]) {
      expect(box.h, `target height at ${width}px`).toBeGreaterThanOrEqual(24);
      expect(box.w, `target width at ${width}px`).toBeGreaterThanOrEqual(24);
    }
  }
});

test("FAQ questions keep their text separate from the +/− marker", async ({ page }) => {
  /*
   * The question text lives in its own element so the hover underline is drawn
   * on the text only. A decoration set on the summary itself is also painted
   * through the ::after marker, which made the open "–" read as "=".
   */
  await page.goto("/faq");
  const items = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".faq-item summary")).map((summary) => ({
      textElements: summary.querySelectorAll(":scope > span").length,
      marker: getComputedStyle(summary, "::after").content,
      text: (summary.textContent ?? "").trim(),
    })),
  );
  expect(items.length).toBeGreaterThanOrEqual(8);
  for (const item of items) {
    expect(item.textElements, `${item.text} must wrap its text`).toBe(1);
    expect(item.marker).toBe('"+"');
    expect(item.text.length).toBeGreaterThan(0);
  }

  // Opening one flips only its marker to the dash.
  await page.locator(".faq-item summary").first().click();
  const openMarker = await page.evaluate(
    () => getComputedStyle(document.querySelector(".faq-item[open] summary")!, "::after").content,
  );
  expect(openMarker).toBe('"–"');
});

test("narrow article pages collapse the contents list behind a native disclosure", async ({
  page,
}) => {
  /*
   * The wrapped 11-item contents list pushed the privacy text two screens
   * down on narrow pages; it is now a native <details> there. The desktop
   * rail must remain exactly as before, so both halves are asserted here.
   */
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/privacy");
    const state = await page.evaluate(() => {
      const rail = document.querySelector(".article-contents")!;
      const toggle = document.querySelector("details.article-contents-toggle")!;
      const summary = toggle.querySelector("summary")!;
      const firstLink = toggle.querySelector("a");
      return {
        railDisplay: getComputedStyle(rail).display,
        toggleDisplay: getComputedStyle(toggle).display,
        open: toggle.hasAttribute("open"),
        summaryHeight: Math.round(summary.getBoundingClientRect().height),
        summaryText: (summary.textContent ?? "").trim(),
        linkHiddenWhileClosed: firstLink ? !firstLink.checkVisibility() : null,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(state.railDisplay, `rail hidden at ${width}px`).toBe("none");
    expect(state.toggleDisplay, `disclosure rendered at ${width}px`).toBe("block");
    expect(state.open, `collapsed by default at ${width}px`).toBe(false);
    expect(state.linkHiddenWhileClosed, `links hidden while closed at ${width}px`).toBe(true);
    expect(state.summaryHeight, `usable summary target at ${width}px`).toBeGreaterThanOrEqual(24);
    expect(state.summaryText).toBe("On this page");
    expect(state.overflow, `no overflow at ${width}px`).toBe(0);
  }

  // Desktop keeps the plain rail; the disclosure is not rendered.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/privacy");
  const desktop = await page.evaluate(() => ({
    railDisplay: getComputedStyle(document.querySelector(".article-contents")!).display,
    toggleDisplay: getComputedStyle(document.querySelector("details.article-contents-toggle")!)
      .display,
  }));
  expect(desktop.railDisplay).toBe("block");
  expect(desktop.toggleDisplay).toBe("none");
});

test("contents disclosure opens, targets real sections, and closes by keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/privacy");
  const toggle = page.locator("details.article-contents-toggle");
  await toggle.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("open");

  const labels = await toggle.locator("a").allInnerTexts();
  expect(labels.length).toBe(11);
  const targets = await page.evaluate(() =>
    Array.from(document.querySelectorAll("details.article-contents-toggle a")).map((a) => {
      const id = (a.getAttribute("href") ?? "").slice(1);
      return { id, exists: Boolean(document.getElementById(id)) };
    }),
  );
  for (const target of targets) {
    expect(target.exists, `#${target.id} must exist`).toBe(true);
  }

  await toggle.locator("a").last().click();
  await page.waitForTimeout(400);
  const contactTop = await page.evaluate(
    () => document.getElementById("contact")!.getBoundingClientRect().top,
  );
  expect(contactTop, "target lands clear of the header").toBeGreaterThanOrEqual(0);

  await toggle.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(toggle).not.toHaveAttribute("open");
});

test("article pages keep the contents rail outside the reading column", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/how-it-works", "/privacy"]) {
    await page.goto(route);
    const layout = await page.evaluate(() => {
      const contents = document.querySelector(".article-contents")!;
      const article = document.querySelector(".article")!;
      const c = contents.getBoundingClientRect();
      const a = article.getBoundingClientRect();
      return { contentsRight: c.right, articleLeft: a.left, articleWidth: a.width };
    });
    expect(layout.articleLeft).toBeGreaterThanOrEqual(layout.contentsRight);
    expect(layout.articleWidth).toBeGreaterThanOrEqual(600);
    expect(layout.articleWidth).toBeLessThanOrEqual(720);
  }
});
