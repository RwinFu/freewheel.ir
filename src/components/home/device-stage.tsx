"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { WordReveal } from "@/components/home/kit";
import {
  CALLOUTS,
  DEVICE,
  DEVICE_EXPLODED,
  PART_CUTOUT,
  type Callout,
} from "@/content/device-media";

gsap.registerPlugin(ScrollTrigger);

type View = "assembled" | "exploded";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * یک تصویر + شماره‌ی قطعه‌های خودش.
 * مختصات درصدی از قاب همان تصویر است، پس شماره دقیقاً روی قطعه می‌نشیند.
 */
function DeviceArt({
  view,
  active,
  calloutField,
  hovered,
}: {
  view: View;
  active: boolean;
  calloutField: "at" | "atExploded";
  hovered: string | null;
}) {
  const cut = view === "assembled" ? DEVICE : DEVICE_EXPLODED;

  return (
    <div
      className={`device-art is-${view}`}
      style={{ aspectRatio: `${cut.width} / ${cut.height}` }}
      aria-hidden={!active}
    >
      <Image
        src={cut.src}
        alt={cut.alt}
        width={cut.width}
        height={cut.height}
        sizes="(min-width: 1240px) 1180px, 94vw"
        className="device-art-img"
        priority={false}
      />
      <ol className="device-calls">
        {CALLOUTS.map((call: Callout, index) => (
          <li
            key={call.key}
            className={[
              "device-call",
              call.hero ? "is-hero" : "",
              hovered === call.key ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ left: `${call[calloutField].x}%`, top: `${call[calloutField].y}%` }}
          >
            <span className="device-call-mark" aria-hidden="true">
              {pad(index + 1)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * صحنه‌ی «دستگاه» — فری‌ویل را در جایی که واقعاً کار می‌کند نشان می‌دهد.
 *
 * دستگاه بی‌پس‌زمینه روی صحنه‌ی فنی شناور است و با اسکرول از هم باز می‌شود.
 * شماره‌ی قطعه‌ها روی تصویر است و فهرستشان کنار آن؛ با نگه‌داشتن نشانگر روی
 * هر ردیف، همان شماره روی تصویر روشن می‌شود. دکمه‌ها هم برای لمس و کیبورد.
 */
export function DeviceStage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<View>("assembled");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // با کاهش حرکت، هیچ اسکرول‌تریگری ساخته نمی‌شود؛ دستگاه همان نمای کامل
    // می‌ماند و دکمه‌ها (بدون ترنزیشن، طبق مدیای کوئری) نما را عوض می‌کنند.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-device-copy] > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", end: "top 42%", scrub: 0.5 },
        },
      );

      gsap.fromTo(
        "[data-device-plate]",
        { y: 46, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 84%", end: "top 48%", scrub: 0.6 },
        },
      );

      // قطعه‌های شناور با عمق‌های مختلف
      gsap.utils.toArray<HTMLElement>("[data-float-part]").forEach((part, index) => {
        gsap.fromTo(
          part,
          { yPercent: 10 + index * 4 },
          {
            yPercent: -14 - index * 5,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.9 },
          },
        );
      });
    }, root);

    // ورود به صحنه = بازشدن دستگاه؛ برگشت = بسته شدن
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 45%",
      end: "bottom 72%",
      onToggle: (self) => setView(self.isActive ? "exploded" : "assembled"),
    });

    return () => {
      trigger.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section id="device" ref={rootRef} className="device-section" aria-labelledby="device-title">
      <div className="device-stage">
        {/* شبکه‌ی نقشه‌کشی و هاله — زمینه‌ای که قطعه‌ها رویش شناورند */}
        <div className="device-grid" aria-hidden="true" />
        <div className="device-glow" aria-hidden="true" />
        <div className="device-floor" aria-hidden="true" />

        {/* قطعه‌های تک، شناور در حاشیه‌ها */}
        <figure className="device-float device-float-a" data-float-part aria-hidden="true">
          <Image src={PART_CUTOUT.sprag.src} alt="" width={PART_CUTOUT.sprag.width} height={PART_CUTOUT.sprag.height} className="device-float-img" />
        </figure>
        <figure className="device-float device-float-b" data-float-part aria-hidden="true">
          <Image src={PART_CUTOUT.roller.src} alt="" width={PART_CUTOUT.roller.width} height={PART_CUTOUT.roller.height} className="device-float-img" />
        </figure>
        <figure className="device-float device-float-c" data-float-part aria-hidden="true">
          <Image src={PART_CUTOUT.backstop.src} alt="" width={PART_CUTOUT.backstop.width} height={PART_CUTOUT.backstop.height} className="device-float-img" />
        </figure>

        <div className="device-inner">
          <div className="device-head" data-device-copy>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              در دلِ دستگاه
            </p>
            <h2 id="device-title" className="device-title">
              <WordReveal text="فری‌ویل کجای این دستگاه می‌نشیند؟" mode="scroll" variant="dim" />
            </h2>
            <p className="device-sub">
              یک ایستگاه درایو نوار نقاله: موتور، کوپلینگ، گیربکس و بعد آن قطعه‌ی کوچک روی
              شفت. اسکرول کن تا دستگاه باز شود و جایش را ببینی.
            </p>
          </div>

          {/* فهرست قطعه‌ها — شماره‌ها با تصویر یکی‌اند */}
          <ul className="device-rail" aria-label="قطعه‌های دستگاه به ترتیب توان">
            {CALLOUTS.map((call: Callout, index) => (
              <li key={call.key} className={call.hero ? "device-rail-row is-hero" : "device-rail-row"}>
                <button
                  type="button"
                  className="device-rail-btn"
                  onMouseEnter={() => setHovered(call.key)}
                  onMouseLeave={() => setHovered((h) => (h === call.key ? null : h))}
                  onFocus={() => setHovered(call.key)}
                  onBlur={() => setHovered((h) => (h === call.key ? null : h))}
                >
                  <span className="device-rail-index" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <span className="device-rail-text">
                    <span className="device-rail-label">{call.label}</span>
                    <span className="device-rail-note">{call.note}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="device-canvas" data-device-plate data-view={view}>
            <DeviceArt view="assembled" active={view === "assembled"} calloutField="at" hovered={hovered} />
            <DeviceArt view="exploded" active={view === "exploded"} calloutField="atExploded" hovered={hovered} />
          </div>

          <div className="device-foot">
            <div className="device-toggle" role="tablist" aria-label="نمای دستگاه">
              <button
                type="button"
                role="tab"
                aria-selected={view === "assembled"}
                className={view === "assembled" ? "device-tab is-active" : "device-tab"}
                onClick={() => {
                  setView("assembled");
                  setPinned(true);
                }}
              >
                دستگاه کامل
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "exploded"}
                className={view === "exploded" ? "device-tab is-active" : "device-tab"}
                onClick={() => {
                  setView("exploded");
                  setPinned(true);
                }}
              >
                نمای بازشده
              </button>
            </div>
            <p className="device-foot-note">
              قطعه‌های شناور، عکس واقعی خودِ محصول‌اند؛ پس‌زمینه‌شان حذف شده
              {pinned ? " و روی همین صحنه نشسته‌اند." : " تا روی هر صحنه‌ای بنشینند."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
