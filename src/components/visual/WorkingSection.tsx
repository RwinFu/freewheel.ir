'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STEPS = [
  {
    id: 'free',
    label: 'آزادچرخش',
    caption:
      'بار رو به پایین می‌رود. حلقهٔ داخلی و بیرونی از هم جدا می‌شوند و هیچ گشتاوری عبور نمی‌کند. تمام انرژی گرفته‌شده، همین جداشدن است.',
    force: '۰ N·m',
    speed: '۰ min⁻¹',
  },
  {
    id: 'contact',
    label: 'برخورد',
    caption:
      'رولری‌ها از شیب رینگ بیرونی بالا می‌آیند و به رینگ مقابل می‌رسند. از این لحظه به بعد، سایش شروع می‌شود — و با این‌که کوتاه باشد.',
    force: '۰ – ۳۵۰ N',
    speed: '۰ – ۶۰۰ min⁻¹',
  },
  {
    id: 'lock',
    label: 'قفل',
    caption:
      'رولری بین دو سطح گیر می‌کند. بدون لغزش منتقل می‌شود، پس گشتاور اسمی کاتالوگ تقریباً بدون تلفات عبور می‌کند.',
    force: '۶۸٬۰۰۰ N·m',
    speed: '۵٬۴۰۰ min⁻¹',
  },
]

/**
 * The pinned section. The drawing stays on screen while the scroll
 * drives it through a full lock/freewheel cycle, and the read-out beside
 * it tracks the phase. Pin length is capped so the sticky period never
 * outstays its welcome on a long page.
 */
