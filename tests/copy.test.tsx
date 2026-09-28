import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Recursively collect page/component source files. */
function collect(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".next", "evidence"].includes(name)) continue;
      collect(full, acc);
    } else if (/\.(tsx|ts)$/.test(name) && !name.includes(".test.")) {
      acc.push(full);
    }
  }
  return acc;
}

/** Strip code/identifier noise so guards check human copy, not syntax. */
function copyText(text: string): string {
  return text
    .replace(/<code>[\s\S]*?<\/code>/gi, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/"[^"]*"/g, " ")
    .toLowerCase();
}

const appDir = join(process.cwd(), "app");
const componentDir = join(process.cwd(), "components");
const contentDir = join(process.cwd(), "content");
const sources = [...collect(appDir), ...collect(componentDir), ...collect(contentDir)].map(
  (file) => ({
    file,
    text: copyText(readFileSync(file, "utf8")),
  }),
);

describe("claim guards (WEB-03)", () => {
  it("never claims perfect detection or accuracy", () => {
    const forbidden = [
      "100% accurate",
      "blocks all ai",
      "perfect detection",
      "zero false positives",
      "never wrong",
      "catches every",
      "guaranteed",
    ];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("never fabricates user counts, reviews, or ratings", () => {
    const forbidden = [
      "users trust",
      "thousands of users",
      "5 stars",
      "★★★★★",
      "reviews say",
      "as seen in",
    ];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("never claims affiliation with YouTube or Google", () => {
    const forbidden = [
      "by youtube",
      "from youtube labs",
      "official youtube extension",
      "by google",
      "google product",
    ];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("never claims the website is offline or request-free", () => {
    const forbidden = [
      "this website works offline",
      "no requests are made",
      "nothing leaves your browser",
      "no data ever leaves your device",
    ];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("never invents pricing, badges, or a store launch date", () => {
    const forbidden = ["free forever", "now on the chrome web store"];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("contains no lorem ipsum or placeholder text", () => {
    const forbidden = ["lorem ipsum", "todo:", "fixme", "tbd"];
    for (const { file, text } of sources) {
      for (const phrase of forbidden) {
        expect(text.includes(phrase), `${file} contains "${phrase}"`).toBe(false);
      }
    }
  });

  it("keeps the honest limitation statement on the home page", () => {
    const home = sources.find((source) => source.file.replace(/\\/g, "/").endsWith("app/page.tsx"));
    expect(home).toBeDefined();
    expect(home!.text).toContain("cannot");
    expect(home!.text).toContain("one click");
  });
});
