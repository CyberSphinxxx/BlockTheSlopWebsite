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
      "BlockTheSlop is a local-first browser extension that hides AI-generated, automated, and repetitive YouTube videos on your terms — with every automatic hide recoverable in one click.",
    navLabel: "Home",
    priority: 1,
  },
  {
    path: "/how-it-works",
    title: "How BlockTheSlop filters YouTube",
    description:
      "What BlockTheSlop reads on YouTube, how heuristic filtering works, how you choose what disappears, and how to restore any video in one click.",
    navLabel: "How it works",
    priority: 0.8,
  },
  {
    path: "/features",
    title: "Features",
    description:
      "Modes, category and surface controls, channel and video rules, review history with corrections, local statistics, import/export — every shipped BlockTheSlop feature.",
    navLabel: "Features",
    priority: 0.8,
  },
  {
    path: "/faq",
    title: "FAQ",
    description:
      "Answers about installing BlockTheSlop, why some AI videos pass, false positives and recovery, channel blocking, data handling, and browser support.",
    navLabel: "FAQ",
    priority: 0.7,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "What the BlockTheSlop extension reads and stores on your device, what never leaves it, and how this website itself is hosted.",
    navLabel: "Privacy",
    priority: 0.7,
  },
  {
    path: "/support",
    title: "Support",
    description:
      "Get help with BlockTheSlop: report a bug, ask a question, or read troubleshooting guidance via the project issue tracker.",
    navLabel: "Support",
    priority: 0.6,
  },
  {
    path: "/changelog",
    title: "Changelog",
    description:
      "Release history for BlockTheSlop: verified versions, dates, and what changed in each release.",
    priority: 0.4,
  },
] as const;

export function findRoute(path: string): RouteDefinition | undefined {
  return ROUTES.find((route) => route.path === path);
}
