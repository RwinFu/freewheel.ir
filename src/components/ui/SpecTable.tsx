import { cn } from '@/lib/utils'

export type SpecColumn = {
  key: string
  label: string
  unit?: string
  align?: 'start' | 'end'
  /** Emphasise as the size-defining figure. */
  strong?: boolean
}

/**
 * A specification table, not a data dump. Hairline rules, tabular
 * figures, and the row that the page is about is marked with an accent
 * edge rather than a filled background.
 */
export function SpecTable({
  columns,
  rows,
  caption,
  highlight,
  hrefFor,
  className,
  dense = false,
}: {
  columns: SpecColumn[]
  rows: Record<string, string | number | null>[]
  caption?: string
  /** Value of the first column on the row to mark. */
  highlight?: string
  hrefFor?: (row: Record<string, string | number | null>) => string | undefined
  className?: string
  dense?: boolean
}) {
  return (
    <div className={cn('-mx-5 overflow-x-auto md:mx-0', className)}>
      <table className="w-full min-w-[38rem] border-collapse text-start">
        {caption && (
          <caption className="pb-3 text-start text-xs text-fg-dim">{caption}</caption>
        )}
        <thead>
          <tr className="border-y border-line">
            {columns.map((c, i) => (
              <th
                key={c.key}
                scope="col"
                className={cn(
                  'whitespace-nowrap bg-surface px-3 py-3 text-[0.72rem] font-medium tracking-wide text-fg-dim',
                  dense ? 'px-2.5' : 'px-4',
                  i === 0 && 'text-start',
                  c.align === 'end' ? 'text-end' : 'text-start',
                )}
              >
                {c.label}
                {c.unit && <span className="tnum ms-1 font-normal opacity-60">({c.unit})</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const first = String(row[columns[0].key] ?? '')
            const isHi = highlight === first
            const href = hrefFor?.(row)
            return (
              <tr
                key={ri}
                className={cn(
                  'border-b border-line transition-colors',
                  isHi ? 'bg-accent-wash' : 'hover:bg-surface',
                )}
              >
                {columns.map((c, ci) => {
                  const raw = row[c.key]
                  const text = raw === null || raw === undefined ? '—' : String(raw)
                  const isFirst = ci === 0
                  return (
                    <td
                      key={c.key}
                      className={cn(
                        'tnum whitespace-nowrap px-3 align-middle text-sm',
                        dense ? 'px-2.5 py-2.5' : 'px-4 py-3.5',
                        isFirst ? 'font-medium' : 'text-fg-muted',
                        isFirst ? 'text-fg' : 'text-fg-muted',
                        c.align === 'end' ? 'text-end' : 'text-start',
                        isHi && 'text-fg',
                        c.strong && 'font-semibold text-fg',
                      )}
                    >
                      {isFirst && href ? (
                        <a
                          href={href}
                          className="inline-flex items-center gap-1.5 underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-accent"
                        >
                          {text}
                          <svg viewBox="0 0 12 12" className="size-2.5 opacity-50" aria-hidden fill="none">
                            <path d="M4 2h6v6M10 2L3 9" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                        </a>
                      ) : (
                        text
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
