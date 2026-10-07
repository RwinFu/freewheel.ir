"use client";

import { useEffect, useRef } from "react";

/**
 * بک‌گراند الگوریتمی سراسری صفحه‌ی اول — «مدار قفل».
 *
 * فلسفه (از مهارت algorithmic-art): نیروهای مکانیکی نامرئی، از اثرشان روی ماده
 * دیده می‌شوند. اسکرول همان «شفت درایو» است: منظومه‌ی حلقه‌های هم‌مرکز با
 * پیشرفت اسکرول می‌چرخد، غلتک‌های مداری روی رینگ‌ها می‌گردند و غبار فولادی با
 * اختلاف‌عمق (parallax) شناور است. یک کمان کورال هم پیشرفت اسکرول را نشان می‌دهد.
 *
 * - چیدمان ذرات با seed ثابت (mulberry32) ساخته می‌شود: رندر قطعی و پایدار.
 * - DPR حداکثر ۱٫۵، توقف حلقه وقتی تب مخفی است، و در prefers-reduced-motion
 *   فقط یک فریم ایستا رسم می‌شود (بدون پارالاکس و بدون حلقه‌ی انیمیشن).
 * - بوم opaque است (alpha: false) و کل پس‌زمینه را خودش می‌کشد؛ سکشن‌ها شفاف‌اند.
 */

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dust = {
  /** موقعیت پایه به‌صورت کسری از ابعاد ویوپورت (مقاوم در برابر resize) */
  fx: number;
  fy: number;
  r: number;
  depth: number;
  phase: number;
  speed: number;
  tone: number;
};

const TONES = [
  "114,222,210", // mint
  "184,207,209", // steel
  "235,245,244", // white
  "238,121,88", // coral (کمیاب)
];

function buildDust(count: number, rand: () => number): Dust[] {
  const dust: Dust[] = [];
  for (let i = 0; i < count; i++) {
    const roll = rand();
    dust.push({
      fx: rand(),
      fy: rand(),
      r: 0.6 + rand() * 1.7,
      depth: 0.25 + rand() * 0.75,
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 1.1,
      tone: roll < 0.3 ? 0 : roll < 0.62 ? 1 : roll < 0.94 ? 2 : 3,
    });
  }
  return dust;
}

