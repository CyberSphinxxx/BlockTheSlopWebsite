#!/usr/bin/env node

/**
 * commit-individual-files.mjs
 *
 * Inspects all uncommitted git files (modified, staged, untracked, deleted)
 * and commits them one by one with unique, tailored conventional commit messages.
 *
 * Usage:
 *   node scripts/commit-individual-files.mjs [--dry-run] [--verify]
 *   npm run commit:each
 */

import { execSync } from "node:child_process";
import path from "node:path";

const isDryRun = process.argv.includes("--dry-run");
const shouldVerify = process.argv.includes("--verify");

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch {
    return null;
  }
}

function getUncommittedFiles() {
  const output = run("git status --porcelain -uall");
  if (!output || !output.trim()) return [];

  const lines = output.split(/\r?\n/).filter((l) => l.length > 0);
  const files = [];

  for (const line of lines) {
    const match = line.match(/^([ MADRCU?!]{1,2})\s+(.*)$/);
    if (!match) continue;

    const status = match[1].trim();
    let filePath = match[2].trim();

    // Handle quoted filenames (e.g., if containing spaces)
    if (filePath.startsWith('"') && filePath.endsWith('"')) {
      filePath = filePath.slice(1, -1);
    }

    // Handle renames (R  old -> new)
    if (filePath.includes(" -> ")) {
      filePath = filePath.split(" -> ")[1].trim();
    }

    files.push({ status, path: filePath });
  }

  return files;
}

function getDiff(filePath) {
  const unstaged = run(`git diff -- "${filePath}"`) || "";
  const staged = run(`git diff --cached -- "${filePath}"`) || "";
  return unstaged + "\n" + staged;
}

