"use client";

import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { useState, type ReactNode } from "react";

import type { StoryLegendItem } from "@/content/story";
import { cn } from "@/lib/utils";

/**
 * نقشه‌ی چیدمان درایو نوار نقاله، با شماره‌گذاری روی قطعه‌ها.
 *
 * الگو از صفحه‌های «Power Transmission Components» کاتالوگ‌های صنعتی گرفته شده:
 * یک درایو واقعی، چند شماره روی آن، و توضیح نقش هر قطعه کنارش. اینجا شماره‌ها
 * تعاملی‌اند: با ایستادن یا کلیک روی هر شماره، همان بخش نقشه با رنگ مینت روشن
 * می‌شود و توضیحش زیر می‌آید.
 *
 * - نقشه SVG درون‌خطی است، پس فونت فارسی سایت را می‌گیرد و به فایل تصویری
 *   جداگانه‌ای وابسته نیست.
 * - رنگ‌ها با متغیرهای CSS (`--dt-*`) کنترل می‌شوند تا حالت فعال، فقط با
 *   عوض‌شدن متغیر روی همان گروه اعمال شود (نه با دوباره‌نویسی هر مسیر).
 * - روی موبایل، نقشه داخل قاب اسکرول افقی می‌ماند تا خوانا بماند.
 */

const LINE = "var(--dt-line)";
const SOFT = "var(--dt-soft)";
const FILL = "var(--dt-fill)";
const STRONG = "var(--dt-strong)";

function Node({
  index,
  active,
  children,
  title,
}: {
  index: number;
  active: number;
  children: ReactNode;
  title: string;
}) {
  return (
    <g className="dt-node" data-active={active === index} role="presentation">
      <title>{title}</title>
      {children}
    </g>
  );
}

