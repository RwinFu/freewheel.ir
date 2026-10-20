"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/components/motion";
import { MotionImage } from "@/components/home/motion-media";
import { FadeUp, WordReveal } from "@/components/home/kit";
import { HOME_STILL } from "@/content/home-media";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    id: "conveyor",
    label: "نوار نقاله و بک‌استاپ",
    time: "پرکاربردترین",
    desc: "وقتی خط می‌ایستد، فری‌ویل جلوی برگشت ناخواسته‌ی نوار را می‌گیرد؛ به‌خصوص روی شیب.",
    still: HOME_STILL.conveyor,
  },
  {
    id: "textile",
    label: "نساجی و ریسندگی",
    time: "حرکت پله‌ای",
    desc: "برای جداکردن دو محرک و تغذیه‌ی نخ؛ جایی که کشش باید حفظ شود ولی برگشت ممنوع است.",
    still: HOME_STILL.textile,
  },
  {
    id: "packaging",
    label: "بسته‌بندی و پالتیزه",
    time: "تکرارپذیر",
    desc: "حرکت مرحله‌ای ماشین‌های بسته‌بندی با ایندکسینگ مکانیکی و بدون فرمان الکتریکی.",
    still: HOME_STILL.packaging,
  },
  {
    id: "backstop",
    label: "بک‌استاپ شفت‌های سنگین",
    time: "ایمنی بار",
    desc: "روی شفت درایو یا گیربکس نصب می‌شود و در لحظه‌ی برگشت، بدون تأخیر قفل می‌کند.",
    still: HOME_STILL.quarry,
  },
];

/**
 * «کاربردها» — صحنه‌ی چسبیده با فهرستِ عبوری.
 *
 * تصویر بزرگ سمت چپ میخکوب می‌شود و فهرست سمت راست از روی آن رد می‌شود.
 * هر ردیف که به خط وسط می‌رسد، تصویرش را با یک ورود ماسک‌دار عوض می‌کند و
 * شماره‌ی بزرگ پس‌زمینه هم عوض می‌شود — همان مدل لیست تعاملی مرجع، ولی
 * به‌جای هاور، با اسکرول.
 */
export function AroundScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rows = [...root.querySelectorAll<HTMLElement>("[data-around-row]")];
    if (!rows.length) return;

    if (prefersReducedMotion()) return;

    const triggers = rows.map((row, index) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top 62%",
        end: "bottom 38%",
        onToggle: (self) => {
          if (self.isActive) setActive(index);
        },
      }),
    );

    const list = root.querySelector<HTMLElement>("[data-around-list]");
    const progressTrigger = list
      ? ScrollTrigger.create({
          trigger: list,
          start: "top 62%",
          end: "bottom 38%",
          onUpdate: (self) => setProgress(self.progress),
        })
      : null;

    return () => {
      for (const trigger of triggers) trigger.kill();
      progressTrigger?.kill();
    };
  }, []);

  return (
    <section
      id="applications"
      ref={rootRef}
      className="around-section"
      aria-labelledby="around-title"
    >
      <div className="around-inner">
        <div className="around-head">
          <FadeUp>
            <p className="statement-eyebrow">
              <span className="statement-eyebrow-rule" aria-hidden="true" />
              کاربردها
            </p>
            <h2 id="around-title" className="around-title">
              <WordReveal text="فری‌ویل کجای خط شما می‌نشیند؟" mode="scroll" />
            </h2>
          </FadeUp>
          <span className="around-ghost" aria-hidden="true" dir="ltr">
            {String(active + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="around-scene">
          {/* ستون میخکوب‌شده */}
          <div className="around-sticky">
            <div className="around-stage" aria-hidden="true">
              {ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className={index === active ? "around-layer is-active" : "around-layer"}
                >
                  <MotionImage
                    still={item.still}
                    motion="drift"
                    sizes="(min-width: 900px) 48vw, 92vw"
                    duration={22 + index * 4}
                    delay={index}
                    imgClassName="around-layer-img"
                  />
                </div>
              ))}
              <div className="around-stage-frame" />
              <span className="around-stage-tag">
                <span className="around-stage-dot" aria-hidden="true" />
                {ITEMS[active].time}
              </span>
            </div>

            <div className="around-progress" aria-hidden="true">
              <span style={{ transform: `scaleY(${0.06 + progress * 0.94})` }} />
            </div>
          </div>

          {/* فهرست عبوری */}
          <ul className="around-list" data-around-list>
            {ITEMS.map((item, index) => (
              <li
                key={item.id}
                data-around-row
                className={index === active ? "around-row is-active" : "around-row"}
              >
                <span className="around-row-index" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="around-row-body">
                  <span className="around-row-top">
                    <span className="around-row-label">{item.label}</span>
                    <span className="around-row-time">{item.time}</span>
                  </span>
                  <span className="around-row-desc">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
