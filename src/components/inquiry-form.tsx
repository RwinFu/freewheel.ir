"use client";

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

import { SHOPS } from "@/content/site";
import { cn } from "@/lib/utils";

type State = "idle" | "sending" | "done" | "error";

const fieldClass =
  "w-full border border-line-2 bg-panel-2 px-3.5 py-2.5 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-accent";
const labelClass = "mb-1.5 block text-[12.5px] text-fg-muted";

export function InquiryForm({
  source = "contact",
  partNumber = "",
  compact = false,
}: {
  source?: string;
  partNumber?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<{ label: string; url: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    partNumber,
    shaft: "",
    power: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((previous) => ({ ...previous, [key]: event.target.value }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    setFallback(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          pagePath: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        fallback?: { label: string; url: string };
      };
      if (!response.ok || !data.ok) {
        setError(data.error ?? "ثبت درخواست انجام نشد.");
        setFallback(data.fallback ?? null);
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("ارتباط با سرور برقرار نشد. لطفاً تلفنی تماس بگیرید.");
      setState("error");
    }
  }

  if (process.env.NEXT_PUBLIC_STATIC_SITE === "1") {
    return (
      <div className="border border-line bg-panel px-6 py-8">
        <h3 className="text-[16px] text-fg">درخواست قطعه و سایزبندی</h3>
        <p className="mt-3 max-w-xl text-[13.5px] leading-7 text-fg-muted">
          این نسخهٔ نمایشی روی GitHub Pages فرم ثبت درخواست ندارد و اطلاعاتی دریافت نمی‌کند.
          برای استعلام قیمت و هماهنگی، به فروشگاه آنلاین مراجعه کنید.
        </p>
        <a
          href={SHOPS.bearing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex bg-accent px-5 py-2.5 text-[13px] font-semibold text-accent-ink hover:bg-accent-soft"
        >
          {SHOPS.bearing.label}
        </a>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="border border-accent/40 bg-accent/6 px-6 py-10 text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center border border-accent/50 text-accent">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-[17px] text-fg">درخواست ثبت شد</h3>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-7 text-fg-muted">
          مشخصات را بررسی می‌کنیم و برای سایزبندی و کد قطعه‌ی دقیق با شما تماس می‌گیریم. اگر
          کار فوری است، در ساعات کاری تلفن بزنید.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-line bg-panel">
      <div className="border-b border-line px-6 py-4">
        <h3 className="text-[16px] text-fg">فرم سایزبندی و درخواست قطعه</h3>
        <p className="mt-1.5 text-[12.5px] leading-6 text-fg-dim">
          چهارتای اول کافی است؛ بقیه را اگر دستتان بود پر کنید. هرچه دقیق‌تر بنویسید، جواب
          دقیق‌تری می‌گیرید.
        </p>
      </div>

      <div className={cn("grid gap-4 px-6 py-6", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label className={labelClass} htmlFor="f-name">
            نام و نام خانوادگی *
          </label>
          <input
            id="f-name"
            className={fieldClass}
            value={form.name}
            onChange={update("name")}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="f-phone">
            شماره تماس *
          </label>
          <input
            id="f-phone"
            className={cn(fieldClass, "tnum")}
            value={form.phone}
            onChange={update("phone")}
            required
            inputMode="tel"
            dir="ltr"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="f-part">
            کد قطعه (اگر می‌دانید)
          </label>
          <input
            id="f-part"
            className={fieldClass}
            value={form.partNumber}
            onChange={update("partNumber")}
            placeholder="مثلاً FGR 45 R"
            dir="ltr"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="f-shaft">
            قطر شفت (mm)
          </label>
          <input
            id="f-shaft"
            className={cn(fieldClass, "tnum")}
            value={form.shaft}
            onChange={update("shaft")}
            inputMode="numeric"
            dir="ltr"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="f-power">
            توان موتور / گشتاور
          </label>
          <input
            id="f-power"
            className={fieldClass}
            value={form.power}
            onChange={update("power")}
            placeholder="۷٫۵ kW با ۱۴۵۰ rpm"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="f-company">
            شرکت
          </label>
          <input
            id="f-company"
            className={fieldClass}
            value={form.company}
            onChange={update("company")}
            autoComplete="organization"
          />
        </div>
        <div className={compact ? "sm:col-span-2" : "sm:col-span-2"}>
          <label className={labelClass} htmlFor="f-message">
            توضیح کاربرد
          </label>
          <textarea
            id="f-message"
            className={cn(fieldClass, "min-h-28 resize-y")}
            value={form.message}
            onChange={update("message")}
            placeholder="نوع ماشین، جهت چرخش، اینکه کدام حلقه آزاد می‌چرخد، ساعات کارکرد در شبانه‌روز"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-line px-6 py-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft disabled:opacity-70"
        >
          {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {state === "sending" ? "در حال ارسال" : "ارسال درخواست"}
        </button>
        {state === "error" ? (
          <span role="alert" className="text-[12.5px] leading-6 text-accent">
            {error}
            {fallback ? (
              <>
                {" "}
                <a
                  href={fallback.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent/40 underline-offset-4"
                >
                  {fallback.label}
                </a>
              </>
            ) : null}
          </span>
        ) : null}
        <span className="text-[12px] text-fg-dim">
          مشخصات شما فقط برای پاسخ به همین درخواست استفاده می‌شود.
        </span>
      </div>
    </form>
  );
}
