import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container page-body">
      <header className="page-intro">
        <p className="eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="page-intro__lead">
          The page you tried to reach does not exist here. Nothing was hidden — the page was never
          built, moved, or typed correctly.
        </p>
      </header>
      <div className="action-row intro-actions">
        <Link className="btn btn--primary" href="/">
          Go to the home page
        </Link>
        <Link className="btn" href="/support">
          Get support
        </Link>
      </div>
    </div>
  );
}
