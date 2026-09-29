import Link from 'next/link'

export type Crumb = { href?: string; label: string }

/** Shared page head: breadcrumb trail, title, lead, and a four-figure
 *  spec strip. Pages that need a different shape just don't use it. */
export function PageHeader({
  eyebrow,
  breadcrumb,
  title,
  subtitle,
  lead,
  specs,
  className = '',
}: {
  eyebrow?: string
  breadcrumb?: Crumb[]
  title: string
  subtitle?: string
  lead?: React.ReactNode
  specs?: { label: string; value: string; unit?: string }[]
  className?: string
}) {
  return (
    <section className={`border-b border-line bg-surface ${className}`}>
      <div className="shell py-12 sm:py-16">
        {breadcrumb && (
          <nav aria-label="مسیر صفحه" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-fg-dim">
              {breadcrumb.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-fg-muted">{c.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <svg viewBox="0 0 12 12" className="size-2.5 opacity-40" aria-hidden fill="none">
                      <path d="M9 2L4 6l5 4" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className={specs ? 'lg:col-span-7' : 'lg:col-span-9'}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">
              {title}
              {subtitle && (
                <span dir="ltr" className="tnum mt-3 block text-base font-normal text-fg-dim">
                  {subtitle}
                </span>
              )}
            </h1>
            {lead && <p className="mt-6 max-w-2xl text-lg leading-9 text-fg-muted">{lead}</p>}
          </div>

          {specs && (
            <div className="lg:col-span-5 lg:pt-10">
              <dl className="grid grid-cols-2 gap-px border border-line bg-line">
                {specs.map((s) => (
                  <div key={s.label} className="bg-surface-2 px-4 py-4">
                    <dt className="text-[0.7rem] leading-5 text-fg-dim">{s.label}</dt>
                    <dd className="tnum mt-1 text-xl font-bold text-fg">
                      {s.value}
                      {s.unit && <span className="ms-1 text-xs font-normal text-fg-dim">{s.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
