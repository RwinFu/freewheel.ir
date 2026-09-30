"use client";

/**
 * STEP 7 — the bottom-left media card.
 *
 * The spec calls for an autoplaying clip that never stops. This page ships no
 * external video: the "clip" is a Freewheel photo driven by a 24-second virtual
 * timeline split into four parts, so the four progress bars still mean
 * something. Everything is measured against that timeline, and a one-second
 * watchdog plus visibility/tap handlers make sure the motion can never stall —
 * the same guarantees the spec asked of the <video> element.
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { SHOWREEL_IMAGE, TIMING, type Copy } from "./content";
import { Words } from "./words";

const CYCLE_MS = 24_000;
const PART_MS = CYCLE_MS / 4;
const PART_COUNT = 4;

/** Slow camera move for each quarter: scale from→to, then x% and y% pan. */
const MOVES: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [1.06, 1.18, -2.5, 2.5, 0, 0],
  [1.18, 1.06, 2.5, -2.5, 0, 0],
  [1.06, 1.18, 0, 0, 2.5, -2.5],
  [1.18, 1.06, 0, 0, -2.5, 2.5],
];

export function Showreel({ copy }: { copy: Copy["showreel"] }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const clock = useRef({ start: 0, raf: 0, visible: true, hiddenAt: 0, part: 0 });
  const [part, setPart] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = clock.current;
    state.start = performance.now();

    const paint = (now: number) => {
      const elapsed = now - state.start;
      const cycle = ((elapsed % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;
      const index = Math.min(PART_COUNT - 1, Math.floor((cycle / CYCLE_MS) * PART_COUNT));

      if (index !== state.part) {
        state.part = index;
        setPart(index);
      }

      if (!reduced) {
        const local = cycle / PART_MS - index; // 0 → 1 inside this part
        const [scaleFrom, scaleTo, xFrom, xTo, yFrom, yTo] = MOVES[index];
        const x = xFrom + (xTo - xFrom) * local;
        const y = yFrom + (yTo - yFrom) * local;
        const scale = scaleFrom + (scaleTo - scaleFrom) * local;
        stage.style.transform = `translate3d(${x.toFixed(3)}%, ${y.toFixed(3)}%, 0) scale(${scale.toFixed(4)})`;
      }

      state.raf = requestAnimationFrame(paint);
    };

    const play = () => {
      if (state.raf || !state.visible || document.visibilityState === "hidden") return;
      state.raf = requestAnimationFrame(paint);
    };

    const pause = () => {
      if (!state.raf) return;
      cancelAnimationFrame(state.raf);
      state.raf = 0;
    };

    play();

    /* The clip must never stop: this watchdog restarts the loop if the browser
       froze it (throttled tab, stalled frame, bfcache restore). */
    const watchdog = window.setInterval(play, 1000);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        state.hiddenAt = performance.now();
        pause();
        return;
      }
      /* resume where it left off rather than jumping ahead */
      if (state.hiddenAt) {
        state.start += performance.now() - state.hiddenAt;
        state.hiddenAt = 0;
      }
      play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* Some mobile browsers freeze animation frames until the first tap. */
    const onFirstTap = () => {
      state.start = performance.now() - state.part * PART_MS;
      play();
    };
    document.addEventListener("pointerdown", onFirstTap, { once: true });
    document.addEventListener("touchstart", onFirstTap, { once: true, passive: true });

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                state.visible = entry.isIntersecting;
                if (entry.isIntersecting) play();
                else pause();
              }
            },
            { threshold: 0.1 },
          );
    observer?.observe(cardRef.current ?? stage);

    return () => {
      window.clearInterval(watchdog);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", onFirstTap);
      document.removeEventListener("touchstart", onFirstTap);
      observer?.disconnect();
      pause();
    };
  }, []);

  const jumpTo = useCallback((index: number) => {
    const state = clock.current;
    state.start = performance.now() - index * PART_MS;
    state.part = index;
    setPart(index);
  }, []);

  return (
    <div className="sbr-showreel" ref={cardRef}>
      <div className="sbr-showreel__box">
        <div className="sbr-showreel__stage" ref={stageRef}>
          <Image
            src={SHOWREEL_IMAGE}
            alt={copy.alt}
            fill
            sizes="(max-width: 860px) 60vw, 290px"
            className="sbr-showreel__image"
          />
        </div>
        <span className="sbr-showreel__badge">
          <i aria-hidden="true" />
          {copy.badge}
        </span>
      </div>

      <p className="sbr-showreel__caption">
        <Words
          lines={copy.caption}
          start={TIMING.caption.start}
          step={TIMING.caption.step}
          duration={TIMING.caption.duration}
        />
      </p>

      <div className="sbr-bars" role="group" aria-label={copy.barsLabel}>
        {Array.from({ length: PART_COUNT }, (_, index) => (
          <button
            key={index}
            type="button"
            className="sbr-bars__hit"
            data-active={part === index}
            aria-label={`${copy.barsLabel} ${index + 1}/${PART_COUNT}`}
            aria-pressed={part === index}
            onClick={() => jumpTo(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
