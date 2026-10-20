"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { FadeUp, WordReveal } from "@/components/home/kit";

gsap.registerPlugin(ScrollTrigger);

/**
 * بخش «هویت» — متن کلمه‌به‌کلمه روی تصویر تمام‌عرض، مثل بخش معرفی Belgrade Arbor.
 * متن بزرگ با اسکرول کلمه‌به‌کلمه می‌آید و تصویر پارالاکس دارد.
 */
export function IdentityPanel() {
  const rootRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    const root = rootRef.current;
    if (!img || !root || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      img,
      { yPercent: -12, scale: 1.18 },
      {
        yPercent: 12,
        scale: 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="intro" ref={rootRef} className="identity-panel" aria-labelledby="identity-title">
      <div className="identity-media" ref={imgRef}>
        <Image
          src="/images/drive-panorama.jpg"
          alt="پانورامای سامانه‌ی انتقال قدرت از موتور تا نوار نقاله"
          fill
          sizes="100vw"
          className="identity-img"
        />
        <div className="identity-scrim" aria-hidden="true" />
      </div>

      {/* ردیف حروف لاتین لبه‌ی بالا — مثل BLG R A D E A R B O R D E S I G N */}
      <div className="identity-letters" aria-hidden="true">
        <span dir="ltr">F R E E W H E E L · S P R A G · R O L L E R · B A C K S T O P</span>
      </div>

      <div className="identity-copy">
        <h2 id="identity-title" className="identity-title">
          <WordReveal
            text="هویت فری‌ویل در یک جمله است: حرکت در یک جهت، ایست کامل در جهت دیگر."
            mode="scroll"
            stagger={0.05}
          />
        </h2>
        <p className="identity-sub">
          <WordReveal
            text="نه برق می‌خواهد، نه سنسور؛ فقط یک برگشت ساده کافی است تا گوه‌های فولادی بین دو حلقه قفل شوند."
            mode="scroll"
            stagger={0.035}
          />
        </p>
      </div>
    </section>
  );
}

/**
 * بخش «فصل تازه» — دو متن بزرگ که با اسکرول پشت‌سرهم می‌آیند + CTA،
 * دقیقاً مثل بخش «A New Chapter in Prestigious Living» مرجع.
 */
export function StatementSection() {
  return (
    <section className="statement-section" aria-label="بیانیه">
      <div className="statement-inner">
        <FadeUp>
          <p className="statement-eyebrow">
            <span className="statement-eyebrow-rule" aria-hidden="true" />
            چرا فری‌ویل
          </p>
        </FadeUp>

        <h3 className="statement-line">
          <WordReveal
            text="هر جا باری روی شیب ایستاد، هر جا دو محرک با هم کار می‌کنند و هر جا حرکت پله‌ای لازم است،"
            mode="scroll"
            stagger={0.04}
          />
        </h3>
        <h3 className="statement-line statement-line-accent">
          <WordReveal
            text="فری‌ویل همان قطعه‌ی کوچکی است که خط را سرپا نگه می‌دارد."
            mode="scroll"
            stagger={0.04}
          />
        </h3>

        <FadeUp delay={0.1}>
          <div className="statement-actions">
            <Link href="/applications" className="cinema-btn cinema-btn-dark">
              کاربردها را ببین
            </Link>
            <Link href="/articles/freewheel-sizing" className="cinema-btn cinema-btn-line">
              راهنمای انتخاب
            </Link>
          </div>
        </FadeUp>

        {/* شمارنده‌های مرجع: ۰۱ ۰۲ ۰۳ */}
        <FadeUp delay={0.15}>
          <ol className="statement-counters" aria-hidden="true">
            <li>01</li>
            <li>02</li>
            <li>03</li>
          </ol>
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * بخش «چه چیزی اطراف است» — لیست تعاملی با تصویر بزرگ که با هاور/انتخاب عوض می‌شود،
 * مثل بخش Location مرجع (Railway Station, School, ...).
 */
export function AroundList() {
  const items = [
    {
      id: "conveyor",
      label: "نوار نقاله و بک‌استاپ",
      time: "پرکاربردترین",
      desc: "وقتی خط می‌ایستد، فری‌ویل جلوی برگشت ناخواسته‌ی نوار را می‌گیرد؛ به‌خصوص روی شیب.",
      image: "/images/drive-panorama.jpg",
    },
    {
      id: "textile",
      label: "نساجی و ریسندگی",
      time: "حرکت پله‌ای",
      desc: "برای جداکردن دو محرک و تغذیه‌ی نخ؛ جایی که کشش باید حفظ شود ولی برگشت ممنوع است.",
      image: "/images/hero-drive.jpg",
    },
    {
      id: "packaging",
      label: "بسته‌بندی و پالتیزه",
      time: "تکرارپذیر",
      desc: "حرکت مرحله‌ای ماشین‌های بسته‌بندی با ایندکسینگ مکانیکی و بدون فرمان الکتریکی.",
      image: "/images/panorama-night.jpg",
    },
    {
      id: "backstop",
      label: "بک‌استاپ شفت‌های سنگین",
      time: "ایمنی بار",
      desc: "روی شفت درایو یا گیربکس نصب می‌شود و در لحظه‌ی برگشت، بدون تأخیر قفل می‌کند.",
      image: "/images/freewheel-exploded.webp",
    },
  ];

  const listRef = useRef<HTMLUListElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const stage = stageRef.current;
    if (!list || !stage || prefersReducedMotion()) return;

    const rows = [...list.querySelectorAll<HTMLElement>("[data-around-row]")];
    const layers = [...stage.querySelectorAll<HTMLElement>("[data-around-layer]")];

    const activate = (index: number) => {
      rows.forEach((row, i) => row.classList.toggle("is-active", i === index));
      layers.forEach((layer, i) => layer.classList.toggle("is-active", i === index));
    };

    activate(0);
    const cleanups: Array<() => void> = [];
    rows.forEach((row, index) => {
      const onEnter = () => activate(index);
      const onFocus = () => activate(index);
      row.addEventListener("pointerenter", onEnter);
      row.addEventListener("focusin", onFocus);
      cleanups.push(() => {
        row.removeEventListener("pointerenter", onEnter);
        row.removeEventListener("focusin", onFocus);
      });
    });

    // با اسکرول موبایل: نزدیک‌ترین ردیف به وسط صفحه فعال می‌شود
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = rows.indexOf(entry.target as HTMLElement);
            if (index >= 0) activate(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((row) => observer.observe(row));

    return () => {
      observer.disconnect();
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return (
    <section id="applications" className="around-section" aria-labelledby="around-title">
      <div className="around-inner">
        <div className="around-head">
          <FadeUp>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              کاربردها
            </p>
            <h2 id="around-title" className="around-title">
              <WordReveal text="فری‌ویل کجای خط شما می‌نشیند؟" mode="scroll" />
            </h2>
          </FadeUp>
        </div>

        <div className="around-grid">
          <div className="around-stage" ref={stageRef} aria-hidden="true">
            {items.map((item, index) => (
              <div
                key={item.id}
                data-around-layer
                className={index === 0 ? "around-layer is-active" : "around-layer"}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 52vw, 92vw"
                  className="around-layer-img"
                />
              </div>
            ))}
            <div className="around-stage-frame" />
          </div>

          <ul className="around-list" ref={listRef}>
            {items.map((item, index) => (
              <li
                key={item.id}
                data-around-row
                tabIndex={0}
                className={index === 0 ? "around-row is-active" : "around-row"}
              >
                <span className="around-row-index" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="around-row-body">
                  <span className="around-row-top">
                    <span className="around-row-label">{item.label}</span>
                    <span className="around-row-time">{item.time}</span>
                  </span>
                  <span className="around-row-desc">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
