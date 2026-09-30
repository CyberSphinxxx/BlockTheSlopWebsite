import Link from "next/link";

import { PageIntro } from "../../components/PageIntro";
import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "FAQ",
  description:
    "Short answers about installing the extension, why some AI videos get through, undoing wrong hides, channel blocking, and your data.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "Does BlockTheSlop inspect the video itself?",
    a: (
      <>
        No. It reads page text only — titles, descriptions, channel names and IDs, badge text, and
        accessibility labels — including YouTube&apos;s own &quot;Altered or synthetic content&quot;
        label. It never checks video frames or audio, so an AI video with no visible clue can slip
        through.
      </>
    ),
  },
  {
    q: "Can it block all AI-generated videos?",
    a: (
      <>
        No, and nothing that reads only page text can. Undisclosed AI videos leave no clue to find.
        Aggressive mode hides more but also makes more mistakes. Your own rules (channels, videos,
        phrases) are the most reliable tool for the cases you care about.
      </>
    ),
  },
  {
    q: "Can I keep videos that discuss AI?",
    a: (
      <>
        Yes. Making a video with AI and talking about AI are treated as two different things. The AI
        discussion / news / tutorials category is allowed by default, and each category can be set
        to Hide, Warn, or Allow on its own. Blocking &quot;AI slop&quot; does not mean blocking
        every mention of AI.
      </>
    ),
  },
  {
    q: "What if it hides something I wanted?",
    a: (
      <>
        Show it once from the card, use the corner notice or the popup list, or restore it from the
        review history. Then mark it &quot;Not AI&quot; or &quot;Not slop&quot; — corrections
        survive history clears, so the same video is not hidden again. Allow rules per video or
        channel give you a permanent say.
      </>
    ),
  },
  {
    q: "Can I block a channel?",
    a: (
      <>
        Yes — right-click any video card or channel avatar and choose &quot;Block this channel with
        BlockTheSlop&quot;. The block applies right away across open tabs and undoes instantly.
        There is also an optional automatic channel blocking feature: it is off by default, needs a
        channel ID plus three or more matching videos across visits, allows at most five per day,
        stops after 30 days, and you can turn it off at any time.
      </>
    ),
  },
  {
    q: "Is my watch history uploaded anywhere?",
    a: (
      <>
        Not by the extension. It has no telemetry, no account, and no cloud AI, and it makes no
        network requests of its own — settings, rules, history, and statistics live in your browser
        profile. This website is different: it is hosted online, so visiting it makes normal web
        requests to the host. See the <Link href="/privacy">privacy policy</Link> for both.
      </>
    ),
  },
  {
    q: "Where does it work?",
    a: (
      <>
        On youtube.com in desktop Chrome and Edge, plus Firefox through the separate Firefox build.
        It does not filter the YouTube mobile app, smart TVs, or other websites.
      </>
    ),
  },
  {
    q: "Does it press 'Not interested' for me on YouTube?",
    a: (
      <>
        No. A toggle for that exists in Settings but is visibly switched off and marked &quot;not
        available in this build&quot; — no YouTube account actions are ever taken.
      </>
    ),
  },
  {
    q: "How do I uninstall it or delete my data?",
    a: (
      <>
        Remove it like any extension from your browser&apos;s extension page; uninstalling deletes
        its stored data with the browser&apos;s normal cleanup. Inside the extension, Settings has
        separate controls to reset settings (your allow/block rules are kept), clear review history
        (corrections are kept), delete corrections, clear the detection cache, and reset statistics.
      </>
    ),
  },
  {
    q: "Is BlockTheSlop affiliated with YouTube or Google?",
    a: (
      <>
        No. It is an independent open-source project. YouTube is named only to say where the
        extension works, and no backing by YouTube or Google is claimed or implied.
      </>
    ),
  },
] as const;

export default function FaqPage() {
  return (
    <div className="container page-body stack stack--block faq-page">
      <PageIntro
        title="Questions about BlockTheSlop"
        lead={
          <>
            Short answers first, links where they help. If your question is not here,{" "}
            <Link href="/support">ask on the issue tracker</Link>.
          </>
        }
      />

      <div className="faq-list">
        {FAQS.map((item) => (
          <details key={item.q} className="faq-item">
            {/* The question text is its own element so the hover underline
                stays on the text and never crosses the +/− marker. */}
            <summary>
              <span>{item.q}</span>
            </summary>
            <div className="faq-item__body">{item.a}</div>
          </details>
        ))}
      </div>

      <p className="release-note">
        Current documented release: v{PRODUCT.version} ({PRODUCT.versionDate}). Source:{" "}
        <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
          the project repository
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}
