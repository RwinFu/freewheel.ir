"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { MotionImage } from "@/components/home/motion-media";
import { WordReveal } from "@/components/home/kit";
import { HOME_STILL } from "@/content/home-media";

gsap.registerPlugin(ScrollTrigger);

/**
 * بلوک تحریریه‌ی «هویت».
 *
 * الگوی مرجع این نیست که یک عکس تمام‌عرض پشت متن بنشیند؛ تصویرها مثل
 * بریده‌های یک مجله روی خودِ متن شنا می‌کنند و با اسکرول، هرکدام با عمق
 * متفاوت جلو می‌آید:
 *
 * - صحنه `sticky` است و در طول یک مسیر بلندتر (۱۴۰svh) ثابت می‌ماند؛ همه‌چیز
 *   از یک تایم‌لاین scrub می‌آید، نه پین گسپ — پس با اسکرول نرم Lenis نمی‌لرزد.
 * - هر تصویر سه حرکت دارد: ورود با ماسک عمودی، نشستن روی زاویه‌ی خودش، و
 *   پارالاکس با سرعت متناسب با «عمق»ش.
 * - متن از کم‌رنگ به کامل می‌رسد (`variant="dim"`)، همان مدل خواندنی مرجع.
 */
type FloatSpec = {
  key: string;
  still: (typeof HOME_STILL)[keyof typeof HOME_STILL];
  /** کلاس جای‌گیری — در CSS برای دسکتاپ و موبایل تعریف شده */
  className: string;
  /** ۱ = نزدیک‌ترین لایه تندترین پارالاکس */
  depth: number;
  /** زاویه‌ی نهایی، درجه */
  rotate: number;
  /** ترتیب ورود */
  order: number;
};

const FLOATS: FloatSpec[] = [
  {
    key: "macro",
    still: HOME_STILL.identity,
    className: "stack-fig stack-fig-a",
    depth: 1,
    rotate: -2.4,
    order: 0,
  },
  {
    key: "part",
    still: HOME_STILL.hero,
    className: "stack-fig stack-fig-b",
    depth: 1.7,
    rotate: 3.2,
    order: 1,
  },
  {
    key: "plant",
    still: HOME_STILL.packaging,
    className: "stack-fig stack-fig-c",
    depth: 0.7,
    rotate: -1.6,
    order: 2,
  },
];

export function EditorialStack() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    if (prefersReducedMotion()) {
      gsap.set(stage.querySelectorAll("[data-float]"), {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const figures = gsap.utils.toArray<HTMLElement>("[data-float]");

      // یک تایم‌لاین برای کل مسیر؛ اسکرول فقط پیشرفت این تایم‌لاین را عوض می‌کند.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      figures.forEach((fig) => {
        const depth = Number(fig.dataset.depth ?? 1);
        const rotate = Number(fig.dataset.rotate ?? 0);

        // ورود: از پایین، با ماسکی که از بالا باز می‌شود و کمی بزرگ‌تر از قاب
        timeline.fromTo(
          fig,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.12,
            rotate: rotate + (rotate > 0 ? 7 : -7),
            y: 90,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            rotate,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0.06 + Number(fig.dataset.order ?? 0) * 0.11,
        );

        // پارالاکس: تا آخر مسیر، لایه‌های نزدیک‌تر بیشتر جابه‌جا می‌شوند
        timeline.to(
          fig,
          {
            yPercent: -26 * depth,
            xPercent: (depth - 1) * 3,
            ease: "none",
            duration: 1,
          },
          0.16,
        );
      });

      // متن از کم‌رنگ به کامل: کلمه‌ها یکی‌یکی با اسکرول روشن می‌شوند،
      // همان مدل خواندنی مرجع. روی همان تایم‌لاین صحنه، نه یک تریگر جدا.
      timeline.fromTo(
        stage.querySelectorAll<HTMLElement>(".stack-title .fw-word-inner"),
        { opacity: 0.12, filter: "blur(0.6px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.012,
          duration: 0.34,
        },
        0.02,
      );
      timeline.fromTo(
        stage.querySelectorAll<HTMLElement>(".stack-sub .fw-word-inner"),
        { opacity: 0.08 },
        { opacity: 1, ease: "none", stagger: 0.006, duration: 0.22 },
        0.3,
      );

      // کل ستون متن کمی عقب‌تر می‌ماند تا عمق حس شود
      timeline.to(
        stage.querySelectorAll("[data-stack-copy]"),
        { yPercent: -7, ease: "none", duration: 1 },
        0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={rootRef}
      className="stack-section"
      aria-labelledby="intro-title"
    >
      <div ref={stageRef} className="stack-stage">
        <div className="stack-letters" aria-hidden="true">
          <span dir="ltr">F R E E W H E E L · I N D U S T R I A L · D R I V E</span>
        </div>

        <div className="stack-copy" data-stack-copy>
          <h2 id="intro-title" className="stack-title">
            <WordReveal
              text="هویت فری‌ویل در یک جمله است:"
              mode="static"
              stagger={0.035}
            />
            <br />
            <span className="stack-title-accent">
              <WordReveal
                text="حرکت در یک جهت، ایست کامل در جهت دیگر."
                mode="static"
                stagger={0.03}
              />
            </span>
          </h2>

          <p className="stack-sub">
            <WordReveal
              text="نه برق می‌خواهد، نه سنسور؛ فقط یک برگشت ساده کافی است تا گوه‌های فولادی بین دو حلقه قفل شوند."
              mode="static"
              stagger={0.02}
            />
          </p>
        </div>

        {FLOATS.map((item) => (
          <figure
            key={item.key}
            data-float
            data-depth={item.depth}
            data-rotate={item.rotate}
            data-order={item.order}
            className={item.className}
          >
            <MotionImage
              still={item.still}
              motion="scrub"
              sizes="(min-width: 900px) 30vw, 55vw"
              duration={30}
              sheen={false}
              imgClassName="stack-fig-img"
            />
            <figcaption className="stack-fig-caption" aria-hidden="true">
              <span dir="ltr">{String(item.order + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}

        <div className="stack-foot" aria-hidden="true">
          <span>۰۲ — هویت</span>
          <span className="stack-foot-line" />
          <span>نمای تحریریه</span>
        </div>
      </div>
    </section>
  );
}
