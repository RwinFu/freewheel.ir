"use client";

/**
 * Sabrina Residences — the whole landing page.
 *
 * Two sections on one gradient: the hero (nav, headline, tagline, explore
 * link, showreel card) and "Our Latest Houses". Every string, image and
 * timing comes from `./content`, so the same markup renders the Persian RTL
 * version and the English LTR version — switching language re-keys the tree
 * and the page performs itself again.
 */
import { ArrowUpRight, House, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { COPY, HERO_IMAGE, TIMING, type Lang, type NavItem } from "./content";
import { Showreel } from "./showreel";
import { Line, Word, Words } from "./words";

/** entrance stagger of the header items, in seconds */
const NAV_DELAYS = [0.2, 0.28, 0.36, 0.44] as const;

function itemDelay(seconds: number): CSSProperties {
  return { "--sbr-item-delay": `${seconds}s` } as CSSProperties;
}

function cardDelay(seconds: number): CSSProperties {
  return { "--sbr-card-delay": `${seconds}s` } as CSSProperties;
}

/** White brand mark, 40×30. */
function SabrinaMark() {
  return (
    <svg className="sbr-logo__mark" viewBox="0 0 40 30" aria-hidden="true" focusable="false">
      <path d="M20 1.4 38.6 15.1h-7.4v12H8.8v-12H1.4L20 1.4Z" fill="#fff" />
      <path
        d="M16.5 27.1v-9.5h7v9.5"
        fill="none"
        stroke="var(--sbr-ocean)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pill({ item, delay, solid }: { item: NavItem; delay: number; solid?: boolean }) {
  const className = cn("sbr-pill", "sbr-nav__item", solid && "sbr-pill--solid");
  const style = itemDelay(delay);
  const content = (
    <>
      {item.icon === "house" ? <House aria-hidden="true" /> : null}
      {item.label}
    </>
  );

  if (item.route) {
    return (
      <Link href={item.href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} style={style}>
      {content}
    </a>
  );
}

function MenuLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const solid = item.icon === "house";
  const className = cn("sbr-menu__link", solid && "sbr-menu__link--solid");
  const content = (
    <>
      {item.icon === "house" ? <House aria-hidden="true" /> : null}
      {item.label}
    </>
  );

  if (item.route) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {content}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onNavigate}>
      {content}
    </a>
  );
}

