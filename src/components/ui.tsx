import Link from "next/link";
import { MoveUpLeft } from "lucide-react";
import type { ReactNode } from "react";

import { SHOPS } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

export function SectionHeading({
  kicker,
  title,
  desc,
  className,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {kicker ? (
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[1px] w-8 bg-accent" />
          <span className="text-[12px] tracking-[0.12em] text-accent">{kicker}</span>
        </div>
      ) : null}
      <h2 className="text-[26px] leading-tight text-fg sm:text-[32px]">{title}</h2>
      {desc ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-8 text-fg-muted">{desc}</p>
      ) : null}
    </Reveal>
  );
}

export function Panel({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag className={cn("border border-line bg-panel", className)}>{children}</Tag>
  );
}

export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-[3px] text-[11px] tracking-[0.02em]",
        accent ? "border-accent/50 text-accent" : "border-line-2 text-fg-dim",
      )}
    >
      {children}
    </span>
  );
}

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
    <div className="border-r-2 border-line-2 pr-4">
      <div className="text-[11.5px] text-fg-dim">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="tnum text-[26px] font-semibold leading-none text-fg">{value}</span>
        {unit ? <span className="text-[12px] text-fg-dim">{unit}</span> : null}
      </div>
      {hint ? <div className="mt-1.5 text-[11.5px] leading-5 text-fg-dim">{hint}</div> : null}
    </div>
  );
}

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
        "border border-line-2 bg-panel-2",
        compact ? "px-5 py-4" : "px-6 py-5",
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
          className="inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft"
        >
          استعلام قیمت در فروشگاه
          <MoveUpLeft className="h-4 w-4" />
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
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
    <div className={cn("border border-line-2 bg-panel-2 px-6 py-5", className)}>
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
        className="mt-4 inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
      >
        مشاوره‌ی پروژه‌ی نوار نقاله
        <MoveUpLeft className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-r-2 border-accent bg-accent/6 px-5 py-4">
      {title ? <div className="text-[13px] font-semibold text-fg">{title}</div> : null}
      <div className="mt-1.5 text-[13.5px] leading-7 text-fg-muted">{children}</div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-fg-dim">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 ? <span className="text-line-2">/</span> : null}
          {index === items.length - 1 ? (
            <span className="text-fg-muted">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              transitionTypes={["nav-back"]}
              className="transition-colors hover:text-accent"
            >
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
    <div className="border border-line bg-panel">
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
