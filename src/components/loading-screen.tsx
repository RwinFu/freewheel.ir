"use client";

import { useEffect, useState } from "react";

/**
 * صفحه‌ی لودینگ اولیه — قبل از اینکه محتوای اصلی سایت نمایش داده شود.
 *
 * چرا این‌جا؟
 * سایت چند تصویر بزرگ و فونت Vazirmatn دارد. وقتی کاربر اولین بار وارد می‌شود،
 * مرورگر هم‌زمان باید فونت، تصاویر هیرو و bundle های JS را دانلود کند. نتیجه‌اش
 * پرش متن (FOUT)، تاخیر در نمایش تصویر هیرو، و یک حس «سنگینی» است.
 *
 * با این لودینگ:
 * - کاربر یک انیمیشن ۵ ثانیه‌ای مرتبط با فری‌ویل می‌بیند (نه spinner عمومی)
 * - در همین ۵ ثانیه، فونت Vazirmatn و تصویر هیرو preload می‌شوند
 * - وقتی لودینگ محو می‌شود، سایت آماده‌ی نمایش است
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // پیش‌لود فونت و تصویر هیرو
    const linkFont = document.createElement("link");
    linkFont.rel = "preload";
    linkFont.as = "font";
    linkFont.type = "font/woff2";
    linkFont.crossOrigin = "anonymous";
    linkFont.href = "/fonts/vazirmatn.woff2";
    document.head.appendChild(linkFont);

    const linkImg = document.createElement("link");
    linkImg.rel = "preload";
    linkImg.as = "image";
    linkImg.href = "/_next/static/media/hero-ringspann-fxm.webp";
    document.head.appendChild(linkImg);

    // انیمیشن پیشرفت ۵ ثانیه‌ای
    const duration = 5000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      // ease-out برای حس طبیعی
      setProgress(1 - Math.pow(1 - p, 3));

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        // بعد از تکمیل، کمی تاخیر برای محو شدن
        setTimeout(() => setVisible(false), 300);
      }
    };

    requestAnimationFrame(animate);

    // اگر فونت زودتر لود شد، باز هم ۵ ثانیه صبر می‌کنیم (تجربه‌ی یکنواخت)
    return () => {
      document.head.removeChild(linkFont);
      document.head.removeChild(linkImg);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-screen" aria-hidden="true">
      {/* پس‌زمینه */}
      <div className="loading-bg" />

      {/* انیمیشن فری‌ویل چرخان */}
      <div className="loading-spinner">
        <div className="loading-ring loading-ring-outer" />
        <div className="loading-ring loading-ring-middle" />
        <div className="loading-ring loading-ring-inner" />
        <div className="loading-center-dot" />
      </div>

      {/* متن لودینگ */}
      <div className="loading-text">
        <span className="loading-brand">freewheel.ir</span>
        <span className="loading-status">در حال آماده‌سازی</span>
      </div>

      {/* نوار پیشرفت */}
      <div className="loading-progress-track">
        <div
          className="loading-progress-bar"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