export function SabrinaLanding() {
  const [lang, setLang] = useState<Lang>("fa");
  /* bumping the key remounts the page, so every entrance animation plays
     again — in either direction of the switch */
  const [run, setRun] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestIn, setLatestIn] = useState(false);
  const latestRef = useRef<HTMLElement | null>(null);
  const copy = COPY[lang];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* The rest of freewheel.ir is a Persian, RTL site; the English version of
     this page is LTR, so the document's direction and language follow the
     switch and are restored when the visitor leaves the page. */
  useEffect(() => {
    const root = document.documentElement;
    const previousDir = root.getAttribute("dir");
    const previousLang = root.getAttribute("lang");

    root.setAttribute("dir", copy.dir);
    root.setAttribute("lang", lang);

    return () => {
      if (previousDir) root.setAttribute("dir", previousDir);
      if (previousLang) root.setAttribute("lang", previousLang);
    };
  }, [copy.dir, lang]);

  /* Section two reveals itself once a fifth of it is on screen. This is
     measured straight from the box each time — a scroll listener, a viewport
     resize, any click (in-page links run through Lenis here) and a slow
     watchdog all re-check it, so the reveal cannot be missed. */
  useEffect(() => {
    if (latestIn) return;

    let frame = 0;
    let done = false;

    const measure = () => {
      frame = 0;
      if (done) return;
      const element = latestRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const seen = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      if (seen >= rect.height * 0.15) {
        done = true;
        setLatestIn(true);
      }
    };

    const schedule = () => {
      if (done || frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("click", schedule);
    const watchdog = window.setInterval(schedule, 800);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("click", schedule);
      window.clearInterval(watchdog);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [latestIn]);

  const pickLanguage = useCallback((next: Lang) => {
    setMenuOpen(false);
    setLatestIn(false);
    setRun((value) => value + 1);
    setLang(next);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    /* the key replays every entrance animation when the language changes */
    <div className="sbr" key={`${lang}-${run}`} dir={copy.dir} data-lang={lang}>
      <div className="sbr-grid" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* ================= STEP 3 — hero ================= */}
      <section className="sbr-hero" id="sabrina-top">
        <div className="sbr-hero__glow" aria-hidden="true" />

        <div className="sbr-hero__media">
          <Image
            src={HERO_IMAGE}
            alt={copy.heroAlt}
            fill
            sizes="max(83vw, 640px)"
            preload
            placeholder="blur"
          />
        </div>

        <div className="sbr-hero__scrim" aria-hidden="true" />

        {/* ================= STEP 4 — header ================= */}
        <header className="sbr-nav">
          <div className="sbr-nav__left sbr-nav__item" style={itemDelay(0.1)}>
            <Link
              href="#sabrina-top"
              className="sbr-logo"
              aria-label={`${copy.brand.name} ${copy.brand.sub}`}
            >
              <SabrinaMark />
              <span className="sbr-logo__text">
                <span className="sbr-logo__name">{copy.brand.name}</span>
                <span className="sbr-logo__sub">{copy.brand.sub}</span>
              </span>
            </Link>
          </div>

          <nav className="sbr-nav__center" aria-label={copy.menuLabel}>
            {copy.nav.map((item, index) => (
              <Pill
                key={item.label}
                item={item}
                delay={NAV_DELAYS[index] ?? 0.44}
                solid={index === 0}
              />
            ))}
          </nav>

          <div className="sbr-nav__right">
            <div
              className="sbr-lang sbr-nav__item"
              style={itemDelay(0.52)}
              role="group"
              aria-label="Language"
            >
              {(["fa", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={lang === code}
                  onClick={() => pickLanguage(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href={copy.signIn.href}
              className="sbr-signin sbr-nav__item"
              style={itemDelay(0.6)}
            >
              {copy.signIn.label}
            </Link>

            <button
              type="button"
              className="sbr-burger sbr-nav__item"
              style={itemDelay(0.65)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? copy.closeLabel : copy.menuLabel}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>

          {menuOpen ? (
            <div className="sbr-menu">
              {copy.nav.map((item) => (
                <MenuLink key={item.label} item={item} onNavigate={closeMenu} />
              ))}
            </div>
          ) : null}
        </header>

        {/* ================= STEP 5 — headline + tagline ================= */}
        <div className="sbr-hero__top">
          <h1 className="sbr-h1">
            {copy.h1.map((line, index) => (
              <Line key={line} className={index === 0 ? "sbr-line--first" : undefined}>
                <Word
                  delay={TIMING.h1.start + index * TIMING.h1.step}
                  duration={TIMING.h1.duration}
                >
                  {line}
                </Word>
              </Line>
            ))}
          </h1>

          <p className="sbr-tagline">
            <Words
              lines={copy.tagline}
              start={TIMING.tagline.start}
              step={TIMING.tagline.step}
              duration={TIMING.tagline.duration}
              indentFirst
            />
          </p>
        </div>

        {/* ================= STEP 6 — explore link ================= */}
        <a className="sbr-explore" href="#latest">
          {copy.explore.split(" ").map((word, index) => (
            <Word
              key={`${index}-${word}`}
              delay={TIMING.explore.start + index * TIMING.explore.step}
              duration={TIMING.explore.duration}
            >
              {word}
            </Word>
          ))}
          <Word
            delay={TIMING.explore.start + copy.explore.split(" ").length * TIMING.explore.step}
            duration={TIMING.explore.duration}
          >
            <ArrowUpRight aria-hidden="true" />
          </Word>
        </a>

        {/* ================= STEP 7 — showreel card ================= */}
        <Showreel copy={copy.showreel} />
      </section>

      {/* ================= STEP 9 — our latest houses ================= */}
      <section className={cn("sbr-latest", latestIn && "is-in")} id="latest" ref={latestRef}>
        <div className="sbr-latest__head">
          <p className="sbr-eyebrow">
            <Words
              lines={[copy.latest.eyebrow]}
              start={0.05}
              step={0.03}
              duration={0.8}
              scroll
            />
          </p>

          <h2 className="sbr-h2">
            {copy.latest.heading.map((line, index) => (
              <Line key={line}>
                <Word
                  delay={TIMING.latest.start + index * TIMING.latest.step}
                  duration={TIMING.latest.duration}
                  scroll
                >
                  {line}
                </Word>
              </Line>
            ))}
          </h2>

          <p className="sbr-latest__sub">
            <Words
              lines={[copy.latest.sub]}
              start={0.45}
              step={0.02}
              duration={0.8}
              scroll
            />
          </p>
        </div>

        <div className="sbr-cards">
          {copy.cards.map((card, index) => (
            <article key={card.index} className="sbr-card" style={cardDelay(TIMING.cards[index] ?? 0.5)}>
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 700px) 45vw, (max-width: 1200px) 24vw, 300px"
              />
              <div className="sbr-card__body">
                <span className="sbr-card__index">{card.index}</span>
                <span className="sbr-card__title">{card.title}</span>
                <span className="sbr-card__meta">
                  <span>{card.area}</span>
                  <span className="sbr-card__price">{card.price}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
