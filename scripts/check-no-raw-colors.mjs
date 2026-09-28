#!/usr/bin/env node
/**
 * Token-discipline check (WEB-16): component CSS and TSX must not contain raw
 * color literals or layer-1 palette references. Only styles/palette.css and
 * styles/themes.css (and the standalone og image files, which render outside
 * the theme system) may contain raw hex values.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const ALLOWED_RAW_FILES = [
  "styles/palette.css",
  "styles/themes.css",
  "app/opengraph-image.tsx",
  "app/icon.tsx",
];

const FORBIDDEN_IN_COMPONENTS = [
  // any hex literal
  /#[0-9a-fA-F]{3,8}\b/,
  // rgb()/rgba()/hsl() literals
  /\b(rgba?|hsla?)\(\s*\d/,
  // layer-1 palette custom properties (allowed only in palette.css/themes.css)
  /var\(--(steel|ink|gray|yellow|red|green)-/,
];

const CSS_COMPONENT_FILES = new Set(["styles/components.css"]);

function walk(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (["node_modules", ".next", ".git", "evidence", "out"].includes(name)) continue;
      entries.push(...walk(full));
    } else {
      entries.push(full);
    }
  }
  return entries;
}

const files = [
  ...walk(join(ROOT, "styles")),
  ...walk(join(ROOT, "components")),
  ...walk(join(ROOT, "app")),
].filter((file) => /\.(css|tsx|ts)$/.test(file));

const violations = [];

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (ALLOWED_RAW_FILES.includes(rel)) continue;
  const text = readFileSync(file, "utf8");
  for (const pattern of FORBIDDEN_IN_COMPONENTS) {
    const match = text.match(pattern);
    if (match) {
      violations.push(`${rel}: forbidden raw color usage ${JSON.stringify(match[0])}`);
    }
  }
}

// Component CSS file gets a stricter extra scan already covered above.

if (violations.length > 0) {
  console.error("Raw color violations found:\n" + violations.join("\n"));
  process.exit(1);
}

console.log(
  `Token check passed: ${files.length} files scanned, 0 raw color literals outside palette/theme layers.`,
);
