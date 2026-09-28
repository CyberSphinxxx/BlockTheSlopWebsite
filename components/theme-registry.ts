/**
 * Typed theme registry.
 *
 * A future named theme = one entry here + one semantic block in
 * styles/themes.css. No component edits, no conditional classes.
 * Only entries with `shipped: true` render a control in the UI; tests mount
 * a dummy third theme (shipped: false) to prove the extension point.
 */
export type ThemeName = "light" | "dark" | "system";

export type ThemeDefinition = {
  /** Value written to <html data-theme="…">. */
  attr: ThemeName;
  /** Visible label for the control. */
  label: string;
  /** aria-pressed label describing the state, not just the color. */
  stateLabel: string;
  /** Whether the theme appears in the visible switcher. */
  shipped: boolean;
};

export const THEMES: readonly ThemeDefinition[] = [
  {
    attr: "system",
    label: "System",
    stateLabel: "Match your device setting",
    shipped: true,
  },
  { attr: "light", label: "Light", stateLabel: "Light colors", shipped: true },
  { attr: "dark", label: "Dark", stateLabel: "Dark colors", shipped: true },
] as const;

export const DEFAULT_THEME: ThemeName = "system";

export const THEME_STORAGE_KEY = "bts-website-theme";

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && THEMES.some((theme) => theme.attr === value);
}
