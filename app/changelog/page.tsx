import Link from "next/link";

import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "Changelog",
  description:
    "Release history for BlockTheSlop: verified versions, dates, and what changed in each release.",
  alternates: { canonical: "/changelog" },
};

/**
 * Sourced from the extension repository's release documentation
 * (docs/CWS_SUBMISSION.md version notes; block-the-slop-v7/CURRENT-RELEASE.md).
 * Only entries with a verified version and date appear here. No invented
 * timeline, no planned-version speculation.
 */
const RELEASES = [
  {
    version: PRODUCT.version,
    date: PRODUCT.versionDate,
    title: "First store release candidate",
    notes: [
      "Category- and surface-based filtering with Safe, Balanced, Strict, and Aggressive modes (default: Balanced).",
      "Per-video and per-channel allow/block with conflict detection, plus literal phrase rules.",
      'Review history with restore, "Not AI" / "Not slop" corrections, bulk delete, and filters; corrections survive history clears.',
      "Session recovery via the on-page corner notice and popup, working even when history is disabled.",
      "Context-menu blocking with instant Undo; optional automatic channel blocking (default OFF) with strict safeguards.",
      "Import/export with strict validation and preview; local-only statistics.",
      "Firefox build ships from the same source (MV2 manifest).",
    ],
  },
] as const;

export default function ChangelogPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Changelog</h1>
        <p>
          Verified releases only — versions and dates come from the project&apos;s release records,
          and the list grows when the extension ships.
        </p>
      </header>

      <div className="section--tight" style={{ paddingBottom: "var(--sp-8)", maxWidth: "52rem" }}>
        {RELEASES.map((release) => (
          <article key={release.version} className="card" style={{ marginBottom: "var(--sp-5)" }}>
            <h2 style={{ fontSize: "var(--text-xl)" }}>
              v{release.version}{" "}
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--fw-body)",
                }}
              >
                · {release.date}
              </span>
            </h2>
            <p className="card__body" style={{ fontWeight: 600 }}>
              {release.title}
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              {release.notes.map((note) => (
                <li key={note} style={{ marginBottom: "var(--sp-2)" }}>
                  {note}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <p style={{ color: "var(--color-text-muted)" }}>
          Full technical release notes live in the{" "}
          <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
            project repository
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          . Questions about a release? <Link href="/support">Get support</Link>.
        </p>
      </div>
    </div>
  );
}
