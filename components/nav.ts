/**
 * Navigation items for the current route. Server component calls this with the
 * pathname; the header renders active states from it.
 */
import { ROUTES } from "../content/routes";

export type NavItem = {
  href: string;
  label: string;
  current: boolean;
};

const NAV_PATHS = ["/", "/how-it-works", "/features", "/faq", "/privacy", "/support"] as const;

export function navItemsFor(pathname: string): NavItem[] {
  return NAV_PATHS.map((path) => {
    const route = ROUTES.find((route) => route.path === path);
    return {
      href: path,
      label: route?.navLabel ?? path,
      current: pathname === path,
    };
  });
}

/** Static nav used inside client components (no per-route current state there). */
export const navItems: NavItem[] = NAV_PATHS.map((path) => {
  const route = ROUTES.find((route) => route.path === path);
  return { href: path, label: route?.navLabel ?? path, current: false };
});
