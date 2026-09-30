import type { ReactNode } from "react";

export type ArticleSection = {
  /** Fragment id of the heading this link points at. */
  id: string;
  label: string;
};

type Props = {
  contents: readonly ArticleSection[];
  /** Label for the contents rail; also the nav's accessible name. */
  label?: string;
  children: ReactNode;
};

/**
 * Shared long-form template: a scannable contents rail beside a 720px reading
 * column, both balanced inside the shell. Under 960px the rail becomes a
 * collapsed native disclosure above the article — an 11-item wrapped list no
 * longer pushes the policy text two screens down (audit UI-03 follow-up).
 *
 * The two lists are separate, purpose-built elements rather than one element
 * re-styled per breakpoint: desktop keeps its plain nav verbatim, and
 * narrowing the page swaps to the disclosure purely in CSS. No JavaScript and
 * no browser-specific CSS (the previous single-element idea relied on
 * ::details-content, a Chromium-only pseudo-element, and would have hidden
 * the rail on Firefox/Safari).
 */
export function ArticleLayout({ contents, label = "On this page", children }: Props) {
  return (
    <div className="container">
      <div className="article-layout">
        <nav
          className="article-contents"
          aria-label={label}
          aria-labelledby="article-contents-title"
        >
          <p className="article-contents__title" id="article-contents-title">
            {label}
          </p>
          <ul className="article-contents__list">
            {contents.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <details className="article-contents-toggle">
          <summary>{label}</summary>
          <nav aria-label={label}>
            <ul className="article-contents__list">
              {contents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
        <article className="article">{children}</article>
      </div>
    </div>
  );
}
