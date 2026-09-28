/**
 * Verified product facts, traced to the extension repository.
 *
 * Source of record (reviewed 2026-09-28):
 * - BlockTheSlop repo @ 7ccdea7 (branch redesign/specimen): README.md,
 *   docs/PRIVACY_POLICY.md, docs/CWS_SUBMISSION.md, block-the-slop-v7/CURRENT-RELEASE.md
 *
 * Rules for this file:
 * - A fact may appear in marketing copy only if it is listed here with a source.
 * - Sample statistics from the visual specimen (e.g. "213 hidden") are NOT product
 *   facts and must never be displayed as real numbers.
 * - Heuristic scores are never described as probabilities, accuracy guarantees,
 *   or proof of authorship.
 */

import { SITE } from "../site.config";

export const PRODUCT = {
  name: SITE.name,
  tagline:
    "Filter AI-generated and repetitive YouTube videos locally. Every auto-hide is explainable, recoverable, and yours to undo.",
  /** Extension version documented by this site. */
  version: SITE.extensionVersion,
  versionDate: SITE.extensionReleaseDate,
  repoUrl: SITE.repoUrl,
  storeUrl: SITE.storeUrl,
  supportIssuesUrl: SITE.supportIssuesUrl,

  /** Shipped YouTube surfaces (docs/CWS_SUBMISSION.md). */
  surfaces: [
    "Home",
    "Search results",
    "Subscriptions",
    "Watch-page sidebar and compact cards",
    "Channel pages",
    "Playlists",
    "History",
    "Watch later",
    "Shorts shelf",
    "Shorts feed",
  ],

  /** Filterable categories (README + CWS listing copy). */
  categories: [
    {
      name: "AI-generated video",
      detail: "Videos whose visible metadata signals AI-made production.",
    },
    {
      name: "AI voice",
      detail: "Synthetic voiceovers signaled in visible metadata.",
    },
    {
      name: "AI music",
      detail: "AI-generated music signaled in visible metadata.",
    },
    {
      name: "AI thumbnail",
      detail: "AI-generated thumbnails signaled in visible metadata.",
    },
    {
      name: "Content farms",
      detail: "High-volume, repetitive output patterns.",
    },
  ],

  /** Modes from README/CWS_SUBMISSION (default: Balanced). */
  modes: [
    {
      name: "Safe",
      detail: "Fewest hides. Keeps anything without a strong signal.",
    },
    {
      name: "Balanced",
      detail: "Default. Filters clear AI/slop signals while staying quiet about the rest.",
    },
    {
      name: "Strict",
      detail: "Warns on weaker matches before deciding.",
    },
    {
      name: "Aggressive",
      detail: "Recall-first: hides more supported AI content and accepts more false positives.",
    },
  ],

  /** Honest limitation statements, required by the truthful-product contract. */
  limitations: [
    'BlockTheSlop reads visible YouTube metadata — titles, descriptions, channel names and IDs, badge text (including YouTube\'s own "Altered or synthetic content" disclosure), and aria labels. It does not watch video frames or listen to audio.',
    "Undisclosed AI content with no observable signal will pass the filter. No metadata-only tool can catch every AI-made video.",
    "Heuristics make mistakes. A video you wanted can be hidden — that is why every automatic hide is one click to restore.",
    "A score is a heuristic signal weight, not a probability or proof of authorship.",
    "Unknown or redesigned YouTube layouts fail open: cards stay visible rather than mis-filtered.",
    "The extension works on youtube.com in desktop browsers. It does not filter the YouTube mobile app, smart TVs, or other sites.",
  ],
} as const;

export type ProductFact = typeof PRODUCT;

/** Real extension capabilities grouped for the Features page. */
export const FEATURE_GROUPS = [
  {
    id: "choose",
    title: "Choose what leaves your feed",
    features: [
      {
        title: "Four filtering modes",
        body: "Safe, Balanced (default), Strict, and Aggressive. Aggressive is an explicit tradeoff: it hides more but accepts more false positives — and every hide is one click to undo.",
        optional: false,
      },
      {
        title: "Per-category actions",
        body: "Decide Hide, Warn, or Allow for each category: AI-generated video, AI voice, AI music, AI thumbnail, and content farms.",
        optional: false,
      },
      {
        title: "Per-surface toggles",
        body: "Filter on home, search, subscriptions, watch sidebar, Shorts shelf, and more — each surface can be switched on or off independently.",
        optional: false,
      },
      {
        title: "Literal phrase rules",
        body: "Add words or phrases that should push a video out of your feed.",
        optional: false,
      },
      {
        title: "Per-video and per-channel rules",
        body: "Right-click any card to hide a single video or block an entire channel, with instant Undo and conflict detection. Channel blocks require a verified canonical channel ID.",
        optional: false,
      },
      {
        title: "Automatic channel blocking",
        body: "Strictly opt-in and default OFF. When enabled it requires a canonical channel ID and at least three qualifying videos across visits, is capped at five promotions per day, expires after 30 days, and is instantly revocable.",
        optional: true,
      },
    ],
  },
  {
    id: "review",
    title: "Review every automatic decision",
    features: [
      {
        title: "One-click recovery",
        body: "Hidden cards collapse with no blank gap. Restore one, restore all, or reveal once — a restored card stays visible.",
        optional: false,
      },
      {
        title: "Durable review history",
        body: "A paginated history of everything hidden or warned, with restore, bulk delete, and filters. Each record shows the reason it was hidden.",
        optional: false,
      },
      {
        title: "False-positive corrections",
        body: 'Mark a video "Not AI" or "Not slop". Corrections survive history clears, so the same mistake is not repeated.',
        optional: false,
      },
      {
        title: "Session recovery",
        body: "Even with history disabled, a corner notice and the popup's Session list recover every card hidden in the current page view.",
        optional: false,
      },
    ],
  },
  {
    id: "control",
    title: "Keep control of your data",
    features: [
      {
        title: "Fully local",
        body: "No account, no telemetry, no cloud AI, no API keys. Filtering works offline and nothing is uploaded — see the privacy policy for details.",
        optional: false,
      },
      {
        title: "Local statistics",
        body: "Optional, on-device counters of what the extension hid and restored. Never sent anywhere.",
        optional: true,
      },
      {
        title: "Configurable retention",
        body: "History is age- and size-bounded, with separate controls to clear history, corrections, cache, and statistics.",
        optional: false,
      },
      {
        title: "Import and export",
        body: "Export settings, rules, history, and statistics as JSON. Imports are validated strictly and previewed before anything is applied.",
        optional: false,
      },
      {
        title: "Honest about what is not wired",
        body: 'The remote-reputation provider and "also tell YouTube Not interested" toggles exist in Settings but are disabled and marked not available in this build.',
        optional: false,
      },
    ],
  },
] as const;
