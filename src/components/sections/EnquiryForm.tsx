'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitEnquiry, type EnquiryState } from '@/app/contact/actions'
import { cn } from '@/lib/utils'

const initial: EnquiryState = { status: 'idle' }

export function EnquiryForm() {
  const [state, action] = useActionState(submitEnquiry, initial)
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'delivered' || state.status === 'prepared') {
      formRef.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [state.status])

  return (
    <div>
      {state.status === 'delivered' && (
        <ResultPanel tone="ok">
          <h2 className="text-lg font-bold text-fg">درخواست‌تان ثبت شد</h2>
          <p className="mt-2 text-sm leading-7 text-fg-muted">
            معمولاً در همان روز کاری جواب می‌دهیم. اگر عجله دارید، با شمارهٔ تماس در فوتر هم تماس
            بگیرید.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 text-sm text-accent underline underline-offset-4"
          >
            ثبت درخواست جدید
          </button>
        </ResultPanel>
      )}

      {state.status === 'prepared' && (
        <ResultPanel tone="info">
          <h2 className="text-lg font-bold text-fg">درخواست آمادهٔ ارسال است</h2>
          <p className="mt-2 text-sm leading-7 text-fg-muted">
            این سایت هنوز به سرویس ارسال خودکار وصل نیست. متن زیر همان چیزی است که می‌خواستید
            بفرستید — کپی کنید یا مستقیم از برنامهٔ ایمیل بفرستید.
          </p>
          <pre className="mt-4 max-h-72 overflow-auto border border-line bg-ink p-4 text-start text-xs leading-7 text-fg-muted">
            {state.summary}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={state.mailto}
              className="inline-flex min-h-11 items-center bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hot"
            >
              باز کردن برنامهٔ ایمیل
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(state.summary)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                } catch {
                  setCopied(false)
                }
              }}
              className="inline-flex min-h-11 items-center border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? 'کپی شد' : 'کپی متن'}
            </button>
          </div>
        </ResultPanel>
      )}

      <form ref={formRef} action={action} className="mt-8" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="نام"
            required
            error={state.status === 'error' ? state.fieldErrors.name?.[0] : undefined}
            autoComplete="name"
          />
          <Field
            name="company"
            label="شرکت"
            error={state.status === 'error' ? state.fieldErrors.company?.[0] : undefined}
            autoComplete="organization"
          />
          <Field
            name="phone"
            label="شمارهٔ تماس"
            required
            type="tel"
            dir="ltr"
            error={state.status === 'error' ? state.fieldErrors.phone?.[0] : undefined}
            autoComplete="tel"
          />
          <Field
            name="shaftDiameter"
            label="قطر شفت"
            placeholder="مثلاً ۴۰ یا 40"
            error={state.status === 'error' ? state.fieldErrors.shaftDiameter?.[0] : undefined}
          />
          <Field
            name="motorPower"
            label="توان موتور"
            placeholder="مثلاً ۱۵ کیلووات"
            error={state.status === 'error' ? state.fieldErrors.motorPower?.[0] : undefined}
          />
        </div>

        <div className="mt-5">
          <Field
            name="application"
            label="کاربرد و محل نصب"
            required
            textarea
            placeholder="مثلاً: کلاچ یک‌طرفه روی ریل دوم خط تذکره، دور موتور ۱۴۵۰."
            error={state.status === 'error' ? state.fieldErrors.application?.[0] : undefined}
          />
        </div>

        <div className="mt-5">
          <Field
            name="message"
            label="توضیح تکمیلی"
            textarea
            placeholder="هرچه بیشتر بنویسید، پیشنهاد ما دقیق‌تر است. شمارهٔ قطعه، عکس نقشه یا مدل دستگاه هم کمک می‌کند."
            error={state.status === 'error' ? state.fieldErrors.message?.[0] : undefined}
          />
        </div>

        {/* Honeypot. Pushing it off-canvas with a negative offset still
            extended the document scroll width, so it is clipped in place
            instead — bots read the markup either way. */}
        <div
          aria-hidden
          className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        >
          <label htmlFor="company_website">وب‌سایت شرکت</label>
          <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <SubmitButton />
          <p className="text-xs leading-6 text-fg-dim">
            اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌شود.
          </p>
        </div>
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex min-h-11 items-center gap-2.5 bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors',
        pending ? 'cursor-wait opacity-70' : 'hover:bg-accent-hot',
      )}
    >
      {pending && (
        <svg viewBox="0 0 16 16" className="size-3.5 animate-spin" aria-hidden>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" fill="none" />
          <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      )}
      {pending ? 'در حال ارسال' : 'ارسال درخواست'}
    </button>
  )
}

function ResultPanel({
  tone,
  children,
}: {
  tone: 'ok' | 'info'
  children: React.ReactNode
}) {
  return (
    <div
      role="status"
      className={cn(
        'border p-5',
        tone === 'ok' ? 'border-ok/40 bg-ok/5' : 'border-accent/40 bg-accent-wash',
      )}
    >
      {children}
    </div>
  )
}

function Field({
  name,
  label,
  required,
  error,
  textarea,
  ...rest
}: {
  name: string
  label: string
  required?: boolean
  error?: string
  textarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`
  const describedBy = error ? `${id}-err` : undefined
  const cls = cn(
    'mt-2 w-full border bg-surface-2 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-dim/70 transition-colors',
    'focus:border-accent focus:outline-none focus-visible:outline-none',
    error ? 'border-alert' : 'border-line',
  )

  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-fg-muted">
        {label}
        {required && <span className="ms-1 text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(cls, 'resize-y leading-7')}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(cls, 'min-h-11')}
          {...rest}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-alert">
          {error}
        </p>
      )}
    </div>
  )
}
