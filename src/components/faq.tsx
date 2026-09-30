import { FAQ } from "@/content/articles";

export function FaqList() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5">
            <span className="text-[15px] leading-7 text-fg transition-colors group-open:text-accent">
              {item.q}
            </span>
            <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center border border-line-2 text-fg-dim transition-colors group-open:border-accent group-open:text-accent">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                <path d="M1 6 h10" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M6 1 v10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="transition-opacity group-open:opacity-0"
                />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pe-9 text-[14px] leading-8 text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
