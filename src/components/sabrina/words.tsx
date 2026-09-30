"use client";

/**
 * Word-by-word reveal primitives.
 *
 * Every word is its own inline-block, so the blur/translate animation runs
 * per word instead of per line. Load-time reveals animate straight away;
 * `scroll` words wait for `.is-in` on their section (added by the page once
 * the section is a fifth of the way into the viewport).
 */
import { Fragment, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type WordProps = {
  children: ReactNode;
  /** seconds */
  delay: number;
  /** seconds */
  duration: number;
  scroll?: boolean;
};

export function Word({ children, delay, duration, scroll = false }: WordProps) {
  return (
    <span
      className={cn("sbr-word", scroll && "sbr-word--scroll")}
      style={
        {
          "--sbr-word-delay": `${delay}s`,
          "--sbr-word-dur": `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

export function Line({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("sbr-line", className)}>{children}</span>;
}

type WordsProps = {
  lines: readonly string[];
  start: number;
  step: number;
  duration: number;
  scroll?: boolean;
  /** indent the first line instead of the whole block */
  indentFirst?: boolean;
};

/** Renders one line per entry and staggers the words across all of them. */
export function Words({ lines, start, step, duration, scroll, indentFirst }: WordsProps) {
  const wordsPerLine = lines.map((line) => line.split(" "));
  /* every word keeps counting across line breaks: 1.15, 1.21, 1.27 … */
  const offsets = wordsPerLine.map((_, lineIndex) =>
    wordsPerLine.slice(0, lineIndex).reduce((total, words) => total + words.length, 0),
  );

  return (
    <>
      {wordsPerLine.map((words, lineIndex) => (
        <Line
          key={`${lineIndex}-${lines[lineIndex]}`}
          className={cn(lineIndex === 0 && indentFirst && "sbr-line--first")}
        >
          {words.map((word, wordIndex) => (
            /* the explicit space keeps the words separated — every word is an
               inline-block of its own, so JSX would otherwise glue them */
            <Fragment key={`${wordIndex}-${word}`}>
              {wordIndex > 0 ? " " : null}
              <Word
                delay={start + (offsets[lineIndex] + wordIndex) * step}
                duration={duration}
                scroll={scroll}
              >
                {word}
              </Word>
            </Fragment>
          ))}
        </Line>
      ))}
    </>
  );
}
