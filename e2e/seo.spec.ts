import { expect, test } from "@playwright/test";

import { ROUTES } from "../content/routes";

/**
 * Route-level smoke: every public route returns 200, renders meaningful
 * server-rendered content without JS, has exactly one H1, unique title and
 * description, a canonical URL, and consistent nav/footer. (WEB-21, WEB-14)
 */

const ORIGIN = "https://block-the-slop-website.vercel.app";

for (const route of ROUTES) {
  test(`route ${route.path} renders complete server HTML`, async ({ request }) => {
    const response = await request.get(route.path);
    expect(response.status()).toBe(200);

    const html = await response.text();

    // Unique title matching the route inventory (template appends brand).
    const expectedTitle = route.path === "/" ? route.title : `${route.title} — BlockTheSlop`;
    expect(html).toContain(`<title>${expectedTitle}</title>`);

    // Meta description present and unique per route.
    const descriptions = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)].map(
      (match) => match[1],
    );
    expect(descriptions.length).toBeGreaterThan(0);
    expect(descriptions[0]).toBe(route.description);

    // Exactly one H1.
    const h1Count = (html.match(/<h1[ >]/g) ?? []).length;
    expect(h1Count, `${route.path} must have exactly one h1`).toBe(1);

    // Canonical URL on the production origin.
    const expectedCanonical = route.path === "/" ? ORIGIN : `${ORIGIN}${route.path}`;
    expect(html).toContain(`<link rel="canonical" href="${expectedCanonical}"/>`);

    // Open Graph and Twitter cards.
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/name="twitter:card" content="summary_large_image"/);

    // Server-rendered body text (SEO content must not depend on hydration).
    expect(html.length).toBeGreaterThan(8_000);
    expect(html).toContain("<main");
  });
}

test("descriptions are unique across routes", async ({ request }) => {
  const seen = new Set<string>();
  for (const route of ROUTES) {
    const html = await (await request.get(route.path)).text();
    const match = html.match(/<meta name="description" content="([^"]*)"/);
    const description = match?.[1] ?? "";
    expect(seen.has(description), `duplicate description on ${route.path}`).toBe(false);
    seen.add(description);
  }
});

test("robots.txt points at the sitemap on the production origin", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Sitemap: https://block-the-slop-website.vercel.app/sitemap.xml");
  expect(body).toContain("User-Agent: *");
  expect(body).toContain("Allow: /");
});

test("sitemap.xml lists exactly the canonical routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");
  const body = await response.text();
  for (const route of ROUTES) {
    const expected = route.path === "/" ? "" : route.path;
    expect(body).toContain(`https://block-the-slop-website.vercel.app${expected}`);
  }
  expect(body).not.toContain("localhost");
  expect(body).not.toContain("vercel-preview");
});

test("unknown route returns a real 404 with helpful content", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
  await expect(page.getByRole("link", { name: "Go to the home page" })).toBeVisible();
});

test("404 response body is a soft landing, not a blank error", async ({ request }) => {
  const response = await request.get("/missing");
  expect(response.status()).toBe(404);
  const html = await response.text();
  expect(html).toContain("Page not found");
  expect(html).toContain("Go to the home page");
});

test("opengraph image resolves with correct content type and dimensions", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
  const home = await (await request.get("/")).text();
  expect(home).toMatch(
    /property="og:image" content="https:\/\/block-the-slop-website\.vercel\.app\/opengraph-image/,
  );
  expect(home).toMatch(/content="1200"/);
  expect(home).toMatch(/content="630"/);
});

test("favicon icon resolves", async ({ request }) => {
  const response = await request.get("/icon");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
});
