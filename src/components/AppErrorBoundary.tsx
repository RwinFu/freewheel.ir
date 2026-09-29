'use client'

import { Component, type ReactNode } from 'react'
import Link from 'next/link'

/**
 * The last line of defence. Motion runs on every page and a throw inside
 * a rAF callback would otherwise take the whole document with it —
 * leaving a blank page to a visitor who only wanted to read a torque
 * table. Here the content is replaced by something useful instead.
 */
export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    console.error('[freewheel] render error', error)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="shell flex min-h-[60dvh] flex-col justify-center py-24">
        <p className="text-sm tracking-widest text-accent">خطا در نمایش صفحه</p>
        <h1 className="mt-5 text-3xl leading-tight sm:text-4xl">
          بخشی از این صفحه در این مرورگر بارگذاری نشد
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-fg-muted">
          محتوای متنی سایت مشکلی ندارد و جست‌وجوی سایت هم این خطا را نمی‌بیند. یک بار صفحه را
          تازه کنید؛ اگر تکرار شد، با ما تماس بگیرید.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hot"
          >
            صفحهٔ اصلی
          </Link>
          <Link
            href="/ringspann"
            className="inline-flex min-h-11 items-center border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            جدول سری R
          </Link>
        </div>
      </div>
    )
  }
}