/** خط راهنما + شماره‌ی کورال، مثل برچسب‌های کاتالوگ */
function Marker({
  index,
  active,
  onSelect,
  from,
  to,
}: {
  index: number;
  active: number;
  onSelect: (index: number) => void;
  from: [number, number];
  to: [number, number];
}) {
  const isActive = active === index;
  return (
    <g className="dt-badge" data-active={isActive}>
      <line
        className="dt-leader"
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        fill="none"
      />
      <circle cx={to[0]} cy={to[1]} r={16} fill="var(--color-coral)" />
      <text
        x={to[0]}
        y={to[1] + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        direction="ltr"
        fontSize="15"
        fontWeight="700"
        fill="var(--color-ocean)"
      >
        {index}
      </text>
      {/* نواحی کلیک بزرگ‌تر از دایره، تا روی موبایل هم راحت انتخاب شود */}
      <circle
        cx={to[0]}
        cy={to[1]}
        r={26}
        fill="transparent"
        className="cursor-pointer"
        onPointerEnter={() => onSelect(index)}
        onClick={() => onSelect(index)}
      />
    </g>
  );
}

function Figure({
  active,
  onSelect,
  label,
}: {
  active: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 1080 460"
      className="dt-figure block h-auto w-full min-w-[860px]"
      data-has-focus="true"
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern
          id="dt-hatch"
          width="8"
          height="8"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--dt-strong)" strokeWidth="1.3" />
        </pattern>
        <pattern
          id="dt-hatch-strong"
          width="6"
          height="6"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--dt-line)" strokeOpacity="0.55" strokeWidth="1.5" />
        </pattern>
        <radialGradient id="dt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#72ded2" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#72ded2" stopOpacity="0" />
        </radialGradient>
        <marker id="dt-arrow-work" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-mint)" />
        </marker>
        <marker id="dt-arrow-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-coral)" />
        </marker>
      </defs>

      {/* خط مرکز و خط زمین */}
      <line x1="18" y1="420" x2="1062" y2="420" stroke={SOFT} strokeWidth="1.4" strokeDasharray="14 8" />
      <line x1="196" y1="190" x2="706" y2="190" stroke={SOFT} strokeWidth="1" strokeDasharray="18 6 3 6" />

      {/* هاله زیر درایو */}
      <ellipse cx="220" cy="200" rx="260" ry="180" fill="url(#dt-glow)" />

      {/* نوار نقاله */}
      <g fill="none">
        <path
          d="M -10 197 L 75.4 143.4 A 88 88 0 0 0 75.4 236.6 L -10 290"
          stroke={SOFT}
          strokeWidth="7"
          strokeLinejoin="round"
        />
      </g>
      {/* مواد روی نوار */}
      <g fill={SOFT} stroke="none">
        <circle cx="12" cy="176" r="5.5" />
        <circle cx="26" cy="169" r="4" />
        <circle cx="40" cy="163" r="5" />
        <circle cx="56" cy="156" r="3.5" />
        <circle cx="70" cy="150" r="5" />
        <circle cx="86" cy="140" r="4.5" />
        <circle cx="104" cy="128" r="4" />
        <circle cx="122" cy="118" r="3" />
        <circle cx="140" cy="112" r="2.6" />
      </g>

      {/* راهنمای جهت: روی همان دو رشته‌ی نوار، در فضای خالی سمت چپ */}
      <g>
        <line
          x1="30"
          y1="193"
          x2="58"
          y2="180"
          stroke="var(--color-mint)"
          strokeWidth="1.6"
          markerEnd="url(#dt-arrow-work)"
        />
        <text x="24" y="216" fontSize="11" fill="var(--color-mint)">
          جهت کار
        </text>
        <line
          x1="60"
          y1="240"
          x2="30"
          y2="252"
          stroke="var(--color-coral)"
          strokeWidth="1.6"
          strokeDasharray="5 4"
          markerEnd="url(#dt-arrow-back)"
        />
        <text x="24" y="276" fontSize="11" fill="var(--color-coral)">
          جهت برگشت
        </text>
      </g>

      {/* پولی سر نوار */}
      <g className="dt-static">
        <circle cx="150" cy="190" r="88" fill={FILL} stroke={LINE} strokeWidth="2" />
        <circle cx="150" cy="190" r="74" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <g stroke={SOFT} strokeWidth="1.4">
          <line x1="182" y1="190" x2="222" y2="190" />
          <line x1="166" y1="217" x2="186" y2="252" />
          <line x1="134" y1="217" x2="114" y2="252" />
          <line x1="118" y1="190" x2="78" y2="190" />
          <line x1="134" y1="163" x2="114" y2="128" />
          <line x1="166" y1="163" x2="186" y2="128" />
        </g>
        <circle cx="150" cy="190" r="30" fill={FILL} stroke={LINE} strokeWidth="1.8" />
        <circle cx="150" cy="190" r="12" fill="var(--color-ocean)" stroke={LINE} strokeWidth="1.4" />
        <text x="150" y="318" textAnchor="middle" fontSize="11.5" letterSpacing="2" fill={SOFT}>
          پولی سر نوار
        </text>
      </g>

      {/* ۴ — بک‌استاپ سرعت پایین روی شفت پولی */}
      <Node index={4} active={active} title="بک‌استاپ سرعت پایین">
        <rect x="230" y="182" width="168" height="16" fill={FILL} stroke={LINE} strokeWidth="1.4" />
        <circle cx="306" cy="190" r="48" fill="url(#dt-hatch)" stroke={LINE} strokeWidth="2" />
        <circle cx="306" cy="190" r="48" fill="none" stroke={LINE} strokeWidth="2" />
        <circle cx="306" cy="190" r="19" fill="var(--color-ocean)" stroke={LINE} strokeWidth="1.5" />
        <circle cx="306" cy="190" r="12" fill="none" stroke={SOFT} strokeWidth="1.2" />
        <line x1="308" y1="238" x2="344" y2="384" stroke={LINE} strokeWidth="9" strokeLinecap="round" />
        <rect x="326" y="384" width="40" height="26" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="1.6" />
      </Node>

      {/* گیربکس کاهنده */}
      <g className="dt-static">
        <path
          d="M 384 268 L 384 152 L 436 152 L 436 126 L 512 126 L 512 142 L 574 142 L 574 268 Z"
          fill="url(#dt-hatch)"
          stroke={LINE}
          strokeWidth="2"
        />
        <g stroke={SOFT} strokeWidth="1" fill="none">
          <circle cx="416" cy="190" r="24" />
          <circle cx="472" cy="190" r="40" />
          <circle cx="546" cy="190" r="32" />
        </g>
        <rect x="448" y="268" width="48" height="112" fill="url(#dt-hatch)" stroke={SOFT} strokeWidth="1.4" />
        <rect x="424" y="380" width="96" height="18" fill={FILL} stroke={LINE} strokeWidth="1.6" />
        <text x="512" y="118" textAnchor="middle" fontSize="11.5" letterSpacing="2" fill={SOFT}>
          گیربکس کاهنده
        </text>
      </g>

      {/* ۳ — اتصال انقباضی */}
      <Node index={3} active={active} title="اتصال انقباضی">
        <rect x="386" y="158" width="24" height="64" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="2" />
        <g fill={LINE}>
          <circle cx="393" cy="168" r="2.6" />
          <circle cx="403" cy="168" r="2.6" />
          <circle cx="393" cy="212" r="2.6" />
          <circle cx="403" cy="212" r="2.6" />
        </g>
      </Node>

      {/* شفت ورودی */}
      <rect x="574" y="182" width="62" height="16" fill={FILL} stroke={SOFT} strokeWidth="1.4" />

      {/* ۵ — بک‌استاپ سرعت بالا */}
      <Node index={5} active={active} title="بک‌استاپ سرعت بالا">
        <circle cx="604" cy="190" r="33" fill="url(#dt-hatch)" stroke={LINE} strokeWidth="2" />
        <circle cx="604" cy="190" r="33" fill="none" stroke={LINE} strokeWidth="2" />
        <circle cx="604" cy="190" r="13" fill="var(--color-ocean)" stroke={LINE} strokeWidth="1.4" />
        <line x1="604" y1="159" x2="604" y2="132" stroke={LINE} strokeWidth="8" strokeLinecap="round" />
        <rect x="586" y="112" width="36" height="20" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="1.6" />
      </Node>

      {/* ۲ — کوپلینگ فلنجی */}
      <Node index={2} active={active} title="کوپلینگ فلنجی">
        <rect x="636" y="160" width="14" height="60" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="1.8" />
        <rect x="662" y="160" width="14" height="60" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="1.8" />
        <line x1="656" y1="158" x2="656" y2="222" stroke={SOFT} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="656" cy="157" r="3.4" fill={LINE} />
        <circle cx="656" cy="223" r="3.4" fill={LINE} />
      </Node>

      {/* ۱ — ترمز درایو */}
      <Node index={1} active={active} title="ترمز درایو">
        <rect x="684" y="154" width="14" height="72" rx="4" fill="url(#dt-hatch-strong)" stroke={LINE} strokeWidth="1.8" />
        <path
          d="M 674 154 L 708 154 L 708 136 L 696 128 L 686 128 L 674 136 Z"
          fill={FILL}
          stroke={LINE}
          strokeWidth="1.8"
        />
        <line x1="691" y1="128" x2="691" y2="154" stroke={SOFT} strokeWidth="1" />
      </Node>

      {/* موتور */}
      <g className="dt-static">
        <rect x="700" y="182" width="14" height="16" fill={FILL} stroke={SOFT} strokeWidth="1.2" />
        <rect x="714" y="148" width="168" height="98" rx="10" fill="url(#dt-hatch)" stroke={LINE} strokeWidth="2" />
        <g stroke={SOFT} strokeWidth="1" strokeOpacity="0.5">
          {[732, 750, 768, 786, 804, 822, 840, 858, 872].map((x) => (
            <line key={x} x1={x} y1="154" x2={x} y2="240" />
          ))}
        </g>
        <rect x="766" y="126" width="56" height="22" rx="4" fill={FILL} stroke={SOFT} strokeWidth="1.4" />
        <rect x="724" y="246" width="30" height="14" fill={FILL} stroke={SOFT} strokeWidth="1.2" />
        <rect x="842" y="246" width="30" height="14" fill={FILL} stroke={SOFT} strokeWidth="1.2" />
        <rect x="738" y="260" width="120" height="120" fill="url(#dt-hatch)" stroke={SOFT} strokeWidth="1.4" />
        <rect x="712" y="380" width="172" height="18" fill={FILL} stroke={LINE} strokeWidth="1.6" />
        <text x="798" y="118" textAnchor="middle" fontSize="11.5" letterSpacing="2" fill={SOFT}>
          موتور
        </text>
      </g>

      {/* ۶ — درایو دوم با کلاچ اوررانینگ (نمای جدا) */}
      <Node index={6} active={active} title="فری‌ویل به‌عنوان کلاچ اوررانینگ">
        <rect
          x="906"
          y="286"
          width="150"
          height="130"
          rx="14"
          fill={FILL}
          stroke={SOFT}
          strokeWidth="1.4"
          strokeDasharray="8 6"
        />
        <rect x="920" y="322" width="46" height="42" rx="6" fill="url(#dt-hatch)" stroke={LINE} strokeWidth="1.6" />
        <rect x="996" y="322" width="46" height="42" rx="6" fill="url(#dt-hatch)" stroke={LINE} strokeWidth="1.6" />
        <g stroke={SOFT} strokeWidth="0.9">
          <line x1="928" y1="328" x2="928" y2="358" />
          <line x1="936" y1="328" x2="936" y2="358" />
          <line x1="944" y1="328" x2="944" y2="358" />
          <line x1="952" y1="328" x2="952" y2="358" />
          <line x1="1004" y1="328" x2="1004" y2="358" />
          <line x1="1012" y1="328" x2="1012" y2="358" />
          <line x1="1020" y1="328" x2="1020" y2="358" />
          <line x1="1028" y1="328" x2="1028" y2="358" />
        </g>
        <line x1="966" y1="343" x2="996" y2="343" stroke={LINE} strokeWidth="2" />
        <circle cx="974" cy="343" r="9" fill="var(--color-ocean)" stroke={LINE} strokeWidth="1.6" />
        <circle cx="988" cy="343" r="9" fill="var(--color-ocean)" stroke={LINE} strokeWidth="1.6" />
        <text x="981" y="398" textAnchor="middle" fontSize="11" fill={SOFT}>
          درایو دوم / محرک کمکی
        </text>
      </Node>

      {/* شماره‌ها */}
      <Marker index={1} active={active} onSelect={onSelect} from={[691, 126]} to={[691, 92]} />
      <Marker index={2} active={active} onSelect={onSelect} from={[656, 232]} to={[656, 300]} />
      <Marker index={3} active={active} onSelect={onSelect} from={[398, 158]} to={[398, 92]} />
      <Marker index={4} active={active} onSelect={onSelect} from={[292, 232]} to={[250, 330]} />
      <Marker index={5} active={active} onSelect={onSelect} from={[594, 226]} to={[560, 300]} />
      <Marker index={6} active={active} onSelect={onSelect} from={[1056, 290]} to={[1056, 258]} />

      {/* مقیاس و راهنمای رنگ */}
      <g fontSize="10.5" fill={SOFT}>
        <text x="18" y="446">
          نقشه‌ی شماتیک — به مقیاس نیست
        </text>
      </g>
    </svg>
  );
}

