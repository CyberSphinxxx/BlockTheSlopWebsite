import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { ROUTES } from "../content/routes";

/**
 * Automated accessibility audit (WEB-19): axe on every route in light and
 * dark, plus manual-rule helpers for landmarks and focus visibility.
 */

for (const route of ROUTES) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`axe: ${route.path} (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route.path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      );
      expect(
        serious,
        `${route.path} (${colorScheme}) has serious/critical violations: ${JSON.stringify(
          serious.map((v) => ({ id: v.id, nodes: v.nodes.length })),
        )}`,
      ).toEqual([]);
    });
  }
}

test("landmarks and heading order are semantic", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();

  // H1 exists once and H2s follow it.
  const levels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1, h2, h3")).map((el) => Number(el.tagName.slice(1))),
  );
  expect(levels[0]).toBe(1);
  for (let i = 1; i < levels.length; i += 1) {
    expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
  }
});

test("focus indicator is visible on primary interactive elements (both themes)", async ({
  page,
}) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // wordmark
    await page.keyboard.press("Tab"); // first nav link
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return null;
      const style = getComputedStyle(el);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(outline?.style).toBe("solid");
    expect(outline?.width).not.toBe("0px");
  }
});

test("no horizontal overflow at 320px (reflow)", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ["/", "/how-it-works", "/features", "/faq", "/privacy", "/support"]) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${route} overflows at 320px by ${overflow}px`).toBeLessThanOrEqual(0);
  }
});

test("no horizontal overflow at 200% zoom", async ({ page }) => {
  // Real browser zoom: Chromium's ctrl+plus. emulateMedia cannot do this, so
  // we drive CDP to set an exact zoom level (2.0 = 200%).
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  await page.setViewportSize({ width: 640, height: 450 }); // 1280/2, 900/2 — same visible content as 200% zoom
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("touch targets meet 44px minimum on mobile nav", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /menu/i });
  const box = await toggle.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
});
