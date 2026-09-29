import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ARTICLES, getArticle, type Block } from '@/data/articles'
import { PageHeader } from '@/components/ui/PageHeader'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { JsonLd } from '@/components/seo/JsonLd'
import { MagneticLink } from '@/components/motion/MagneticButton'
import { buildMetadata, toEnDigits, BASE_URL } from '@/lib/seo'
import { spec } from '@/lib/utils'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  return buildMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/articles/${a.slug}`,
    type: 'article',
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 4)

  return (
    <>
      <PageHeader
        eyebrow={article.category}
        breadcrumb={[
          { href: '/', label: 'خانه' },
          { href: '/articles', label: 'مقالات' },
          { label: article.title },
        ]}
        title={article.title}
        lead={article.excerpt}
        specs={[
          { label: 'تاریخ', value: article.date },
          { label: 'زمان مطالعه', value: article.readingTime },
          { label: 'دسته', value: article.category },
        ]}
      />

      <article className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="lg:col-span-8">
            <div className="prose-ir">
              {article.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            <div className="mt-14">
              <ShopRoute to="bearing" variant="band" />
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.7rem] tracking-widest text-fg-dim">مقالات دیگر</p>
              <ul className="mt-4 space-y-px border border-line bg-line">
                {others.map((a) => (
                  <li key={a.slug} className="bg-surface">
                    <Link
                      href={`/articles/${a.slug}`}
                      className="group block p-4 transition-colors hover:bg-surface-2"
                    >
                      <p className="text-[0.68rem] text-fg-dim">{a.category}</p>
                      <p className="mt-1.5 text-sm leading-7 text-fg-muted transition-colors group-hover:text-accent">
                        {a.title}
                      </p>
                      <p className="tnum mt-2 text-[0.68rem] text-fg-dim">{a.readingTime}</p>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border border-line bg-surface p-5">
                <p className="text-sm font-semibold text-fg">سؤال باقی‌مانده دارید؟</p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">
                  اگر چیزی در این مقاله نبود که به درد کارتان بخورد، بپرسید. معمولاً با دو سه
                  سؤال به جواب می‌رسیم.
                </p>
                <MagneticLink
                  href="/contact"
                  className="mt-5 w-full border border-line-strong text-fg hover:border-accent hover:text-accent"
                >
                  پرسیدن سؤال
                </MagneticLink>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <JsonLd
        data={{
          '@type': 'Article',
          '@id': `${BASE_URL}/articles/${article.slug}#article`,
          headline: toEnDigits(article.title),
          description: toEnDigits(article.excerpt),
          inLanguage: 'fa-IR',
          articleSection: article.category,
          datePublished: toLatinDate(article.date),
          author: { '@type': 'Organization', name: 'freewheel.ir', url: BASE_URL },
          publisher: {
            '@type': 'Organization',
            name: 'freewheel.ir',
            url: BASE_URL,
            '@id': `${BASE_URL}/#organization`,
          },
          mainEntityOfPage: `${BASE_URL}/articles/${article.slug}`,
        }}
      />
    </>
  )
}

function toLatinDate(fa: string) {
  const [y, m, d] = fa.split('/')
  return `${toEnDigits(y)}-${toEnDigits(m).padStart(2, '0')}-${toEnDigits(d).padStart(2, '0')}`
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'p':
      return <p>{block.text}</p>
    case 'ul':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="[list-style:decimal]">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      )
    case 'note':
      return (
        <aside className="my-7 border border-line bg-surface">
          <div className="hatch h-1 w-full" aria-hidden />
          <p className="p-4 text-sm leading-8 text-fg-muted">{block.text}</p>
        </aside>
      )
    case 'formula':
      return (
        <figure className="my-7 border border-line bg-surface-2 p-5">
          <p className="text-[0.7rem] tracking-wide text-fg-dim">{block.label}</p>
          <p dir="ltr" className="tnum mt-3 text-start text-lg font-semibold text-accent">
            {block.expr}
          </p>
          <figcaption className="mt-2 text-xs leading-6 text-fg-dim">{block.gloss}</figcaption>
        </figure>
      )
    case 'table':
      return (
        <figure className="my-8 -mx-5 overflow-x-auto md:mx-0">
          <table className="w-full min-w-[34rem] border-collapse">
            <caption className="pb-3 text-start text-xs text-fg-dim">{block.caption}</caption>
            <thead>
              <tr className="border-y border-line">
                {block.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="bg-surface px-3 py-2.5 text-start text-[0.72rem] font-medium text-fg-dim"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-line">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`tnum px-3 py-3 text-sm ${ci === 0 ? 'text-fg' : 'text-fg-muted'}`}
                    >
                      {typeof cell === 'number' ? spec(cell) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )
    default:
      return null
  }
}
