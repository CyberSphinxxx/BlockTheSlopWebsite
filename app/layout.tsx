import type { Metadata, Viewport } from "next";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { THEME_INIT_SCRIPT } from "../components/theme-script";
import { OG_TITLE, OG_DESCRIPTION } from "../content/og";
import { SITE } from "../site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "BlockTheSlop — Filter unwanted AI-made YouTube videos",
    template: "%s — BlockTheSlop",
  },
  description: OG_DESCRIPTION,
  applicationName: SITE.name,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BlockTheSlop — filter AI-generated and repetitive YouTube videos locally",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      {/*
        Typography comes from the system UI stack (styles/tokens.css). No font
        is downloaded, so there is no fallback swap and no third-party font
        request to audit.
      */}
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {/* tabIndex=-1 lets the <main> landmark receive focus from the skip
              link (Safari ignores hash-only focus). */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