export function DriveTrainFigure({
  items,
  label,
  note,
}: {
  items: StoryLegendItem[];
  label: string;
  note: string;
}) {
  const fallback = items[0]?.index ?? 1;
  const [active, setActive] = useState(() =>
    items.some((item) => item.index === 4) ? 4 : fallback,
  );
  const current = items.find((item) => item.index === active) ?? items[0];

  const detail = (item: StoryLegendItem | undefined) =>
    item ? (
      <>
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-6 w-6 place-items-center rounded-full bg-coral text-[12px] font-bold text-ocean"
            aria-hidden="true"
          >
            {item.index}
          </span>
          <h3 className="text-[14px] font-bold text-white">{item.title}</h3>
        </div>
        <p className="mt-2.5 text-[12.5px] leading-7 text-white/70">{item.detail}</p>
        {item.link ? (
          <Link
            href={item.link.href}
            transitionTypes={["nav-forward"]}
            className="mt-3 inline-flex items-center gap-2 text-[12.5px] font-semibold text-mint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
          >
            {item.link.label}
            <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
        {item.outside ? (
          <p className="mt-3 text-[11.5px] leading-6 text-white/45">
            این قطعه در این سایت توضیح داده نشده؛ پوشش تخصصی ما فری‌ویل، بک‌استاپ و کلاچ یک‌طرفه است.
          </p>
        ) : null}
      </>
    ) : null;

  return (
    <div>
      <p className="text-[12px] text-white/55">{note}</p>

      <div className="dt-panel mt-4 overflow-hidden rounded-[24px] border border-white/12 p-3 sm:p-4">
        <div className="overflow-x-auto">
          <Figure active={active} onSelect={setActive} label={label} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.14fr_0.86fr] lg:gap-6">
        <ul className="grid gap-2 sm:grid-cols-2 lg:content-start">
          {items.map((item) => {
            const isActive = item.index === active;
            return (
              <li key={item.index} className="min-w-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onPointerEnter={() => setActive(item.index)}
                  onFocus={() => setActive(item.index)}
                  onClick={() => setActive(item.index)}
                  className={cn(
                    "group flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-right transition-colors",
                    isActive
                      ? "border-mint/45 bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors",
                      isActive ? "bg-coral text-ocean" : "bg-white/10 text-white/70",
                    )}
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold text-white">{item.title}</span>
                    <span className="mt-1 block text-[11.5px] leading-6 text-white/60">
                      {item.role}
                    </span>
                  </span>
                </button>
                {/* روی موبایل، توضیح همان قطعه زیر خودش باز می‌شود تا پنل از دید خارج نشود */}
                <div
                  className={cn(
                    "mt-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 lg:hidden",
                    isActive ? "block" : "hidden",
                  )}
                >
                  {detail(item)}
                </div>
              </li>
            );
          })}
        </ul>

        <div
          className="hidden self-start rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-5 lg:block"
          aria-live="polite"
        >
          {detail(current)}
        </div>
      </div>
    </div>
  );
}
