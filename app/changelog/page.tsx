import Link from "next/link";

import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "Changelog",
  description:
    "The release list for BlockTheSlop: each shipped version, its date, and what changed.",
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
      "Filtering by category and page, with Safe, Balanced, Strict, and Aggressive modes (default: Balanced).",
      "Allow/block rules for single videos and whole channels, plus word and phrase rules.",
      'Review history with restore, "Not AI" / "Not slop" corrections, bulk delete, and filters; corrections survive history clears.',
      "Session recovery through the corner notice and popup, even when history is off.",
      "Right-click hiding with instant Undo; optional automatic channel blocking (off by default) with strict safeguards.",
      "Save and load settings as a file, with checks and a preview; local-only statistics.",
      "A Firefox build ships from the same source.",
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
          and the list grows as the extension ships.
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
