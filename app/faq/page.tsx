import Link from "next/link";

import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "FAQ",
  description:
    "Answers about installing BlockTheSlop, why some AI videos pass, false positives and recovery, channel blocking, data handling, and browser support.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "Does BlockTheSlop inspect the video itself?",
    a: (
      <>
        No. It reads visible page metadata — titles, descriptions, channel names and IDs, badge
        text, and aria labels — including YouTube&apos;s own &quot;Altered or synthetic
        content&quot; disclosure. It does not analyze video frames or audio, so an AI-made video
        with no visible signal can pass the filter.
      </>
    ),
  },
  {
    q: "Can it block all AI-generated videos?",
    a: (
      <>
        No, and nothing that reads only page metadata can. Heuristics see signals, not the future:
        undisclosed AI content with no observable signal will not be detected. Aggressive mode hides
        more, but deliberately accepts more false positives. Your own rules (channels, videos,
        phrases) are the most reliable tool for the cases you care about.
      </>
    ),
  },
  {
    q: "Can I keep videos that discuss AI?",
    a: (
      <>
        Yes. AI-production and AI-topics are separate concerns: the AI discussion / news / tutorials
        category is allowed by default, and per-category actions let you set Hide, Warn, or Allow
        independently. Blocking &quot;AI slop&quot; does not mean blocking every mention of AI.
      </>
    ),
  },
  {
    q: "What if it hides something I wanted?",
    a: (
      <>
        Reveal it once from the card, use the corner notice or the popup&apos;s Session Recovery
        list, or restore it from the review history. Then mark it &quot;Not AI&quot; or &quot;Not
        slop&quot; — corrections survive history clears, so the same video is not hidden again.
        Allow rules per video or channel give you a permanent say. If you disabled history, session
        recovery still covers the current page view.
      </>
    ),
  },
  {
    q: "Can I block a channel?",
    a: (
      <>
        Yes — right-click any video card or channel avatar and choose &quot;Block this channel with
        BlockTheSlop&quot;. Channel blocks require a verified canonical channel ID, apply
        immediately across open tabs, and undo instantly. There is also an optional automatic
        channel blocking feature: it is default OFF and, when enabled, needs a canonical ID plus at
        least three qualifying videos across visits, capped at five promotions per day, expiring
        after 30 days, and revocable at any time.
      </>
    ),
  },
  {
    q: "Is my watch history uploaded anywhere?",
    a: (
      <>
        Not by the extension. It has no telemetry, no account, no cloud AI, and its bundle performs
        no requests off your device — settings, rules, history, and statistics live in your browser
        profile. This website is a different surface: it is publicly hosted, so visiting it makes
        normal web requests to the hosting provider. See the{" "}
        <Link href="/privacy">privacy policy</Link> for both.
      </>
    ),
  },
  {
    q: "Where does it work?",
    a: (
      <>
        On youtube.com in desktop Chromium browsers (Chrome, Edge) and in Firefox via the separate
        Firefox build. It does not filter the YouTube mobile app, smart TVs, or other websites.
      </>
    ),
  },
  {
    q: "Does it press 'Not interested' for me on YouTube?",
    a: (
      <>
        No. A toggle for that exists in Settings but is visibly disabled and marked &quot;not
        available in this build&quot; — no YouTube account actions are ever performed.
      </>
    ),
  },
  {
    q: "How do I uninstall it or delete my data?",
    a: (
      <>
        Remove it like any extension via your browser&apos;s extension management page; uninstalling
        deletes its stored data with the browser&apos;s normal cleanup. Inside the extension,
        Settings has separate controls to reset settings (your allow/block rules are kept), clear
        review history (corrections are kept by design), delete corrections, clear the detection
        cache, and reset statistics.
      </>
    ),
  },
  {
    q: "Is BlockTheSlop affiliated with YouTube or Google?",
    a: (
      <>
        No. It is an independent, open-source project. YouTube is named only to describe where the
        extension works, and no endorsement is implied.
      </>
    ),
  },
] as const;

export default function FaqPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Questions about BlockTheSlop</h1>
        <p>
          Short answers first, links where they help. If your question is not here,{" "}
          <Link href="/support">get in touch via the issue tracker</Link>.
        </p>
      </header>

      <div
        className="section--tight faq-list"
        style={{ paddingBottom: "var(--sp-8)", maxWidth: "56rem" }}
      >
        {FAQS.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <div className="faq-item__body">{item.a}</div>
          </details>
        ))}
      </div>

      <div className="section--tight" style={{ paddingBottom: "var(--sp-8)" }}>
        <div className="panel">
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
            Current documented release: v{PRODUCT.version} ({PRODUCT.versionDate}). Source:{" "}
            <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
              the project repository
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
