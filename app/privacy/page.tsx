import Link from "next/link";

import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What the BlockTheSlop extension reads and stores on your device, what never leaves it, and how this website itself is hosted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Privacy policy</h1>
        <p>
          Effective {PRODUCT.versionDate} · Applies to BlockTheSlop v{PRODUCT.version} and this
          website.
        </p>
      </header>

      <div className="prose section--tight" style={{ paddingBottom: "var(--sp-8)" }}>
        <p>
          BlockTheSlop is local-first software in two parts that must not be confused: the{" "}
          <strong>browser extension</strong>, which filters YouTube on your device, and this{" "}
          <strong>website</strong>, which is publicly hosted. This policy covers both, separately
          and plainly.
        </p>

        <h2>The browser extension</h2>

        <h3>What it reads</h3>
        <p>
          When you open youtube.com, the extension&apos;s content script reads the visible metadata
          of video cards on the page — titles, descriptions, channel names and IDs, badge text
          (including YouTube&apos;s own &quot;Altered or synthetic content&quot; disclosure), and
          aria labels. This inspection happens entirely in your browser, locally, to decide whether
          to hide or label a card according to your settings.
        </p>
        <p>
          <strong>No page content is uploaded anywhere.</strong> Nothing you watch or search for is
          sent to the developer or to any third party by the extension.
        </p>

        <h3>What it stores, and where</h3>
        <p>
          Everything the extension stores lives in your browser profile, in
          <code> chrome.storage.local</code> or IndexedDB at the extension origin. Nothing is
          transmitted off the device:
        </p>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Purpose</th>
              <th>Where</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Settings (modes, categories, surfaces, display options)</td>
              <td>Remember your filtering choices</td>
              <td>chrome.storage.local</td>
            </tr>
            <tr>
              <td>Video/channel rules and phrase rules</td>
              <td>Your explicit decisions, re-applied everywhere</td>
              <td>chrome.storage.local</td>
            </tr>
            <tr>
              <td>Review history of hidden/warned videos</td>
              <td>Let you review and restore hides</td>
              <td>IndexedDB (extension origin)</td>
            </tr>
            <tr>
              <td>Corrections (&quot;Not AI&quot; / &quot;Not slop&quot;)</td>
              <td>Stop repeated false positives</td>
              <td>IndexedDB (extension origin)</td>
            </tr>
            <tr>
              <td>Detection cache</td>
              <td>Avoid re-evaluating the same card</td>
              <td>IndexedDB</td>
            </tr>
            <tr>
              <td>Local statistics (daily, distinct-video counters)</td>
              <td>The &quot;filtered&quot; numbers you see</td>
              <td>IndexedDB</td>
            </tr>
          </tbody>
        </table>

        <h3>What never leaves your device</h3>
        <ul>
          <li>No telemetry, analytics, or crash reporting of any kind.</li>
          <li>No accounts, no sign-in, no cloud AI — classification is heuristic and local.</li>
          <li>
            No content uploads: page text, video metadata, watch history, and search history are
            never transmitted by the extension.
          </li>
          <li>The extension bundle performs no requests to any remote server.</li>
        </ul>
        <p>
          Two controls in the extension&apos;s Settings are visibly disabled and marked &quot;not
          available in this build&quot;: a remote reputation provider and &quot;Also tell YouTube
          Not interested&quot;. Neither is wired in this build; no code path sends data anywhere or
          performs YouTube account actions.
        </p>

        <h3>Permissions, and why each exists</h3>
        <ul>
          <li>
            <strong>Storage</strong> — keeps your settings, rules, corrections, history, and
            statistics on your device.
          </li>
          <li>
            <strong>Context menus</strong> — adds the right-click &quot;Hide this video&quot; /
            &quot;Block this channel&quot; entries on YouTube cards.
          </li>
          <li>
            <strong>YouTube host access</strong> — the content script runs on youtube.com pages,
            where filtering happens. No other host is touched and nothing is injected elsewhere.
          </li>
        </ul>

        <h3>Deleting your data</h3>
        <p>Each data class has its own control:</p>
        <ul>
          <li>
            <strong>Reset all settings</strong> — returns settings to defaults; your allow/block
            rules are kept.
          </li>
          <li>
            <strong>Clear all review history</strong> — deletes history records; corrections are
            kept by design.
          </li>
          <li>
            <strong>Delete corrections, clear detection cache, reset statistics</strong> — separate
            controls for each store.
          </li>
          <li>
            <strong>Uninstalling</strong> removes the extension&apos;s stored data with the browser
            profile&apos;s normal cleanup.
          </li>
          <li>
            <strong>Export</strong> is user-initiated and produces a JSON file; imports are
            validated and previewed before anything is applied.
          </li>
        </ul>

        <h3>Session recovery</h3>
        <p>
          Hidden cards are recoverable via the durable review history (when history is enabled) and
          the session recovery list (on-page corner notice and popup). Session recovery lives in
          memory for the current page view only: navigating away or reloading resets it and every
          card renders visible again. It is capacity-bounded — the oldest hidden card is revealed
          rather than silently losing its recovery route.
        </p>

        <h2>This website</h2>
        <p>
          This website is <strong>not offline software</strong>. It is served publicly over HTTPS by{" "}
          <strong>Vercel</strong>. When you visit any page here, your browser makes normal HTTP
          requests to Vercel&apos;s infrastructure, and like any web host, Vercel processes those
          requests (this necessarily includes standard technical data such as your IP address and
          request headers, handled under Vercel&apos;s own policies, which you can review on their
          site).
        </p>
        <p>Beyond that hosting, this site, in its first release:</p>
        <ul>
          <li>uses no analytics, no tracking pixels, and no telemetry;</li>
          <li>sets no cookies and runs no advertising;</li>
          <li>has no accounts, forms, comment sections, or newsletter signup;</li>
          <li>
            loads no third-party embeds, fonts, or scripts — fonts and images are served from this
            site itself;
          </li>
          <li>
            stores one small preference <strong>on your device</strong> if you pick a color theme (a
            localStorage key named <code>bts-website-theme</code>). It never leaves your browser and
            is not read by anyone but this site. Clearing site data removes it.
          </li>
        </ul>
        <p>
          The site contains no hidden network activity beyond loading its own pages and assets from
          its own origin.
        </p>

        <h2>Known exceptions, stated plainly</h2>
        <ul>
          <li>
            If you export data from the extension and share the file, its contents are no longer
            private once shared.
          </li>
          <li>
            The extension cannot see or affect anything outside youtube.com pages in your browser.
          </li>
          <li>
            Counts and history derive from what the extension observed while enabled; if filtering
            is disabled, no data about that period exists.
          </li>
          <li>
            This policy describes the website&apos;s first release. If the site later adds
            analytics, forms, or embeds, this text will be updated first.
          </li>
        </ul>

        <h2>Changes to this policy</h2>
        <p>
          Material changes will be reflected in the extension&apos;s release notes and in the
          effective date above. The canonical copy of this policy is the page you are reading.
        </p>

        <h2>Contact</h2>
        <p>
          No support email is published. Privacy questions and reports go through the project&apos;s
          public issue tracker:{" "}
          <a href={SITE.supportIssuesUrl} target="_blank" rel="noopener noreferrer">
            github.com/​CyberSphinxxx/​BlockTheSlop/​issues
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>{" "}
          or the <Link href="/support">support page</Link>.
        </p>
      </div>
    </div>
  );
}
