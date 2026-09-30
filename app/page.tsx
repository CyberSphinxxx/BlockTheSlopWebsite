import Link from "next/link";

import { FeedIllustration } from "../components/FeedIllustration";
import { SoftwareApplicationJsonLd } from "../components/JsonLd";
import { StoreCta } from "../components/StoreCta";

export default function HomePage() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <div className="page-stack">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero__inner">
            <div>
              <p className="eyebrow">Local-first YouTube filtering</p>
              <h1 className="hero__title" id="hero-title">
                Less AI slop. More of your YouTube.
              </h1>
              <p className="hero__lead">
                BlockTheSlop is a browser extension that hides AI-made, automated, and repetitive
                YouTube videos. It reads only what is already on the page, it runs on your device,
                and every hide can be undone in one click.
              </p>
              <StoreCta />
              <ul className="trust-list">
                <li>Runs locally — no account, no telemetry, no cloud AI</li>
                <li>Every automatic hide shows why, and is easy to undo</li>
                <li>You pick the modes, categories, and channels</li>
              </ul>
            </div>
            <FeedIllustration />
          </div>
        </section>

        <section className="section" aria-labelledby="steps-heading">
          <div className="container">
            <h2 id="steps-heading">A simple process. Your final say.</h2>
            <p className="section-intro">
              The useful part is control: choose what gets filtered, see why, and bring it back when
              the rules get it wrong.
            </p>
            <ol className="steps steps--3 section__content">
              <li className="step">
                <span className="step__number">01 / Read</span>
                <h3 className="step__title">Use what the page shows</h3>
                <p>
                  Titles, descriptions, channel names and IDs, badge text — including YouTube&apos;s
                  own &quot;Altered or synthetic content&quot; label. No video frames, no audio.
                </p>
              </li>
              <li className="step">
                <span className="step__number">02 / Filter</span>
                <h3 className="step__title">Apply your rules</h3>
                <p>
                  Simple signals build separate AI and slop scores. Your mode, categories, and pages
                  then decide what happens — hide, warn, or keep.
                </p>
              </li>
              <li className="step">
                <span className="step__number">03 / Restore</span>
                <h3 className="step__title">Keep the undo close</h3>
                <p>
                  Hidden cards collapse without gaps. Bring back one, bring back all, or mark a
                  mistake &quot;Not AI&quot; so it never happens again.
                </p>
              </li>
            </ol>
            <p className="section__content">
              <Link href="/how-it-works">See the whole process on How it works →</Link>
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="controls-heading">
          <div className="container control-layout">
            <div>
              <p className="eyebrow">Built around your choices</p>
              <h2 id="controls-heading">You set the boundaries.</h2>
              <p className="section-intro">
                A few clear controls, with room for the exceptions that matter to you.
              </p>
              <p className="section__content">
                <Link href="/features">See every control on the Features page →</Link>
              </p>
            </div>
            <div className="rows">
              <div>
                <h3>Choose how much to filter</h3>
                <p>
                  Safe, Balanced (the default), Strict, or Aggressive. Aggressive hides more and
                  accepts more mistakes — on purpose, never quietly.
                </p>
              </div>
              <div>
                <h3>Make your own exceptions</h3>
                <p>
                  Allow a channel, block a single video, or choose how each category is handled.
                  Your explicit rules always take priority over the automatic ones.
                </p>
              </div>
              <div>
                <h3>Review every decision</h3>
                <p>
                  See why a video was hidden, bring it back, and correct it with &quot;Not AI&quot;
                  or &quot;Not slop&quot;. Everything stays in your browser.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="limits-heading">
          <div className="container pair">
            <div className="pair__block">
              <h2 id="limits-heading">Know its limits</h2>
              <p>
                Page text cannot reveal every AI-made video: one with no visible clue will pass the
                filter. Human-made videos can also be hidden by mistake, which is why any hide comes
                back in one click. <Link href="/how-it-works#limits">Read the honest limits</Link>
              </p>
            </div>
            <div className="pair__block">
              <h2 id="privacy-heading">Your data stays yours</h2>
              <p>
                The extension checks YouTube pages on your device and saves settings, rules, and
                history in your browser profile. This website is separate: it is hosted online by
                Vercel, so visiting it makes normal web requests.{" "}
                <Link href="/privacy">Read the privacy policy</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cta-heading">
          <div className="container">
            <div className="closing">
              <div>
                <h2 id="cta-heading">Make room for what you want to watch</h2>
                <p>
                  Installing will take one click once the store listing is live. Until then, the
                  source is public and the how-it-works page shows exactly what the extension does
                  on your device.
                </p>
              </div>
              <StoreCta />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const metadata = {
  title: "BlockTheSlop — Filter unwanted AI-made YouTube videos",
  description:
    "A browser extension that hides AI-made and repetitive YouTube videos on your device. Every automatic hide can be undone in one click.",
  alternates: { canonical: "/" },
};
