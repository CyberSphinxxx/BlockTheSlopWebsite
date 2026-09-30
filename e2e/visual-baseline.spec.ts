import { expect, test } from "@playwright/test";

import { ROUTES } from "../content/routes";

/**
 * Visual-regression baseline: the pixel gate for the overhaul.
 *
 * Baselines are captured from the production build at the same sizes the
 * evidence tooling uses (1440 and 390, light + dark), with animations and
 * caret suppressed so the PNGs stay deterministic. Route screenshots in
 * evidence/iteration-09 remain the archived record; this suite makes drift
 * loud on every `npm run test:e2e`.
 *
 * First run (or after an approved design change):
 *   npx playwright test e2e/visual-baseline.spec.ts --update-snapshots
 */
const SIZES = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

test.describe("visual baseline", () => {
  for (const route of ROUTES) {
    for (const size of SIZES) {
      for (const colorScheme of ["light", "dark"] as const) {
        const name = `${route.path} @ ${size.width} (${colorScheme})`;
        test(name, async ({ page }) => {
          await page.setViewportSize({ ...size });
          await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
          await page.goto(route.path, { waitUntil: "networkidle" });
          await expect(page).toHaveScreenshot(
            `${route.path === "/" ? "home" : route.path.slice(1)}-${size.width}-${colorScheme}.png`,
            {
              fullPage: true,
              animations: "disabled",
              caret: "hide",
              maxDiffPixelRatio: 0,
            },
          );
        });
      }
    }
  }
});
