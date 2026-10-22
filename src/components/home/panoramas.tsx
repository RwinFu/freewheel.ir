"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { FadeUp, WordReveal } from "@/components/home/kit";
import { MotionImage } from "@/components/home/motion-media";
import { HOME_STILL } from "@/content/home-media";

gsap.registerPlugin(ScrollTrigger);

/**
 * بخش افقی «نمای بالا» — مثل بخش Horizontal مرجع:
 * با اسکرول عمودی، سه تصویر عریض از راست به چپ (در RTL) جلوی چشم می‌آیند
 * و پارالاکس ظریف دارند.
 */
export function HorizontalPanorama() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReducedMotion()) {
      section.classList.add("pano-fallback");
      return;
    }

    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance() * 1.25}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1.5,
        invalidateOnRefresh: true,
      },
    });

    const media = [...track.querySelectorAll<HTMLElement>("[data-pano-media]")];
    const parallaxes = media.map((el) =>
      gsap.fromTo(
        el,
        { xPercent: 8 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-pano-card]"),
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      ),
    );

    return () => {
      for (const p of parallaxes) {
        p.scrollTrigger?.kill();
        p.kill();
      }
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const cards = [
    {
      still: HOME_STILL.panoAxis,
      label: "کلاچ یک‌طرفه",
      sub: "نمای روبه‌روی محور",
      detail: "آزاد در یک جهت، قفل در جهت دیگر",
    },
    {
      still: HOME_STILL.panoRoller,
      label: "المان رولری",
      sub: "غلتک و فنر در گوه",
      detail: "ساختار رایج و فشرده",
    },
    {
      still: HOME_STILL.panoSprag,
      label: "مجموعه‌ی اسپراگ",
      sub: "گوه‌های فولادی بین دو حلقه",
      detail: "برای گشتاور بالا",
    },
    {
      still: HOME_STILL.panoSealed,
      label: "محفظه‌ی آب‌بندی",
      sub: "بسته و روغن‌پر",
      detail: "آماده‌ی نصب",
    },
    {
      still: HOME_STILL.panoLiftoff,
      label: "لیفت‌آف هیدرودینامیک",
      sub: "سایش نزدیک به صفر",
      detail: "دور آزاد بالا",
    },
    {
      still: HOME_STILL.panoDrawnCup,
      label: "کاپ کشیده",
      sub: "رولرهای سوزنی و فنر",
      detail: "سایز کوچک",
    },
    {
      still: HOME_STILL.panoInternal,
      label: "فری‌ویل داخلی",
      sub: "هم‌اندازه‌ی بلبرینگ",
      detail: "تحمل بار شعاعی",
    },
  ];

  return (
    <section id="gallery" className="pano-section" aria-labelledby="pano-title">
      <div className="pano-head">
        <FadeUp>
          <p className="statement-eyebrow">
            <span className="statement-eyebrow-rule" aria-hidden="true" />
            نمای بالا
          </p>
          <h2 id="pano-title" className="pano-title">
            <WordReveal text="سامانه را از راست به چپ رد شو" mode="scroll" />
          </h2>
        </FadeUp>
        <p className="pano-hint" aria-hidden="true">
          اسکرول عمودی = حرکت افقی
          <span className="pano-hint-line" />
        </p>
      </div>

      <div ref={sectionRef} className="pano-viewport" dir="ltr">
        <div ref={trackRef} className="pano-track">
          {cards.map((card, index) => (
            <figure key={card.label} data-pano-card className="pano-card" dir="rtl">
              <div className="pano-card-media">
                <div data-pano-media className="pano-card-img">
                  <MotionImage
                    still={card.still}
                    motion="drift"
                    sizes="(min-width: 900px) 62vw, 88vw"
                    duration={28 + index * 3}
                    delay={index * 0.9}
                    imgClassName="pano-card-img-el"
                  />
                </div>
                <span className="pano-card-index" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pano-card-detail">{card.detail}</span>
              </div>
              <figcaption className="pano-card-caption">
                <div>
                  <span className="pano-card-label">{card.label}</span>
                  <span className="pano-card-sub">{card.sub}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * جدول زمانی «طرح پرداخت» — مثل بخش Installment Plan مرجع:
 * ردیف‌هایی با درصد و نوار پیشرفت که با ورود به دید پر می‌شوند.
 */
const PLAN_ROWS = [
  { label: "دریافت مشخصات فنی", percent: 20, hint: "قطر شفت، گشتاور، دور" },
  { label: "محاسبه و انتخاب مدل", percent: 20, hint: "گشتاور برگشت × ضریب سرویس" },
  { label: "تأیید نقشه‌ی نصب", percent: 20, hint: "محل نصب و اهرم بک‌استاپ" },
  { label: "تأمین و ارسال", percent: 30, hint: "آماده‌ی نصب روی شفت" },
  { label: "پشتیبانی پس از فروش", percent: 10, hint: "بازرسی و تعویض المان" },
];

export function PlanTimeline() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const bars = [...root.querySelectorAll<HTMLElement>("[data-plan-bar]")];
    const tweens = bars.map((bar) =>
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: Number(bar.dataset.value ?? 20) / 100,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: bar, start: "top 92%", once: true },
        },
      ),
    );
    return () => {
      for (const t of tweens) {
        t.scrollTrigger?.kill();
        t.kill();
      }
    };
  }, []);

  return (
    <section id="choose" ref={rootRef} className="plan-section" aria-labelledby="plan-title">
      <div className="plan-inner">
        <div className="plan-head">
          <FadeUp>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              مسیر همکاری
            </p>
            <h2 id="plan-title" className="plan-title">
              <WordReveal text="از مشخصات تا نصب، پنج قدم" mode="scroll" />
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="plan-cta">
              <Link href="/contact" className="cinema-btn cinema-btn-solid">
                شروع مشاوره
              </Link>
              <Link href="/ringspann" className="cinema-btn cinema-btn-line">
                جدول ابعاد
              </Link>
            </div>
          </FadeUp>
        </div>

        <ol className="plan-list">
          {PLAN_ROWS.map((row, index) => (
            <li key={row.label} className="plan-row">
              <span className="plan-row-index" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="plan-row-label">{row.label}</span>
              <span className="plan-row-hint">{row.hint}</span>
              <span className="plan-row-track" aria-hidden="true">
                <span
                  className="plan-row-bar"
                  data-plan-bar
                  data-value={row.percent}
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
              <span className="plan-row-value" dir="ltr">
                {row.percent}%
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
