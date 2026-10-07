"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/components/motion";
import { SharedElement } from "@/components/page-transition";
import { getSeries } from "@/content/ringspann";
import { SERIES_FLOAT } from "@/content/product-images";

gsap.registerPlugin(ScrollTrigger);

/**
 * فری‌ویل‌های شناور: نسخه‌های بدون پس‌زمینه‌ی قطعه که روی سطح صفحه شناورند.
 *
 * موشن:
 * - ورود پلکانی با چرخش و scale وقتی بخش به دید می‌آید؛
 * - شناوری دائمی (bob) با فاز متفاوت برای هر قطعه؛
 * - چرخش هم‌زمان با اسکرول (اسپراگ/رولری مثل چرخ واقعی با اسکرول می‌چرخند)؛
 * - پارالاکس نشانگر با عمق متفاوت برای هر قطعه؛
 * - هاور: بزرگ‌شدن + هاله‌ی مینت + یک چرخش ضربه‌ای.
 *
 * ترنزیشن: هر قطعه یک لینک به صفحه‌ی سری خودش است و با `SharedElement`
 * همان نام تصویر کارت/جزئیات را دارد، پس هنگام ناوبری، قطعه‌ی شناور با
 * مورفِ View Transition داخل تصویر صفحه‌ی سری می‌نشیند.
 *
 * در `prefers-reduced-motion` همه‌ی این‌ها خاموش می‌شود و فقط چیدمان می‌ماند.
 */
export function FloatingFreewheels() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const floaties = [...root.querySelectorAll<HTMLElement>("[data-floaty]")];

    const ctx = gsap.context(() => {
      const cleanups: Array<() => void> = [];
      floaties.forEach((el, i) => {
        const bob = el.querySelector<HTMLElement>("[data-floaty-bob]");
        const spin = el.querySelector<HTMLElement>("[data-floaty-spin]");
        if (!bob || !spin) return;
        const turns = Number(el.dataset.turns ?? 0);

        // ورود
        gsap.from(el, {
          opacity: 0,
          scale: 0.72,
          rotation: -10,
          duration: 1.1,
          ease: "expo.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });

        // شناوری دائمی
        gsap.to(bob, {
          y: -16,
          duration: 2.4 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.35,
        });

        // چرخش با اسکرول
        if (turns !== 0) {
          gsap.to(spin, {
            rotation: turns * 360,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // هاور: بزرگ‌شدن + چرخش ضربه‌ای + هاله
        const enter = () => {
          gsap.to(bob, { scale: 1.07, duration: 0.5, ease: "power3.out" });
          gsap.to(spin, { rotation: "+=90", duration: 1.1, ease: "power2.out" });
          el.classList.add("floaty-hot");
        };
        const leave = () => {
          gsap.to(bob, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" });
          el.classList.remove("floaty-hot");
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // پارالاکس نشانگر با عمق متفاوت
      const movers = floaties.map((el) => ({
        el,
        depth: Number(el.dataset.depth ?? 18),
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = root.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        for (const mover of movers) {
          mover.x(px * mover.depth);
          mover.y(py * mover.depth * 0.7);
        }
      };
      const onLeave = () => {
        for (const mover of movers) {
          mover.x(0);
          mover.y(0);
        }
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);

      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        for (const cleanup of cleanups) cleanup();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const items = Object.entries(SERIES_FLOAT)
    .map(([slug, src]) => ({ slug, src, series: getSeries(slug) }))
    .filter((item) => item.series);

  return (
    <section
      aria-label="فری‌ویل‌های شناور"
      className="relative overflow-hidden text-white"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-mint/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[8%] h-80 w-80 rounded-full bg-coral/10 blur-3xl"
        aria-hidden="true"
      />

      <div ref={rootRef} className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-7 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              بدون قاب، روی صفحه
            </p>
            <h2 className="text-balance text-[28px] font-bold leading-[1.45] text-white sm:text-[36px]">
              قطعه‌ها را شناور ببین
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-white/70 sm:text-[15px] sm:leading-8">
              اسکرول کن تا چرخ‌ها بچرخند؛ نشانگر را روی هر قطعه ببر تا بزرگ شود و به صفحه‌ی همان
              سری مورف شود.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map(({ slug, src, series }, index) => (
            <SharedElement key={slug} name={`series-image-${slug}`}>
              <Link
                href={`/ringspann/${slug}`}
                transitionTypes={["nav-forward"]}
                data-floaty
                data-depth={14 + index * 8}
                data-turns={series?.element === "sprag" ? (index % 2 === 0 ? 1 : -1) : 0}
                className="floaty group relative block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
                aria-label={`دیدن سری ${series?.designation}`}
              >
                <div data-floaty-bob className="relative will-change-transform">
                  <div data-floaty-spin className="relative will-change-transform">
                    <Image
                      src={src}
                      alt={series?.designation ?? slug}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
                      className="floaty-img h-auto w-full"
                    />
                  </div>
                  <span
                    dir="ltr"
                    className="absolute -top-2 left-1 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] tracking-[0.14em] text-mint/90 backdrop-blur-sm"
                  >
                    {series?.designation}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 px-1">
                  <div>
                    <div className="text-[13.5px] font-bold text-white">{series?.family}</div>
                    <div className="mt-1 text-[11px] text-white/55">{series?.short}</div>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 opacity-0 transition-all duration-300 group-hover:border-mint group-hover:text-mint group-hover:opacity-100">
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </SharedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
