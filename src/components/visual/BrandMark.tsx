import { cn } from '@/lib/utils'

/**
 * Brand marks. We don't have licence to the manufacturers' artwork and
 * wouldn't use it loosely anyway, so each brand is set as a wordmark in
 * the house face — same baseline, same weight, same optical size. The
 * line between a vendor's name and its logo is a legal question; the
 * typographic treatment sidesteps it and keeps the row honest.
 */
export function BrandMark({
  name,
  mark,
  className,
}: {
  name: string
  mark: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-20 items-center justify-center border border-line bg-surface px-4 transition-colors duration-300 hover:border-line-strong hover:bg-surface-2',
        className,
      )}
    >
      <span className="flex flex-col items-center gap-1 opacity-55 transition-opacity duration-300 hover:opacity-100">
        <span
          className="tnum font-display text-lg font-bold leading-none text-fg-muted"
          dir="ltr"
          style={{ letterSpacing: '0.04em' }}
        >
          {mark}
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-fg-dim" dir="ltr">
          {name}
        </span>
      </span>
    </div>
  )
}
