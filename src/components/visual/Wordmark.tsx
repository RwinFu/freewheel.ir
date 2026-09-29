/**
 * House mark. A freewheel seen from the face: outer ring, inner ring,
 * and the clamping elements sitting in the line of action between them.
 * The word is set in HTML rather than SVG <text> so it inherits the real
 * type stack and stays selectable; only the mark is vector.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7 flex-none"
        role="presentation"
        aria-hidden
        fill="none"
      >
        <circle cx="14" cy="14" r="12.4" stroke="currentColor" className="text-fg" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="5.2" stroke="currentColor" className="text-fg" strokeWidth="1.5" />
        <g className="fill-accent">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <rect
              key={a}
              x="12.9"
              y="1.4"
              width="2.2"
              height="3"
              rx="0.4"
              transform={`rotate(${a} 14 14)`}
            />
          ))}
        </g>
      </svg>
      <span
        className="font-display text-[1.06rem] font-bold leading-none tracking-[-0.01em] text-fg"
        dir="ltr"
      >
        freewheel<span className="text-accent">.ir</span>
      </span>
    </span>
  )
}
