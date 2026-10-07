import { ChevronDown } from "lucide-react";

import { FAQ } from "@/content/articles";
import { cn } from "@/lib/utils";

type FaqItem = (typeof FAQ)[number];

export function FaqList({
  items = FAQ,
  className,
  tone = "light",
}: {
  items?: readonly FaqItem[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "divide-y border-y",
        dark ? "divide-white/10 border-white/10" : "divide-line border-line",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <span
              className={cn(
                "text-[14px] leading-7 transition-colors sm:text-[15px]",
                dark ? "text-white/90 group-open:text-mint" : "text-fg group-open:text-accent",
              )}
            >
              {item.q}
            </span>
            <span
              className={cn(
                "mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                dark
                  ? "border-white/15 text-white/60 group-open:border-mint group-open:bg-mint group-open:text-ocean"
                  : "border-line-2 text-fg-muted group-open:border-accent group-open:bg-accent group-open:text-white",
              )}
            >
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </span>
          </summary>
          <p
            className={cn(
              "max-w-3xl pb-6 pe-11 text-[13px] leading-7 sm:text-[14px]",
              dark ? "text-white/60" : "text-fg-muted",
            )}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
