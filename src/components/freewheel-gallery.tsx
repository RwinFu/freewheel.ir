"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/components/motion";
import { GALLERY } from "@/content/product-images";

gsap.registerPlugin(ScrollTrigger);

/**
 * گالری افقی تصاویر فری‌ویل در صفحه‌ی اول.
 *
 * با اسکرول عمودی، نوار تصویرها افقی جلو می‌رود (پین + scrub). چون صفحه
 * `dir="rtl"` است، خودِ نوار `dir="ltr"` گرفته تا جهت translate ساده بماند؛
 * متن هر کارت جداگانه `dir="rtl"` دارد.
 *
 * در حالت `prefers-reduced-motion` پین حذف می‌شود و نوار یک اسکرول افقی
 * معمولی با snap است تا هیچ حرکتی تحمیل نشود.
 */
export function FreewheelGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReducedMotion()) {
      section.classList.add("gallery-fallback");
      return;
    }

    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // پارالاکس ظریف: تصویر هر کارت کمی دیرتر از قابش حرکت می‌کند
    const cards = [...track.querySelectorAll<HTMLDivElement>("[data-gallery-media]")];
    const parallaxes = cards.map((media) =>
      gsap.fromTo(
        media,
        { xPercent: 6 },
        {
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: media.closest("[data-gallery-card]"),
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

  return (
    <section
      id="gallery"
      aria-label="گالری تصاویر فری‌ویل"
      className="scroll-mt-24 overflow-hidden bg-ocean text-white"
    >
      <div className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-7 sm:pt-20 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              گالری قطعه
            </p>
            <h2 className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]">
              فری‌ویل را از نمای نزدیک ببین
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-white/70 sm:text-[15px] sm:leading-8">
              از المان‌های اسپراگ بین دو حلقه تا بک‌استاپ با اهرم؛ اسکرول کن تا خانواده‌های
              مختلف قطعه جلو بیایند.
            </p>
          </div>
          <p className="hidden items-center gap-2 text-[12px] text-white/50 md:inline-flex">
            اسکرول عمودی = حرکت افقی
            <span aria-hidden="true" className="inline-block h-[1px] w-10 bg-white/30" />
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="gallery-viewport relative mt-10 h-[400px] sm:h-[440px]"
        dir="ltr"
      >
        <div
          ref={trackRef}
          className="gallery-track flex h-full items-center gap-5 pl-[7vw] pr-[7vw] will-change-transform"
        >
          {GALLERY.map((item, index) => (
            <figure
              key={`${item.caption}-${index}`}
              data-gallery-card
              className="group w-[260px] shrink-0 sm:w-[330px]"
              dir="rtl"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/12 bg-[#0b2630]">
                <div data-gallery-media className="absolute -inset-x-4 inset-y-0 will-change-transform">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 330px, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06171e]/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span
                  dir="ltr"
                  className="tnum absolute left-3 top-3 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] text-white/70 backdrop-blur-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 px-1">
                <span className="text-[13.5px] font-bold text-white">{item.caption}</span>
                <span className="truncate text-[11px] text-white/55">{item.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-ocean to-transparent sm:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-ocean to-transparent sm:w-24"
          aria-hidden="true"
        />
      </div>

      <div className="h-14 sm:h-16" aria-hidden="true" />
    </section>
  );
}
