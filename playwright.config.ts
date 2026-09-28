import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config: serves the production build (`next build` output) via
 * `next start`, so tests always exercise the shipping artifact, not the dev
 * server. Screenshots for the visual matrix land in evidence/artifacts.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 4,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "evidence/artifacts/playwright-report" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3111",
    trace: "retain-on-failure",
    screenshot: "off",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx next start -p 3111",
    url: "http://127.0.0.1:3111",
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});
