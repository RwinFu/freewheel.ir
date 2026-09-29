import { z } from 'zod'

/**
 * Enquiry handler.
 *
 * The site ships as a static export (GitHub Pages), so there is no server
 * to receive the form — everything here runs in the browser. Delivery is
 * intentionally pluggable: set `NEXT_PUBLIC_ENQUIRY_WEBHOOK` to any
 * endpoint that accepts a JSON POST (Formspree, a Zapier/Make bridge, a
 * serverless function) and the form posts straight to it from the client.
 *
 * With no webhook configured we do not silently pretend the message was
 * delivered: the client is handed a formatted summary it can copy or
 * open in a mail client. That is honest, and it still gets the enquiry
 * out of the browser.
 */

const Enquiry = z.object({
  name: z.string().trim().min(2, 'نام را بنویسید، لطفاً.').max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z
    .string()
    .trim()
    .min(9, 'شمارهٔ تماس کامل لازم است.')
    .max(32)
    .regex(/^[0-9+\-\s()]+$/, 'شماره فقط باید شامل رقم، فاصله یا خط تیره باشد.'),
  shaftDiameter: z.string().trim().max(40).optional().or(z.literal('')),
  motorPower: z.string().trim().max(60).optional().or(z.literal('')),
  application: z.string().trim().min(4, 'کاربرد را کوتاه توضیح دهید.').max(600),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  /** Honeypot — bots fill every field they find. */
  company_website: z.string().max(0).optional().or(z.literal('')),
})

export type EnquiryState =
  | { status: 'idle' }
  | { status: 'error'; fieldErrors: Record<string, string[]>; formError?: string }
  | { status: 'delivered' }
  | { status: 'prepared'; summary: string; mailto: string }

export async function submitEnquiry(formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(formData)
  const parsed = Enquiry.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '_form')
      ;(fieldErrors[key] ??= []).push(issue.message)
    }
    return { status: 'error', fieldErrors }
  }

  const d = parsed.data

  const lines = [
    'درخواست سایزبندی / قیمت — freewheel.ir',
    '',
    `نام: ${d.name}`,
    d.company ? `شرکت: ${d.company}` : null,
    `تلفن: ${d.phone}`,
    d.shaftDiameter ? `قطر شفت: ${d.shaftDiameter}` : null,
    d.motorPower ? `توان موتور: ${d.motorPower}` : null,
    '',
    'کاربرد:',
    d.application,
    d.message ? `\nتوضیح تکمیلی:\n${d.message}` : null,
  ].filter((l): l is string => l !== null)

  const summary = lines.join('\n')

  const webhook = process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...d, source: 'freewheel.ir', receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      })
      if (res.ok) return { status: 'delivered' }
    } catch {
      // fall through to the prepared summary rather than losing the enquiry
    }
  }

  const to = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL ?? 'info@freewheel.ir'
  return {
    status: 'prepared',
    summary,
    mailto: `mailto:${to}?subject=${encodeURIComponent('درخواست سایزبندی / قیمت')}&body=${encodeURIComponent(summary)}`,
  }
}
