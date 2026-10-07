/**
 * نقشه‌ی ابعادی محصول: تنها دیاگرام خطی باقی‌مانده.
 *
 * بقیه‌ی نقاشی‌های سازوکار جای خود را به عکس واقعی قطعه داده‌اند؛ برای اندازه،
 * نقشه‌ی خطی همچنان خواناست — عددها از کاتالوگ می‌آیند.
 */
const LINE = "#36515a";
const LINE_SOFT = "#8da4a7";
const ACCENT = "#b84d35";
const LABEL = "#597076";

/** نقشه‌ی ابعادی محصول با اندازه‌های واقعی */
export function DimensionDrawing({
  bore,
  outerDiameter,
  width,
  className,
}: {
  bore: number;
  outerDiameter: number;
  width: number | null;
  className?: string;
}) {
  const scale = 300 / outerDiameter;
  const rOuter = (outerDiameter / 2) * scale;
  const rBore = (bore / 2) * scale;
  const cx = 200;
  const cy = 170;

  return (
    <svg
      viewBox="0 0 400 340"
      className={className}
      role="img"
      aria-label={`نقشه‌ی ابعادی: قطر سوراخ ${bore} میلی‌متر، قطر خارجی ${outerDiameter} میلی‌متر`}
    >
      <defs>
        <pattern id="dw-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#1d242a" strokeWidth="1.3" />
        </pattern>
      </defs>

      <line x1="40" y1={cy} x2="370" y2={cy} stroke="#1d242a" strokeWidth="1" strokeDasharray="16 5 3 5" />

      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={LINE} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={rOuter - 14} fill="url(#dw-hatch)" stroke="#20282e" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={rBore + 14} fill="none" stroke={LINE} strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={rBore} fill="#0b0d0f" stroke={LINE} strokeWidth="1.4" />

      {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
        <rect
          key={deg}
          x={cx - 5}
          y={cy - rBore - 26}
          width="10"
          height="16"
          fill="#101417"
          stroke={ACCENT}
          strokeWidth="1"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}

      <g fontSize="11" fill={LABEL} direction="ltr">
        {/* قطر خارجی */}
        <line x1={cx - rOuter} y1={cy + rOuter + 18} x2={cx + rOuter} y2={cy + rOuter + 18} stroke={LINE} strokeWidth="1" />
        <line x1={cx - rOuter} y1={cy + rOuter + 10} x2={cx - rOuter} y2={cy + rOuter + 26} stroke={LINE} strokeWidth="1" />
        <line x1={cx + rOuter} y1={cy + rOuter + 10} x2={cx + rOuter} y2={cy + rOuter + 26} stroke={LINE} strokeWidth="1" />
        <text x={cx} y={cy + rOuter + 38} textAnchor="middle" className="tnum">
          Ø D = {outerDiameter} mm
        </text>

        {/* قطر سوراخ */}
        <line x1={cx - rBore} y1={cy - rOuter - 18} x2={cx + rBore} y2={cy - rOuter - 18} stroke={LINE} strokeWidth="1" />
        <text x={cx + rBore + 12} y={cy - rOuter - 14} className="tnum">
          Ø d = {bore} mm
        </text>

        {/* پهنا */}
        {width ? (
          <>
            <line x1={cx + rOuter + 26} y1={cy - width / 2} x2={cx + rOuter + 26} y2={cy + width / 2} stroke={LINE} strokeWidth="1" />
            <text x={cx + rOuter + 32} y={cy + 4} className="tnum">
              b = {width} mm
            </text>
          </>
        ) : null}
      </g>
    </svg>
  );
}
