import Link from "next/link";

import { SITE } from "../site.config";

type Props = {
  /** Helper text for the published-store branch (e.g. version/date context). */
  note?: string;
};

/**
 * The primary call to action before the Chrome Web Store listing exists.
 *
 * SITE.storeUrl is null until a real listing is published and verified, so the
 * strongest available action is the explanation page. The "coming" status is a
 * plain paragraph below the action row — never a disabled control, never a
 * guessed URL, and never inside the row where it would stretch a sibling's
 * height (audit UI-01 / UI-07). Once a verified store URL is configured the
 * same component promotes the real install link and keeps the explanation
 * secondary.
 */
export function StoreCta({ note }: Props) {
  return (
    <div className="cta-block">
      <div className="action-row">
        {SITE.storeUrl ? (
          <>
            <a
              className="btn btn--primary"
              href={SITE.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Install BlockTheSlop from the Chrome Web Store (opens in a new tab)"
            >
              Install from Chrome Web Store
            </a>
            <Link className="btn" href="/how-it-works">
              See how it works
            </Link>
          </>
        ) : (
          <>
            <Link className="btn btn--primary" href="/how-it-works">
              See how it works
            </Link>
            <a className="btn" href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
              View source
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </>
        )}
      </div>
      {SITE.storeUrl ? (
        note ? (
          <p className="cta-status">{note}</p>
        ) : null
      ) : (
        <p className="cta-status">
          Coming to Chrome Web Store · installation is not available yet.
        </p>
      )}
    </div>
  );
}
