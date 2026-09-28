import Link from "next/link";

export const metadata = {
  title: "How BlockTheSlop filters YouTube",
  description:
    "What BlockTheSlop reads on YouTube, how heuristic filtering works, how you choose what disappears, and how to restore any video in one click.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>How BlockTheSlop filters YouTube</h1>
        <p>
          No magic: the extension reads what is already visible on a YouTube page, applies your
          rules with heuristics, and keeps the undo one click away. Here is the whole pipeline.
        </p>
      </header>

      <div className="section--tight prose" style={{ paddingBottom: "var(--sp-8)" }}>
        <h2>1. What it reads</h2>
        <p>On youtube.com, the content script looks at the visible metadata of video cards:</p>
        <ul>
          <li>Video titles and descriptions</li>
          <li>Channel names and canonical channel IDs</li>
          <li>
            Badge text — including YouTube&apos;s own &quot;Altered or synthetic content&quot;
            disclosure, treated as a strong signal
          </li>
          <li>Accessibility labels rendered by the page</li>
        </ul>
        <p>
          It never watches video frames, never listens to audio, and never sends the page anywhere.
          Analysis happens inside your browser, and the only network-shaped calls in the extension
          bundle retrieve its own interface resources from its own origin.
        </p>

        <h2>2. How the decision is made</h2>
        <p>
          The evidence above feeds two separate heuristic scores: one for{" "}
          <strong>how a video is made</strong> (AI likelihood) and one for{" "}
          <strong>what the video is like</strong> (slop likelihood — automated, repetitive,
          low-effort patterns). Keeping the dimensions separate is the point: you can block the
          production style you dislike without losing videos <em>about</em> AI that you still want
          to see.
        </p>
        <p>
          Scores are rule weights, not probabilities. They are then filtered through your policy:
        </p>
        <ul>
          <li>
            <strong>Modes</strong> — Safe, Balanced (default), Strict, and Aggressive set how much
            evidence is needed to act. Aggressive is an explicit recall-first tradeoff: more hides,
            more false positives.
          </li>
          <li>
            <strong>Categories</strong> — per-category actions (Hide, Warn, or Allow) for
            AI-generated video, AI voice, AI music, AI thumbnail, and content farms.
          </li>
          <li>
            <strong>Surfaces</strong> — per-surface toggles for home, search, subscriptions, the
            watch sidebar, Shorts, and more.
          </li>
          <li>
            <strong>Your explicit rules always win</strong> — a video or channel you allowed stays
            visible; one you blocked goes.
          </li>
        </ul>

        <h2>3. What hiding looks like</h2>
        <p>
          Hidden cards collapse with no blank gap in the grid — or become a compact placeholder,
          your choice. A corner counter shows how many distinct videos are currently hidden on the
          page, and notices step aside in fullscreen and theater modes so playback controls are
          never covered.
        </p>

        <h2>4. Getting things back</h2>
        <p>Every automatic hide has a way back:</p>
        <ul>
          <li>
            <strong>Reveal once</strong> from the collapsed card or placeholder.
          </li>
          <li>
            <strong>Session recovery</strong> — the corner notice and the popup&apos;s Session list
            restore any card hidden in the current page view, even with history disabled. It is
            deliberately session-scoped: navigating away or reloading clears it, and all cards
            render visible again.
          </li>
          <li>
            <strong>Review history</strong> — when history is enabled, a durable, paginated record
            of every hide and warning, with the reason it happened.
          </li>
          <li>
            <strong>Corrections</strong> — mark a video &quot;Not AI&quot; or &quot;Not slop&quot;
            and it stays visible. Corrections survive history clears.
          </li>
          <li>
            <strong>Disable filtering</strong> and everything hidden reappears immediately.
          </li>
        </ul>

        <h2 id="limits">5. Why some videos still get through</h2>
        <div className="panel panel--note">
          <p style={{ marginBottom: 0 }}>
            If an AI-made video carries no visible signal — no disclosure, no textual tell, no
            pattern in its metadata — a metadata-only tool cannot see it. That is a hard limit of
            the approach, and it is stated plainly rather than papered over. Conversely, heuristics
            can be wrong about human-made videos, which is why every hide is reversible and
            correctable. Unknown or redesigned YouTube layouts fail open: cards stay visible rather
            than being mis-filtered.
          </p>
        </div>

        <h2>6. Where it works</h2>
        <p>
          The extension filters youtube.com in desktop Chromium browsers (Chrome, Edge) and has a
          Firefox build from the same source. It does not filter the YouTube mobile app, smart TVs,
          or any other website.
        </p>

        <p style={{ marginTop: "var(--sp-6)" }}>
          <Link className="btn" href="/features">
            See every control on the Features page
          </Link>
        </p>
      </div>
    </div>
  );
}
