/**
 * Canonical route inventory: the single list of public pages.
 * The sitemap, navigation, footer, and E2E crawl all derive from this.
 */
export type RouteDefinition = {
  path: string;
  title: string;
  description: string;
  navLabel?: string;
  priority: number;
};

export const ROUTES: readonly RouteDefinition[] = [
  {
    path: "/",
    title: "BlockTheSlop — Filter unwanted AI-made YouTube videos",
    description:
      "A browser extension that hides AI-made and repetitive YouTube videos on your device. Every automatic hide can be undone in one click.",
    navLabel: "Home",
    priority: 1,
  },
  {
    path: "/how-it-works",
    title: "How BlockTheSlop filters YouTube",
    description:
      "What the extension reads on a YouTube page, how the filtering rules work, and how to bring back any video in one click.",
    navLabel: "How it works",
    priority: 0.8,
  },
  {
    path: "/features",
    title: "Features",
    description:
      "Filter modes, category and page controls, channel and video rules, a review history, and local stats — every feature that ships in the extension.",
    navLabel: "Features",
    priority: 0.8,
  },
  {
    path: "/faq",
    title: "FAQ",
    description:
      "Short answers about installing the extension, why some AI videos get through, undoing wrong hides, channel blocking, and your data.",
    navLabel: "FAQ",
    priority: 0.7,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "What the extension reads and saves on your device, what never leaves it, and how this website is hosted.",
    navLabel: "Privacy",
    priority: 0.7,
  },
  {
    path: "/support",
    title: "Support",
    description:
      "How to get help: report a bug or ask a question on the project issue tracker, and what to include in a good report.",
    navLabel: "Support",
    priority: 0.6,
  },
  {
    path: "/changelog",
    title: "Changelog",
    description:
      "The release list for BlockTheSlop: each shipped version, its date, and what changed.",
    priority: 0.4,
  },
] as const;

export function findRoute(path: string): RouteDefinition | undefined {
  return ROUTES.find((route) => route.path === path);
}
