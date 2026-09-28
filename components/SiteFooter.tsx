import { ROUTES } from "../content/routes";
import { PRODUCT } from "../content/site";
import { SITE } from "../site.config";
import { ThemeSwitch } from "./ThemeSwitch";

export function SiteFooter() {
  const pages = ROUTES.filter((route) => route.navLabel || route.path === "/changelog");
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="wordmark" style={{ marginBottom: "var(--sp-3)" }}>
            BlockThe<em>Slop</em>
          </p>
          <p style={{ maxWidth: "34ch", color: "var(--color-text-muted)" }}>
            A local-first browser extension that filters AI-generated, automated, and repetitive
            YouTube videos — on your terms.
          </p>
        </div>
        <nav aria-label="Pages">
          <h2>Site</h2>
          <ul className="site-footer__list">
            {pages.map((route) => (
              <li key={route.path}>
                <a href={route.path === "/" ? "/" : route.path}>{route.navLabel ?? "Changelog"}</a>
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
        <div>
          <h2>Theme</h2>
          <ThemeSwitch />
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            Saved on this device only.
          </p>
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
