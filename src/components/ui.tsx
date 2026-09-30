import Link from "next/link";
import { MoveUpLeft } from "lucide-react";
import type { ReactNode } from "react";

import { SHOPS } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

/* ------------------------------------------------------------------ */
/* سرصفحه‌ی بخش‌ها — مثل کادر نقشه: خط مویی، شماره، برچسب و تیتر       */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  kicker,
  title,
  desc,
  index,
  action,
  className,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  /** شماره‌ی کادر؛ فقط برای بخش‌هایی که واقعاً ترتیب دارند. */
  index?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("rule-frame pt-6", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="max-w-2xl">
          {kicker ? (
            <div className="mb-4 flex items-center gap-3">
              {index ? (
                <span className="code text-[11.5px] font-semibold text-fg-dim">{index}</span>
              ) : null}
              <span className="text-[12px] font-semibold text-accent">{kicker}</span>
            </div>
          ) : null}
          <h2 className="font-display text-[30px] leading-[1.4] text-fg sm:text-[38px]">
            {title}
          </h2>
          {desc ? (
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-fg-muted">{desc}</p>
          ) : null}
        </div>
        {action ? <div className="mb-1 shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}

/** لینک کنش کنار سرصفحه (مثل «دیدن همه‌ی کاربردها»). */
export function SectionLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const content = (
    <>
      {children}
      <MoveUpLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </>
  );
  const className =
    "group inline-flex items-center gap-2 text-[13px] font-semibold text-accent transition-colors hover:text-fg";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* سطح‌ها                                                              */
/* ------------------------------------------------------------------ */

export function Panel({
  children,
  className,
  as: Tag = "div",
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
  tone?: "plain" | "raised";
}) {
  return (
    <Tag
      className={cn(
        "rounded-[14px] border border-line",
        tone === "raised" ? "bg-panel" : "bg-panel/70",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Tag({
  children,
  accent = false,
  tone = "neutral",
}: {
  children: ReactNode;
  accent?: boolean;
  tone?: "neutral" | "mint" | "lock";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] text-[11px] font-medium",
        tone === "mint" && "border-accent-soft/45 bg-accent-soft/12 text-accent",
        tone === "lock" && "border-lock/40 bg-lock/8 text-lock",
        tone === "neutral" && "border-line-2/70 bg-panel text-fg-dim",
        accent && "border-accent/45 bg-accent/8 text-accent",
      )}
    >
      {children}
    </span>
  );
}

/** برچسب لاتین کد/رند — جهت متن ایزوله تا در متن فارسی به‌هم نریزد. */
export function Code({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("code font-medium text-fg", className)} translate="no">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* داده‌ی عددی                                                          */
/* ------------------------------------------------------------------ */

export function StatBlock({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  hint?: string;
}) {
  return (
    <div className="border-r border-line pe-4">
      <div className="text-[11.5px] text-fg-dim">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="tnum text-[27px] font-bold leading-none text-fg">{value}</span>
        {unit ? <span className="text-[12px] text-fg-muted">{unit}</span> : null}
      </div>
      {hint ? <div className="mt-2 text-[11.5px] leading-5 text-fg-dim">{hint}</div> : null}
    </div>
  );
}

/**
 * نوار بازه‌ی گشتاور روی مقیاس لگاریتمی.
 * لگاریتمی است چون فاصله‌ی ۴۲۰ تا ۵۰۳٫۵۵۰ نیوتن‌متر روی مقیاس خطی
 * همه‌چیز را در یک نقطه جمع می‌کند و مقایسه بی‌معنی می‌شود.
 */
export function TorqueBar({
  min,
  max,
  scaleMin,
  scaleMax,
  tone = "mint",
  label,
  className,
}: {
  min: number;
  max: number;
  scaleMin: number;
  scaleMax: number;
  tone?: "mint" | "lock" | "ink";
  label?: string;
  className?: string;
}) {
  const logMin = Math.log10(scaleMin);
  const logMax = Math.log10(scaleMax);
  const span = logMax - logMin || 1;
  const start = ((Math.log10(Math.max(min, scaleMin)) - logMin) / span) * 100;
  const end = ((Math.log10(Math.min(max, scaleMax)) - logMin) / span) * 100;
  const width = Math.max(end - start, 1.5);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-panel-3/70">
        <span
          className={cn(
            "absolute inset-y-0 rounded-full",
            tone === "mint" && "bg-accent-soft",
            tone === "lock" && "bg-coral",
            tone === "ink" && "bg-ocean",
          )}
          style={{ right: `${start}%`, width: `${width}%` }}
        />
      </div>
      {label ? <div className="mt-2 text-[11px] text-fg-dim">{label}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* تصویر                                                              */
/* ------------------------------------------------------------------ */

/**
 * قاب تصویر فنی: کد قطعه، خط‌های اندازه‌گیری گوشه و توضیح عکس.
 * `caption` عمداً اجباری است؛ تصویر بی‌توضیح در یک مرجع فنی جای ندارد.
 */
export function MediaFrame({
  children,
  code,
  caption,
  meta,
  className,
}: {
  children: ReactNode;
  code?: string;
  caption?: string;
  meta?: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-[14px] border border-line bg-panel", className)}>
      <div className="plate-shot group plate-ticks">
        {children}
        {code ? (
          <span className="code absolute right-3.5 top-3.5 rounded-md border border-white/15 bg-ocean/55 px-2 py-1 text-[10.5px] font-medium text-white/85 backdrop-blur-sm">
            {code}
          </span>
        ) : null}
      </div>
      {caption || meta ? (
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line px-4 py-3">
          {caption ? (
            <span className="text-[12.5px] leading-6 text-fg-muted">{caption}</span>
          ) : null}
          {meta ? <span className="text-[11px] text-fg-dim">{meta}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* هدایت‌های کنش                                                       */
/* ------------------------------------------------------------------ */

/** هدایت خرید — فروشگاه آنلاین بلبرینگ */
export function BuyNote({
  partNumber,
  compact = false,
  className,
}: {
  partNumber?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-line bg-panel",
        compact ? "px-5 py-5" : "px-6 py-6",
        className,
      )}
    >
      <p className={cn("text-fg-muted", compact ? "text-[13.5px] leading-7" : "text-[14.5px] leading-8")}>
        برای استعلام قیمت و خرید{partNumber ? ` قطعه‌ی ${partNumber}` : ""}، به فروشگاه آنلاین
        بلبرینگ{" "}
        <a
          href={SHOPS.bearing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline decoration-accent/40 decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {SHOPS.bearing.name}
        </a>{" "}
        مراجعه کنید.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={SHOPS.bearing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-ocean active:scale-[0.98]"
        >
          استعلام قیمت در فروشگاه
          <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
        </a>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          درخواست سایزبندی
        </Link>
      </div>
    </div>
  );
}

/** هدایت خرید — اتوماسیون و نوار نقاله */
export function RobotNote({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[14px] border border-line bg-panel px-6 py-6", className)}>
      <p className="text-[14.5px] leading-8 text-fg-muted">
        برای طراحی و ارتقای سیستم نوار نقاله، شرکت اتوماسیون{" "}
        <a
          href={SHOPS.robot.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline decoration-accent/40 decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {SHOPS.robot.name}
        </a>{" "}
        تجربه‌ی پروژه‌های مشابه را دارد؛ از مرحله‌ی نقشه می‌توانید مکان فری‌ویل و پایه‌ی اهرم را
        در طرح رزرو کنید.
      </p>
      <a
        href={SHOPS.robot.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
      >
        مشاوره‌ی پروژه‌ی نوار نقاله
        <MoveUpLeft className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "accent",
}: {
  title?: string;
  children: ReactNode;
  tone?: "accent" | "lock";
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-line bg-panel px-5 py-5",
        tone === "accent" ? "shadow-[inset_3px_0_0_var(--color-accent-soft)]" : "shadow-[inset_3px_0_0_var(--color-lock)]",
      )}
    >
      {title ? <div className="text-[13.5px] font-semibold text-fg">{title}</div> : null}
      <div className="mt-2 text-[13.5px] leading-7 text-fg-muted">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ناوبری و جدول                                                       */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-7 flex flex-wrap items-center gap-2 text-[12px] text-fg-dim">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 ? <span className="text-line-2">/</span> : null}
          {index === items.length - 1 ? (
            <span className="text-fg-muted">{item.label}</span>
          ) : (
            <Link href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SpecTable({
  columns,
  rows,
  caption,
  highlight,
}: {
  columns: string[];
  rows: (string | number | null)[][];
  caption?: string;
  highlight?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-panel">
      <div className="overflow-x-auto">
        <table className="spec-table">
          {caption ? (
            <caption className="border-b border-line px-4 py-3 text-start text-[12.5px] text-fg-muted">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="text-start">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const designation = String(row[0] ?? "");
              const isCurrent = highlight ? designation.includes(highlight) : false;
              return (
                <tr key={designation} className={isCurrent ? "is-current" : undefined}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${designation}-${cellIndex}`}
                      className={cellIndex === 0 ? "font-medium text-fg" : "num text-fg-muted"}
                    >
                      {cell === null || cell === "" ? "—" : cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
