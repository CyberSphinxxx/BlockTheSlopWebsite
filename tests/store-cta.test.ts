import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

/**
 * The published-store branch cannot run against the shipping build, because
 * SITE.storeUrl is honestly null until a real Chrome Web Store listing exists.
 * e2e/store-cta-future.spec.ts needs a real deployment; this suite renders the
 * component against an isolated fixture config instead, so no invented URL is
 * ever written into site.config.ts.
 */
const FIXTURE_STORE_URL = "https://chromewebstore.google.com/detail/blocktheslop/abcdefghijklmnop";

vi.mock("next/link", async () => {
  const react = await import("react");
  return {
    default: (props: { href: string; className?: string; children?: ReactNode }) =>
      react.createElement("a", { href: props.href, className: props.className }, props.children),
  };
});

vi.mock("../site.config", async () => {
  const actual = await vi.importActual<typeof import("../site.config")>("../site.config");
  return {
    ...actual,
    SITE: { ...actual.SITE, storeUrl: FIXTURE_STORE_URL },
  };
});

let StoreCta: typeof import("../components/StoreCta").StoreCta;

beforeAll(async () => {
  ({ StoreCta } = await import("../components/StoreCta"));
});

function render(note?: string) {
  return renderToStaticMarkup(createElement(StoreCta, { note }));
}

describe("store CTA — published branch (isolated config fixture)", () => {
  it("points the primary action at the verified listing", () => {
    const html = render();
    expect(html).toContain(`href="${FIXTURE_STORE_URL}"`);
    expect(html).toContain("Install from Chrome Web Store");
  });

  it("keeps the explanation as a secondary action in the same row", () => {
    const html = render();
    expect(html).toContain("See how it works");
    expect(html).toContain("action-row");
  });

  it("drops the coming-soon status and shows the note instead", () => {
    const html = render("Extension v1.0.0 · 2026-09-27");
    expect(html).not.toContain("Coming to Chrome Web Store");
    expect(html).toContain("Extension v1.0.0");
  });

  it("preserves external-link safety and naming", () => {
    const html = render();
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("opens in a new tab");
  });

  it("never renders a disabled fake control", () => {
    const html = render();
    expect(html).not.toContain("aria-disabled");
    expect(html).not.toContain('role="button"');
  });
});
