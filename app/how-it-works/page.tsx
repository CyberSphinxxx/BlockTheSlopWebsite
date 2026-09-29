import Link from "next/link";

export const metadata = {
  title: "How BlockTheSlop filters YouTube",
  description:
    "What the extension reads on a YouTube page, how the filtering rules work, and how to bring back any video in one click.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>How BlockTheSlop filters YouTube</h1>
        <p>
          No magic: the extension reads what is already on a YouTube page, applies your rules, and
          keeps the undo one click away. Here is the whole process.
        </p>
      </header>

      <div className="section--tight prose" style={{ paddingBottom: "var(--sp-8)" }}>
        <h2>1. What it reads</h2>
        <p>On youtube.com, the extension looks at the visible text of video cards:</p>
        <ul>
          <li>Video titles and descriptions</li>
          <li>Channel names and channel IDs</li>
          <li>
            Badge text — including YouTube&apos;s own &quot;Altered or synthetic content&quot;
            label, a strong sign the video is AI-made
          </li>
          <li>The page&apos;s accessibility labels</li>
        </ul>
        <p>
          It never watches video frames, never listens to audio, and never sends the page anywhere.
          Everything is checked inside your browser.
        </p>

        <h2>2. How the decision is made</h2>
        <p>
          Those clues feed two separate scores: one for <strong>how a video is made</strong> (is it
          AI?) and one for <strong>what the video is like</strong> (is it slop — automated,
          repetitive, low-effort?). Keeping the two apart matters: you can block the production
          style you dislike without losing videos <em>about</em> AI that you still want to see.
        </p>
        <p>Scores are rule weights, not odds. Your settings then decide what happens:</p>
        <ul>
          <li>
            <strong>Modes</strong> — Safe, Balanced (default), Strict, and Aggressive set how much
            proof is needed to act. Aggressive hides more and makes more mistakes on purpose.
          </li>
          <li>
            <strong>Categories</strong> — a Hide, Warn, or Allow choice for each category: AI video,
            AI voice, AI music, AI thumbnails, and content farms.
          </li>
          <li>
            <strong>Pages</strong> — separate on/off switches for home, search, subscriptions, the
            watch sidebar, Shorts, and more.
          </li>
          <li>
            <strong>Your own rules always win</strong> — a video or channel you allowed stays
            visible; one you blocked goes.
          </li>
        </ul>

        <h2>3. What hiding looks like</h2>
        <p>
          Hidden cards collapse with no empty gap in the grid — or turn into a small placeholder,
          your choice. A corner counter shows how many videos are hidden on the page, and notices
          step aside in fullscreen so playback controls are never covered.
        </p>

        <h2>4. Getting things back</h2>
        <p>Every automatic hide has a way back:</p>
        <ul>
          <li>
            <strong>Show once</strong> from the collapsed card or placeholder.
          </li>
          <li>
            <strong>Session recovery</strong> — the corner notice and the popup list bring back any
            card hidden in the current page view, even with history off. It clears when you leave
            the page or reload, and all cards show again.
          </li>
          <li>
            <strong>Review history</strong> — when history is on, a saved list of every hide and
            warning, with the reason it happened.
          </li>
          <li>
            <strong>Corrections</strong> — mark a video &quot;Not AI&quot; or &quot;Not slop&quot;
            and it stays visible. Corrections survive history clears.
          </li>
          <li>
            <strong>Turn filtering off</strong> and everything hidden comes back right away.
          </li>
        </ul>

        <h2 id="limits">5. Why some videos still get through</h2>
        <div className="panel panel--note">
          <p style={{ marginBottom: 0 }}>
            If an AI video has no visible clue — no label, no tell in its text, no pattern — a tool
            that only reads page text cannot see it. That is a hard limit, said plainly rather than
            hidden. The rules can also be wrong about human-made videos, which is why every hide can
            be undone and corrected. Unknown or redesigned YouTube layouts fail open: cards stay
            visible rather than being hidden by mistake.
          </p>
        </div>

        <h2>6. Where it works</h2>
        <p>
          The extension filters youtube.com in desktop Chrome and Edge, and a Firefox build comes
          from the same source. It does not filter the YouTube mobile app, smart TVs, or other
          websites.
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