export function WorkingSection() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setStep(2)
        return
      }

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=150%',
            pin: stage.current,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress
              setStep(p < 0.34 ? 0 : p < 0.67 ? 1 : 2)
            },
          },
        })

        /*
         * A cross-section has no visible rotation — turning the ring in
         * plane only made the bands lean. The roller cage travelling
         * around the circumference is the motion a reader actually needs
         * to see, so that is what the scrub drives. The roller lift, the
         * contact highlight and the torque arrow are React state driven
         * and must not be tweened here, or they snap back on re-render.
         */
        tl.fromTo(
          '[data-spin="outer"]',
          { x: 0 },
          { x: 32, ease: 'none' },
          0,
        )
          .fromTo(
            '[data-spin="ramp-fade"]',
            { opacity: 1 },
            { opacity: 0.55, ease: 'none', duration: 0.5 },
            0.5,
          )

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative border-y border-line bg-surface-2">
      <div ref={stage} className="shell flex min-h-dvh flex-col justify-center py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">چرخهٔ کاری</p>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              سه لحظه‌ای که هر فری‌ویل در هر ثانیه از سر می‌گذراند
            </h2>
            <p className="mt-4 max-w-md leading-8 text-fg-muted">
              همهٔ کلاچ‌های یک‌طرفه، از همان سه لحظه استفاده می‌کنند. تفاوت برندها و تیپ‌ها این است که
              در کدام لحظه سایش اتفاق می‌افتد و چقدر طول می‌کشد.
            </p>

            <ol className="mt-9 space-y-0">
              {STEPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={step === i ? 'step' : undefined}
                    className={cn(
                      'group block w-full border-s-2 py-4 text-start transition-colors',
                      step === i ? 'border-accent' : 'border-line hover:border-line-strong',
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4 ps-4">
                      <span
                        className={cn(
                          'text-base font-semibold transition-colors',
                          step === i ? 'text-fg' : 'text-fg-dim',
                        )}
                      >
                        <span className="tnum me-2.5 text-xs text-fg-dim">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.label}
                      </span>
                      <span className="num tnum shrink-0 text-xs text-accent">{s.force}</span>
                    </div>
                    <p
                      className={cn(
                        'ps-4 pe-2 text-sm leading-7 transition-colors duration-300',
                        step === i ? 'text-fg-muted' : 'text-fg-dim',
                      )}
                    >
                      {s.caption}
                    </p>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div className="grid-etch border border-line bg-ink p-6 sm:p-10">
              <WorkingDrawing step={step} />
            </div>
            <p className="mt-3 flex justify-between text-[0.7rem] text-fg-dim">
              <span>شماتیک — مقیاس ترسیمی نیست</span>
              <span>
                {step === 2 ? 'انتقال گشتاور' : 'دور آزاد'}:{' '}
                <span className="num tnum">{step === 2 ? 'کامل' : STEPS[step].speed}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkingDrawing({ step }: { step: number }) {
  const engaged = step >= 1

  return (
    <svg
      viewBox="0 0 420 300"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="شماتیک چرخهٔ قفل و آزادچرخش فری‌ویل رولری"
    >
      <defs>
        <pattern id="ws-hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#4b545c" strokeWidth="1.1" />
        </pattern>
      </defs>

      {/*
        The outer ring and its roller cage are one rotating body, so they
        live in the same <g>. Moving the rollers out of it was the whole
        reason they appeared to slide off their ramps: as the ring turned,
        the ramp wedges travelled and the rollers stood still.
      */}
      <g data-spin="outer">
        <rect x="86" y="32" width="248" height="44" fill="#1e242a" stroke="#5f6a73" strokeWidth="1.4" />
        <rect x="86" y="32" width="248" height="44" fill="url(#ws-hatch)" opacity="0.12" />
        <rect x="86" y="224" width="248" height="44" fill="#1e242a" stroke="#5f6a73" strokeWidth="1.4" />
        <rect x="86" y="224" width="248" height="44" fill="url(#ws-hatch)" opacity="0.12" />

        {/* ramp wedges, cut into the inner face of the outer ring */}
        {RAMP.map((x) => (
          <g key={x}>
            <path d={`M${x} 76 h13 l-6.5 16 z`} fill="#0e1012" stroke="#7b868f" strokeWidth="0.9" />
            <path d={`M${x} 224 h13 l-6.5 -16 z`} fill="#0e1012" stroke="#7b868f" strokeWidth="0.9" />
          </g>
        ))}

        {/*
          Roller cage. The two rows translate toward the wedge from
          opposite sides — a single group moved them both the same way,
          which is not what a freewheel does.
        */}
        <g
          data-spin="rollers"
          style={{
            transform: `translateY(${engaged ? (step === 2 ? 15 : 7) : 0}px)`,
            transition: 'transform 500ms cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          {RAMP.map((x) => (
            <g key={x}>
              <circle cx={x + 6.5} cy="102" r="10.5" fill="#c2ccd3" stroke="#7b868f" strokeWidth="1" />
              <circle cx={x + 6.5} cy="198" r="10.5" fill="#c2ccd3" stroke="#7b868f" strokeWidth="1" />
            </g>
          ))}
        </g>
      </g>

      {/* contact highlight, only while the elements actually touch */}
      <g data-el="contact-line" opacity={engaged ? 1 : 0} style={{ transition: 'opacity 300ms' }}>
        {RAMP.map((x) => (
          <line
            key={x}
            x1={x + 6.5}
            y1="92"
            x2={x + 6.5}
            y2="208"
            stroke="var(--color-accent)"
            strokeWidth="1.4"
            opacity="0.5"
          />
        ))}
      </g>

      {/* inner ring + shaft — the wedge the rollers clamp against */}
      <rect
        x="128"
        y="128"
        width="164"
        height="44"
        fill="#2b333a"
        stroke="#727d86"
        strokeWidth="1.4"
        style={{ transition: 'none' }}
      />
      <line x1="128" y1="150" x2="292" y2="150" stroke="#5f6a73" strokeWidth="0.9" strokeDasharray="10 4 2 4" />
      <rect x="292" y="137" width="86" height="26" fill="#252c32" stroke="#727d86" strokeWidth="1.3" />

      {/* torque entering through the shaft, only while locked */}
      <g data-el="force" style={{ transform: `scaleX(${step === 2 ? 1 : 0})`, transformOrigin: '0% 50%', transition: 'transform 450ms cubic-bezier(0.33, 1, 0.68, 1)' }}>
        <line x1="20" y1="150" x2="66" y2="150" stroke="var(--color-accent)" strokeWidth="2.5" />
        <path d="M72 150 l-9 -5.5 v11 z" fill="var(--color-accent)" />
        <text x="20" y="138" fill="var(--color-accent)" fontSize="11" className="tnum">
          M
        </text>
      </g>
    </svg>
  )
}

const RAMP = [120, 152, 184, 216, 248, 280]
