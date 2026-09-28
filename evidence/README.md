# Evidence

Verification artifacts for the website release gates (referenced from `.agents/website/`).

- `visual/` — real-browser screenshot matrix from the Playwright visual suite
  (`e2e/visual.spec.ts`): home at 320/375/768/1280/1440 px in light and dark,
  how-it-works and privacy at 1280 both themes, mobile nav open, FAQ open,
  pre-store CTA hero, and 404, both themes where applicable.
- `artifacts/` (gitignored) — transient Playwright HTML reports and traces.

Regenerate everything with:

```bash
npm run build && npx playwright test
```
