/**
 * Inline script string applied before first paint so the resolved theme is
 * correct with zero flash and zero hydration mismatch. Must be storage-safe:
 * browsers can deny localStorage access (private mode, hardening extensions),
 * so every access is guarded and rendering never depends on it.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=window.localStorage.getItem("bts-website-theme");if(s==="light"||s==="dark"||s==="system"){document.documentElement.setAttribute("data-theme",s);return;}if(s===null){document.documentElement.setAttribute("data-theme","system");}}catch(e){document.documentElement.setAttribute("data-theme","system");}})();`;
