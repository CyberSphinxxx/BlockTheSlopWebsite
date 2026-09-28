# Website operations guide

Day-to-day maintenance for the BlockTheSlop website. Read `README.md` first if you have not
set up the project.

## Edit copy

All page copy lives in `app/<route>/page.tsx` (JSX) and `content/site.ts` / `content/routes.ts`
(facts, titles, descriptions). To change wording, edit the file, then:

```bash
npm run lint && npm run format && npx vitest run && npm run build
```

The copy-guard tests (`tests/copy.test.tsx`) fail the build if you introduce forbidden claims
("100% accurate", invented reviews, pricing, affiliation, etc.). If a test fails, the claim
needs review — do not weaken the test to make copy pass.

## Add a new page

1. Add the route to `content/routes.ts` (title, description, priority — this feeds the sitemap,
   and the E2E metadata assertions pick it up automatically).
2. Create `app/<route>/page.tsx` with `export const metadata = { ... }` matching the route
   definition, including `alternates: { canonical: "/<route>" }`.
3. Add it to the nav if needed (`components/nav.ts`).
4. Build and run the full gate.

## Add a named theme (future)

1. Add a semantic block in `styles/themes.css`:

   ```css
   :root[data-theme="solar"] {
     --color-bg: ...;
     /* every role from the light/dark blocks must be defined */
   }
   ```

2. Add an entry in `components/theme-registry.ts` (`attr`, `label`, `stateLabel`, `shipped`).
3. Nothing else. Components reference only semantic tokens, and
   `npm run check:no-raw-colors` enforces that boundary.

## Change the Chrome Web Store URL (after listing is live)

1. Copy the exact official URL from `chromewebstore.google.com`.
2. Set `storeUrl` in `site.config.ts` (must match `https://chromewebstore.google.com/detail/...` —
   the unit test enforces this).
3. Rebuild and redeploy. Every `StoreCta` on the site switches from the "Coming to Chrome Web
   Store" state to the real install link automatically; the E2E suite covers both states.

## Rotate the domain (custom domain cutover)

1. Add the domain in the Vercel dashboard (Project → Settings → Domains) and follow the exact
   DNS records Vercel shows for **this project** — do not copy example records.
2. Choose ONE canonical host (apex or `www`); in Vercel, redirect the other to it.
3. Set `NEXT_PUBLIC_SITE_URL` (env var) or update `site.config.ts` to the canonical origin.
4. Redeploy, then verify together: rendered canonical tags, `robots.txt` sitemap line,
   `sitemap.xml` URLs, Open Graph absolute URLs, and the `/privacy` URL you gave the CWS
   dashboard. `npx playwright test` re-asserts all of these against the configured origin.

## Roll back a Vercel deployment

Vercel → Project → Deployments → open the last known-good deployment → **…** →
**Promote to Production** (or "Instant Rollback"). The site is fully static, so a rollback is
instant and content-complete. If a bad canonical origin shipped, fix `SITE_URL` first, then
roll forward — a rollback alone will keep pointing metadata at the old origin.

## Privacy disclosures — when features change

Update `/privacy` (app/privacy/page.tsx) **before** shipping any change that:

- adds any network request from the site (analytics, forms, embeds, remote fonts),
- adds another browser-storage key (cookie/localStorage), or
- changes what the extension reads or stores.

The policy must describe the website's hosting reality (Vercel serves requests) and the
extension's local behavior separately. Keep the effective date in the page header current.
When the extension itself changes what it stores, update the copy from the extension repo's
`docs/PRIVACY_POLICY.md` — the website mirrors it and must not drift.

## Local QA loop

```bash
npm run lint && npm run format:check && npx tsc --noEmit
npx vitest run
node scripts/check-no-raw-colors.mjs
npm run build
npx playwright test        # serves the production build on :3111 and runs 63 checks
```

Screenshots from the visual matrix land in `evidence/artifacts/visual/` — inspect them in both
themes after any visual change.
