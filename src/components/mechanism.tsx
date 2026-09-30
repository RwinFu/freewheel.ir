"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeftRight, Cog, Layers, MoveRight } from "lucide-react";

import { RollerTypeDiagram, SpragTypeDiagram } from "@/components/diagrams";
import { FreewheelDemo } from "@/components/freewheel-demo";
import { MediaFrame, Tag } from "@/components/ui";
import { cn } from "@/lib/utils";

import processExploded from "@/assets/images/product/process-exploded.jpg";

const STEPS = [
  {
    id: "parts",
    label: "اجزای قطعه",
    Icon: Layers,
    hint: "چه چیزهایی داخلش است",
  },
  {
    id: "cycle",
    label: "چرخه‌ی درگیری",
    Icon: MoveRight,
    hint: "چه وقت آزاد است و چه وقت قفل می‌شود",
  },
  {
    id: "family",
    label: "اسپراگ یا رولری",
    Icon: ArrowLeftRight,
    hint: "تفاوت دو ساختار رایج",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const PARTS = [
  {
    name: "حلقه‌ی بیرونی",
    role: "بدنه‌ی قطعه",
    body: "روی آن کلید یا فلنج است و گشتاور را به پولی، فلنج یا محفظه می‌رساند. در نسخه‌های کامل، همین حلقه محفظه‌ی آب‌بندی‌شده است.",
  },
  {
    name: "المان قفل‌کننده",
    role: "غلتک یا گوه",
    body: "کوچک‌ترین و مهم‌ترین جزء. در جهت آزاد کنار می‌ماند و با کوچک‌ترین برگشت، در دهانه‌ی باریک گیر می‌کند.",
  },
  {
    name: "قفسه و فنر",
    role: "نگه‌دارنده",
    body: "المان‌ها را مرتب و آماده نگه می‌دارد تا فاصله‌شان یکنواخت بماند. فنر شکسته، اولین دلیل صدای غیرعادی است.",
  },
  {
    name: "حلقه‌ی داخلی و بلبرینگ",
    role: "نشیمن شفت",
    body: "روی شفت می‌نشیند و در سری‌های FZ و FGR، ردیف بلبرینگ هم مرکزیت و تحمل بار شعاعی را انجام می‌دهد.",
  },
];

const CYCLE = [
  {
    code: "01",
    title: "در جهت کارکرد: آزاد",
    body: "المان در بخش پهن فضای گوه‌ای می‌ماند و تماسی با سطح قفل نمی‌گیرد. شفت آزادانه می‌چرخد و گشتاوری منتقل نمی‌شود.",
    tone: "mint" as const,
  },
  {
    code: "02",
    title: "برگشت: قفل در چند میلی‌ثانیه",
    body: "با تغییر جهت، المان به سمت دهانه‌ی باریک کشیده می‌شود و بین دو حلقه گیر می‌کند. نیرو مکانیکی منتقل می‌شود؛ بدون برق، سنسور یا فرمان.",
    tone: "lock" as const,
  },
  {
    code: "03",
    title: "برگشت به حالت آزاد",
    body: "وقتی جهت دوباره درست شد، المان رها می‌شود و قطعه به حالت هرزگردی برمی‌گردد. همین رفت‌وبرگشت، اساس بک‌استاپ و ایندکسینگ است.",
    tone: "mint" as const,
  },
];

export function MechanismExplorer() {
  const [step, setStep] = useState<StepId>("parts");

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          role="tablist"
          aria-label="سازوکار فری‌ویل"
          aria-orientation="vertical"
          className="grid gap-2"
        >
          {STEPS.map(({ id, label, Icon, hint }) => {
            const active = step === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`mechanism-tab-${id}`}
                aria-selected={active}
                aria-controls={`mechanism-panel-${id}`}
                onClick={() => setStep(id)}
                className={cn(
                  "flex items-start gap-3 rounded-[14px] border px-4 py-3.5 text-right transition-colors",
                  active
                    ? "border-accent bg-panel text-fg"
                    : "border-line bg-paper text-fg-muted hover:border-line-2 hover:text-fg",
                )}
              >
                <Icon
                  className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-accent" : "text-fg-dim")}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[13.5px] font-semibold">{label}</span>
                  <span className="mt-1 block text-[11.5px] leading-5 text-fg-dim">{hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 hidden rounded-[14px] border border-line bg-paper p-4 text-[12px] leading-6 text-fg-dim lg:block">
          <Cog className="mb-2 h-4 w-4 text-fg-dim" aria-hidden="true" />
          هر سه بخش از یک اصل می‌گویند: تبدیل اختلاف جهت به تماس مکانیکی. برای همین است که
          فری‌ویل بدون برق و سنسور کار می‌کند.
        </div>
      </div>

      <div
        role="tabpanel"
        id={`mechanism-panel-${step}`}
        aria-labelledby={`mechanism-tab-${step}`}
        tabIndex={-1}
      >
        {step === "parts" ? <PartsPanel /> : null}
        {step === "cycle" ? <CyclePanel /> : null}
        {step === "family" ? <FamilyPanel /> : null}
      </div>
    </div>
  );
}

function PartsPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <MediaFrame
        code="EXPLODED VIEW"
        caption="ترتیب اجزا از بیرون به داخل: حلقه‌ی خارجی، قفسه‌ی غلتک با فنر، حلقه‌ی داخلی، ردیف بلبرینگ و واشر نگه‌دارنده."
        meta="رندر شبیه‌سازی‌شده"
      >
        <Image
          src={processExploded}
          alt="نمای باز‌شده‌ی فری‌ویل: حلقه‌ی بیرونی، قفسه‌ی غلتک، حلقه‌ی داخلی، بلبرینگ و واشر"
          placeholder="blur"

          sizes="(min-width: 1024px) 46vw, 100vw"
          className="h-auto w-full"
        />
      </MediaFrame>

      <ol className="grid gap-3">
        {PARTS.map((part, index) => (
          <li
            key={part.name}
            className="flex gap-4 rounded-[14px] border border-line bg-panel/70 px-4 py-4"
          >
            <span className="code mt-0.5 text-[12px] font-semibold text-accent" translate="no">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-[14.5px] font-bold text-fg">{part.name}</h3>
                <Tag>{part.role}</Tag>
              </div>
              <p className="mt-2 text-[13px] leading-7 text-fg-muted">{part.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CyclePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <FreewheelDemo />
      <div className="grid gap-3">
        {CYCLE.map((item) => (
          <article
            key={item.code}
            className={cn(
              "rounded-[14px] border border-line bg-panel/70 px-5 py-4",
              item.tone === "lock"
                ? "shadow-[inset_3px_0_0_var(--color-coral)]"
                : "shadow-[inset_3px_0_0_var(--color-accent-soft)]",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="code text-[12px] font-semibold text-fg-dim" translate="no">
                {item.code}
              </span>
              <h3 className="text-[15px] font-bold text-fg">{item.title}</h3>
            </div>
            <p className="mt-2 text-[13.5px] leading-7 text-fg-muted">{item.body}</p>
          </article>
        ))}
        <p className="rounded-[14px] border border-dashed border-line-2/70 px-5 py-4 text-[12.5px] leading-6 text-fg-dim">
          برای بک‌استاپ نوار نقاله، حالت آزاد معمولاً چند ثانیه در روز است؛ برای درایو دوموتوره،
          ساعت‌ها در روز. همین تفاوت، انتخاب نسخه (استاندارد، X یا لیفت‌آف) را تعیین می‌کند.
        </p>
      </div>
    </div>
  );
}

const COMPARE = [
  { label: "شکل المان", sprag: "گوه‌ی فولادی با فنر", roller: "غلتک استوانه‌ای" },
  { label: "گشتاور در قطر مساوی", sprag: "بالاتر", roller: "پایین‌تر" },
  { label: "دقت زاویه‌ی درگیری", sprag: "بسیار خوب؛ برای ایندکسینگ", roller: "خوب؛ با بازی بیشتر" },
  { label: "دور آزاد مجاز", sprag: "پایین‌تر (به لیفت‌آف نیاز دارد)", roller: "بالاتر" },
  { label: "کاربرد رایج", sprag: "بک‌استاپ سنگین، درایو دوموتوره", roller: "انتقال عمومی، نوار نقاله" },
];

function FamilyPanel() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          {
            title: "اسپراگ",
            english: "SPRAG",
            diagram: <SpragTypeDiagram animate={false} className="h-auto w-full" />,
            text: "المان‌های گوه‌ای بلند که در فضای بین دو حلقه می‌نشینند. گشتاور بالا در قطر کم، دقت زاویه‌ی خوب؛ در عوض به روانکاری و هم‌مرکزی حساس‌ترند.",
          },
          {
            title: "رولری",
            english: "ROLLER",
            diagram: <RollerTypeDiagram animate={false} className="h-auto w-full" />,
            text: "غلتک‌های ساده که در دهانه‌ی گوه‌ای حرکت می‌کنند. ساختار ساده‌تر و معمولاً ارزان‌تر؛ برای دور آزاد بالاتر مناسب‌ترند.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-[16px] border border-line bg-panel p-5">
            <div className="plate-shot rounded-[10px] px-4 py-6">
              {item.diagram}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <h3 className="text-[17px] font-bold text-fg">{item.title}</h3>
              <Tag>{item.english}</Tag>
            </div>
            <p className="mt-2.5 text-[13px] leading-7 text-fg-muted">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-[14px] border border-line bg-panel">
        <table className="spec-table">
          <caption className="border-b border-line px-4 py-3 text-start text-[12px] text-fg-muted">
            مقایسه‌ی خلاصه؛ انتخاب نهایی به گشتاور، دور آزاد و نوع نصب بستگی دارد.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-start">
                معیار
              </th>
              <th scope="col" className="text-start">
                اسپراگ
              </th>
              <th scope="col" className="text-start">
                رولری
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label}>
                <td className="font-medium text-fg">{row.label}</td>
                <td>{row.sprag}</td>
                <td>{row.roller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