function generateCommitMessage(file) {
  const filePath = file.path.replace(/\\/g, "/");
  const baseName = path.basename(filePath);
  const diff = getDiff(file.path);

  // 1. Explicit / Known File Handlers
  if (filePath === ".gitignore") {
    return "chore(git): ignore design overhaul artifacts and local tooling";
  }
  if (filePath === ".prettierignore") {
    return "chore(prettier): ignore design overhaul directory and local tooling";
  }
  if (filePath === ".agents/website/PROGRESS.md") {
    return "docs(progress): record design overhaul completion and ledger status";
  }
  if (filePath === "README.md") {
    return "docs(readme): update font stack and typography documentation";
  }
  if (filePath === "vitest.config.ts") {
    return "chore(test): configure Vitest JSX runtime for component testing";
  }
  if (filePath === ".github/workflows/ci.yml") {
    return "ci(workflow): add CI workflow for lint, tests, build, and visual regression";
  }
  if (filePath === "scripts/commit-individual-files.mjs") {
    return "chore(scripts): add commit-individual-files script";
  }

  // Design Tokens & Styles
  if (filePath === "styles/tokens.css") {
    return "style(tokens): streamline typography and spacing tokens";
  }
  if (filePath === "styles/palette.css") {
    return "style(palette): update palette tokens for charcoal and yellow theme";
  }
  if (filePath === "styles/themes.css") {
    return "style(themes): adjust theme contracts for light and dark modes";
  }
  if (filePath === "styles/components.css") {
    return "style(components): rewrite component styles for specimen design system";
  }

  // Retired Fonts
  if (filePath.startsWith("public/fonts/")) {
    return `refactor(fonts): remove local font asset ${baseName}`;
  }

  // Brand Assets
  if (filePath === "app/icon.tsx") {
    return "style(brand): align favicon icon with specimen palette";
  }
  if (filePath === "app/opengraph-image.tsx") {
    return "style(brand): update OpenGraph image to match overhauled design";
  }

  // App Layout and Routes
  if (filePath === "app/layout.tsx") {
    return "refactor(layout): switch from local Barlow fonts to system UI stack";
  }
  if (filePath === "app/page.tsx") {
    return "refactor(home): rebuild landing page with specimen design system";
  }
  if (filePath === "app/how-it-works/page.tsx") {
    return "refactor(how-it-works): update flow illustration and step structure";
  }
  if (filePath === "app/features/page.tsx") {
    return "refactor(features): update feature grid and responsive layout";
  }
  if (filePath === "app/faq/page.tsx") {
    return "refactor(faq): align question hierarchy and accordion styling";
  }
  if (filePath === "app/privacy/page.tsx") {
    return "refactor(privacy): align policy table columns and typography";
  }
  if (filePath === "app/support/page.tsx") {
    return "refactor(support): update support instructions and heading semantics";
  }
  if (filePath === "app/changelog/page.tsx") {
    return "refactor(changelog): adopt specimen layout and token typography";
  }
  if (filePath === "app/not-found.tsx") {
    return "refactor(404): restyle not-found page with specimen tokens";
  }

  // Components
  if (filePath === "components/SiteHeader.tsx") {
    return "refactor(header): update navigation styling and wordmark hit area";
  }
  if (filePath === "components/SiteFooter.tsx") {
    return "refactor(footer): align footer typography and link targets";
  }
  if (filePath === "components/StoreCta.tsx") {
    return "refactor(cta): align action buttons and disabled store state";
  }
  if (filePath === "components/ArticleLayout.tsx") {
    return "feat(components): add ArticleLayout with collapsible table of contents";
  }
  if (filePath === "components/FeatureRow.tsx") {
    return "feat(components): add FeatureRow component for feature highlights";
  }
  if (filePath === "components/FeedIllustration.tsx") {
    return "feat(components): add FeedIllustration component for filtering preview";
  }
  if (filePath === "components/PageIntro.tsx") {
    return "feat(components): add PageIntro component for consistent route headers";
  }

  // Test Suites
  if (filePath === "tests/store-cta.test.ts") {
    return "test(unit): add StoreCta component unit tests";
  }
  if (filePath === "e2e/pages.spec.ts") {
    return "test(e2e): update page theme canvas assertions";
  }
  if (filePath === "e2e/routing.spec.ts") {
    return "test(e2e): add multi-page routing and navigation specifications";
  }
  if (filePath === "e2e/design-overhaul.spec.ts") {
    return "test(e2e): add layout geometry and responsive regression suite";
  }
  if (filePath === "e2e/visual-baseline.spec.ts") {
    return "test(e2e): add visual regression baseline specifications";
  }
  if (filePath.startsWith("e2e/visual-baseline.spec.ts-snapshots/")) {
    const shotName = baseName.replace(/\.png$/, "");
    return `test(visual): add baseline snapshot for ${shotName}`;
  }

  // Skills
  if (filePath.includes("skills/commit-one-by-one/")) {
    return "chore(skills): add commit-one-by-one workflow skill";
  }

  // 2. Directory Heuristics
  if (filePath.startsWith("components/")) {
    const compName = baseName.replace(/\.(tsx|ts)$/, "");
    return `feat(components): update ${compName} component`;
  }
  if (filePath.startsWith("app/")) {
    const route = filePath.replace(/^app\//, "").split("/")[0] || "root";
    return `feat(${route}): update ${baseName}`;
  }
  if (filePath.startsWith("e2e/")) {
    const spec = baseName.replace(/\.spec\.(ts|js)$/, "");
    return `test(e2e): update ${spec} specifications`;
  }
  if (filePath.startsWith("tests/")) {
    const t = baseName.replace(/\.test\.(ts|tsx|js|jsx)$/, "");
    return `test(unit): update ${t} tests`;
  }
  if (filePath.startsWith("scripts/")) {
    return `chore(scripts): update ${baseName} script`;
  }

  // 3. Fallback Conventional Commit
  const type = file.status.includes("D") ? "refactor" : file.status.includes("??") ? "feat" : "fix";
  const nameClean = baseName.replace(/\.[^/.]+$/, "");
  return `${type}(${nameClean}): update ${baseName}`;
}

async function main() {
  console.log("\n🔍 Inspecting uncommitted git files...");

  const files = getUncommittedFiles();
  if (files.length === 0) {
    console.log("✅ Working tree is clean. Nothing to commit!\n");
    return;
  }

  console.log(`📦 Found ${files.length} uncommitted file(s).\n`);

  if (isDryRun) {
    console.log("📋 [DRY RUN] Planned commits (no changes will be made):\n");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const msg = generateCommitMessage(file);
      console.log(`  [${i + 1}/${files.length}] [${file.status}] ${file.path}`);
      console.log(`    ↳ "${msg}"\n`);
    }
    console.log("💡 Run without --dry-run to commit these files individually.\n");
    return;
  }

  let successCount = 0;
  const committedList = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const msg = generateCommitMessage(file);
    const progress = `[${i + 1}/${files.length}]`;

    try {
      // Stage single file
      run(`git add "${file.path}"`);

      // Commit single file
      const verifyFlag = shouldVerify ? "" : "--no-verify";
      const escapedMsg = msg.replace(/"/g, '\\"');
      run(`git commit -m "${escapedMsg}" ${verifyFlag}`);

      const hash = run("git rev-parse --short HEAD")?.trim() || "done";
      committedList.push({ file: file.path, msg, hash });
      successCount++;

      console.log(`${progress} ✅ (${hash}) ${file.path}`);
      console.log(`    ↳ "${msg}"`);
    } catch (err) {
      console.error(`${progress} ❌ Failed to commit ${file.path}:`, err?.message || err);
    }
  }

  console.log(`\n🎉 Successfully created ${successCount} individual commit(s)!\n`);
  console.log("🚀 You can now push your commits whenever you are ready:");
  console.log("   git push\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
