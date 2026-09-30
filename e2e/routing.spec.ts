import { expect, test } from "@playwright/test";

import { ROUTES } from "../content/routes";

/**
 * Multi-page routing regressions.
 *
 * The site is a set of separate Next.js routes, not one long page: the header
 * opens each route, every route survives a direct visit and a refresh, browser
 * history works, and no production page renders the design-reference document
 * that lives in design-overhaul/.
 */

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "How it works", path: "/how-it-works" },
  { label: "Features", path: "/features" },
  { label: "FAQ", path: "/faq" },
  { label: "Privacy", path: "/privacy" },
  { label: "Support", path: "/support" },
] as const;

const REFERENCE_MARKERS = [
  "DESIGN REFERENCE",
  "Design overhaul reference",
  "Before: the supplied screenshots",
  "Agent handoff",
  "START-PROMPT",
  "visual-guide",
  "Guide notes",
];

const pathname = (url: string) => new URL(url).pathname;

test("header navigation points at six separate routes", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link")
    .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  expect(hrefs).toEqual(NAV_ITEMS.map((item) => item.path));
});

test("each navigation item opens its own route and marks itself current", async ({ page }) => {
  await page.goto("/");
  for (const item of NAV_ITEMS) {
    const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", {
      name: item.label,
      exact: true,
    });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${item.path === "/" ? "/$" : `${item.path}$`}`));
    expect(pathname(page.url())).toBe(item.path);

    // One h1 per route, and the active link is announced, not just styled.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(link).toHaveAttribute("aria-current", "page");
    const currentCount = await page.locator('[aria-current="page"]').count();
    expect(currentCount, `${item.path} should mark exactly one current link`).toBeGreaterThan(0);
  }
});

for (const route of ROUTES) {
  test(`direct visit and refresh keep ${route.path}`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.reload();
    expect(pathname(page.url())).toBe(route.path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator("iframe").count()).toBe(0);
  });
}

test("browser back and forward move between routes", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("link", { name: "Features", exact: true }).click();
  await expect(page).toHaveURL(/\/features$/);
  await nav.getByRole("link", { name: "FAQ", exact: true }).click();
  await expect(page).toHaveURL(/\/faq$/);

  await page.goBack();
  expect(pathname(page.url())).toBe("/features");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goForward();
  expect(pathname(page.url())).toBe("/faq");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("mobile navigation opens its route and closes again", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const toggle = page.locator(".nav-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await page.locator("#mobile-nav").getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  expect(pathname(page.url())).toBe("/privacy");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Privacy policy");
});

test("no production page renders the design-reference document", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route.path);
    const text = await page.locator("body").innerText();
    for (const marker of REFERENCE_MARKERS) {
      expect(text, `${route.path} shows reference marker "${marker}"`).not.toContain(marker);
    }

    const hrefs = await page
      .locator("a")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    const leaked = hrefs.filter(
      (href) =>
        href.endsWith(".md") || href.includes("design-overhaul") || href.includes("visual-guide"),
    );
    expect(leaked, `${route.path} links to reference files: ${leaked.join(", ")}`).toEqual([]);
  }
});

test("home stays concise and links out to the detail pages", async ({ page }) => {
  await page.goto("/");

  // Home is an overview: the feature catalog, FAQ, policy table, support
  // instructions and changelog live only on their own routes.
  for (const selector of [
    "details.faq-item",
    ".table-scroll",
    ".support-steps",
    ".checklist",
    ".release",
    ".feature-rows",
    ".feature-row",
    ".compare",
    ".surface-grid",
    ".article-contents",
  ]) {
    expect(await page.locator(selector).count(), `home should not contain ${selector}`).toBe(0);
  }

  // Hero, abbreviated steps, three highlights, one paired summary, footer.
  await expect(page.locator(".feed")).toHaveCount(1);
  expect(await page.locator(".step").count()).toBe(3);
  expect(await page.locator(".rows > div").count()).toBe(3);
  expect(await page.locator(".pair__block").count()).toBe(2);

  for (const path of ["/how-it-works", "/features", "/privacy"]) {
    expect(
      await page.locator(`a[href="${path}"]`).count(),
      `home should link to ${path}`,
    ).toBeGreaterThan(0);
  }
});
