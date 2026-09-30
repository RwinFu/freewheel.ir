"use client";

import { Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { searchCatalog } from "@/lib/catalog";

type Result = {
  designation: string;
  seriesName: string;
  seriesSlug: string;
  boreMm: number | null;
  torqueNm: number | null;
  href: string;
};

export function PartSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const term = query.trim();
    const short = term.length < 2;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      if (short) {
        setResults([]);
        setState("idle");
        return;
      }
      setState("loading");
      try {
        if (process.env.NEXT_PUBLIC_STATIC_SITE === "1") {
          // GitHub Pages has no API; use the same catalog as the Node fallback.
          setResults(searchCatalog(term));
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
          setState("error");
        } else {
          setResults(data.items ?? []);
          setState("done");
        }
        setOpen(true);
      } catch {
        if (controller.signal.aborted) return;
        setResults([]);
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
      <div className="flex items-center gap-2 border border-line-2 bg-panel-2 px-3 py-2 transition-colors focus-within:border-accent">
        <Search className="h-4 w-4 shrink-0 text-fg-dim" />
        <input
          type="search"
          name="partNumber"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="جست‌وجوی کد، مثل FGR 45…"
          dir="ltr"
          className="tnum w-full bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-dim"
          aria-label="جست‌وجوی کد قطعه در کاتالوگ"
        />
        {state === "loading" ? (
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-fg-dim" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            aria-label="پاک کردن"
            className="shrink-0 text-fg-dim transition-colors hover:text-accent"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {open && query.trim().length >= 2 ? (
        <div className="absolute inset-x-0 top-full z-50 mt-1 border border-line bg-panel-2 shadow-[0_20px_50px_-24px_rgba(23,36,48,0.35)]">
          {state === "error" ? (
            <p className="px-4 py-4 text-[13px] leading-7 text-fg-muted">
              جست‌وجوی کاتالوگ فعلاً در دسترس نیست. کد قطعه را در{" "}
              <Link href="/ringspann" className="text-accent hover:underline">
                جدول سری‌ها
              </Link>{" "}
              ببینید یا کد را برای ما بفرستید.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-4 text-[13px] leading-7 text-fg-muted">
              چیزی پیدا نشد. کد کامل را بنویسید یا{" "}
              <Link href="/contact" className="text-accent hover:underline">
                مشخصات را برای ما بفرستید
              </Link>
              .
            </p>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto">
              {results.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-accent/8"
                  >
                    <span className="min-w-0">
                      <span dir="ltr" className="block text-[13.5px] font-medium text-fg">
                        {item.designation}
                      </span>
                      <span className="mt-1 block text-[11.5px] text-fg-dim">
                        {item.seriesName}
                      </span>
                    </span>
                    <span className="shrink-0 text-end">
                      <span className="tnum block text-[12.5px] text-fg-muted" dir="ltr">
                        {item.torqueNm ? `${item.torqueNm.toLocaleString("en-US")} N·m` : "—"}
                      </span>
                      <span className="tnum mt-1 block text-[11.5px] text-fg-dim" dir="ltr">
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
