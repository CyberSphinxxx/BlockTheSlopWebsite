"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { SITE } from "../site.config";
import { navItemsFor } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const navItems = navItemsFor(pathname ?? "/");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!open) return;
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    },
    [open, close],
  );

  // Close the panel when the viewport grows into desktop navigation.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 820px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Focus trap while the mobile panel is open (applies only while visible).
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKey);
    return () => panel.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" onKeyDown={onKeyDown}>
      <div className="stripe stripe--sm" aria-hidden="true" />
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label="BlockTheSlop home">
          BlockThe<em>Slop</em>
        </Link>
        <nav aria-label="Main" className="site-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav__link"
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
            <span className="visually-hidden"> navigation</span>
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        ref={panelRef}
        className="mobile-nav"
        data-open={open ? "true" : "false"}
      >
        <ul className="mobile-nav__list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="mobile-nav__link"
                aria-current={item.current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={SITE.repoUrl}
              className="mobile-nav__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
