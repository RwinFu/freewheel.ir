"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { FadeUp, WordReveal } from "@/components/home/kit";
import { MotionImage } from "@/components/home/motion-media";
import { MotionFilm } from "@/components/media/film";
import { PLANT_FILMS, SPIN_FILM } from "@/content/media";
import { HOME_STILL } from "@/content/home-media";
import type { HomeStill } from "@/content/home-media";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- خانواده‌های محصول — سوآپ تصویر مثل Residences ---------------- */

type FamilyTab = {
  key: string;
  label: string;
  english: string;
  count: string;
  desc: string;
  href: string;
  still?: HomeStill;
  /** تبِ زنده: به‌جای عکس ساکن، فیلم چرخش قطعه پخش می‌شود */
  live?: boolean;
};

const FAMILY_TABS: FamilyTab[] = [
  {
    key: "sprag",
    label: "اسپراگ",
    english: "SPRAG",
    count: "۲ سری",
    live: true,
    desc: "المان‌های گوه‌ای فولادی بین دو حلقه؛ برای گشتاور بالا و درگیری مطمئن. سری FB و FZ.",
    href: "/ringspann/fb",
  },
  {
    key: "roller",
    label: "رولری",
    english: "ROLLER",
    count: "۲ سری",
    still: HOME_STILL.familyRoller,
    desc: "غلتک‌هایی در فضای گوه‌ای؛ ساختاری رایج و فشرده برای کاربردهای عمومی. سری FGR و BM.",
    href: "/ringspann/fgr-r",
  },
  {
    key: "backstop",
    label: "بک‌استاپ",
    english: "BACKSTOP",
    count: "۲ سری",
    still: HOME_STILL.familyBackstop,
    desc: "نصب روی شفت برای جلوگیری از برگشت بار؛ با اهرم یا آب‌بندی‌شده. سری FRHN و FKh.",
    href: "/ringspann/frhn",
  },
  {
    key: "indexed",
    label: "ایندکسینگ",
    english: "INDEXING",
    count: "کاربرد ویژه",
    still: HOME_STILL.familyIndexing,
    desc: "حرکت پله‌ای و تکرارپذیر برای ماشین‌های بسته‌بندی، چاپ و مونتاژ.",
    href: "/applications/packaging",
  },
];

