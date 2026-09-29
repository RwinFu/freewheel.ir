import Link from 'next/link'
import { BRANDS } from '@/data/brands'
import { BrandMark } from '@/components/visual/BrandMark'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal, RevealItem } from '@/components/motion/Reveal'

/**
 * The house is Ringspann; the rest are listed so a buyer arriving with
 * a part number can find where it fits. Ringspann gets the lead card,
 * the others get an honest one-line reason each.
 */
export function BrandsSection() {
  const [lead, ...rest] = BRANDS

  return (
    <section className="border-y border-line bg-surface">
      <div className="shell py-20 sm:py-28">
        <Reveal>
          <SectionHeader
            index="۰۴"
            eyebrow="برندها"
            title="یک برند اصلی، و چند برند دیگر که سر جای خودشان هستند"
            lead="موجودی و دانش فنی ما روی رینگسپان متمرکز است. بقیهٔ برندها را برای پروژه‌هایی نگه می‌داریم که قطعهٔ هم‌خانوادهٔ خودشان را می‌خواهند — نه برای پر کردن فهرست."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          <RevealItem className="bg-surface-2 p-6 lg:col-span-1">
            <Link href={`/brands/${lead.slug}`} className="group block">
              <p className="text-[0.7rem] tracking-widest text-accent">برند اصلی</p>
              <p className="mt-3 text-2xl font-bold text-fg transition-colors group-hover:text-accent">
                {lead.name}
              </p>
              <p className="mt-1 text-sm text-fg-dim">{lead.tagline}</p>
              <p className="mt-5 text-sm leading-7 text-fg-muted">{lead.body[0]}</p>
              <dl className="mt-6 space-y-2 border-t border-line pt-5">
                {lead.envelope.map((e) => (
                  <div key={e.label} className="flex justify-between gap-3 text-xs">
                    <dt className="text-fg-dim">{e.label}</dt>
                    <dd className="tnum text-end text-fg-muted">{e.value}</dd>
                  </div>
                ))}
              </dl>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                صفحهٔ برند
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </Link>
          </RevealItem>

          {rest.map((b) => (
            <RevealItem key={b.slug} className="bg-surface p-6">
              <Link href={`/brands/${b.slug}`} className="group flex h-full flex-col">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-lg font-bold text-fg transition-colors group-hover:text-accent">
                    {b.name}
                  </p>
                  <p className="text-xs text-fg-dim">{b.country}</p>
                </div>
                <p className="mt-1 text-sm text-fg-dim">{b.tagline}</p>
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-fg-muted">{lead2(b.body[0])}</p>
                <p className="mt-auto pt-5 text-xs text-fg-dim">
                  <span className="tnum">{b.since}</span> — {b.fit}
                </p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} aria-label={`برند ${b.name}`}>
                <BrandMark name={b.name} mark={b.mark} className="w-full border-0" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Trim a paragraph to a readable length for the card. */
function lead2(text: string, max = 190) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}
