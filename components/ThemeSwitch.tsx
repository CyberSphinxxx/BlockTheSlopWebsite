"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  isThemeName,
  type ThemeName,
} from "./theme-registry";

/**
 * The source of truth for the pressed state is the DOM attribute that the
 * pre-paint inline script and the toggle itself mutate. Reading it through
 * useSyncExternalStore keeps the server snapshot (system), the hydrated
 * snapshot, and the visible state in agreement without effects.
 */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeName(attr) ? attr : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeName {
  return DEFAULT_THEME;
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [storageBlocked, setStorageBlocked] = useState(false);

  const apply = useCallback((next: ThemeName) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      setStorageBlocked(false);
    } catch {
      // Storage can be denied (private mode, hardening extensions). The
      // theme still applies for this visit; only persistence fails.
      setStorageBlocked(true);
    }
  }, []);

  return (
    <div
      className="theme-switch"
      role="group"
      aria-label="Color theme"
      data-storage-blocked={storageBlocked ? "true" : undefined}
    >
      {THEMES.filter((t) => t.shipped).map((t) => (
        <button
          key={t.attr}
          type="button"
          className="theme-switch__btn"
          aria-pressed={theme === t.attr}
          title={t.stateLabel}
          onClick={() => apply(t.attr)}
        >
          {t.label}
          <span className="visually-hidden">{theme === t.attr ? " (active)" : ""}</span>
        </button>
      ))}
    </div>
  );
}
