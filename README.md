# BlockTheSlop Website

The public marketing and documentation site for [BlockTheSlop](https://github.com/CyberSphinxxx/BlockTheSlop)
— a local-first browser extension that filters AI-generated, automated, repetitive, and
low-quality ("slop") YouTube videos.

This repository contains **only the website**. The browser extension lives in its own verified
repository; this project never changes the extension's source, build, or release artifacts.

## Stack

- Next.js 15 (App Router), strict TypeScript
- React 19, minimal client JavaScript (theme switcher, mobile nav, FAQ disclosures)
- Hand-written CSS with a 4-layer token system (palette → semantic themes → tokens → components)
- System UI font stack (`Segoe UI`, `system-ui`, …) — no font downloads and **no** runtime
  Google Fonts requests
- No analytics, no cookies, no forms, no database, no third-party embeds

## Getting started

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm run lint            # ESLint
npm run typecheck       # strict TypeScript, no emit
npm run format:check    # Prettier
npm test                # Vitest unit tests (config, claims, copy guards)
npm run check:no-raw-colors  # components must not contain raw color literals
npm run build           # production build
npm run test:e2e        # Playwright E2E + axe accessibility (serves the built site)
```

## Configuration

Site configuration (canonical origin, store URL, repository URL, version) lives in
`site.config.ts` and `content/site.ts`. Unknown values (e.g. the Chrome Web Store URL before
publication) must stay `null`; the UI renders honest fallback states — never a guessed URL.

- `SITE_URL` — production canonical origin. Until a custom domain is attached, use the actual
  production Vercel URL once known. Preview deployments must never be canonical.
- `content/site.ts:storeUrl` — set to the published Chrome Web Store listing URL after
  verification; before that it stays `null` and every CTA renders a truthful
  "Coming to Chrome Web Store" state.
- Preview deployments are automatically `noindex` (`X-Robots-Tag` from Vercel plus a meta
  fallback for non-Vercel hosts, in `app/layout.tsx`).

## Vercel deployment

1. Push this repository to GitHub (its own repo, not the extension's).
2. In Vercel: **Add New → Project → Import** the repository. Framework detection: Next.js.
   No environment variables are required.
3. The first production URL (e.g. `block-the-slop-website.vercel.app`) becomes `SITE_URL`
   in `site.config.ts` — set it, commit, and that build becomes the canonical origin.
4. To attach a custom domain later: add it in the Vercel dashboard, follow the exact DNS
   records the Vercel project page shows, pick one canonical host, and update `SITE_URL`,
   the sitemap, and Open Graph URLs together (they all derive from `site.config.ts`).

## Operations

See `.agents/website/PROGRESS.md` for the implementation ledger, and
`docs/OPERATIONS.md` for editing copy, adding themes, changing the store URL, rotating the
domain, and rolling back a Vercel deployment.

## License

MIT — site content and code are licensed the same as the extension's repository unless noted.
