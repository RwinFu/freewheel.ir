"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { MotionMedia } from "@/content/media";
import { cn } from "@/lib/utils";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/**
 * ترجیح کاربر را از سیستم می‌خواند. در سرور «کاهش حرکت» فرض می‌شود تا هیچ
 * منبع ویدیویی در HTML اولیه نیاید؛ کلاینت بعد از hydration تصمیم می‌گیرد.
 */
function useReducedMotion() {
  const getSnapshot = useCallback(() => window.matchMedia(REDUCED_QUERY).matches, []);
  return useSyncExternalStore(subscribeReduced, getSnapshot, () => true);
}

/**
 * ویدیوی بدون صدا و بی‌پایان، دقیقاً همان جای عکس.
 *
 * قواعدی که رعایت می‌کند تا ویدیو به سایت آسیب نزند:
 * - فقط وقتی در دید است پخش می‌شود؛ بیرون از دید متوقف می‌شود (باتری و CPU)
 * - تب پنهان = توقف
 * - `prefers-reduced-motion` = فقط پوستر، ویدیو هرگز دانلود نمی‌شود
 * - `poster` همیشه ست است، پس حتی قبل از پخش قاب درستی دیده می‌شود
 * - `muted` + `playsInline` + `loop`، بدون هیچ کنترل صوتی
 */
export function MotionFilm({
  media,
  className,
  videoClassName,
  sizes,
  priority = false,
  /** ویدیو در پس‌زمینه‌ی متن است؛ با این گزینه تیره‌تر و کم‌کنتراست‌تر می‌شود */
  backdrop = false,
  overlay,
}: {
  media: MotionMedia;
  className?: string;
  videoClassName?: string;
  sizes?: string;
  priority?: boolean;
  backdrop?: boolean;
  overlay?: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /** تا وقتی مطمئن نشده‌ایم حرکت مجاز است، حتی یک بایت ویدیو دانلود نمی‌کنیم */
  const armed = !useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video || !armed) return;

    // پخش فقط در دید؛ خارج از دید فوراً متوقف می‌شود.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          void video.play().catch(() => {
            /* پخش خودکار ممنوع شد؛ پوستر می‌ماند، چیزی نمی‌شکند */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "15% 0px", threshold: 0.05 },
    );
    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (wrap.getBoundingClientRect().top < window.innerHeight) {
        void video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [armed]);

  return (
    <div ref={wrapRef} className={cn("fw-film", className)} data-ready={ready ? "yes" : "no"}>
      <video
        ref={videoRef}
        className={cn("fw-film-video", videoClassName)}
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        autoPlay={priority}
        aria-label={media.title}
        onCanPlay={() => setReady(true)}
      >
        {armed ? (
          <>
            <source src={media.webm} type="video/webm" />
            <source src={media.mp4} type="video/mp4" />
          </>
        ) : null}
      </video>
      <span className="fw-film-grade" aria-hidden="true" />
      {backdrop ? <span className="fw-film-scrim" aria-hidden="true" /> : null}
      {overlay}
    </div>
  );
}

/**
 * گیف — همان قطعه، برای جایی که ویدیو پخش نمی‌شود (پیش‌نمایش چت، ایمیل،
 * شبکه‌های اجتماعی) و برای دانلود سریع. با کلیک، نسخه‌ی ویدیویی سنگین‌تر
 * جایگزین می‌شود.
 */
export function LoopGif({
  media,
  className,
  size = 280,
  label,
}: {
  media: MotionMedia;
  className?: string;
  size?: number;
  label?: string;
}) {
  if (!media.gif) return null;
  return (
    <figure className={cn("fw-gif", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- گیف متحرک است و از بهینه‌ساز Next عبور نمی‌کند */}
      <img
        src={media.gif}
        alt={label ?? media.title}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="fw-gif-img"
      />
      <figcaption className="fw-gif-caption">
        <span>{media.title}</span>
        <a href={media.gif} download className="fw-gif-download">
          GIF
        </a>
        <a href={media.mp4} download className="fw-gif-download">
          MP4
        </a>
      </figcaption>
    </figure>
  );
}
