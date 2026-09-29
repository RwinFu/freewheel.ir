import type { Metadata } from 'next'
import Link from 'next/link'

import { ARTICLES } from '@/data/articles'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal, RevealItem } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'مقالات فنی فری‌ویل',
  description:
    'مقالات فنی دربارهٔ فری‌ویل و کلاچ یک‌طرفه: تفاوت سپراگ و رولری، روش سایزبندی، عیب‌یابی کلاچ در خطوط نساجی، بک‌استاپ و تیپ‌های ویژهٔ Ringspann.',
  path: '/articles',
})

export default function ArticlesPage() {
  const [first, ...rest] = ARTICLES

  return (
    <>
      <PageHeader
        eyebrow="مقالات فنی"
        breadcrumb={[{ href: '/', label: 'خانه' }, { label: 'مقالات' }]}
        title="مقالات فنی"
        subtitle="Notes from the workshop"
        lead="پنج یادداشت که از سؤال‌های واقعی مشتری‌ها بیرون آمده. اینجا چیزی برای پر کردن حجم نوشته نشده؛ هر مقاله به یک تصمیم مشخص پاسخ می‌دهد که در کارگاه با آن روبه‌رو می‌شوید."
      />

      <div className="shell py-16">
        {/* Lead article */}
        <Reveal className="border border-line bg-surface p-6 sm:p-8">
          <Link href={`/articles/${first.slug}`} className="group block">
            <p className="text-[0.7rem] tracking-widest text-accent">{first.category}</p>
            <h2 className="mt-4 max-w-3xl text-2xl leading-snug transition-colors group-hover:text-accent sm:text-3xl">
              {first.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-fg-muted">{first.excerpt}</p>
            <p className="tnum mt-6 text-xs text-fg-dim">
              {first.date} — {first.readingTime}
            </p>
          </Link>
        </Reveal>

        <Reveal className="mt-px grid gap-px border border-line bg-line sm:grid-cols-2">
          {rest.map((a) => (
            <RevealItem key={a.slug} className="bg-surface">
              <Link href={`/articles/${a.slug}`} className="group flex h-full flex-col p-6 sm:p-7">
                <p className="text-[0.7rem] tracking-widest text-fg-dim">{a.category}</p>
                <h2 className="mt-3 text-xl leading-snug transition-colors group-hover:text-accent">
                  {a.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-fg-muted">{a.excerpt}</p>
                <p className="tnum mt-auto pt-6 text-xs text-fg-dim">
                  {a.date} — {a.readingTime}
                </p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </>
  )
}
