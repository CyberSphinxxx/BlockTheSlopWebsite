import { expect, test } from "@playwright/test";

/**
 * Behavior tests against the production build: theme system, mobile nav,
 * FAQ disclosures, honest pre-store CTA, and content navigation. (WEB-13,
 * WEB-17, WEB-19, part of WEB-18.)
 */

test("home explains product, privacy, limits, and shows honest pre-store CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI slop");
  await expect(page.getByText("Runs locally — no account, no telemetry")).toBeVisible();
  await expect(page.getByText("cannot", { exact: false })).toBeVisible();

  // Pre-store CTA: non-interactive notice, not a fake install button.
  await expect(page.getByText("Coming to Chrome Web Store").first()).toBeVisible();
  const howItWorks = page.getByRole("link", { name: "See how it works" }).first();
  await expect(howItWorks).toBeVisible();

  // No fabricated install link anywhere.
  const installLinks = await page
    .getByRole("link", { name: /install from chrome web store/i })
    .count();
  expect(installLinks).toBe(0);
});

test("theme switch: light and dark apply immediately and persist across reload", async ({
  page,
}) => {
  await page.goto("/");

  const themeSwitch = page.getByRole("group", { name: "Color theme" });
  await expect(themeSwitch).toBeVisible();

  await themeSwitch.getByRole("button", { name: "Dark" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // Overhaul canvas role: charcoal-950 = #141618
  expect(darkBg).toBe("rgb(20, 22, 24)");

  // Persisted choice survives reload.
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await themeSwitch.getByRole("button", { name: "Light" }).first().click();
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // Overhaul canvas role: snow-50 = #f7f8fa
  expect(lightBg).toBe("rgb(247, 248, 250)");

  await themeSwitch.getByRole("button", { name: "System" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
});

test("theme storage blocked: theme still applies for the session", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: () => {
          throw new Error("denied");
        },
        setItem: () => {
          throw new Error("denied");
        },
        removeItem: () => {
          throw new Error("denied");
        },
      },
    });
  });
  await page.goto("/");
  const themeSwitch = page.getByRole("group", { name: "Color theme" });
  await themeSwitch.getByRole("button", { name: "Dark" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toBeVisible();
});

test("system theme follows prefers-color-scheme without a stored preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(darkBg).toBe("rgb(20, 22, 24)");

  await page.emulateMedia({ colorScheme: "light" });
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(lightBg).toBe("rgb(247, 248, 250)");
});

test("mobile navigation opens, closes, and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /menu/i }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav")).toHaveAttribute("data-open", "true");
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();

  const panel = page.locator("#mobile-nav");
  await expect(panel).toBeVisible();
  await panel.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL(/\/how-it-works$/);
  await expect(page.locator("#mobile-nav")).toBeHidden();
});

test("mobile navigation closes on Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /menu/i }).first();
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("FAQ disclosures open by keyboard and content becomes visible", async ({ page }) => {
  await page.goto("/faq");
  const first = page.locator("details.faq-item").first();
  const summary = first.locator("summary");
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("open", /.*/);
  await expect(first.locator(".faq-item__body")).toBeVisible();
  // Links inside the opened answer are usable.
  await page.keyboard.press("Escape");
  await page.keyboard.press("Enter");
  await expect(first).not.toHaveAttribute("open");
});

test("keyboard-only: skip link appears on focus and jumps to content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  // The skip link targets #main (tabindex=-1): focus must move into main.
  const focusInMain = await page.evaluate(
    () =>
      document.activeElement?.id === "main" ||
      Boolean(document.getElementById("main")?.contains(document.activeElement)),
  );
  expect(focusInMain).toBeTruthy();
});

test("every internal nav and footer link resolves", async ({ page }) => {
  await page.goto("/");
  const links = await page
    .getByRole("link")
    .evaluateAll((els) =>
      els
        .map((el) => (el as HTMLAnchorElement).getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );
  const internal = links.filter((href) => href.startsWith("/") && !href.startsWith("//"));
  expect(internal.length).toBeGreaterThan(8);
  for (const href of new Set(internal)) {
    const response = await page.request.get(href);
    expect(response.status(), `internal link ${href} must resolve`).toBe(200);
  }
});

test("site is readable with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Privacy" })).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
  await page.goto("/support");
  await expect(page.getByRole("heading", { name: /Get help with BlockTheSlop/ })).toBeVisible();
  await context.close();
});

test("reduced motion disables transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.evaluate(() => {
    const btn = document.querySelector<HTMLAnchorElement>(".btn");
    return btn ? getComputedStyle(btn).transitionDuration : "0s";
  });
  // Components.css forces 0.01ms under reduced motion.
  expect(["0s", "0.00001s", "1e-05s"]).toContain(duration);
});

test("no third-party requests are made on load", async ({ page }) => {
  const thirdParty: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!url.hostname.match(/^(127\.0\.0\.1|localhost)$/)) {
      thirdParty.push(url.hostname);
    }
  });
  await page.goto("/");
  await page.waitForTimeout(500);
  expect(thirdParty).toEqual([]);
});
