"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, MoveUpLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PartSearch } from "@/components/part-search";
import { NAV, SHOPS } from "@/content/site";
import { cn } from "@/lib/utils";

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="freewheel.ir">
      <span className="relative grid h-9 w-9 place-items-center border border-line-2 bg-panel-2">
        <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden>
          <circle cx="18" cy="18" r="16" fill="none" stroke="#39434c" strokeWidth="1.2" />
          <circle cx="18" cy="18" r="9.5" fill="none" stroke="#39434c" strokeWidth="1.2" />
          <circle cx="18" cy="18" r="3.4" fill="none" stroke="#ff6a13" strokeWidth="1.4" />
          <rect x="16.4" y="1.5" width="3.2" height="6" fill="#ff6a13" opacity="0.85" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-tight text-fg" dir="ltr">
          freewheel.ir
        </span>
        <span className="mt-1 block text-[11px] text-fg-dim">مرجع فنی فری‌ویل صنعتی</span>
      </span>
    </Link>
  );
}

function ShopStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px]",
        compact ? "text-fg-muted" : "text-fg-dim",
      )}
    >
      <span className="text-fg-dim">خرید:</span>
      <a
        href={SHOPS.bearing.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent"
      >
        <span dir="ltr" className="font-medium tracking-tight">
          {SHOPS.bearing.name}
        </span>
        <MoveUpLeft className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
      <span className="text-fg-dim">نوار نقاله:</span>
      <a
        href={SHOPS.robot.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent"
      >
        <span dir="ltr" className="font-medium tracking-tight">
          {SHOPS.robot.name}
        </span>
        <MoveUpLeft className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // با منوی باز: اسکرول صفحه قفل و کلید Escape منو را می‌بندد.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-panel/95">
        <div className="mx-auto hidden h-9 max-w-[1240px] items-center justify-between px-6 md:flex">
          <ShopStrip />
          <span className="text-[12px] text-fg-dim">
            مشخصات فنی، سایزبندی و انتخاب سری — بدون فروش مستقیم
          </span>
        </div>
      </div>

      <div className="border-b border-line bg-base/92 backdrop-blur-[2px]">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-6">
          <Wordmark />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)) ||
                item.children?.some((child) => pathname.startsWith(child.href));
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-[13.5px] transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                    ) : null}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-[1px] h-[2px] origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>

                  {item.children ? (
                    <div className="invisible absolute right-0 top-full w-[300px] translate-y-1 border border-line bg-panel-2 opacity-0 shadow-[0_18px_40px_-20px_rgba(23,36,48,0.3)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="py-1.5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-[13px] text-fg-muted transition-colors hover:bg-accent/8 hover:text-fg"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <PartSearch className="relative w-[230px]" />
            <Link
              href="/contact"
              className="shrink-0 border border-line-2 px-4 py-2 text-[13px] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              استعلام سایز
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center border border-line-2 text-fg-muted lg:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-nav"
            className="overflow-hidden border-b border-line bg-panel lg:hidden"
            // با کلیک روی هر لینک داخل منو، منو بسته می‌شود.
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            {/* منو روی موبایل بلندتر از صفحه می‌شود؛ داخل خودش اسکرول می‌خورد
                تا آیتم‌های پایین (مقالات، تماس) هم در دسترس بمانند. */}
            <div className="max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain">
              <div className="mx-auto max-w-[1240px] px-6 py-5">
                <div className="mb-5 space-y-4 border-b border-line pb-5">
                  <PartSearch className="relative" />
                  <ShopStrip compact />
                </div>
                <ul className="space-y-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between border-b border-line/70 py-3 text-[15px] text-fg"
                      >
                        {item.label}
                        {item.children ? (
                          <span className="text-[11px] text-fg-dim">
                            {item.children.length} بخش
                          </span>
                        ) : null}
                      </Link>
                      {item.children ? (
                        <ul className="grid gap-1 py-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block py-1.5 pr-3 text-[13px] text-fg-muted"
                              >
                                — {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
