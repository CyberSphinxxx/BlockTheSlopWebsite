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
    "Hide AI-made and repetitive YouTube videos on your device. Every auto-hide is explainable, undoable, and yours to control.",
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
    'BlockTheSlop reads what is visible on a YouTube page — titles, descriptions, channel names and IDs, badge text (including YouTube\'s own "Altered or synthetic content" disclosure), and aria labels. It never watches video frames or listens to audio.',
    "An AI video with no visible clue will pass the filter. No tool that only reads page text can catch every AI video.",
    "Heuristics make mistakes. A video you wanted can be hidden — that is why every automatic hide is one click to bring back.",
    "A score is a heuristic signal weight, not a probability or proof of who made the video.",
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
        body: "Safe, Balanced (default), Strict, and Aggressive. Aggressive hides more but also makes more mistakes — and every hide is one click to undo.",
        optional: false,
      },
      {
        title: "Per-category actions",
        body: "Choose Hide, Warn, or Allow for each category: AI video, AI voice, AI music, AI thumbnails, and content farms.",
        optional: false,
      },
      {
        title: "Per-surface toggles",
        body: "Turn filtering on or off for each YouTube page: home, search, subscriptions, the watch sidebar, Shorts, and more.",
        optional: false,
      },
      {
        title: "Literal phrase rules",
        body: "Add words or phrases that should push a video out of your feed.",
        optional: false,
      },
      {
        title: "Per-video and per-channel rules",
        body: "Right-click any card to hide one video or block a whole channel, with instant Undo and conflict checks. Channel blocks need a verified channel ID.",
        optional: false,
      },
      {
        title: "Automatic channel blocking",
        body: "Off by default. When you turn it on, it needs a canonical channel ID and three or more matching videos across visits, allows at most five per day, expires after 30 days, and you can turn it off at any time.",
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
        body: "Hidden cards collapse with no empty gap. Bring back one, bring back all, or show a card once — a restored card stays visible.",
        optional: false,
      },
      {
        title: "Durable review history",
        body: "A paged list of everything hidden or warned, with restore, bulk delete, and filters. Each record shows why the video was hidden.",
        optional: false,
      },
      {
        title: "False-positive corrections",
        body: 'Mark a video "Not AI" or "Not slop". Corrections survive history clears, so the same mistake is not repeated.',
        optional: false,
      },
      {
        title: "Session recovery",
        body: "Even with history off, a corner notice and the popup Session list bring back every card hidden on the current page view.",
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
        body: "Optional counters, stored on your device, of what the extension hid and brought back. Never sent anywhere.",
        optional: true,
      },
      {
        title: "Configurable retention",
        body: "History is limited by age and size, with separate controls to clear history, corrections, cache, and statistics.",
        optional: false,
      },
      {
        title: "Import and export",
        body: "Save your settings, rules, history, and statistics as a JSON file. Imports are checked carefully and shown to you before anything is applied.",
        optional: false,
      },
      {
        title: "Honest about what is not wired",
        body: 'Two toggles — a remote reputation source and "also tell YouTube Not interested" — sit in Settings but are switched off and marked not available in this build.',
        optional: false,
      },
    ],
  },
] as const;
