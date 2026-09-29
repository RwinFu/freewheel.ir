import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  align = 'start',
  className,
}: {
  index?: string
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'start' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {(eyebrow || index) && (
        <p className="eyebrow">
          {index && <span className="tnum text-fg-dim">{index}</span>}
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-5 text-3xl leading-tight sm:text-4xl',
          align === 'center' && 'max-w-2xl',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('mt-5 leading-8 text-fg-muted', align === 'center' ? 'max-w-2xl' : 'max-w-xl')}>
          {lead}
        </p>
      )}
    </div>
  )
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hot"
    >
      {children}
      <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:-translate-x-1" aria-hidden fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </Link>
  )
}
