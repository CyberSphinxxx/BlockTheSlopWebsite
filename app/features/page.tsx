import Link from "next/link";

import { FEATURE_GROUPS, PRODUCT } from "../../content/site";

export const metadata = {
  title: "Features",
  description:
    "Filter modes, category and page controls, channel and video rules, a review history, and local stats — every feature that ships in the extension.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Choose what disappears and what stays</h1>
        <p>
          Every feature below ships in BlockTheSlop v{PRODUCT.version}. Anything optional or off by
          default is labeled — nothing here is a promise of a future feature.
        </p>
      </header>

      <div className="section--tight" style={{ paddingBottom: "var(--sp-8)" }}>
        {FEATURE_GROUPS.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            style={{ marginTop: "var(--sp-7)" }}
          >
            <h2 id={`group-${group.id}`}>{group.title}</h2>
            <div className="card-grid card-grid--2" style={{ marginTop: "var(--sp-5)" }}>
              {group.features.map((feature) => (
                <article key={feature.title} className="card">
                  <h3>{feature.title}</h3>
                  <p className="card__body">{feature.body}</p>
                  <span className="card__meta">
                    {feature.optional ? (
                      <span className="badge badge--off">Optional / default off</span>
                    ) : (
                      <span className="badge">Shipped</span>
                    )}
                  </span>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="surfaces-heading" style={{ marginTop: "var(--sp-7)" }}>
          <h2 id="surfaces-heading">Supported YouTube pages</h2>
          <p style={{ maxWidth: "60ch" }}>
            Filtering runs on the pages you turn on, from the youtube.com list below. Unknown or
            redesigned layouts fail open — cards stay visible rather than being wrongly filtered.
          </p>
          <ul className="hero__proof" style={{ columns: 2, columnGap: "var(--sp-6)" }}>
            {PRODUCT.surfaces.map((surface) => (
              <li key={surface}>✔ {surface}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="modes-heading" style={{ marginTop: "var(--sp-7)" }}>
          <h2 id="modes-heading">The four modes</h2>
          <div className="card-grid card-grid--2" style={{ marginTop: "var(--sp-5)" }}>
            {PRODUCT.modes.map((mode) => (
              <article key={mode.name} className="card">
                <h3>{mode.name}</h3>
                <p className="card__body">{mode.detail}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "var(--sp-5)" }}>
            <Link href="/how-it-works">How the modes and signals interact →</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
