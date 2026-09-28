#!/usr/bin/env node
/**
 * Escape raw ' and " inside JSX text nodes (react/no-unescaped-entities)
 * without touching attribute strings or code. Uses TypeScript's own parser
 * to find JSX text ranges, then applies edits from the end of the file.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const files = process.argv.slice(2);

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  const nodeLengths = new Map();

  function visit(node) {
    if (ts.isJsxText(node)) {
      const text = node.getText(sf);
      let offset = node.getStart(sf);
      const replacement = text.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
      if (replacement !== text) {
        edits.push({ offset, text: replacement });
        nodeLengths.set(offset, text.length);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);

  if (edits.length === 0) continue;
  edits.sort((a, b) => b.offset - a.offset);
  let out = source;
  for (const edit of edits) {
    const originalLength = nodeLengths.get(edit.offset) ?? 0;
    out = out.slice(0, edit.offset) + edit.text + out.slice(edit.offset + originalLength);
  }
  writeFileSync(file, out, "utf8");
  console.log(`escaped ${edits.length} JSX text node(s) in ${file}`);
}
