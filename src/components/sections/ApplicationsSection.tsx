import Image from 'next/image'
import Link from 'next/link'
import { APPLICATIONS } from '@/data/applications'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ShopRoute } from '@/components/ui/ShopRoute'
import { Reveal, RevealItem } from '@/components/motion/Reveal'

export function ApplicationsSection() {
  return (
    <section id="applications" className="shell py-20 sm:py-28">
      <Reveal>
        <SectionHeader
          index="۰۵"
          eyebrow="کاربردها"
          title="شش صنعتی که هر روز با فری‌ویل سر کار دارند"
          lead="برای هر کدام نوشته‌ایم که مسئلهٔ واقعی روی زمین چیست، کدام نوع قطعه جواب می‌دهد و چه چیزی را باید در تیپ انتخاب حواستان به آن باشد."
        />
      </Reveal>

      <Reveal className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {APPLICATIONS.map((app) => (
          <RevealItem key={app.slug} className="group relative bg-surface">
            <Link href={`/applications#${app.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <Image
                  src={app.image}
                  alt={app.lead}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute bottom-3 start-4">
                  <h3 className="text-lg font-bold text-fg">{app.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-7 text-fg-muted">{app.lead}</p>
                <dl className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {app.figures.slice(0, 2).map((f) => (
                    <div key={f.label} className="flex justify-between gap-3 text-[0.72rem]">
                      <dt className="text-fg-dim">{f.label}</dt>
                      <dd className="tnum text-end text-fg-muted">
                        {f.value}
                        {f.note && <span className="text-fg-dim"> — {f.note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="mt-10">
        <ShopRoute to="automation" variant="band" />
      </Reveal>
    </section>
  )
}
