import { defineConfig } from "vitest/config";

export default defineConfig({
  // Next.js keeps `jsx: "preserve"` in tsconfig.json for its own compiler, so
  // the test transform has to be told which JSX runtime to use; without this
  // Vitest cannot parse component .tsx sources.
  oxc: {
    jsx: { runtime: "automatic" },
  },
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
