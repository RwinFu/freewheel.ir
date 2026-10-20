"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { FadeUp, WordReveal } from "@/components/home/kit";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- خانواده‌های محصول — سوآپ تصویر مثل Residences ---------------- */

const FAMILY_TABS = [
  {
    key: "sprag",
    label: "اسپراگ",
    english: "SPRAG",
    count: "۲ سری",
    image: "/images/freewheel-exploded.webp",
    desc: "المان‌های گوه‌ای فولادی بین دو حلقه؛ برای گشتاور بالا و درگیری مطمئن. سری FB و FZ.",
    href: "/ringspann/fb",
  },
  {
    key: "roller",
    label: "رولری",
    english: "ROLLER",
    count: "۲ سری",
    image: "/images/panorama-night.jpg",
    desc: "غلتک‌هایی در فضای گوه‌ای؛ ساختاری رایج و فشرده برای کاربردهای عمومی. سری FGR و BM.",
    href: "/ringspann/fgr-r",
  },
  {
    key: "backstop",
    label: "بک‌استاپ",
    english: "BACKSTOP",
    count: "۲ سری",
    image: "/images/drive-panorama.jpg",
    desc: "نصب روی شفت برای جلوگیری از برگشت بار؛ با اهرم یا آب‌بندی‌شده. سری FRHN و FKh.",
    href: "/ringspann/frhn",
  },
  {
    key: "indexed",
    label: "ایندکسینگ",
    english: "INDEXING",
    count: "کاربرد ویژه",
    image: "/images/hero-drive.jpg",
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
                <Image
                  src={tab.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 58vw, 92vw"
                  className="family-layer-img"
                />
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

/* ---------------- ریشه‌ها — دو تصویر و متن روایی مثل Your Roots ---------------- */

export function RootsSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 60%",
      end: "bottom 40%",
      onUpdate: (self) => setSlide(self.progress > 0.45 ? 1 : 0),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id="drive-system"
      ref={rootRef}
      className="roots-section"
      aria-labelledby="roots-title"
    >
      <div className="roots-media" aria-hidden="true">
        <div className={slide === 0 ? "roots-layer is-active" : "roots-layer"}>
          <Image
            src="/images/drive-panorama.jpg"
            alt=""
            fill
            sizes="100vw"
            className="roots-layer-img"
          />
        </div>
        <div className={slide === 1 ? "roots-layer is-active" : "roots-layer"}>
          <Image
            src="/images/panorama-night.jpg"
            alt=""
            fill
            sizes="100vw"
            className="roots-layer-img"
          />
        </div>
        <div className="roots-scrim" />
      </div>

      <div className="roots-inner">
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
            stagger={0.04}
          />
        </p>
        <FadeUp delay={0.1}>
          <Link href="/about" className="cinema-btn cinema-btn-ghost">
            درباره‌ی ما
          </Link>
        </FadeUp>

        <ol className="roots-counters" aria-hidden="true">
          <li className={slide === 0 ? "is-active" : ""}>01</li>
          <li className={slide === 1 ? "is-active" : ""}>02</li>
        </ol>
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
    image: "/images/hero-drive.jpg",
  },
  {
    key: "indexing",
    en: "INDEXING",
    label: "ایندکسینگ",
    desc: "حرکت پله‌ای دقیق برای هر بار چرخش؛ بدون نیاز به سروو و فرمان الکتریکی.",
    image: "/images/panorama-night.jpg",
  },
  {
    key: "backstop",
    en: "BACKSTOP",
    label: "بک‌استاپ",
    desc: "قفل فوری در جهت برگشت؛ ایمنی بار روی شیب و نوارهای سنگین.",
    image: "/images/drive-panorama.jpg",
  },
  {
    key: "dual",
    en: "DUAL DRIVE",
    label: "دو محرکه",
    desc: "دو موتور روی یک محور با یک فری‌ویل؛ بار بین دو محرک تقسیم می‌شود.",
    image: "/images/freewheel-exploded.webp",
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
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 55vw, 92vw"
                  className="amenity-layer-img"
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
                <Image src={item.image} alt="" fill sizes="120px" />
              </span>
              <span className="amenity-thumb-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
