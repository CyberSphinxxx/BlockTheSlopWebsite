/**
 * Single source of truth for deployment- and release-dependent values.
 *
 * Unknown external values MUST stay `null`. The UI renders honest fallback
 * states for every null — never a guessed URL, invented domain, or fake badge.
 *
 * `SITE_URL` is the canonical production origin. Until a custom domain is
 * attached and verified, it is the actual production `*.vercel.app` URL set
 * by the owner. Preview deployments must never be written here.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://block-the-slop-website.vercel.app";

export const SITE = {
  url: SITE_URL,
  name: "BlockTheSlop",
  /** Official Chrome Web Store listing URL. `null` until published and verified. */
  storeUrl: null as string | null,
  /** The extension's public source repository. */
  repoUrl: "https://github.com/CyberSphinxxx/BlockTheSlop",
  /** Extension release this site documents. */
  extensionVersion: "1.0.0",
  /** Release date of that extension version, per CURRENT-RELEASE.md (2026-09-27). */
  extensionReleaseDate: "2026-09-27",
  /**
   * Support route: the repository issue tracker. No email or contact form exists;
   * never render a made-up support address.
   */
  supportIssuesUrl: "https://github.com/CyberSphinxxx/BlockTheSlop/issues",
  /** No published support email exists. Keep null; do not invent one. */
  supportEmail: null as string | null,
  locale: "en",
} as const;

export type SiteConfig = typeof SITE;
