import Link from "next/link";
import { ArrowUpLeft, Check, Gauge, LockKeyhole, RotateCcw, Ruler, Timer } from "lucide-react";

import { FaqList } from "@/components/faq";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { DeviceStage } from "@/components/home/device-stage";
import { EditorialStack } from "@/components/home/editorial-stack";
import { AroundScene } from "@/components/home/around-scene";
import { StatementScene } from "@/components/home/statement-scene";
import { KineticBand } from "@/components/home/kinetic-band";
import {
  AmenitySwitcher,
  FamilyShowcase,
  RootsSection,
} from "@/components/home/showcases";
import { HorizontalPanorama, PlanTimeline } from "@/components/home/panoramas";
import { FadeUp, ScrollPercent, SectionRail, WordReveal } from "@/components/home/kit";
import { PageTransition } from "@/components/page-transition";
import styles from "./home.module.css";
import "./home-cinema.css";

const HOME_FAQ = [
  {
    q: "فری‌ویل همان کلاچ یک‌طرفه است؟",
    a: "بله. فری‌ویل یا کلاچ یک‌طرفه در یک جهت آزاد می‌چرخد و در جهت مخالف درگیر می‌شود. انتخاب مدل به گشتاور، سرعت و نوع نصب بستگی دارد.",
  },
  {
    q: "برای کار کردن به برق یا سنسور نیاز دارد؟",
    a: "خیر. عملکرد آن کاملاً مکانیکی است؛ تغییر جهت یا اختلاف سرعت باعث درگیری المان‌ها می‌شود و قطعه بدون فرمان الکتریکی کار می‌کند.",
  },
  {
    q: "برای پیشنهاد مدل چه اطلاعاتی لازم است؟",
    a: "قطر شفت، گشتاور یا توان و دور موتور، سرعت چرخش آزاد و جهت عملکرد را بفرستید. اگر همه‌ی عددها را ندارید، عکس قطعه یا پلاک موتور هم برای شروع کمک می‌کند.",
  },
  {
    q: "فری‌ویل با بک‌استاپ چه فرقی دارد؟",
    a: "بک‌استاپ یکی از کاربردهای فری‌ویل است: روی شفت نصب می‌شود تا وقتی نوار نقاله یا بار می‌خواهد برگردد، قفل کند. فری‌ویل در کاربردهای دیگری مثل جداسازی دو محرک و حرکت پله‌ای هم استفاده می‌شود.",
  },
] as const;

export default function HomePage() {
  return (
    <PageTransition>
      <div className={styles.page}>
        <ScrollPercent />
        <SectionRail />

        <CinematicHero />

        <KineticBand
          text="FREEWHEEL · ONE WAY FREE · ONE WAY LOCKED · FREEWHEEL ·"
          duration={52}
          className="kinetic-after-hero"
        />

        <DeviceStage />
        <EditorialStack />
        <StatementScene />

        <KineticBand
          text="آزاد در یک جهت — قفل در جهت دیگر — بدون برق، بدون سنسور —"
          latin={false}
          direction="right"
          duration={58}
          variant="hero"
          className="kinetic-statement"
        />

        <AroundScene />
        <FamilyShowcase />
        <AmenitySwitcher />
        <RootsSection />
        <HorizontalPanorama />
        <PlanTimeline />

        {/* راهنمای انتخاب — کارت‌های چهارگانه */}
        <section className={styles.guide} aria-labelledby="guide-title">
          <div className={styles.guideInner}>
            <FadeUp>
              <p className="statement-eyebrow">
                <span className="statement-eyebrow-rule" aria-hidden="true" />
                راهنمای انتخاب
              </p>
              <h2 id="guide-title" className={styles.guideTitle}>
                <WordReveal text="برای شروع انتخاب، چهار چیز را بدان." mode="scroll" />
              </h2>
              <p className={styles.guideSub}>
                لازم نیست از همان اول همه‌چیز را بدانی. این اطلاعات کمک می‌کند مدل مناسب‌تری
                پیدا کنیم.
              </p>
            </FadeUp>

            <ul className={styles.guideGrid}>
              {[
                { title: "قطر شفت", detail: "اندازه‌ی محل نصب", Icon: Ruler },
                { title: "گشتاور یا توان", detail: "به‌همراه دور موتور", Icon: Gauge },
                { title: "سرعت چرخش آزاد", detail: "چند دور و چه مدت؟", Icon: Timer },
                { title: "جهت عملکرد", detail: "وضعیت نصب قطعه", Icon: RotateCcw },
              ].map(({ title, detail, Icon }, index) => (
                <li key={title} className={styles.guideCard}>
                  <span className={styles.guideIcon}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className={styles.guideCardTitle}>{title}</span>
                    <span className={styles.guideCardDetail}>{detail}</span>
                  </span>
                  <span className={styles.guideCardIndex} dir="ltr">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>

            <FadeUp>
              <p className={styles.guideNote}>
                <Check className="h-4 w-4" aria-hidden="true" />
                اگر عددها را نداری، عکس پلاک موتور یا کد قطعه‌ی فعلی هم برای شروع مفید است.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.faqInner}>
            <FadeUp>
              <p className="statement-eyebrow">
                <span className="statement-eyebrow-rule" aria-hidden="true" />
                پرسش‌های پرتکرار
              </p>
              <h2 id="faq-title" className={styles.faqTitle}>
                <WordReveal text="هنوز سؤالی مانده؟" mode="scroll" />
              </h2>
              <Link href="/contact" className="cinema-btn cinema-btn-line">
                پرسش از کارشناس
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </FadeUp>
            <FadeUp delay={0.08}>
              <FaqList items={HOME_FAQ} />
            </FadeUp>
          </div>
        </section>

        {/* نوار پایانی */}
        <section className={styles.finalBar}>
          <div className={styles.finalInner}>
            <div className={styles.finalText}>
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
              <div>
                <h2 className={styles.finalTitle}>به دنبال مدل یا جدول ابعاد هستی؟</h2>
                <p className={styles.finalSub}>
                  از کاتالوگ RINGSPANN شروع کن یا همه‌ی برندها را ببین.
                </p>
              </div>
            </div>
            <div className={styles.finalActions}>
              <Link href="/ringspann" className="cinema-btn cinema-btn-solid">
                مدل‌ها و ابعاد
              </Link>
              <Link href="/brands" className="cinema-btn cinema-btn-line">
                همه‌ی برندها
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
