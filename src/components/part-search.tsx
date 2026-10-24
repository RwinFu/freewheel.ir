"use client";

import { Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { searchCatalog } from "@/lib/catalog";

type Result = {
  designation: string;
  seriesName: string;
  seriesSlug: string;
  boreMm: number | null;
  torqueNm: number | null;
  href: string;
};

// دو پوسته: «panel» برای سکشن‌های روشن (حالت قبلی) و «glass» برای داخل
// کپسول تیره‌ی هدر — منطق جست‌وجو (debounce، fallback استاتیک، وضعیت‌ها) مشترک است.
const skin = {
  panel: {
    box: "border-line-2 bg-panel-2 focus-within:border-accent",
    icon: "text-fg-dim",
    input: "text-fg placeholder:text-fg-dim",
    clear: "text-fg-dim hover:text-accent",
    drop: "border-line bg-panel-2 shadow-[0_20px_50px_-24px_rgba(23,36,48,0.35)]",
    empty: "text-fg-muted",
    rowBorder: "border-line",
    rowHover: "hover:bg-accent/8",
    rowActive: "bg-accent/10",
    title: "text-fg",
    sub: "text-fg-dim",
    num: "text-fg-muted",
    accent: "text-accent hover:underline",
  },
  glass: {
    box: "rounded-full border-white/[0.16] bg-white/[0.08] focus-within:border-white/40 focus-within:bg-white/[0.14]",
    icon: "text-white/50",
    input: "text-white placeholder:text-white/45",
    clear: "text-white/50 hover:text-white",
    drop: "rounded-2xl border-white/[0.14] bg-[#1d1610]/95 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] overflow-hidden",
    empty: "text-white/70",
    rowBorder: "border-white/[0.08]",
    rowHover: "hover:bg-white/[0.07]",
    rowActive: "bg-white/[0.12]",
    title: "text-white",
    sub: "text-white/55",
    num: "text-white/80",
    accent: "text-accent-soft hover:underline",
  },
} as const;

export function PartSearch({
  className,
  variant = "panel",
}: {
  className?: string;
  variant?: keyof typeof skin;
}) {
  const t = skin[variant];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const listId = useId();

  /** رفتن به یک نتیجه و بستن دراپ‌داون — مشترک بین Enter، کلیک آیکون و کیبورد */
  const goTo = (index: number) => {
    const target = results[index];
    if (!target) return;
    setOpen(false);
    router.push(target.href);
  };

  useEffect(() => {
    // گزینه‌ی فعال در فهرست اسکرول‌دار همیشه دیده شود
    if (active < 0) return;
    document.getElementById(`${listId}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length > 0) {
        setOpen(true);
        setActive((i) => (i + 1) % results.length);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length > 0) {
        setOpen(true);
        setActive((i) => (i - 1 + results.length) % results.length);
      }
    } else if (event.key === "Enter") {
      // Enter = رفتن به گزینه‌ی فعال (پیش‌فرض اولین نتیجه)
      if (open && results.length > 0) {
        event.preventDefault();
        goTo(active >= 0 ? active : 0);
      }
    }
  };

  useEffect(() => {
    const term = query.trim();
    const short = term.length < 2;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      // هر بار که نتایج عوض می‌شوند، گزینه‌ی فعال هم‌جا ریست می‌شود تا
      // Enter و دکمه‌ی ذره‌بین همیشه روی اولین نتیجه‌ی تازه کار کنند.
      if (short) {
        setResults([]);
        setActive(-1);
        setState("idle");
        return;
      }
      setState("loading");
      try {
        if (process.env.NEXT_PUBLIC_STATIC_SITE === "1") {
          // GitHub Pages has no API; use the same catalog as the Node fallback.
          const found = searchCatalog(term);
          setResults(found);
          setActive(found.length > 0 ? 0 : -1);
          setState("done");
          setOpen(true);
          return;
        }
        const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { ok: boolean; items: Result[] };
        if (controller.signal.aborted) return;
        // «نتیجه‌ای نیست» با «جست‌وجو کار نمی‌کند» فرق دارد؛ پیام‌ها جداست.
        if (!response.ok || !data.ok) {
          setResults([]);
          setActive(-1);
          setState("error");
        } else {
          const items = data.items ?? [];
          setResults(items);
          setActive(items.length > 0 ? 0 : -1);
          setState("done");
        }
        setOpen(true);
      } catch {
        if (controller.signal.aborted) return;
        setResults([]);
        setActive(-1);
        setState("error");
        setOpen(true);
      }
    }, short ? 0 : 260);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={boxRef} className={className}>
      <div className={`flex items-center gap-2 border px-3 py-2 transition-colors ${t.box}`}>
        {/* ذره‌بین دیگر تزئینی نیست: کلیک = فوکوس/حرکت به اولین نتیجه */}
        <button
          type="button"
          onClick={() => {
            if (open && results.length > 0) {
              goTo(active >= 0 ? active : 0);
            } else {
              inputRef.current?.focus();
            }
          }}
          aria-label="جست‌وجو"
          className={`shrink-0 transition-colors hover:scale-110 ${t.icon}`}
        >
          <Search className="h-4 w-4" />
        </button>
        <input
          ref={inputRef}
          type="search"
          name="partNumber"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-option-${active}` : undefined}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onInputKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="جست‌وجوی کد، مثل FGR 45…"
          dir="ltr"
          className={`tnum w-full bg-transparent text-[13px] outline-none ${t.input}`}
          aria-label="جست‌وجوی کد قطعه در کاتالوگ"
        />
        {state === "loading" ? (
          <Loader2 className={`h-3.5 w-3.5 shrink-0 animate-spin ${t.icon}`} />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setActive(-1);
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن"
            className={`shrink-0 transition-colors ${t.clear}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {open && query.trim().length >= 2 ? (
        <div className={`absolute inset-x-0 top-full z-50 mt-1.5 border ${t.drop}`}>
          {state === "error" ? (
            <p className={`px-4 py-4 text-[13px] leading-7 ${t.empty}`}>
              جست‌وجوی کاتالوگ فعلاً در دسترس نیست. کد قطعه را در{" "}
              <Link href="/ringspann" className={t.accent}>
                جدول سری‌ها
              </Link>{" "}
              ببینید یا کد را برای ما بفرستید.
            </p>
          ) : results.length === 0 ? (
            <p className={`px-4 py-4 text-[13px] leading-7 ${t.empty}`}>
              چیزی پیدا نشد. کد کامل را بنویسید یا{" "}
              <Link href="/contact" className={t.accent}>
                مشخصات را برای ما بفرستید
              </Link>
              .
            </p>
          ) : (
            <ul role="listbox" id={listId} className="max-h-[320px] overflow-y-auto">
              {results.map((item, index) => (
                <li
                  key={item.href}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseEnter={() => setActive(index)}
                  className={`border-b last:border-b-0 ${t.rowBorder} ${
                    index === active ? t.rowActive : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    tabIndex={-1}
                    className={`flex items-center justify-between gap-4 px-4 py-3 transition-colors ${t.rowHover}`}
                  >
                    <span className="min-w-0">
                      <span dir="ltr" className={`block truncate text-[13.5px] font-medium ${t.title}`}>
                        {item.designation}
                      </span>
                      <span className={`mt-1 block truncate text-[11.5px] ${t.sub}`}>
                        {item.seriesName}
                      </span>
                    </span>
                    <span className="shrink-0 text-end">
                      <span className={`tnum block text-[12.5px] ${t.num}`} dir="ltr">
                        {item.torqueNm ? `${item.torqueNm.toLocaleString("en-US")} N·m` : "—"}
                      </span>
                      <span className={`tnum mt-1 block text-[11.5px] ${t.sub}`} dir="ltr">
                        {item.boreMm ? `Ø ${item.boreMm} mm` : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
