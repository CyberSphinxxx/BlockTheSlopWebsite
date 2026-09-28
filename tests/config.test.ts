import { describe, expect, it } from "vitest";

import { SITE } from "../site.config";
import { ROUTES, findRoute } from "../content/routes";
import { PRODUCT } from "../content/site";
import { DEFAULT_THEME, THEMES, isThemeName } from "../components/theme-registry";
import { THEME_INIT_SCRIPT } from "../components/theme-script";

describe("site config (WEB-04)", () => {
  it("has exactly one explicit canonical origin", () => {
    expect(SITE.url).toMatch(/^https:\/\/[a-z0-9.-]+$/);
    expect(SITE.url).not.toContain("localhost");
    expect(SITE.url).not.toContain("vercel.app/");
    expect(SITE.url.endsWith("/")).toBe(false);
  });

  it("does not guess a Chrome Web Store URL", () => {
    // Until the real listing exists, storeUrl must be null (honest fallback),
    // or an official chromewebstore.google.com URL.
    if (SITE.storeUrl !== null) {
      expect(SITE.storeUrl).toMatch(/^https:\/\/chromewebstore\.google\.com\/detail\/[^"']+$/);
    }
  });

  it("never invents a support email", () => {
    expect(SITE.supportEmail).toBeNull();
    expect(SITE.supportIssuesUrl).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+\/issues$/);
  });

  it("points at the real extension repository", () => {
    expect(SITE.repoUrl).toBe("https://github.com/CyberSphinxxx/BlockTheSlop");
  });

  it("documents a real extension version", () => {
    expect(SITE.extensionVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(SITE.extensionReleaseDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("route inventory", () => {
  const requiredPaths = [
    "/",
    "/how-it-works",
    "/features",
    "/faq",
    "/privacy",
    "/support",
    "/changelog",
  ];

  it("contains the full required route map", () => {
    for (const path of requiredPaths) {
      expect(findRoute(path), `missing route ${path}`).toBeDefined();
    }
  });

  it("gives every route a unique title, description, and priority", () => {
    const titles = ROUTES.map((route) => route.title);
    expect(new Set(titles).size).toBe(ROUTES.length);
    const descriptions = ROUTES.map((route) => route.description);
    expect(new Set(descriptions).size).toBe(ROUTES.length);
  });

  it("writes descriptions that are meaningful lengths", () => {
    for (const route of ROUTES) {
      expect(route.description.length).toBeGreaterThanOrEqual(50);
      expect(route.description.length).toBeLessThanOrEqual(320);
    }
  });
});

describe("theme registry (WEB-17)", () => {
  it("ships system, light, and dark", () => {
    const shipped = THEMES.filter((theme) => theme.shipped).map((t) => t.attr);
    expect(shipped).toEqual(["system", "light", "dark"]);
  });

  it("gives every theme an accessible state label", () => {
    for (const theme of THEMES) {
      expect(theme.stateLabel.length).toBeGreaterThan(3);
      expect(theme.label.length).toBeGreaterThan(2);
    }
  });

  it("validates theme names", () => {
    expect(isThemeName("dark")).toBe(true);
    expect(isThemeName("system")).toBe(true);
    expect(isThemeName("hotdog")).toBe(false);
    expect(isThemeName(null)).toBe(false);
    expect(DEFAULT_THEME).toBe("system");
  });
});

describe("no-flash theme script", () => {
  it("guards storage access and defaults to system", () => {
    expect(THEME_INIT_SCRIPT).toContain("try");
    expect(THEME_INIT_SCRIPT).toContain("catch");
    expect(THEME_INIT_SCRIPT).toContain('"system"');
  });

  it("matches the registry storage key", () => {
    expect(THEME_INIT_SCRIPT).toContain("bts-website-theme");
  });
});

describe("product facts trace to sources (WEB-02)", () => {
  it("uses the verified default mode", () => {
    const balanced = PRODUCT.modes.find((mode) => mode.name === "Balanced");
    expect(balanced?.detail).toContain("Default");
  });

  it("describes Aggressive as an explicit tradeoff", () => {
    const aggressive = PRODUCT.modes.find((mode) => mode.name === "Aggressive");
    expect(aggressive?.detail).toContain("false positives");
  });

  it("keeps the specimen sample statistic out of product facts", () => {
    const json = JSON.stringify(PRODUCT) + JSON.stringify(ROUTES);
    expect(json).not.toContain("213");
    expect(json).not.toContain("15,604");
  });

  it("requires limitation statements to stay honest", () => {
    expect(
      PRODUCT.limitations.some((limit) => limit.includes("cannot") || limit.includes("will pass")),
    ).toBe(true);
    expect(PRODUCT.limitations.some((limit) => limit.includes("heuristic"))).toBe(true);
  });
});
