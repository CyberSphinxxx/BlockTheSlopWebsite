import Link from "next/link";

import { ROUTES } from "../content/routes";
import { PRODUCT } from "../content/site";
import { SITE } from "../site.config";
import { ThemeSwitch } from "./ThemeSwitch";

export function SiteFooter() {
  // Every public route is listed here, including changelog (which is not in
  // the primary navigation).
  const pages = ROUTES.filter((route) => route.navLabel || route.path === "/changelog");
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <p className="wordmark">
            BlockThe<em>Slop</em>
          </p>
          <p className="site-footer__tagline">
            A browser extension that hides AI-made and repetitive YouTube videos — on your terms, on
            your device.
          </p>
        </div>
        <nav aria-label="Pages">
          <h2>Site</h2>
          <ul className="site-footer__list">
            {pages.map((route) => (
              <li key={route.path}>
                <Link href={route.path}>{route.navLabel ?? "Changelog"}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Project">
          <h2>Project</h2>
          <ul className="site-footer__list">
            <li>
              <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
                Source code<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={SITE.supportIssuesUrl} target="_blank" rel="noopener noreferrer">
                Report an issue<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </nav>
        <div className="site-footer__theme">
          <h2>Theme</h2>
          <ThemeSwitch />
        </div>
      </div>
      <div className="container site-footer__legal">
        <span>
          BlockTheSlop {PRODUCT.version} · {PRODUCT.versionDate}
        </span>
        <span>Independent project. Not affiliated with YouTube or Google.</span>
        <span>MIT licensed.</span>
      </div>
    </footer>
  );
}
