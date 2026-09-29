'use client'

import { useState } from 'react'
import { FAQ } from '@/data/faq'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

export function FaqSection({ title, eyebrow, index }: { title?: string; eyebrow?: string; index?: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="shell py-20 sm:py-28">
      <SectionHeader index={index} eyebrow={eyebrow} title={title ?? 'سؤالاتی که بیشتر پرسیده می‌شود'} />

      <div className="mt-10 border-t border-line">
        {FAQ.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-start transition-colors hover:text-accent"
                >
                  <span className={cn('text-[0.98rem] font-medium', isOpen ? 'text-fg' : 'text-fg')}>
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      'relative size-4 flex-none transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                    aria-hidden
                  >
                    <span className="absolute top-1/2 start-0 h-px w-full -translate-y-1/2 bg-accent" />
                    <span className="absolute start-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent" />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                hidden={!isOpen}
                className="pb-6"
              >
                <p className="max-w-3xl text-sm leading-8 text-fg-muted">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
