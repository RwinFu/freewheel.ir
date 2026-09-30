"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

type Mode = "free" | "locked";

/**
 * دو حالت فری‌ویل، در کنترل کاربر.
 * ساختار SVG عوض نشده؛ فقط قاب آن به «پنل ابزار» تیره تبدیل شده تا کنار
 * رندرهای محصول هم‌خانواده دیده شود.
 */
export function FreewheelDemo() {
  const [mode, setMode] = useState<Mode>("free");
  const isLocked = mode === "locked";

  return (
    <div className="instrument-panel p-5 sm:p-6">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <p className="text-[12.5px] font-semibold text-white/75">نمایشگر حالت</p>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/85">
          <span
            className={`h-2 w-2 rounded-full ${isLocked ? "bg-coral" : "bg-mint"} animate-pulse-dot`}
            aria-hidden="true"
          />
          {isLocked ? "درگیر و قفل" : "چرخش آزاد"}
        </span>
      </div>

      <div className="relative z-10 mx-auto mt-3 aspect-square w-full max-w-[360px]">
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full"
          role="img"
          aria-label="نمای ساده‌ی فری‌ویل با حلقه‌ی بیرونی، حلقه‌ی داخلی و المان‌های قفل‌کننده"
        >
          <defs>
            <radialGradient id="freewheel-glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#5FD8C6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#5FD8C6" stopOpacity="0" />
            </radialGradient>
            <marker id="freewheel-arrow-mint" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#5FD8C6" />
            </marker>
            <marker id="freewheel-arrow-coral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#EE7958" />
            </marker>
          </defs>

          <circle cx="200" cy="200" r="190" fill="url(#freewheel-glow)" />
          <circle cx="200" cy="200" r="175" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 8" />

          <g className={`demo-outer ${isLocked ? "is-locked" : ""}`}>
            <circle cx="200" cy="200" r="150" fill="#163B45" stroke="#A9C1C3" strokeWidth="17" />
            <circle cx="200" cy="200" r="166" fill="none" stroke="#DCE9E8" strokeOpacity="0.48" strokeWidth="2" />
            {Array.from({ length: 24 }, (_, index) => index * 15).map((degree) => (
              <line
                key={degree}
                x1="200"
                y1="28"
                x2="200"
                y2="38"
                stroke="#DCE9E8"
                strokeOpacity="0.65"
                strokeWidth="2"
                transform={`rotate(${degree} 200 200)`}
              />
            ))}
            {Array.from({ length: 10 }, (_, index) => index * 36).map((degree) => (
              <g key={degree} transform={`rotate(${degree} 200 200)`}>
                <path
                  d="M190 71 L210 71 L206 111 L194 111 Z"
                  fill={isLocked ? "#EE7958" : "#5FD8C6"}
                  stroke="#F4F8F7"
                  strokeOpacity="0.76"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>

          <g className={`demo-inner ${isLocked ? "is-locked" : "is-free"}`}>
            <circle cx="200" cy="200" r="103" fill="#0F2A31" stroke="#5FD8C6" strokeWidth="8" />
            <circle cx="200" cy="200" r="84" fill="none" stroke="#FFFFFF" strokeOpacity="0.36" strokeWidth="2" />
            {Array.from({ length: 6 }, (_, index) => index * 60).map((degree) => (
              <line
                key={degree}
                x1="200"
                y1="111"
                x2="200"
                y2="128"
                stroke="#A9C1C3"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${degree} 200 200)`}
              />
            ))}
            <circle cx="200" cy="200" r="43" fill="#08222A" stroke="#A9C1C3" strokeWidth="3" />
            <circle cx="200" cy="200" r="8" fill="#EE7958" />
          </g>

          <path
            d="M296 93 A132 132 0 0 1 331 157"
            fill="none"
            stroke="#5FD8C6"
            strokeWidth="5"
            strokeLinecap="round"
            opacity={isLocked ? 0.22 : 1}
            markerEnd="url(#freewheel-arrow-mint)"
          />
          <path
            d="M322 268 A132 132 0 0 1 268 322"
            fill="none"
            stroke="#EE7958"
            strokeWidth="5"
            strokeLinecap="round"
            opacity={isLocked ? 1 : 0.22}
            markerEnd="url(#freewheel-arrow-coral)"
          />
        </svg>
      </div>

      <div className="relative z-10 mt-1 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/55">
        <span>حلقه‌ی بیرونی</span>
        <span>المان‌های قفل‌کننده</span>
        <span>حلقه‌ی داخلی</span>
      </div>

      <div
        className="relative z-10 mt-5 grid grid-cols-2 gap-2 rounded-[12px] border border-white/10 bg-ocean/50 p-1.5"
        role="group"
        aria-label="انتخاب حالت عملکرد فری‌ویل"
      >
        <button
          type="button"
          onClick={() => setMode("free")}
          aria-pressed={!isLocked}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] px-3 text-[12.5px] font-semibold transition-colors active:scale-[0.98] ${
            !isLocked ? "bg-mint text-ocean" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
          چرخش آزاد
        </button>
        <button
          type="button"
          onClick={() => setMode("locked")}
          aria-pressed={isLocked}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] px-3 text-[12.5px] font-semibold transition-colors active:scale-[0.98] ${
            isLocked ? "bg-coral text-ocean" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          قفل و انتقال نیرو
        </button>
      </div>

      <p className="relative z-10 mt-4 min-h-12 text-[12.5px] leading-7 text-white/75" aria-live="polite">
        {isLocked
          ? "با برگشت جهت، المان‌ها بین دو حلقه گیر می‌کنند و گشتاور منتقل می‌شود."
          : "در جهت مجاز، حلقه‌ها آزادانه نسبت به هم می‌چرخند؛ بدون تماسِ قفل‌کننده."}
      </p>
    </div>
  );
}
