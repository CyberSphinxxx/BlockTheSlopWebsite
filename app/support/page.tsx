import Link from "next/link";

import { SITE } from "../../site.config";

export const metadata = {
  title: "Support",
  description:
    "How to get help: report a bug or ask a question on the project issue tracker, and what to include in a good report.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Get help with BlockTheSlop</h1>
        <p>
          BlockTheSlop is a free open-source project. Help runs through its public issue tracker —
          there is no paid support, no phone line, and no email address, and this page will never
          make one up.
        </p>
      </header>

      <div className="section--tight" style={{ paddingBottom: "var(--sp-8)" }}>
        <div className="card-grid card-grid--2">
          <section className="card" aria-labelledby="support-issues">
            <h2 id="support-issues" style={{ fontSize: "var(--text-lg)" }}>
              Report a bug or ask a question
            </h2>
            <p className="card__body">
              Open an issue on the repository. Look through the open issues first — your problem may
              already be known.
            </p>
            <span className="card__meta">
              <a
                className="btn btn--primary"
                href={SITE.supportIssuesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the issue tracker
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </span>
          </section>

          <section className="card" aria-labelledby="support-what-to-include">
            <h2 id="support-what-to-include" style={{ fontSize: "var(--text-lg)" }}>
              What to include
            </h2>
            <ul className="card__body" style={{ paddingLeft: "1.25rem", margin: 0 }}>
              <li>Your browser and its version</li>
              <li>The extension version (shown in Settings → About)</li>
              <li>The YouTube page (home, search, watch page…)</li>
              <li>What you expected, and what happened instead</li>
              <li>Which filtering mode and categories were on</li>
            </ul>
          </section>
        </div>

        <div className="panel panel--note" style={{ marginTop: "var(--sp-6)" }}>
          <p style={{ margin: 0 }}>
            <strong>
              Please do not paste your watch history or the full text of videos you have hidden
            </strong>{" "}
            — titles and the filtering reason shown in the review history are enough to reproduce
            most issues, and the project cannot read your device data anyway.
          </p>
        </div>

        <section aria-labelledby="support-faq" style={{ marginTop: "var(--sp-7)" }}>
          <h2 id="support-faq">Before you file</h2>
          <p style={{ maxWidth: "60ch" }}>These cover the most common questions:</p>
          <ul>
            <li>
              <Link href="/faq">FAQ</Link> — installation, misses, false positives, channel
              blocking, data handling.
            </li>
            <li>
              <Link href="/how-it-works">How it works</Link> — what the extension can and cannot
              see.
            </li>
            <li>
              <Link href="/privacy">Privacy policy</Link> — what is stored and where.
            </li>
          </ul>
        </section>

        <section aria-labelledby="support-expectations" style={{ marginTop: "var(--sp-7)" }}>
          <h2 id="support-expectations">What to expect</h2>
          <p style={{ maxWidth: "60ch" }}>
            Volunteers run this project, so reply times are not promised. Issues are read on a
            best-effort basis, and clear reports with steps to repeat the problem get the fastest
            answers.
          </p>
        </section>
      </div>
    </div>
  );
}
