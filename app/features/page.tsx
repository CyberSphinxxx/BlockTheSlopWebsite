import Link from "next/link";

import { FeatureRow } from "../../components/FeatureRow";
import { PageIntro } from "../../components/PageIntro";
import { FEATURE_GROUPS, PRODUCT } from "../../content/site";

export const metadata = {
  title: "Features",
  description:
    "Filter modes, category and page controls, channel and video rules, a review history, and local stats — every feature that ships in the extension.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <div className="container page-body stack">
      <PageIntro
        title="Choose what disappears and what stays"
        lead={
          <>
            Every feature below ships in BlockTheSlop v{PRODUCT.version}. Anything optional or off
            by default is labeled — nothing here is a promise of a future feature.
          </>
        }
      />

      {FEATURE_GROUPS.map((group) => (
        <section key={group.id} className="feature-group" aria-labelledby={`group-${group.id}`}>
          <h2 id={`group-${group.id}`}>{group.title}</h2>
          <p className="feature-group__intro">
            Included in the documented release. Only rows marked optional ship switched off.
          </p>
          <div className="feature-rows">
            {group.features.map((feature) => (
              <FeatureRow
                key={feature.title}
                title={feature.title}
                body={feature.body}
                state={
                  feature.optional ? (
                    <span className="state-badge">Optional · off by default</span>
                  ) : undefined
                }
              />
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="modes-heading">
        <h2 id="modes-heading">The four modes</h2>
        <p className="feature-group__intro">
          The mode sets how much proof is needed before the extension acts. Balanced is the default.
        </p>
        <div className="compare">
          <div className="compare__head" aria-hidden="true">
            <span>Mode</span>
            <span>What it does</span>
          </div>
          <ul className="compare__rows">
            {PRODUCT.modes.map((mode) => (
              <li key={mode.name} className="compare__row">
                <p className="compare__mode">
                  {mode.name}
                  {mode.name === "Balanced" ? <span className="state-badge">Default</span> : null}
                </p>
                <p className="compare__detail">{mode.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="release-note">
          <Link href="/how-it-works">How the modes and signals interact →</Link>
        </p>
      </section>

      <section aria-labelledby="surfaces-heading">
        <h2 id="surfaces-heading">Supported YouTube pages</h2>
        <p className="feature-group__intro">
          Filtering runs on the pages you turn on, from the youtube.com list below. Unknown or
          redesigned layouts fail open — cards stay visible rather than being wrongly filtered.
        </p>
        <ul className="surface-grid">
          {PRODUCT.surfaces.map((surface) => (
            <li key={surface}>{surface}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
