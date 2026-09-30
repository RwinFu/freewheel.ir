"use client";

import { ChevronDown, Menu, MoveUpLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { RINGSPANN_SERIES } from "@/content/ringspann";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#mechanism", label: "سازوکار" },
  { href: "/#types", label: "انواع فری‌ویل" },
  { href: "/applications", label: "کاربردها" },
  { href: "/articles", label: "مقالات" },
  { href: "/about", label: "درباره" },
];

/** نشان سایت: حلقه‌ی بیرونی، المان گوه‌ای و شفت — همان چیزی که می‌فروشیم. */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <circle cx="22" cy="22" r="13.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="22" cy="22" r="7" fill="none" stroke="#5FD8C6" strokeWidth="2.5" />
      <path d="M22 8.5V2.5M35.5 22h6M22 35.5v6M8.5 22h-6" stroke="#EE7958" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27.5 12.5l3.5 3.5-3 3-3.5-3.5z" fill="#5FD8C6" />
      <circle cx="22" cy="22" r="2.5" fill="#EE7958" />
    </svg>
  );
}

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="group flex shrink-0 items-center gap-3"
      aria-label="صفحه‌ی اصلی freewheel.ir"
    >
      <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-ocean text-white transition-colors group-hover:bg-ocean-light">
        <Mark className="h-7 w-7" />
      </span>
      <span className="leading-tight">
        <span className="code block text-[15px] font-bold tracking-tight text-fg" translate="no">
          freewheel.ir
        </span>
        <span className="mt-1 block text-[10.5px] text-fg-dim">مرجع فری‌ویل صنعتی</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // با تغییر مسیر، منوها بسته می‌شوند. این کار در فاز رندر انجام می‌شود
  // (الگوی «تنظیم state هنگام رندر») تا افکت و رندر آبشاری لازم نباشد.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setCatalogOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setCatalogOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!catalogRef.current?.contains(event.target as Node)) setCatalogOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/92 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between gap-5 px-5 sm:px-7">
        <Wordmark onNavigate={() => setOpen(false)} />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
          <div
            ref={catalogRef}
            className="relative"
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCatalogOpen((value) => !value)}
              aria-expanded={catalogOpen}
              aria-haspopup="true"
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors",
                catalogOpen ? "bg-panel text-fg" : "text-fg-muted hover:bg-panel hover:text-fg",
              )}
            >
              کاتالوگ سری‌ها
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", catalogOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            <div
              hidden={!catalogOpen}
              className="absolute right-0 top-full z-50 w-[560px] pt-2"
            >
              <div className="rounded-[16px] border border-line bg-panel p-4 shadow-[0_24px_60px_-40px_rgba(15,42,49,0.55)]">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <p className="text-[12.5px] font-semibold text-fg">سری‌های فعال RINGSPANN</p>
                  <Link
                    href="/ringspann"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent transition-colors hover:text-fg"
                  >
                    کاتالوگ کامل و جدول‌ها
                    <MoveUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-1.5">
                  {RINGSPANN_SERIES.map((series) => (
                    <li key={series.slug}>
                      <Link
                        href={`/ringspann/${series.slug}`}
                        className="flex items-baseline justify-between gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-panel-2"
                      >
                        <span className="min-w-0">
                          <span className="code block text-[13px] font-semibold text-fg" translate="no">
                            {series.designation}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] text-fg-dim">
                            {series.family}
                          </span>
                        </span>
                        <span className="code shrink-0 text-[10.5px] text-fg-dim" translate="no">
                          {series.maxBoreMm} mm
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-fg-muted transition-colors hover:bg-panel hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/ringspann"
            className="hidden min-h-11 items-center rounded-full border border-line-2 px-4 text-[12.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent lg:inline-flex"
          >
            جست‌وجوی کد قطعه
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[12.5px] font-semibold text-accent-ink transition-colors hover:bg-ocean active:scale-[0.98] lg:inline-flex"
          >
            مشاوره‌ی انتخاب
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-panel text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t border-line bg-panel px-5 pb-5 pt-3 lg:hidden"
      >
        <nav className="mx-auto grid max-w-[1320px] gap-1" aria-label="ناوبری موبایل">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[12px] px-4 py-3 text-[14px] font-medium text-fg transition-colors hover:bg-panel-2"
            >
              {item.label}
            </Link>
          ))}

          <p className="mt-3 px-4 text-[11.5px] font-semibold text-fg-dim">سری‌های کاتالوگ</p>
          <ul className="grid grid-cols-2 gap-1">
            {RINGSPANN_SERIES.map((series) => (
              <li key={series.slug}>
                <Link
                  href={`/ringspann/${series.slug}`}
                  onClick={() => setOpen(false)}
                  className="code block rounded-[10px] px-4 py-2.5 text-[12.5px] font-medium text-fg-muted transition-colors hover:bg-panel-2 hover:text-fg"
                  translate="no"
                >
                  {series.designation}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/ringspann"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-line-2 px-4 text-[13.5px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            کاتالوگ کامل و جست‌وجوی کد
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-accent px-4 text-[13.5px] font-semibold text-accent-ink transition-colors hover:bg-ocean"
          >
            مشاوره‌ی انتخاب
            <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
