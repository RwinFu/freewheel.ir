"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { WordReveal } from "@/components/home/kit";
import { PART_CUTOUT } from "@/content/device-media";

gsap.registerPlugin(ScrollTrigger);

/**
 * «چرا فری‌ویل» — صحنه‌ی چسبیده، نه یک بلوک متنی.
 *
 * همان الگویی که در بخش هویت پیاده شد، این‌جا با یک تفاوت: تصویرها در یک
 * ریلِ افقی پشت متن می‌نشینند و با اسکرول از کنارِ هم می‌گذرند، در حالی که
 * جمله‌ها کلمه‌به‌کلمه روشن می‌شوند. صحنه ثابت است، تصویر و متن حرکت می‌کنند.
 */
/**
 * تصویرها عکس عمومی کارخانه نیستند: کات‌اوت خودِ چهار خانواده‌ی محصول‌اند،
 * بدون پس‌زمینه، پس روی صحنه‌ی تیره شناور می‌مانند و با متن یکی حرف می‌زنند.
 */
const FRAMES = [
  { part: PART_CUTOUT.sprag, depth: 0.8, rotate: -3.2 },
  { part: PART_CUTOUT.roller, depth: 1.5, rotate: 2.4 },
  { part: PART_CUTOUT.backstop, depth: 1.1, rotate: -1.4 },
  { part: PART_CUTOUT.liftoff, depth: 0.6, rotate: 3 },
];

export function StatementScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    if (prefersReducedMotion()) {
      gsap.set(stage.querySelectorAll("[data-frame]"), {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      });
      gsap.set(stage.querySelectorAll(".stmt-title .fw-word-inner"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // ریل افقی: کل قاب‌ها از راست به چپ (RTL) از جلوی چشم رد می‌شوند.
      timeline.fromTo(
        "[data-rail]",
        { xPercent: 9 },
        { xPercent: -13, ease: "none", duration: 1 },
        0,
      );

      gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame, index) => {
        timeline.fromTo(
          frame,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            rotate: Number(frame.dataset.rotate ?? 0) * 3,
            scale: 1.16,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            rotate: Number(frame.dataset.rotate ?? 0),
            scale: 1,
            duration: 0.26,
            ease: "power2.out",
          },
          0.04 + index * 0.07,
        );

        // هر قاب با عمق خودش بالا می‌رود؛ قاب‌های نزدیک‌تر تندتر
        timeline.to(
          frame,
          { yPercent: -16 * Number(frame.dataset.depth ?? 1), ease: "none", duration: 1 },
          0.1,
        );
      });

      // جمله‌ها از خاکستری به کامل
      timeline.fromTo(
        ".stmt-title .fw-word-inner",
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.02,
          duration: 0.34,
        },
        0.02,
      );

      timeline.fromTo(
        "[data-scene-rule]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 0.7 },
        0.15,
      );

      timeline.to("[data-stmt-copy]", { yPercent: -6, ease: "none", duration: 1 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="stmt-scene" aria-labelledby="statement-title">
      <div ref={stageRef} className="stmt-stage">
        {/* ریل تصویر — پشت متن می‌گذرد */}
        <div className="stmt-rail" data-rail dir="ltr" aria-hidden="true">
          {FRAMES.map((frame, index) => (
            <figure
              key={frame.part.src}
              data-frame
              data-depth={frame.depth}
              data-rotate={frame.rotate}
              className={`stmt-frame stmt-frame-${index + 1}`}
            >
              <Image
                src={frame.part.src}
                alt={frame.part.alt}
                width={frame.part.width}
                height={frame.part.height}
                sizes="(min-width: 900px) 30vw, 60vw"
                className="stmt-frame-img"
              />
            </figure>
          ))}
        </div>

        <div className="stmt-veil" aria-hidden="true" />

        <div className="stmt-copy" data-stmt-copy>
          <p className="statement-eyebrow">
            <span className="statement-eyebrow-rule" aria-hidden="true" />
            چرا فری‌ویل
          </p>

          <h2 id="statement-title" className="stmt-title">
            <WordReveal
              text="هر جا باری روی شیب ایستاد، هر جا دو محرک با هم کار می‌کنند و هر جا حرکت پله‌ای لازم است،"
              mode="static"
              as="span"
              stagger={0.02}
            />
          </h2>

          <h3 className="stmt-title stmt-title-accent">
            <WordReveal
              text="فری‌ویل همان قطعه‌ی کوچکی است که خط را سرپا نگه می‌دارد."
              mode="static"
              stagger={0.02}
            />
          </h3>

          <div className="stmt-foot">
            <div className="stmt-actions">
              <Link href="/applications" className="cinema-btn cinema-btn-solid">
                کاربردها را ببین
              </Link>
              <Link href="/articles/freewheel-sizing" className="cinema-btn cinema-btn-ghost">
                راهنمای انتخاب
              </Link>
            </div>

            <ol className="stmt-counters" aria-hidden="true">
              <li>01</li>
              <li>02</li>
              <li>03</li>
            </ol>
          </div>
        </div>

        <span className="stmt-scene-rule" data-scene-rule aria-hidden="true" />
        <div className="stmt-scene-foot" aria-hidden="true">
          <span>۰۳ — چرا فری‌ویل</span>
          <span>SCROLL TO MOVE</span>
        </div>
      </div>
    </section>
  );
}
