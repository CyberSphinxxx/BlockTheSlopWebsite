import Link from "next/link";

import { SoftwareApplicationJsonLd } from "../components/JsonLd";
import { StoreCta } from "../components/StoreCta";
import { PRODUCT } from "../content/site";
import { SITE } from "../site.config";

export default function HomePage() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="hero__kicker">Local-first YouTube filtering · v{PRODUCT.version}</p>
            <h1 className="hero__title">Less AI slop in your YouTube feed, on your terms</h1>
            <p className="hero__lead">
              BlockTheSlop is a browser extension that hides AI-generated, automated, and repetitive
              YouTube videos — using the signals already visible on the page, entirely on your
              device, and always with a one-click undo.
            </p>
            <div className="hero__ctas">
              <StoreCta note={`Extension v${PRODUCT.version} · ${PRODUCT.versionDate}`} />
              <a className="btn" href="/how-it-works">
                See how it works
              </a>
            </div>
            <ul className="hero__proof">
              <li>✔ Runs locally — no account, no telemetry, no cloud AI</li>
              <li>✔ Every automatic hide is explainable and recoverable</li>
              <li>✔ You choose the modes, categories, and channels</li>
            </ul>
          </div>
          <div
            className="frame"
            role="img"
            aria-label="Illustration of a YouTube feed where one video card is hidden by BlockTheSlop with a restore affordance"
          >
            <div className="frame__media">
              <div className="demo-board" aria-hidden="true">
                <div className="demo-card">
                  <div className="demo-card__thumb" />
                  <div style={{ flex: 1, display: "grid", gap: "8px" }}>
                    <div className="demo-card__line demo-card__line--short" />
                    <div className="demo-card__line demo-card__line--long" />
                  </div>
                </div>
                <div className="demo-card demo-card--hidden">
                  <div className="demo-card__thumb" />
                  <div style={{ flex: 1, display: "grid", gap: "8px" }}>
                    <div className="demo-card__line demo-card__line--short" />
                  </div>
                </div>
                <div className="demo-card">
                  <div className="demo-card__thumb" />
                  <div style={{ flex: 1, display: "grid", gap: "8px" }}>
                    <div className="demo-card__line demo-card__line--short" />
                    <div className="demo-card__line demo-card__line--long" />
                  </div>
                  <span className="badge">Kept</span>
                </div>
                <div className="demo-card">
                  <div className="demo-card__thumb" />
                  <div style={{ flex: 1, display: "grid", gap: "8px" }}>
                    <div className="demo-card__line demo-card__line--short" />
                    <div className="demo-card__line demo-card__line--long" />
                  </div>
                </div>
                <div className="demo-card">
                  <div className="demo-card__thumb" />
                  <div style={{ flex: 1, display: "grid", gap: "8px" }}>
                    <div className="demo-card__line demo-card__line--short" />
                    <div className="demo-card__line demo-card__line--long" />
                  </div>
                  <span className="badge badge--accent">Kept</span>
                </div>
              </div>
            </div>
            <div className="frame__caption">
              Illustration, not a live capture: a feed where one card is hidden with a visible
              restore state.
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="steps-heading">
        <div className="container">
          <h2 id="steps-heading">How it works</h2>
          <p className="page-header" style={{ maxWidth: "60ch" }}>
            Three ideas do all the work. There is a longer explanation on the{" "}
            <Link href="/how-it-works">How it works</Link> page.
          </p>
          <ol className="steps steps--3" style={{ marginTop: "var(--sp-6)" }}>
            <li className="step">
              <h3>Read what the page shows</h3>
              <p>
                Titles, descriptions, channel names, badge text — including YouTube&apos;s own
                &quot;Altered or synthetic content&quot; disclosure. No video frames are analyzed.
              </p>
            </li>
            <li className="step">
              <h3>Apply your rules</h3>
              <p>
                Heuristic signals feed separate AI and slop scores, then your mode, categories, and
                surfaces decide what happens — hide, warn, or keep.
              </p>
            </li>
            <li className="step">
              <h3>Keep the undo close</h3>
              <p>
                Hidden cards collapse without gaps. Restore one, restore all, or mark a mistake
                &quot;Not AI&quot; so it never happens again.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading">What you control</h2>
          <div className="card-grid card-grid--3" style={{ marginTop: "var(--sp-6)" }}>
            <div className="card">
              <h3>Choose the mode</h3>
              <p className="card__body">
                Safe, Balanced (default), Strict, or Aggressive. Aggressive trades precision for
                recall — by design, never silently.
              </p>
            </div>
            <div className="card">
              <h3>Filter by category and surface</h3>
              <p className="card__body">
                Decide what happens to AI video, AI voice, AI music, AI thumbnails, and content
                farms — on home, search, subscriptions, and more.
              </p>
            </div>
            <div className="card">
              <h3>Rule on channels and videos</h3>
              <p className="card__body">
                Right-click to hide one video or block a channel, with instant undo and conflict
                detection.
              </p>
            </div>
            <div className="card">
              <h3>Review every decision</h3>
              <p className="card__body">
                A durable history shows why each video was hidden. Restore it, or correct it with
                &quot;Not AI&quot; / &quot;Not slop&quot;.
              </p>
            </div>
            <div className="card">
              <h3>Keep your data at home</h3>
              <p className="card__body">
                Everything stays on your device: no account, no telemetry, no cloud AI. Works
                offline.
              </p>
            </div>
            <div className="card">
              <h3>Own the edge cases</h3>
              <p className="card__body">
                Unknown YouTube layouts fail open — cards stay visible rather than being hidden
                wrongly.
              </p>
            </div>
          </div>
          <p style={{ marginTop: "var(--sp-5)" }}>
            <Link className="btn" href="/features">
              All features
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="limits-heading">
        <div className="container container--prose">
          <h2 id="limits-heading">What it cannot do</h2>
          <div className="panel panel--note" style={{ marginTop: "var(--sp-5)" }}>
            <p style={{ marginBottom: 0 }}>
              BlockTheSlop reads visible metadata, not video frames or audio. An AI-made video with
              no visible signal will pass the filter — no metadata-only tool can catch every one.
              Scores are heuristic signals, not proof of authorship, and any wanted video that gets
              hidden comes back in one click.{" "}
              <Link href="/how-it-works#limits">
                Read the honest limits <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="privacy-heading">
        <div className="container container--prose">
          <h2 id="privacy-heading">Private by construction</h2>
          <p>
            The extension inspects YouTube pages on your device and stores settings, rules, and
            history in your browser profile. Nothing you watch or search for is sent to the
            developer or to any third party by the extension. This website is a separate thing: it
            is hosted publicly on Vercel, so visiting it makes normal web requests.{" "}
            <Link href="/privacy">
              Read the privacy policy <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-heading">
        <div className="container cta-band__inner">
          <h2 id="cta-heading">Ready to clean up your feed?</h2>
          <p style={{ maxWidth: "52ch", margin: 0 }}>
            Install takes one click once the store listing is live. Until then, the source is public
            and the how-it-works page explains exactly what the extension does on your machine.
          </p>
          <div className="hero__ctas" style={{ marginTop: 0 }}>
            <StoreCta />
            <a className="btn" href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
              View source
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "BlockTheSlop — Filter unwanted AI-made YouTube videos",
  description:
    "BlockTheSlop is a local-first browser extension that hides AI-generated, automated, and repetitive YouTube videos on your terms — with every automatic hide recoverable in one click.",
  alternates: { canonical: "/" },
};