export function ScrollBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dust: Dust[] = [];
    let w = 0;
    let h = 0;

    const progress = (): number => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / max));
    };

    const draw = (time: number, p: number): void => {
      const scrollY = window.scrollY;

      // زمینه‌ی اقیانوسی
      const base = ctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, "#0e2d38");
      base.addColorStop(0.45, "#0b2630");
      base.addColorStop(1, "#071d25");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      const M = Math.max(w, h);
      // مرکز منظومه بیرون از کادر، سمت راست (راست‌به‌چپ: کمان‌ها از سمت شروع می‌آیند)
      const cx = w * 1.04;
      const cy = h * 0.42;
      // اسکرول = شفت درایو: دو دور کامل در طول صفحه + چرخش آرامِ بی‌کار
      const rot = p * Math.PI * 4 + time * 0.03;

      // هاله‌های نوری که با اسکرول جابه‌جا می‌شوند: مینت در نیمه‌ی اول، کورال در ادامه
      const mintX = w * (0.82 - 0.5 * p);
      const mintY = h * (0.16 + 0.55 * p);
      let glow = ctx.createRadialGradient(mintX, mintY, 0, mintX, mintY, M * 0.55);
      glow.addColorStop(0, "rgba(58,167,158,0.20)");
      glow.addColorStop(1, "rgba(58,167,158,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const coralX = w * (0.12 + 0.45 * p);
      const coralY = h * (0.88 - 0.5 * p);
      glow = ctx.createRadialGradient(coralX, coralY, 0, coralX, coralY, M * 0.5);
      glow.addColorStop(0, "rgba(238,121,88,0.13)");
      glow.addColorStop(1, "rgba(238,121,88,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // شبکه‌ی نقشه‌کشی با پارالاکس ملایم
      const gap = 64;
      const offY = -((((scrollY * 0.12) % gap) + gap) % gap);
      ctx.strokeStyle = "rgba(184,207,209,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x <= w; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = offY + 0.5; y <= h; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // منظومه‌ی حلقه‌ها: جهت و سرعت متناوب مثل رینگ‌های واقعی
      const rings = [
        { r: M * 0.34, dash: [2, 10], color: "rgba(114,222,210,0.30)", width: 1.5, dir: 1, speed: 1 },
        { r: M * 0.46, dash: [16, 12], color: "rgba(184,207,209,0.22)", width: 1.2, dir: -1, speed: 0.7 },
        { r: M * 0.6, dash: [3, 18], color: "rgba(114,222,210,0.16)", width: 1.2, dir: 1, speed: 0.5 },
        { r: M * 0.78, dash: [70, 30], color: "rgba(238,121,88,0.20)", width: 2, dir: -1, speed: 0.35 },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot * ring.dir * ring.speed);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.setLineDash([]);

      // دندانه‌های اسپراگ‌مانند روی رینگ داخلی
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.fillStyle = "rgba(114,222,210,0.5)";
      const tickR = M * 0.34;
      for (let i = 0; i < 28; i++) {
        ctx.save();
        ctx.rotate((i / 28) * Math.PI * 2);
        ctx.fillRect(-1.5, -tickR - 7, 3, 10);
        ctx.restore();
      }
      ctx.restore();

      // کمان پیشرفت اسکرول
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(238,121,88,0.14)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(0, 0, M * 0.34, 0, Math.PI * 2);
      ctx.stroke();
      if (p > 0.004) {
        ctx.strokeStyle = "rgba(238,121,88,0.85)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(0, 0, M * 0.34, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // غلتک‌های مداری: نقطه‌هایی که روی دو رینگ می‌گردند
      const rollers = [
        { r: M * 0.46, count: 12, size: 2.6, tone: "114,222,210", dir: -1, speed: 0.7, alpha: 0.8 },
        { r: M * 0.6, count: 9, size: 2.1, tone: "184,207,209", dir: 1, speed: 0.5, alpha: 0.7 },
      ];
      for (const ring of rollers) {
        ctx.fillStyle = `rgba(${ring.tone},${ring.alpha})`;
        for (let i = 0; i < ring.count; i++) {
          const a = rot * ring.dir * ring.speed + (i / ring.count) * Math.PI * 2;
          const x = cx + Math.cos(a) * ring.r;
          const y = cy + Math.sin(a) * ring.r;
          if (x < -12 || x > w + 12 || y < -12 || y > h + 12) continue;
          ctx.beginPath();
          ctx.arc(x, y, ring.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // غبار فولادی: پارالاکس عمودی با wrap + سوسو
      for (const pt of dust) {
        const span = h + 40;
        const raw = pt.fy * span - scrollY * 0.22 * pt.depth;
        const y = ((((raw + 20) % span) + span) % span) - 20;
        const x = pt.fx * w + Math.sin(time * 0.35 * pt.speed + pt.phase) * 10 * pt.depth;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(time * pt.speed + pt.phase));
        const alpha = (0.14 + 0.5 * pt.depth) * tw;
        ctx.fillStyle = `rgba(${TONES[pt.tone]},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // سایه‌ی بالا و پایین برای خوانایی متن زیر هدر و بالای فوتر
      let shade = ctx.createLinearGradient(0, 0, 0, 140);
      shade.addColorStop(0, "rgba(4,15,20,0.5)");
      shade.addColorStop(1, "rgba(4,15,20,0)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, w, 140);
      shade = ctx.createLinearGradient(0, h, 0, h - 170);
      shade.addColorStop(0, "rgba(4,15,20,0.55)");
      shade.addColorStop(1, "rgba(4,15,20,0)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, h - 170, w, 170);
    };

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(150, Math.max(60, (w * h) / 16000)));
      dust = buildDust(count, mulberry32(14051007));
      if (reduced) draw(1.4, progress());
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    let smooth = progress();
    let alive = true;
    const loop = (now: number): void => {
      if (!alive) return;
      smooth += (progress() - smooth) * 0.09;
      draw(now / 1000, smooth);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = (): void => {
      if (document.hidden) {
        alive = false;
        cancelAnimationFrame(raf);
      } else if (!alive) {
        alive = true;
        smooth = progress();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
