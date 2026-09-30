import type { ReactNode } from "react";

type Props = {
  title: string;
  /** One short paragraph: what this page answers. */
  lead?: ReactNode;
  /** Small metadata line directly under the lead (e.g. effective date). */
  meta?: ReactNode;
};

/** Shared inner-page opener: one title role, one lead role, aligned edges. */
export function PageIntro({ title, lead, meta }: Props) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      {lead ? <p className="page-intro__lead">{lead}</p> : null}
      {meta ? <p className="page-intro__meta">{meta}</p> : null}
    </header>
  );
}
