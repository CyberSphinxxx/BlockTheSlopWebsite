import { expect, test } from "@playwright/test";

/**
 * WEB-13 second half: once a real Chrome Web Store URL is configured, the
 * primary CTA must become an active link to that URL with an accessible name.
 *
 * This cannot run against the default build (storeUrl is honestly null before
 * the listing exists). Run it with:  BTS_E2E_STORE_URL=<url> npx playwright test
 */
const STORE_URL = process.env.BTS_E2E_STORE_URL;

test("store CTA points at the configured Chrome Web Store URL", async ({ page }) => {
  test.skip(!STORE_URL, "run with BTS_E2E_STORE_URL=<official listing url>");

  await page.goto("/");
  const install = page.getByRole("link", {
    name: "Install BlockTheSlop from the Chrome Web Store (opens in a new tab)",
  });
  await expect(install).toBeVisible();
  await expect(install).toHaveAttribute("href", STORE_URL!);
  await expect(install).toHaveAttribute("rel", /noopener/);

  // The stale "coming soon" state must be gone.
  await expect(page.getByText("Coming to Chrome Web Store")).toHaveCount(0);
});
