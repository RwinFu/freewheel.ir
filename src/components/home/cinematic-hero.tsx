"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { CharLatin, WordReveal } from "@/components/home/kit";

gsap.registerPlugin(ScrollTrigger);

/**
 * صفحه‌ی اول سینمایی — الگوی حرکتی Belgrade Arbor:
 * - تصویر تمام‌عرض با زوم آرام و پارالاکس اسکرول
 * - حروف لاتین با فاصله‌ی باز، تکی‌تکی از پایین می‌آیند
 * - تیتر فارسی کلمه‌به‌کلمه از پشت ماسک بالا می‌آید
 * - نوار پایین با شماره‌ی بخش‌ها و نشانگر اسکرول
 */
export function CinematicHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const veil = veilRef.current;
    if (!root || !img || !veil) return;

    if (prefersReducedMotion()) {
      root.classList.add("hero-ready");
      return;
    }

    // ورود: نقاب کنار می‌رود، تصویر از زوم ۱٫۲۵ آرام می‌شود
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.fromTo(
      veil,
      { scaleY: 1 },
      { scaleY: 0, duration: 1.25, transformOrigin: "top center" },
      0,
    )
      .fromTo(
        img,
        { scale: 1.28 },
        { scale: 1.06, duration: 2.2, ease: "power2.out" },
        0,
      )
      .add(() => root.classList.add("hero-ready"), 0.45);

    // پارالاکس اسکرول: تصویر دیرتر از محتوا حرکت می‌کند
    const parallax = gsap.to(img, {
      yPercent: 16,
      scale: 1.16,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    // محوشدن محتوا با پایین‌رفتن
    const fade = gsap.to(root.querySelector("[data-hero-copy]"), {
      opacity: 0,
      y: -70,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "32% top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
      fade.scrollTrigger?.kill();
      fade.kill();
    };
  }, []);

  return (
    <section id="hero" ref={rootRef} className="cinema-hero" aria-labelledby="hero-title">
      <div className="cinema-hero-media" ref={imgRef}>
        <Image
          src="/images/hero-drive.jpg"
          alt="ایستگاه درایو نوار نقاله: موتور، گیربکس و پولی در نور شب"
          fill
          priority
          sizes="100vw"
          className="cinema-hero-img"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//Z"
        />
      </div>
      <div className="cinema-hero-scrim" aria-hidden="true" />
      <div className="cinema-hero-veil" ref={veilRef} aria-hidden="true" />

      {/* حروف لاتین با فاصله‌ی باز — مثل BLG R A D E A R B O R */}
      <div className="cinema-hero-letters" aria-hidden="true">
        <CharLatin text="FREEWHEEL" className="cinema-letters-row" mode="load" stagger={0.07} />
        <CharLatin text="INDUSTRIAL" className="cinema-letters-row cinema-letters-dim" mode="load" stagger={0.05} />
      </div>

      <div className="cinema-hero-copy" data-hero-copy>
        <p className="cinema-hero-kicker">
          <span className="cinema-hero-kicker-dot" aria-hidden="true" />
          مرجع فنی فری‌ویل و کلاچ یک‌طرفه
        </p>

        <h1 id="hero-title" className="cinema-hero-title">
          <WordReveal text="آزاد در یک جهت،" mode="load" stagger={0.09} />
          <span className="cinema-hero-title-accent">
            <WordReveal text="قفل در جهت دیگر." mode="load" stagger={0.09} />
          </span>
        </h1>

        <p className="cinema-hero-dek">
          <WordReveal
            text="فری‌ویل بدون برق و فرمان، به‌محض برگشت بار دو شفت را به هم قفل می‌کند. اینجا سازوکار، کاربردها و مدل‌هایش را ساده و دقیق ببین."
            mode="enter"
            stagger={0.02}
          />
        </p>

        <div className="cinema-hero-actions">
          <Link href="/#intro" className="cinema-btn cinema-btn-solid">
            ورود به داستان
          </Link>
          <Link href="/ringspann" className="cinema-btn cinema-btn-ghost">
            کاتالوگ مدل‌ها
          </Link>
        </div>
      </div>

      {/* نوار پایین: شماره‌ی بخش‌ها */}
      <div className="cinema-hero-foot" aria-hidden="true">
        <span className="cinema-hero-scroll">
          <span className="cinema-hero-scroll-mark">↓</span>
          اسکرول کن
        </span>
        <span className="cinema-hero-index" dir="ltr">
          01 <i /> 02 <i /> 03 <i /> 04 <i /> 05
        </span>
      </div>
    </section>
  );
}
