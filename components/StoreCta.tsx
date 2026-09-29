import { SITE } from "../site.config";

type Props = {
  /** Visual size: hero uses larger type via .btn styles anyway; kept for semantics. */
  size?: "regular" | "hero";
  /** Extra note under the button (e.g. version/date). */
  note?: string;
};

/**
 * The primary install CTA.
 *
 * Before the Chrome Web Store listing is published, SITE.storeUrl is null and
 * this renders a non-interactive, honest "coming" state — never a guessed URL
 * or a link to a development ZIP. When a verified store URL is configured the
 * same component becomes the real outbound link. Browser tests cover both.
 */
export function StoreCta({ note }: Props) {
  if (SITE.storeUrl) {
    return (
      <div>
        <a
          className="btn btn--primary"
          href={SITE.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Install BlockTheSlop from the Chrome Web Store (opens in a new tab)"
        >
          Install from Chrome Web Store
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        {note ? <span className="btn__note">{note}</span> : null}
      </div>
    );
  }

  return (
    <div>
      <span
        className="btn btn--primary"
        aria-disabled="true"
        role="button"
        aria-label="BlockTheSlop is coming to the Chrome Web Store; installation is not available yet"
      >
        Coming to Chrome Web Store
      </span>
      <span className="btn__note">
        Not out yet. For now: <a href="/how-it-works">see how it works</a> or{" "}
        <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
          view the source
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        .
      </span>
    </div>
  );
}
