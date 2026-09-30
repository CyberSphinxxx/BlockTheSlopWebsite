import Link from "next/link";

import { PageIntro } from "../../components/PageIntro";
import { SITE } from "../../site.config";

export const metadata = {
  title: "Support",
  description:
    "How to get help: report a bug or ask a question on the project issue tracker, and what to include in a good report.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <div className="container page-body stack">
      <div>
        <PageIntro
          title="Get help with BlockTheSlop"
          lead={
            <>
              BlockTheSlop is a free open-source project. Help runs through its public issue tracker
              — there is no paid support, no phone line, and no support email.
            </>
          }
        />
        <div className="action-row intro-actions">
          <a
            className="btn btn--primary"
            href={SITE.supportIssuesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open issue tracker
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="support-layout">
        <section aria-labelledby="support-report">
          <h2 id="support-report">Report a bug or ask a question</h2>
          <p className="feature-group__intro">
            Public and free. Clear reports with steps that repeat the problem get the fastest
            answers.
          </p>
          <ol className="support-steps">
            <li>Search the open issues first — your problem may already be known.</li>
            <li>Say which YouTube page you were on: home, search, a watch page, Shorts.</li>
            <li>
              Note your browser and its version, plus the extension version (Settings → About).
            </li>
            <li>
              Describe what you expected and what happened instead, with the filtering reason if the
              review history shows one.
            </li>
          </ol>
        </section>

        <aside className="checklist" aria-labelledby="support-include">
          <h3 id="support-include">Include in your report</h3>
          <ul>
            <li>Your browser and its version</li>
            <li>The extension version (shown in Settings → About)</li>
            <li>The YouTube page (home, search, watch page…)</li>
            <li>What you expected, and what happened instead</li>
            <li>Which filtering mode and categories were on</li>
          </ul>
          <p className="support-note">
            Please do not paste your watch history or the full text of videos you have hidden.
            Titles and the filtering reason shown in the review history are enough to reproduce most
            issues, and the project cannot read your device data anyway.
          </p>
        </aside>
      </div>

      <section aria-labelledby="support-before">
        <h2 id="support-before">Before you file</h2>
        <p className="feature-group__intro">These cover the most common questions:</p>
        <ul className="link-grid">
          <li>
            <Link href="/faq">FAQ</Link>
            <p>Installation, misses, false positives, channel blocking, data handling.</p>
          </li>
          <li>
            <Link href="/how-it-works">How it works</Link>
            <p>What the extension can and cannot see on a YouTube page.</p>
          </li>
          <li>
            <Link href="/privacy">Privacy policy</Link>
            <p>What is stored, where it lives, and what never leaves your device.</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="support-expectations">
        <h2 id="support-expectations">What to expect</h2>
        <p className="feature-group__intro">
          Volunteers run this project, so reply times are not promised. Issues are read on a
          best-effort basis, and clear reports with steps to repeat the problem get the fastest
          answers.
        </p>
      </section>
    </div>
  );
}
