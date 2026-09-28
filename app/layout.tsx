import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { THEME_INIT_SCRIPT } from "../components/theme-script";
import { OG_TITLE, OG_DESCRIPTION } from "../content/og";
import { SITE } from "../site.config";
import "./globals.css";

const barlowCondensed = localFont({
  src: [
    {
      path: "../public/fonts/barlow-condensed-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/barlow-condensed-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const barlowSemiCondensed = localFont({
  src: [
    {
      path: "../public/fonts/barlow-semi-condensed-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/barlow-semi-condensed-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-barlow-semi",
});

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
      <body className={`${barlowCondensed.variable} ${barlowSemiCondensed.variable}`}>
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
