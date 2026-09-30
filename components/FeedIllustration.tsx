"use client";

import { useState } from "react";

/**
 * The home hero illustration (audit UI-08).
 *
 * It is a diagram with real example titles, not a screenshot of the extension
 * and not a live scan. The only interaction is a local restore/reset toggle
 * that changes its own label and text — it makes no network requests, claims
 * no detection, and never touches YouTube. Reduced motion is respected by the
 * shared transition rule.
 */
export function FeedIllustration() {
  const [restored, setRestored] = useState(false);

  return (
    <figure className="feed">
      <div className="feed__head">
        <span className="feed__title">A feed you have a say in</span>
        <span className="feed__tag">Illustrative example</span>
      </div>

      <ul className="feed__list">
        <li className="feed-item">
          <span className="feed-item__thumb" aria-hidden="true">
            ↗
          </span>
          <div>
            <p className="feed-item__title">Example: a woodworking build keeps its place</p>
            <p className="feed-item__meta">Example video · kept in your feed</p>
          </div>
        </li>

        <li className="feed-item feed-item--hidden">
          <p className="feed-item__title">
            {restored ? "Example video restored" : "Hidden by your rules"}
          </p>
          <p className="feed-item__meta">
            {restored
              ? "This illustration shows a local undo. It does not change your YouTube feed."
              : "Example clue: an “Altered or synthetic content” label on the page."}
          </p>
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => setRestored((value) => !value)}
          >
            {restored ? "Reset illustration" : "Restore example video"}
          </button>
        </li>

        <li className="feed-item">
          <span className="feed-item__thumb" aria-hidden="true">
            ♫
          </span>
          <div>
            <p className="feed-item__title">Example: a studio vlog stays visible</p>
            <p className="feed-item__meta">Example video · kept in your feed</p>
          </div>
        </li>
      </ul>

      <figcaption className="feed__caption">
        Illustrative feed — example content. The extension reads page text, not video frames or
        audio.
      </figcaption>
      <span className="feed__status" role="status">
        {restored ? "Example video restored. The illustration can be reset." : ""}
      </span>
    </figure>
  );
}
