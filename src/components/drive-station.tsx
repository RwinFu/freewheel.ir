"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ImageIcon, MousePointerClick } from "lucide-react";
import { useRef, useState } from "react";

import { Reveal } from "@/components/motion";
import {
  DRIVE_SECTION,
  DRIVE_STATIONS,
  type DrivePoint,
  type DriveStationData,
} from "@/content/drive-station";
import { cn } from "@/lib/utils";

/**
 * «ایستگاه درایو، قطعه به قطعه».
 *
 * الگوی صفحه‌های کاتالوگ صنعتی: یک رندر از کل ایستگاه با شماره روی قطعه‌ها، و
 * کنارش فهرست همان شماره‌ها با عکس واقعی قطعه. اینجا آن الگو زنده است — هر
 * شماره روی رندر به ردیف خودش وصل است: انتخاب هرکدام، دیگری را روشن می‌کند و
 * از ردیف، لینک صفحه‌ی همان سری باز می‌شود.
 *
 * دو پیکربندی (نوار نقاله و الواتور) از `drive-station.ts` می‌آید و با یک زبانه
 * عوض می‌شود؛ هیچ تصویری داخل این کامپوننت ساخته نمی‌شود.
 */

function Marker({
  point,
  active,
  onSelect,
  delay = 0,
}: {
  point: DrivePoint;
  active: boolean;
  onSelect: () => void;
  /** تأخیر موج‌وار ورود نشانگرها، به میلی‌ثانیه */
  delay?: number;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        left: `${point.hot.x}%`,
        top: `${point.hot.y}%`,
        animationDelay: `${delay}ms`,
      }}
      aria-label={`شماره‌ی ${point.numeral} — ${point.title}`}
      aria-pressed={active}
      className={cn(
        "drive-marker-in tnum absolute z-10 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[12.5px] font-bold transition-[background-color,color,box-shadow,transform] duration-200 sm:h-9 sm:w-9 sm:text-[13.5px]",
        active
          ? "scale-110 border-white/80 bg-coral text-ocean shadow-[0_0_0_6px_rgba(238,121,88,0.28)]"
          : "border-coral/70 bg-ocean/85 text-coral shadow-[0_8px_22px_-10px_rgba(0,0,0,0.9)] backdrop-blur-sm hover:bg-coral hover:text-ocean",
      )}
    >
      {point.numeral}
    </button>
  );
}