export function FamilyShowcase() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const rows = [...root.querySelectorAll<HTMLElement>("[data-family-tab]")];
    const tweens = rows.map((row, index) =>
      gsap.fromTo(
        row,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
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

  const current = FAMILY_TABS[active];

  return (
    <section id="families" ref={rootRef} className="family-section" aria-labelledby="family-title">
      <div className="family-inner">
        <div className="family-head">
          <FadeUp>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              خانواده‌های محصول
            </p>
            <h2 id="family-title" className="family-title">
              <WordReveal text="چهار مسیر برای یک حرکت یک‌طرفه" mode="scroll" />
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <Link href="/ringspann" className="family-viewall">
              دیدن همه‌ی سری‌ها
              <span aria-hidden="true">←</span>
            </Link>
          </FadeUp>
        </div>

        {/* تب‌ها — مثل Studio / One Bedroom در مرجع */}
        <div className="family-tabs" role="tablist" aria-label="خانواده‌های محصول">
          {FAMILY_TABS.map((tab, index) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={index === active}
              data-family-tab
              className={index === active ? "family-tab is-active" : "family-tab"}
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
            >
              <span className="family-tab-en" dir="ltr">
                {tab.english}
              </span>
              <span className="family-tab-fa">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* نمایش: تصویر + توضیح که با انتخاب تب عوض می‌شود */}
        <div className="family-stage">
          <div className="family-media">
            {FAMILY_TABS.map((tab, index) => (
              <div
                key={tab.key}
                className={index === active ? "family-layer is-active" : "family-layer"}
                aria-hidden="true"
              >
                {tab.live ? (
                  <MotionFilm
                    media={SPIN_FILM}
                    priority={index === 0}
                    videoClassName="family-layer-video"
                  />
                ) : tab.still ? (
                  <MotionImage
                    still={tab.still}
                    motion="drift"
                    sizes="(min-width: 900px) 58vw, 92vw"
                    duration={index % 2 === 0 ? 27 : 33}
                    delay={index * 1.2}
                    imgClassName="family-layer-img"
                  />
                ) : null}
              </div>
            ))}
            <div className="family-media-frame" />
            <span className="family-media-count">{current.count}</span>
          </div>

          <div className="family-copy" role="tabpanel">
            <span className="family-copy-en" dir="ltr">
              {current.english}
            </span>
            <h3 className="family-copy-title">{current.label}</h3>
            <p className="family-copy-desc">{current.desc}</p>
            <Link href={current.href} className="cinema-btn cinema-btn-dark">
              مشاهده‌ی سری‌ها
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ریشه‌ها — صحنه‌ی چسبیده با کراس‌فید و حروفِ رانش ---------------- */

/**
 * «ریشه‌ی اطمینان» — تمام‌عرض و میخکوب‌شده.
 *
 * دو لایه روی هم: اول عکس محصول، بعد فیلم واقعی خط تولید. با اسکرول، لایه‌ی
 * دوم از پایین بالا می‌آید و اولی عقب می‌رود؛ حروف لاتین هم با سرعت متفاوت
 * از پشت متن رد می‌شوند تا عمق حس شود.
 */
export function RootsSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        "[data-roots-a]",
        { scale: 1.18, yPercent: -4 },
        { scale: 1.04, yPercent: 4, ease: "none", duration: 1 },
        0,
      );

      timeline.fromTo(
        "[data-roots-b]",
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.22 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1.06, ease: "power2.inOut", duration: 0.45 },
        0.34,
      );

      timeline.fromTo(
        "[data-roots-letters]",
        { xPercent: 6 },
        { xPercent: -22, ease: "none", duration: 1 },
        0,
      );

      timeline.fromTo(
        "[data-roots-copy]",
        { yPercent: 8, opacity: 0.25 },
        { yPercent: -6, opacity: 1, ease: "none", duration: 0.5 },
        0.2,
      );

      timeline.fromTo(
        "[data-roots-rule]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 0.5 },
        0.28,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drive-system"
      ref={rootRef}
      className="roots-section"
      aria-labelledby="roots-title"
    >
      <div ref={stageRef} className="roots-stage">
        <div className="roots-media" aria-hidden="true">
          <div className="roots-layer roots-layer-a" data-roots-a>
            <MotionImage
              still={HOME_STILL.rootsA}
              motion="still"
              sizes="100vw"
              imgClassName="roots-layer-img"
            />
          </div>
          <div className="roots-layer roots-layer-b" data-roots-b>
            <MotionFilm media={PLANT_FILMS.conveyor} backdrop sizes="100vw" />
          </div>
          <div className="roots-scrim" />
        </div>

        <div className="roots-letters" data-roots-letters aria-hidden="true">
          <span dir="ltr">I N S I D E &nbsp; T H E &nbsp; D R I V E &nbsp;·&nbsp; F R E E W H E E L &nbsp;·&nbsp; I N S I D E &nbsp; T H E &nbsp; D R I V E</span>
        </div>

        <div className="roots-inner" data-roots-copy>
          <p className="roots-eyebrow">
            <span className="statement-eyebrow-rule" aria-hidden="true" />
            در دلِ سامانه
          </p>
          <h2 id="roots-title" className="roots-title">
            <WordReveal text="ریشه‌ی اطمینان" mode="scroll" />
          </h2>
          <p className="roots-body">
            <WordReveal
              text="در هر درایو، فری‌ویل کوچک‌ترین قطعه‌ای است که بیشترین مسئولیت را دارد: نگه‌داشتن بار در همان لحظه‌ای که همه‌چیز می‌خواهد برگردد."
              mode="scroll"
              stagger={0.03}
            />
          </p>
          <FadeUp delay={0.1}>
            <Link href="/about" className="cinema-btn cinema-btn-ghost">
              درباره‌ی ما
            </Link>
          </FadeUp>

          <ol className="roots-counters" aria-hidden="true">
            <li className="is-active">01</li>
            <li>02</li>
          </ol>
        </div>

        <span className="roots-scene-rule" data-roots-rule aria-hidden="true" />
      </div>
    </section>
  );
}

/* ---------------- امکانات — تصویر بزرگ + تامبنیل‌های عوض‌شونده مثل Amenities ---------------- */

const AMENITIES = [
  {
    key: "overrunning",
    en: "OVERRUNNING",
    label: "اوررانینگ",
    desc: "وقتی خروجی سریع‌تر از ورودی می‌چرخد؛ فری‌ویل آزاد می‌ماند و مانع نمی‌شود.",
    still: HOME_STILL.lifeOff,
  },
  {
    key: "indexing",
    en: "INDEXING",
    label: "ایندکسینگ",
    desc: "حرکت پله‌ای دقیق برای هر بار چرخش؛ بدون نیاز به سروو و فرمان الکتریکی.",
    still: HOME_STILL.drawnCup,
  },
  {
    key: "backstop",
    en: "BACKSTOP",
    label: "بک‌استاپ",
    desc: "قفل فوری در جهت برگشت؛ ایمنی بار روی شیب و نوارهای سنگین.",
    still: HOME_STILL.sealed,
  },
  {
    key: "dual",
    en: "DUAL DRIVE",
    label: "دو محرکه",
    desc: "دو موتور روی یک محور با یک فری‌ویل؛ بار بین دو محرک تقسیم می‌شود.",
    still: HOME_STILL.internal,
  },
];

export function AmenitySwitcher() {
  const [active, setActive] = useState(0);
  const current = AMENITIES[active];

  return (
    <section id="mechanism" className="amenity-section" aria-labelledby="amenity-title">
      <div className="amenity-inner">
        <div className="amenity-head">
          <FadeUp>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              حالت‌های کارکرد
            </p>
            <h2 id="amenity-title" className="amenity-title">
              <WordReveal text="یک قطعه، چهار نقش در خط تولید" mode="scroll" />
            </h2>
          </FadeUp>
        </div>

        <div className="amenity-stage">
          <div className="amenity-media">
            {AMENITIES.map((item, index) => (
              <div
                key={item.key}
                className={index === active ? "amenity-layer is-active" : "amenity-layer"}
                aria-hidden="true"
              >
                <MotionImage
                  still={item.still}
                  motion="drift"
                  sizes="(min-width: 900px) 55vw, 92vw"
                  duration={25 + index * 3}
                  delay={index * 1.1}
                  imgClassName="amenity-layer-img"
                />
              </div>
            ))}
            <div className="amenity-media-frame" />
          </div>

          <div className="amenity-copy">
            <span className="family-copy-en" dir="ltr">
              {current.en}
            </span>
            <h3 className="family-copy-title">{current.label}</h3>
            <p className="family-copy-desc">{current.desc}</p>
          </div>
        </div>

        {/* تامبنیل‌های پایین — کلیک/هور برای عوض‌شدن تصویر بزرگ */}
        <div className="amenity-thumbs" role="tablist" aria-label="حالت‌های کارکرد">
          {AMENITIES.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? "amenity-thumb is-active" : "amenity-thumb"}
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
            >
              <span className="amenity-thumb-img">
                <MotionImage still={item.still} motion="still" sizes="120px" sheen={false} />
              </span>
              <span className="amenity-thumb-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
