import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container">
      <section
        className="section"
        style={{ textAlign: "center", justifyItems: "center" }}
        aria-labelledby="notfound-heading"
      >
        <p className="hero__kicker" style={{ justifyContent: "center" }} aria-hidden="true">
          Error 404
        </p>
        <h1 id="notfound-heading">Page not found</h1>
        <p style={{ maxWidth: "46ch", margin: "var(--sp-4) auto var(--sp-5)" }}>
          The page you tried to reach does not exist here. Nothing was filtered — it was never
          built, moved, or typed correctly. Try one of these instead:
        </p>
        <div className="hero__ctas" style={{ justifyContent: "center" }}>
          <Link className="btn btn--primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn" href="/faq">
            Read the FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