function PointRow({
  point,
  active,
  onSelect,
  rowRef,
}: {
  point: DrivePoint;
  active: boolean;
  onSelect: () => void;
  rowRef: (el: HTMLLIElement | null) => void;
}) {
  return (
    <li
      ref={rowRef}
      className={cn(
        "overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300",
        active
          ? "border-coral/45 bg-white/[0.075]"
          : "border-white/10 bg-white/[0.035] hover:border-white/25",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={active}
        className="flex w-full items-center gap-3 p-3 text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
      >
        <span className="relative h-14 w-[68px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0b2630]">
          <Image
            src={point.image.src}
            alt=""
            fill
            sizes="72px"
            className="object-cover"
            aria-hidden="true"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "tnum grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors",
                active ? "bg-coral text-ocean" : "bg-white/12 text-white/80",
              )}
            >
              {point.numeral}
            </span>
            <span
              className={cn(
                "truncate text-[13.5px] font-bold transition-colors",
                active ? "text-white" : "text-white/85",
              )}
            >
              {point.title}
            </span>
          </span>
          <span className="mt-1.5 block text-[11.5px] leading-5 text-white/55">{point.role}</span>
        </span>
        <span className="tnum hidden shrink-0 text-[11px] text-white/35 sm:block">
          {point.link.label}
        </span>
      </button>

      {active ? (
        <div className="border-t border-white/10 px-3 pb-3 pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10.5px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            {point.position}
          </span>
          <p className="mt-3 text-[12.5px] leading-7 text-white/65">{point.detail}</p>
          <Link
            href={point.link.href}
            transitionTypes={["nav-forward"]}
            className="mt-3.5 inline-flex items-center gap-2 text-[12.5px] font-semibold text-mint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
          >
            {point.link.label}
            <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </li>
  );
}

export function DriveStation({
  defaultStation = "conveyor",
  showTabs = true,
  className,
}: {
  defaultStation?: DriveStationData["id"];
  showTabs?: boolean;
  className?: string;
}) {
  const [stationId, setStationId] = useState<DriveStationData["id"]>(defaultStation);
  const station = DRIVE_STATIONS.find((item) => item.id === stationId) ?? DRIVE_STATIONS[0];
  const [selected, setSelected] = useState<string | null>(station.points[0]?.numeral ?? null);
  const rows = useRef<Record<string, HTMLLIElement | null>>({});

  const chooseStation = (next: DriveStationData) => {
    setStationId(next.id);
    setSelected(next.points[0]?.numeral ?? null);
  };

  /**
   * انتخاب یک شماره از دو جا ممکن است: روی خود تصویر یا در فهرست. اگر شماره روی
   * تصویر خورده باشد و ردیفش بیرون از دید باشد، نرم می‌آید داخل دید تا کاربر
   * حس نکند «هیچ اتفاقی نیفتاد».
   */
  const togglePoint = (numeral: string, fromMarker = false) => {
    setSelected((current) => (current === numeral ? null : numeral));
    if (!fromMarker || typeof window === "undefined") return;
    const row = rows.current[numeral];
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const visible = rect.top >= 96 && rect.bottom <= window.innerHeight - 24;
    if (visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {showTabs ? (
          <div
            className="inline-flex flex-wrap gap-1.5 rounded-full border border-white/12 bg-white/[0.045] p-1.5"
            role="group"
            aria-label="انتخاب ایستگاه درایو"
          >
            {DRIVE_STATIONS.map((item) => {
              const active = item.id === station.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseStation(item)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-4 py-2 text-[12.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint",
                    active ? "bg-mint text-ocean" : "text-white/70 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.tab}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-[12px] font-semibold text-mint">{station.title}</p>
        )}

        <p className="inline-flex items-center gap-2 text-[11.5px] text-white/55">
          <MousePointerClick className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
          روی شماره‌ها بزن؛ ردیف همان قطعه کنارش باز می‌شود.
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.34fr_0.66fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            key={station.id}
            className="relative overflow-hidden rounded-[26px] border border-white/12 bg-[#0b2630]"
          >
            <Image
              src={station.photo.src}
              alt={station.photo.alt}
              sizes="(min-width: 1024px) 56vw, 94vw"
              className="h-auto w-full"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean/45 via-transparent to-transparent"
              aria-hidden="true"
            />
            {station.points.map((point, index) => (
              <Marker
                key={point.numeral}
                delay={index * 45}
                point={point}
                active={point.numeral === selected}
                onSelect={() => togglePoint(point.numeral, true)}
              />
            ))}
          </div>

          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[12px] leading-6 text-white/70">{station.photo.caption}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/65">
              <ImageIcon className="h-3 w-3" aria-hidden="true" />
              {station.photo.credit}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[12px] leading-6 text-white/55">{station.dek}</p>
          <ul className="grid gap-2.5">
            {station.points.map((point) => (
              <PointRow
                key={point.numeral}
                point={point}
                active={point.numeral === selected}
                onSelect={() => togglePoint(point.numeral)}
                rowRef={(el) => {
                  rows.current[point.numeral] = el;
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** بخش کامل صفحه‌ی اول: عنوان، توضیح و خودِ ایستگاه. */
export function DriveStationSection() {
  return (
    <section
      id="drive"
      aria-labelledby="drive-title"
      className="relative scroll-mt-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              {DRIVE_SECTION.kicker}
            </p>
            <h2
              id="drive-title"
              className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]"
            >
              {DRIVE_SECTION.title}
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-white/65 sm:text-[15px] sm:leading-8">
              {DRIVE_SECTION.dek}
            </p>
          </Reveal>

          <Reveal delay={0.06} className="shrink-0">
            <Link
              href={DRIVE_SECTION.cta.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[12.5px] font-semibold text-white transition-colors hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {DRIVE_SECTION.cta.label}
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-8">
          <DriveStation />
        </Reveal>

        <p className="mt-4 text-[11.5px] leading-6 text-white/45">{DRIVE_SECTION.note}</p>
      </div>
    </section>
  );
}
