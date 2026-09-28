import type { MetadataRoute } from "next";

import { SITE } from "../site.config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Preview deployments set their own noindex; disallow here is a
        // secondary belt-and-suspenders for any stray non-production host.
        ...(isProductionOrigin(SITE.url) ? {} : { disallow: "/" }),
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

function isProductionOrigin(url: string): boolean {
  return url.startsWith("https://") && !url.includes("localhost");
}
