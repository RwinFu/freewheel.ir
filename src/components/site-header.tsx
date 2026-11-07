"use client";

import { ArrowUpLeft, ChevronLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { PartSearch } from "@/components/part-search";
import { SHOPS } from "@/content/site";

type NavLink = {
  href: string;
  label: string;
  match?: string;
};

const NAV_LINKS: readonly NavLink[] = [
  { href: "/#intro", label: "آشنایی" },
  { href: "/applications", label: "کاربردها", match: "/applications" },
  { href: "/brands", label: "برندها", match: "/brands" },
  { href: "/ringspann", label: "کاتالوگ", match: "/ringspann" },
  { href: "/articles", label: "مقالات فنی", match: "/articles" },
] as const;

const MARK_ROLLERS = [0, 60, 120, 180, 240, 300] as const;

function FreewheelMark() {
  return (
    <span className="fw-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20.25" stroke="currentColor" strokeWidth="1.25" opacity="0.52" />
        <g className="fw-mark-rotor">
          <circle cx="24" cy="24" r="11.75" stroke="currentColor" strokeWidth="1.35" opacity="0.82" />
          {MARK_ROLLERS.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 24 24)`}>
              <path d="M24 6.75v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
              <circle cx="24" cy="15" r="1.85" fill="currentColor" opacity="0.9" />
            </g>
          ))}
          <path
            d="m24 18.25 4.75 5.75-4.75 5.75-4.75-5.75 4.75-5.75Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </g>
        <circle cx="24" cy="24" r="1.8" fill="currentColor" />
      </svg>
    </span>
  );
}

function Wordmark({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="fw-wordmark"
      aria-label="freewheel.ir — صفحه‌ی اصلی"
    >
      <FreewheelMark />
      <span className="fw-wordmark-copy">
        <span className="fw-wordmark-name" dir="ltr" translate="no">
          freewheel<span>.ir</span>
        </span>
        <span className="fw-wordmark-caption">مرجع فنی فری‌ویل صنعتی</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setOpen(false);
  const isCurrent = (match?: string) =>
    match ? pathname === match || pathname.startsWith(`${match}/`) : false;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 16);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onDesktop);
    return () => desktop.removeEventListener("change", onDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      {open ? (
        <button
          type="button"
          className="site-header-backdrop"
          onClick={closeMenu}
          tabIndex={-1}
          aria-hidden="true"
        />
      ) : null}

      <div className="site-header-frame">
        <header className="site-header-shell" data-open={open || undefined}>
          <div className="site-header-main">
            <Wordmark onNavigate={closeMenu} />

            <nav className="site-nav" aria-label="ناوبری اصلی">
              {NAV_LINKS.map((item) => {
                const current = isCurrent(item.match);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="site-nav-link"
                    data-current={current ? "true" : undefined}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="site-header-actions">
              <PartSearch variant="glass" className="header-catalog-search" />
              <a
                href={SHOPS.bearing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="header-quote-cta"
              >
                استعلام قیمت
                <ArrowUpLeft aria-hidden="true" />
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="mobile-menu-toggle"
                aria-label={open ? "بستن منو" : "باز کردن منو"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
              >
                <span className="mobile-menu-label">{open ? "بستن" : "منو"}</span>
                {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div
            id="mobile-navigation"
            hidden={!open}
            className="mobile-navigation"
          >
            <PartSearch variant="glass" className="mobile-catalog-search" onNavigate={closeMenu} />
            <nav className="mobile-nav" aria-label="ناوبری موبایل">
              {NAV_LINKS.map((item) => {
                const current = isCurrent(item.match);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="mobile-nav-link"
                    data-current={current ? "true" : undefined}
                    aria-current={current ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <ChevronLeft aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
            <a
              href={SHOPS.bearing.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mobile-quote-cta"
            >
              <span className="mobile-quote-copy">
                <strong>استعلام قیمت و خرید</strong>
                <small dir="ltr" translate="no">bearingonline.ir</small>
              </span>
              <ArrowUpLeft aria-hidden="true" />
            </a>
            <p className="mobile-menu-note">
              <span aria-hidden="true" />
              برای انتخاب دقیق، با کد روی قطعه شروع کنید.
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
