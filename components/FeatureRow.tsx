import type { ReactNode } from "react";

type Props = {
  title: string;
  body: ReactNode;
  /** Optional state label (e.g. "Optional · off by default"). */
  state?: ReactNode;
};

/**
 * One explanatory row: title and description on the left, state on the right
 * on wide screens. The state sits in its own grid column so a long title can
 * never push it out of alignment. On mobile the state follows the title.
 */
export function FeatureRow({ title, body, state }: Props) {
  return (
    <div className="feature-row">
      <div>
        <h3 className="feature-row__title">{title}</h3>
        <p className="feature-row__body">{body}</p>
      </div>
      {state ? <p className="feature-row__state">{state}</p> : null}
    </div>
  );
}
