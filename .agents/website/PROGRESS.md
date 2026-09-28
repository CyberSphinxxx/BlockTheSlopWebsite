# Website implementation progress

## Current state

- Date/time: 2026-09-28 (final gate run)
- Website commit: `ac8a62d` initial release + ledger hash bookkeeping commits; working tree clean; local `main`, not pushed (owner action). Note: `state.json.websiteCommit` intentionally records the initial-release hash `ac8a62d` (the code state all evidence refers to); the two follow-up commits touch only ledger bookkeeping.
- Extension source commit reviewed: `7ccdea7` (branch `redesign/specimen`) — **read-only**; extension files, build, and release artifacts untouched
- Current phase and next requirement: code-complete; all executable requirements PASS; remaining items are owner actions
- Preview URL: none yet (Vercel account not connected in this workspace)
- Production origin/canonical host: `https://block-the-slop-website.vercel.app` (declared in `site.config.ts`; verified against the live origin after the owner's first production deploy)
- Current blockers or owner actions: see `state.json` → `ownerActions` (9 items, all external)

## Decision log

| Date       | Decision                                                                                                                            | Evidence or reason                                                                                                                                                     | Affected requirements |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 2026-09-28 | Next.js 15 App Router, React 19, npm, strict TS per kit default                                                                     | No materially simpler stack meets metadata/SEO/E2E requirements; kit default accepted                                                                                  | WEB-01                |
| 2026-09-28 | Sibling project created (parent dir was writable); own git repo initialized locally                                                 | `C:\L3mxr\Github Repositories\BlockTheSlop-Website` exists next to the extension checkout                                                                              | WEB-01                |
| 2026-09-28 | Hand-written 4-layer CSS (palette → themes → tokens → components) instead of Tailwind                                               | Specimen defines a token architecture; a `check-no-raw-colors` CI script enforces the component/theme boundary                                                         | WEB-15, WEB-16        |
| 2026-09-28 | Barlow Condensed 500/700 for headings (from extension repo) + Barlow Semi Condensed 400/600 for body (from @fontsource OFL package) | Condensed-only body is tiring at paragraph length, per DESIGN-SYSTEM.md; both OFL, self-hosted, license file committed                                                 | WEB-15                |
| 2026-09-28 | Hero uses a labeled illustrative "hidden card" mock instead of a fixture screenshot                                                 | No real-YouTube capture exists in this workspace; DESIGN-SYSTEM.md forbids presenting fixtures as live YouTube; caption states it is an illustration                   | WEB-20                |
| 2026-09-28 | `SoftwareApplication` JSON-LD shipped without offer/rating/store fields                                                             | Fields are truthful (name, category, OS, url, author, version, license); Google's rich-result offer requirement means no rich result is claimed until store URL exists | WEB-25                |
| 2026-09-28 | Changelog page shipped with only 1.0.0 (2026-09-27)                                                                                 | Source-backed via CURRENT-RELEASE.md / CWS_SUBMISSION.md; no invented timeline                                                                                         | WEB-12                |
| 2026-09-28 | ESLint pinned to v9                                                                                                                 | eslint-config-next@16 plugin peer range does not support ESLint 10                                                                                                     | WEB-01                |
| 2026-09-28 | Theme switch reads the DOM attribute via `useSyncExternalStore` (MutationObserver)                                                  | Avoids React 19 setState-in-effect lint error and hydration mismatch; storage denial degrades to session-only theme                                                    | WEB-17                |
| 2026-09-28 | `SITE_URL` declared as `https://block-the-slop-website.vercel.app` (overridable via `NEXT_PUBLIC_SITE_URL`)                         | One explicit production value per kit; verified live once owner deploys                                                                                                | WEB-04, WEB-22        |

## Requirement log

Full per-requirement status with evidence commands lives in `state.json` (WEB-01…WEB-35).
Summary: **29 PASS · 1 NOT_APPLICABLE (WEB-20, no photographic media used) · 5 OWNER_ACTION (WEB-27, WEB-32, WEB-33, WEB-34 + CWS link embedded in owner actions)**. Zero FAIL, zero PENDING.

| ID     | Status       | Expected outcome                                | Verification performed                                            | Evidence path or URL            | Next action                            |
| ------ | ------------ | ----------------------------------------------- | ----------------------------------------------------------------- | ------------------------------- | -------------------------------------- |
| WEB-01 | PASS         | Standalone project builds clean                 | `npm run build` (14 static pages, 0 errors)                       | build output, package-lock.json | Owner pushes repo to GitHub            |
| WEB-04 | PASS         | One validated config origin                     | `npx vitest run tests/config.test.ts`                             | tests/config.test.ts            | —                                      |
| WEB-13 | PASS         | Honest pre-store CTA                            | `npx playwright test e2e/pages.spec.ts -g "honest pre-store CTA"` | e2e/pages.spec.ts               | Owner sets storeUrl after listing      |
| WEB-17 | PASS         | Theme system + persistence + no-flash           | `npx playwright test e2e/pages.spec.ts -g "theme"` (4 tests)      | e2e/pages.spec.ts               | —                                      |
| WEB-18 | PASS         | 320px reflow, no overflow                       | `npx playwright test e2e/accessibility.spec.ts -g "reflow"`       | evidence/artifacts/visual/      | —                                      |
| WEB-19 | PASS         | axe 0 serious/critical, both themes, all routes | `npx playwright test e2e/accessibility.spec.ts` (17 tests)        | e2e/accessibility.spec.ts       | —                                      |
| WEB-21 | PASS         | Per-route SSR metadata + canonical              | `npx playwright test e2e/seo.spec.ts`                             | e2e/seo.spec.ts                 | —                                      |
| WEB-28 | PASS         | Zero third-party network                        | `npx playwright test e2e/pages.spec.ts -g "no third-party"`       | e2e/pages.spec.ts               | —                                      |
| WEB-32 | OWNER_ACTION | Vercel preview verified                         | Not executable without Vercel account                             | docs/OPERATIONS.md              | Owner connects Vercel, deploys preview |

(Gap rows are all recorded in state.json; not duplicated here.)

## Gate runs

| Date       | Commit     | Command or browser scenario                                                          | Exit/result                                                                     | Artifact or screenshot          |
| ---------- | ---------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------- |
| 2026-09-28 | pre-commit | `npx tsc --noEmit`                                                                   | 0 errors                                                                        | —                               |
| 2026-09-28 | pre-commit | `npm run lint` (eslint 9 + next/core-web-vitals + next/typescript)                   | 0 errors, 0 warnings                                                            | —                               |
| 2026-09-28 | pre-commit | `npm run format:check` (prettier)                                                    | all files clean                                                                 | —                               |
| 2026-09-28 | pre-commit | `npx vitest run`                                                                     | 24/24 passed                                                                    | —                               |
| 2026-09-28 | pre-commit | `node scripts/check-no-raw-colors.mjs`                                               | 0 violations, 26 files scanned                                                  | —                               |
| 2026-09-28 | pre-commit | `npm run build`                                                                      | 14/14 static pages                                                              | —                               |
| 2026-09-28 | pre-commit | `npx playwright test` (Chromium, production build via `next start`)                  | 63/63 passed                                                                    | evidence/artifacts/visual/*.png |
| 2026-09-28 | pre-commit | Live browser inspection (Freebuff preview): home, how-it-works, privacy, faq, 404    | DOM/semantic checks passed; no third-party resources; theme/CTA/stripe verified | this log                        |
| 2026-09-28 | pre-commit | `curl` SEO spot-checks: title, canonical, robots.txt, sitemap.xml, og:image, JSON-LD | all correct on production origin                                                | e2e/seo.spec.ts assertions      |

## Visual review

Screenshot matrix captured at `evidence/artifacts/visual/` (18 PNGs): home at 320/375/768/1280/1440 in
light AND dark, how-it-works and privacy at 1280 both themes, mobile nav open (375 dark), FAQ open
(1280 light), pre-store CTA hero (1440 light), 404 (1280 dark).

Findings fixed during review:

- Privacy data table overflowed 320px viewport → tables became scrollable blocks (`display:block; overflow-x:auto` on `.prose table`).
- Unbreakable GitHub URL in privacy contact overflowed 320px → line-break opportunities added.
- `<main>` was duplicated during layout refactor → fixed, single landmark (axe + E2E verify).
- Skip link was dropped from the layout during refactor → restored; E2E verifies focus lands on `#main` (tabIndex=-1).
- 200%-zoom test now uses CDP page scale instead of the inaccurate CSS `zoom` simulation.

Known visual notes (accepted, not defects): hero illustration is intentionally abstract (no fake YouTube capture);
hazard stripe appears only in header top edge and CTA/demo contexts per specimen usage rules.

## Release handoff

- Pages delivered and canonical origin: `/`, `/how-it-works`, `/features`, `/faq`, `/privacy`, `/support`, `/changelog`, styled 404; canonical `https://block-the-slop-website.vercel.app` (site.config.ts).
- Automated test and browser results: 24 unit + 63 browser E2E (incl. axe on every route in both themes, SEO/metadata assertions, reflow, no-third-party network, no-JS reading, reduced motion); full gate green on final tree 2026-09-28.
- Accessibility/performance limits: axe covers WCAG 2.1 AA automated rules; keyboard/focus/landmarks manually verified in browser; no field CWV data yet (new site) — lab profile is fully static pages, ~103 kB shared JS, ~90 kB self-hosted woff2 fonts.
- Privacy and claim review: `/privacy` separates extension-local processing from Vercel-hosted website, documents the single localStorage theme key; copy-guard tests block fabricated claims; no affiliation with YouTube/Google asserted.
- Preview deployment and production approval state: no Vercel preview yet (account unavailable in workspace); production deploy deliberately NOT run — owner review required (WEB-34).
- Remaining owner-only actions: 9 items in `state.json` (GitHub push, Vercel connect/preview, SITE_URL verification, production approval, domain, CWS URL, support contact, Search Console, CWS privacy URL).
