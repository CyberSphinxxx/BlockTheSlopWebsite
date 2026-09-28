import { mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

/**
 * Visual review matrix (DESIGN-SYSTEM.md / QA-RELEASE.md): real screenshots of
 * the shipping site at the required widths, in both themes, plus interaction
 * states (mobile nav open, FAQ open, pre-store CTA, 404).
 * Output: evidence/artifacts/visual/*.png (committed selectively).
 */
mkdirSync("evidence/artifacts/visual", { recursive: true });

const OUT = "evidence/artifacts/visual";

const VIEWPORTS = [
  { width: 320, height: 700, name: "320" },
  { width: 375, height: 800, name: "375" },
  { width: 768, height: 900, name: "768" },
  { width: 1280, height: 900, name: "1280" },
  { width: 1440, height: 900, name: "1440" },
] as const;

test.describe("visual matrix", () => {
  for (const vp of VIEWPORTS) {
    for (const scheme of ["light", "dark"] as const) {
      // Required captures: home at every size (matrix row "capture").
      if (["320", "1280", "1440"].includes(vp.name) || vp.name === "375" || vp.name === "768") {
        test(`home ${vp.name}px ${scheme}`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.emulateMedia({ colorScheme: scheme });
          await page.goto("/");
          // Force the explicit theme so system cannot skew captures.
          await page.evaluate(
            (s) => {
              document.documentElement.setAttribute("data-theme", s as string);
            },
            scheme === "light" ? "light" : "dark",
          );
          await page.waitForTimeout(150);
          await page.screenshot({
            path: `${OUT}/home-${vp.name}-${scheme}.png`,
            fullPage: true,
          });
        });
      }
    }
  }

  for (const scheme of ["light", "dark"] as const) {
    test(`how-it-works 1280 ${scheme}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/how-it-works");
      await page.evaluate(
        (s) => {
          document.documentElement.setAttribute("data-theme", s as string);
        },
        scheme === "light" ? "light" : "dark",
      );
      await page.waitForTimeout(150);
      await page.screenshot({ path: `${OUT}/how-it-works-1280-${scheme}.png`, fullPage: true });
    });

    test(`privacy 1280 ${scheme}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/privacy");
      await page.evaluate(
        (s) => {
          document.documentElement.setAttribute("data-theme", s as string);
        },
        scheme === "light" ? "light" : "dark",
      );
      await page.waitForTimeout(150);
      await page.screenshot({ path: `${OUT}/privacy-1280-${scheme}.png`, fullPage: true });
    });
  }

  test("mobile nav open at 375 dark", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.getByRole("button", { name: /menu/i }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();
    await page.screenshot({ path: `${OUT}/nav-open-375-dark.png` });
  });

  test("FAQ open state 1280 light", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/faq");
    await page.locator("details.faq-item").first().locator("summary").click();
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}/faq-open-1280-light.png` });
  });

  test("pre-store CTA hero 1440 light", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
    });
    const hero = page.locator(".hero");
    await hero.screenshot({ path: `${OUT}/cta-prestore-1440-light.png` });
  });

  test("404 page 1280 dark", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/missing-page-404");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.screenshot({ path: `${OUT}/404-1280-dark.png` });
  });
});
