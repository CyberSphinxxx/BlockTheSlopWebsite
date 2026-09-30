import Link from "next/link";

import { ArticleLayout, type ArticleSection } from "../../components/ArticleLayout";
import { PRODUCT } from "../../content/site";
import { SITE } from "../../site.config";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What the extension reads and saves on your device, what never leaves it, and how this website is hosted.",
  alternates: { canonical: "/privacy" },
};

const CONTENTS: readonly ArticleSection[] = [
  { id: "extension", label: "The browser extension" },
  { id: "reads", label: "What it reads" },
  { id: "storage", label: "What it stores" },
  { id: "local-only", label: "What never leaves" },
  { id: "permissions", label: "Permissions" },
  { id: "deleting", label: "Deleting your data" },
  { id: "sessions", label: "Session recovery" },
  { id: "website", label: "This website" },
  { id: "exceptions", label: "Known exceptions" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <ArticleLayout contents={CONTENTS}>
      <header className="page-intro">
        <h1>Privacy policy</h1>
        <p className="page-intro__meta">
          Effective {PRODUCT.versionDate} · Covers BlockTheSlop v{PRODUCT.version} and this website.
        </p>
      </header>

      <p>
        BlockTheSlop is two separate things: the <strong>browser extension</strong>, which filters
        YouTube on your device, and this <strong>website</strong>, which is hosted online. This
        policy covers both, one at a time.
      </p>

      <h2 id="extension">The browser extension</h2>

      <h3 id="reads">What it reads</h3>
      <p>
        When you open youtube.com, the extension reads the visible text of video cards — titles,
        descriptions, channel names and IDs, badge text (including YouTube&apos;s own &quot;Altered
        or synthetic content&quot; label), and accessibility labels. This happens inside your
        browser, to decide whether to hide or label a card under your settings.
      </p>
      <p>
        <strong>No page content is uploaded anywhere.</strong> Nothing you watch or search for is
        sent to the developer or to anyone else by the extension.
      </p>

      <h3 id="storage">What it stores, and where</h3>
      <p>
        Everything the extension saves lives in your browser profile, in{" "}
        <code>chrome.storage.local</code> or IndexedDB. Nothing is sent off the device:
      </p>
      <div
        className="table-scroll"
        role="region"
        aria-label="Extension storage table — scroll horizontally on narrow screens"
        tabIndex={0}
      >
        <table>
          <caption>What the extension stores, and where it lives</caption>
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Purpose</th>
              <th scope="col">Where</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Settings (modes, categories, surfaces, display options)</td>
              <td>Remember your filtering choices</td>
              <td>
                <code>chrome.storage.local</code>
              </td>
            </tr>
            <tr>
              <td>Video/channel rules and phrase rules</td>
              <td>Your explicit decisions, re-applied everywhere</td>
              <td>
                <code>chrome.storage.local</code>
              </td>
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
      </div>

      <h3 id="local-only">What never leaves your device</h3>
      <ul>
        <li>No telemetry, analytics, or crash reporting of any kind.</li>
        <li>No accounts, no sign-in, no cloud AI — the checking is simple rules, run locally.</li>
        <li>
          No content uploads: page text, video details, watch history, and search history are never
          sent by the extension.
        </li>
        <li>The extension makes no requests to any remote server.</li>
      </ul>
      <p>
        Two controls in Settings are visibly switched off and marked &quot;not available in this
        build&quot;: a remote reputation source and &quot;Also tell YouTube Not interested&quot;.
        Neither is wired up; nothing sends data anywhere or touches your YouTube account.
      </p>

      <h3 id="permissions">Permissions, and why each exists</h3>
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
          <strong>YouTube host access</strong> — lets the extension run on youtube.com pages, where
          the filtering happens. No other site is touched.
        </li>
      </ul>

      <h3 id="deleting">Deleting your data</h3>
      <p>Each kind of data has its own control:</p>
      <ul>
        <li>
          <strong>Reset all settings</strong> — puts settings back to defaults; your allow/block
          rules are kept.
        </li>
        <li>
          <strong>Clear all review history</strong> — deletes history records; corrections are kept.
        </li>
        <li>
          <strong>Delete corrections, clear detection cache, reset statistics</strong> — separate
          controls for each.
        </li>
        <li>
          <strong>Uninstalling</strong> removes the extension&apos;s saved data with the
          browser&apos;s normal cleanup.
        </li>
        <li>
          <strong>Export</strong> makes a JSON file when you ask; imports are checked and shown to
          you before anything is applied.
        </li>
      </ul>

      <h3 id="sessions">Session recovery</h3>
      <p>
        Hidden cards come back through the review history (when history is on) and the session list
        (corner notice and popup). The session list lives in memory for the current page view only:
        leaving or reloading clears it and every card shows again. It holds a limited number of
        cards — the oldest is revealed rather than quietly losing its way back.
      </p>

      <h2 id="website">This website</h2>
      <p>
        This website is <strong>not offline software</strong>. It is served publicly over HTTPS by{" "}
        <strong>Vercel</strong>. When you visit any page here, your browser makes normal web
        requests to Vercel, and like any web host, Vercel handles those requests (this includes
        standard technical data such as your IP address, handled under Vercel&apos;s own policies,
        which you can read on their site).
      </p>
      <p>Beyond that hosting, this site, in its first release:</p>
      <ul>
        <li>uses no analytics, no tracking pixels, and no telemetry;</li>
        <li>sets no cookies and runs no advertising;</li>
        <li>has no accounts, forms, comments, or newsletter signup;</li>
        <li>
          loads no third-party embeds, fonts, or scripts — fonts and images are served from this
          site itself;
        </li>
        <li>
          saves one small preference <strong>on your device</strong> if you pick a color theme (a
          localStorage key named <code>bts-website-theme</code>). It never leaves your browser and
          is not read by anyone but this site. Clearing site data removes it.
        </li>
      </ul>
      <p>
        The site does nothing else online beyond loading its own pages and files from its own
        address.
      </p>

      <h2 id="exceptions">Known exceptions, stated plainly</h2>
      <ul>
        <li>
          If you export data from the extension and share the file, it is no longer private once
          shared.
        </li>
        <li>
          The extension cannot see or affect anything outside youtube.com pages in your browser.
        </li>
        <li>
          Counts and history come from what the extension saw while it was on; if filtering is off,
          no data about that time exists.
        </li>
        <li>
          This policy describes the website&apos;s first release. If the site later adds analytics,
          forms, or embeds, this text will be updated first.
        </li>
      </ul>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        Big changes will be noted in the extension&apos;s release notes and in the effective date
        above. The copy on the page you are reading is the official one.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        No support email is published. Privacy questions and reports go through the project issue
        tracker:{" "}
        <a href={SITE.supportIssuesUrl} target="_blank" rel="noopener noreferrer">
          github.com/​CyberSphinxxx/​BlockTheSlop/​issues
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>{" "}
        or the <Link href="/support">support page</Link>.
      </p>
    </ArticleLayout>
  );
}
