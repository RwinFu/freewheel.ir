"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpLeft, Filter } from "lucide-react";

import { Tag, TorqueBar } from "@/components/ui";
import type { SeriesShape } from "@/content/ringspann";
import { cn } from "@/lib/utils";

export type CatalogItem = {
  slug: string;
  designation: string;
  family: string;
  element: "roller" | "sprag";
  short: string;
  tagline: string;
  minTorqueNm: number;
  maxTorqueNm: number;
  maxBoreMm: number;
  sizeCount: number;
  imageSrc: string;
  imageAlt: string;
  /** «پایه»، «داخلی»، «کامل» یا «بک‌استاپ» — همان shape محتوای کاتالوگ. */
  shape: SeriesShape;
};

export const SHAPE_LABEL: Record<SeriesShape, string> = {
  basic: "پایه (مونتاژ داخل محفظه)",
  internal: "داخلی (با تحمل بار شعاعی)",
  complete: "کامل و آماده‌ی نصب",
  backstop: "بک‌استاپ سرعت پایین",
};

const TORQUE_SCALE_MIN = 200;
const TORQUE_SCALE_MAX = 600000;

type FilterKey = "all" | "roller" | "sprag" | "compact" | "heavy";

const FILTERS: { key: FilterKey; label: string; hint: string }[] = [
  { key: "all", label: "همه‌ی سری‌ها", hint: "هفت سری فعال" },
  { key: "roller", label: "المان رولری", hint: "غلتک در فضای گوه‌ای" },
  { key: "sprag", label: "المان اسپراگ", hint: "گوه‌ی فولادی" },
  { key: "compact", label: "قطر شفت تا ۵۰ mm", hint: "کاربردهای سبک و پرسرعت" },
  { key: "heavy", label: "بالای ۱۵۰ mm", hint: "نوار نقاله و سنگ‌شکن" },
];

export function CatalogExplorer({ items }: { items: CatalogItem[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [shape, setShape] = useState<SeriesShape | "all">("all");

  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (shape !== "all" && item.shape !== shape) return false;
        if (filter === "roller") return item.element === "roller";
        if (filter === "sprag") return item.element === "sprag";
        if (filter === "compact") return item.maxBoreMm <= 50;
        if (filter === "heavy") return item.maxBoreMm > 150;
        return true;
      }),
    [items, filter, shape],
  );

  return (
    <div>
      <div className="rounded-[14px] border border-line bg-panel/70 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-fg-muted">
            <Filter className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            صافی سری‌ها
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="صافی بر اساس نوع و اندازه">
            {FILTERS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                aria-pressed={filter === option.key}
                title={option.hint}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 text-[12px] transition-colors",
                  filter === option.key
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line-2/70 bg-panel text-fg-muted hover:border-accent hover:text-accent",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
          <span className="text-[12px] text-fg-dim">شکل قطعه:</span>
          {(["all", "basic", "internal", "complete", "backstop"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setShape(key)}
              aria-pressed={shape === key}
              className={cn(
                "min-h-9 rounded-full border px-3.5 text-[12px] transition-colors",
                shape === key
                  ? "border-ocean bg-ocean text-white"
                  : "border-line-2/70 bg-panel text-fg-muted hover:border-ocean hover:text-ocean",
              )}
            >
              {key === "all" ? "همه" : SHAPE_LABEL[key]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] text-fg-dim" role="status">
        {visible.length} سری از {items.length} سری با صافی فعلی خوانده می‌شود.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <CatalogPlate key={item.slug} item={item} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-[14px] border border-line bg-panel px-5 py-6 text-[13.5px] leading-7 text-fg-muted">
          با این ترکیب صافی چیزی نماند. صافی «شکل قطعه» را روی «همه» بگذارید یا مشخصات پروژه
          را برای ما بفرستید تا سری مناسب را پیدا کنیم.
        </p>
      ) : null}
    </div>
  );
}

export function CatalogPlate({ item }: { item: CatalogItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[16px] border border-line bg-panel transition-colors hover:border-accent/55">
      <Link
        href={`/ringspann/${item.slug}`}
        className="plate-shot plate-ticks block aspect-[4/3]"
        aria-label={`مشخصات ${item.designation}`}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-contain p-1"
        />
        <span className="code absolute left-3.5 top-3.5 rounded-md border border-white/15 bg-ocean/55 px-2 py-1 text-[10.5px] text-white/85 backdrop-blur-sm">
          {item.sizeCount > 0 ? `${item.sizeCount} سایز` : "سفارشی"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="code text-[18px] font-bold text-fg" translate="no">
              {item.designation}
            </h3>
            <p className="mt-1.5 text-[12.5px] text-fg-dim">{item.family}</p>
          </div>
          <Tag tone={item.element === "roller" ? "mint" : "lock"}>
            {item.element === "roller" ? "رولری" : "اسپراگ"}
          </Tag>
        </div>

        <p className="mt-3 text-[13px] leading-7 text-fg-muted">{item.tagline}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
          <div>
            <dt className="text-[11px] text-fg-dim">حداکثر گشتاور</dt>
            <dd className="code mt-1 text-[14px] font-semibold text-fg" translate="no">
              {new Intl.NumberFormat("en-US").format(item.maxTorqueNm)} N·m
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-fg-dim">حداکثر قطر شفت</dt>
            <dd className="code mt-1 text-[14px] font-semibold text-fg" translate="no">
              {item.maxBoreMm} mm
            </dd>
          </div>
        </dl>

        <div className="mt-4">
          <TorqueBar
            min={item.minTorqueNm}
            max={item.maxTorqueNm}
            scaleMin={TORQUE_SCALE_MIN}
            scaleMax={TORQUE_SCALE_MAX}
            tone={item.element === "roller" ? "mint" : "lock"}
            label={`بازه‌ی گشتاور در میان سری‌ها (مقیاس لگاریتمی)`}
          />
        </div>

        <Link
          href={`/ringspann/${item.slug}`}
          className="mt-5 inline-flex min-h-11 items-center justify-between gap-2 rounded-full border border-line-2 px-4 text-[12.5px] font-semibold text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          جدول ابعاد و راهنمای انتخاب
          <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
