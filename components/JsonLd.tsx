import { PRODUCT } from "../content/site";
import { SITE } from "../site.config";

/**
 * Structured data for the extension.
 *
 * Truthful subset only: name, applicationCategory, operatingSystem, url,
 * description, author. Deliberately omitted (would be fabricated): offers,
 * aggregateRating, review, price — there is no published store listing yet.
 * Google's SoftwareApplication rich result requires an offer; until a real
 * one exists this markup is informational, and no rich-result outcome is
 * claimed anywhere on the site.
 */
export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT.name,
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "BrowserExtension",
    operatingSystem: "Chrome, Edge, Firefox (desktop browser extension)",
    url: SITE.url,
    description:
      "Local-first browser extension that filters AI-generated, automated, repetitive, and low-quality YouTube videos, keeping every automatic hide explainable and reversible.",
    author: {
      "@type": "Organization",
      name: "BlockTheSlop contributors",
      url: SITE.repoUrl,
    },
    softwareVersion: PRODUCT.version,
    datePublished: PRODUCT.versionDate,
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
