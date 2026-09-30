type SvgProps = { className?: string; animate?: boolean };

const LINE = "#36515a";
const LINE_SOFT = "#8da4a7";
const ACCENT = "#b84d35";
const LABEL = "#597076";
const LABEL_STRONG = "#233c43";

/** نقاشی خطی برش فری‌ویل اسپراگ — انیمیشن قفل و رها شدن */
export function FreewheelHero({ className }: SvgProps) {
  const sprags = Array.from({ length: 8 }, (_, i) => i * 45);
  const cx = 260;
  const cy = 260;

  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      role="img"
      aria-label="برش فری‌ویل اسپراگ: حلقه‌ی خارجی، المان‌های قفل‌کننده و حلقه‌ی داخلی در حال چرخش"
    >
      <defs>
        <pattern id="fw-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke={LINE_SOFT} strokeWidth="1.4" />
        </pattern>
        <marker id="fw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={LABEL} />
        </marker>
      </defs>

      {/* خط مرکز */}
      <line x1={cx - 240} y1={cy} x2={cx + 240} y2={cy} stroke={LINE_SOFT} strokeWidth="1" strokeDasharray="18 6 3 6" />
      <line x1={cx} y1={cy - 240} x2={cx} y2={cy + 240} stroke={LINE_SOFT} strokeWidth="1" strokeDasharray="18 6 3 6" />

      {/* ---------- حلقه‌ی خارجی (در حالت آزاد ثابت، هنگام قفل همراه حلقه‌ی داخلی) ---------- */}
      <g className="animate-coupled">
        <circle cx={cx} cy={cy} r={238} fill="none" stroke={LINE} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={200} fill="none" stroke={LINE} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={219} fill="url(#fw-hatch)" stroke="none" opacity="0.85" />
        {Array.from({ length: 48 }, (_, i) => i * 7.5).map((deg) => (
          <line
            key={deg}
            x1={cx}
            y1={cy - 238}
            x2={cx}
            y2={cy - 228}
            stroke={LINE_SOFT}
            strokeWidth="1"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        {/* فلش جهت چرخش روی حلقه‌ی خارجی */}
        <path
          d={`M ${cx + 262} ${cy - 44} A 266 266 0 0 1 ${cx + 196} ${cy - 180}`}
          fill="none"
          stroke={LABEL}
          strokeWidth="1.2"
          markerEnd="url(#fw-arrow)"
        />

        {/* ---------- المان‌های اسپراگ ---------- */}
        {sprags.map((deg) => (
          <g key={deg} transform={`rotate(${deg} ${cx} ${cy})`}>
            <g className="animate-sprag">
              <path
                d={`M ${cx - 11} ${cy - 190} L ${cx + 11} ${cy - 190} L ${cx + 7} ${cy - 154} L ${cx - 7} ${cy - 154} Z`}
                fill="#101417"
                stroke={ACCENT}
                strokeWidth="1.3"
              />
              <line x1={cx - 6} y1={cy - 182} x2={cx + 6} y2={cy - 162} stroke={ACCENT} strokeWidth="0.8" opacity="0.7" />
            </g>
            <circle cx={cx} cy={cy - 143} r="4" fill="none" stroke={LINE_SOFT} strokeWidth="1.2" />
          </g>
        ))}
      </g>

      {/* ---------- حلقه‌ی داخلی و شفت (درایو) ---------- */}
      <g className="animate-drive">
        <circle cx={cx} cy={cy} r={132} fill="#0d1114" stroke={LINE} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={172} fill="none" stroke={LINE} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={152} fill="url(#fw-hatch)" opacity="0.7" />
        {Array.from({ length: 6 }, (_, i) => i * 60).map((deg) => (
          <line
            key={deg}
            x1={cx}
            y1={cy - 172}
            x2={cx}
            y2={cy - 138}
            stroke={LINE}
            strokeWidth="1.1"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        {/* کلید شفت */}
        <rect x={cx - 12} y={cy - 152} width="24" height="18" fill="#0d1114" stroke={LINE} strokeWidth="1.2" />
        <path
          d={`M ${cx} ${cy - 196} L ${cx + 9} ${cy - 212} L ${cx - 9} ${cy - 212} Z`}
          fill={ACCENT}
          opacity="0.9"
        />
        <circle cx={cx} cy={cy} r="52" fill="none" stroke={LINE_SOFT} strokeWidth="1" strokeDasharray="4 5" />
      </g>

      {/* ---------- اندازه‌گذاری ---------- */}
      <g fontSize="11" fill={LABEL} fontFamily="ui-sans-serif, system-ui" direction="ltr">
        <line x1={cx} y1={cy} x2={cx + 330} y2={cy} stroke={LINE_SOFT} strokeWidth="1" />
        <line x1={cx + 322} y1={cy - 8} x2={cx + 322} y2={cy + 8} stroke={LABEL} strokeWidth="1" />
        <text x={cx + 332} y={cy + 4} textAnchor="start" className="tnum">
          Ø d
        </text>

        <line x1={cx - 238} y1={cy} x2={cx - 238} y2={cy + 210} stroke={LINE_SOFT} strokeWidth="1" />
        <line x1={cx - 246} y1={cy + 210} x2={cx - 230} y2={cy + 210} stroke={LABEL} strokeWidth="1" />
        <text x={cx - 244} y={cy + 232} textAnchor="start" className="tnum">
          Ø D
        </text>

        <line x1={cx + 150} y1={cy - 150} x2={cx + 168} y2={cy - 168} stroke={LINE_SOFT} strokeWidth="1" />
        <text x={cx + 172} y={cy - 170} textAnchor="start" className="tnum">
          b
        </text>
      </g>

      {/* ---------- نشانگر وضعیت قفل ---------- */}
      <g className="animate-lock">
        <rect x="26" y="26" width="82" height="24" fill="none" stroke={ACCENT} strokeWidth="1.2" rx="2" />
        <text x="67" y="42" textAnchor="middle" fontSize="12" fill={ACCENT} letterSpacing="1">
          LOCK
        </text>
      </g>
      <g opacity="0.55">
        <rect x="26" y="58" width="82" height="24" fill="none" stroke={LINE} strokeWidth="1.2" rx="2" />
        <text x="67" y="74" textAnchor="middle" fontSize="12" fill={LABEL} letterSpacing="1">
          FREE
        </text>
      </g>
    </svg>
  );
}

/** نمای انفجادی (exploded view) به سبک دیتاشیت */
export function ExplodedView({ className }: SvgProps) {
  const parts = [
    { y: 70, r: 108, label: "حلقه‌ی خارجی", code: "1" },
    { y: 190, r: 92, label: "قفس و المان‌های قفل‌کننده", code: "2" },
    { y: 310, r: 76, label: "حلقه‌ی داخلی", code: "3" },
    { y: 420, r: 46, label: "شفت و کلید DIN 6885", code: "4" },
  ];

  return (
    <svg
      viewBox="0 0 640 500"
      className={className}
      role="img"
      aria-label="نمای انفجادی اجزای فری‌ویل: حلقه‌ی خارجی، قفس و المان‌ها، حلقه‌ی داخلی و شفت"
    >
      <defs>
        <pattern id="ev-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#1d242a" strokeWidth="1.3" />
        </pattern>
      </defs>

      <line x1="70" y1="20" x2="70" y2="480" stroke="#1d242a" strokeWidth="1" strokeDasharray="18 6 3 6" />

      {parts.map((part) => (
        <g key={part.code}>
          <circle
            cx="200"
            cy={part.y}
            r={part.r}
            fill="none"
            stroke={LINE}
            strokeWidth="1.4"
          />
          <circle cx="200" cy={part.y} r={part.r - 16} fill="url(#ev-hatch)" stroke="#20282e" strokeWidth="1" />
          <line
            x1={200 - part.r}
            y1={part.y}
            x2="88"
            y2={part.y}
            stroke={LINE_SOFT}
            strokeWidth="1"
          />
          <circle cx="88" cy={part.y} r="2.5" fill={LABEL} />
          <text x="78" y={part.y + 4} textAnchor="end" fontSize="12" fill={LABEL} direction="ltr">
            {part.code}
          </text>
          <text x="326" y={part.y - 6} fontSize="13" fill={LABEL_STRONG} textAnchor="end">
            {part.label}
          </text>
          <line
            x1={200 + part.r}
            y1={part.y}
            x2="336"
            y2={part.y - 10}
            stroke={LINE_SOFT}
            strokeWidth="1"
          />
        </g>
      ))}

      {/* المان‌های قفل‌کننده در قفس */}
      {Array.from({ length: 10 }, (_, i) => i * 36).map((deg) => (
        <rect
          key={deg}
          x="196"
          y="112"
          width="8"
          height="20"
          rx="1"
          fill="#101417"
          stroke={ACCENT}
          strokeWidth="1.1"
          transform={`rotate(${deg} 200 190)`}
          opacity="0.95"
        />
      ))}

      {/* کلید شفت */}
      <rect x="188" y="440" width="24" height="14" fill="none" stroke={LINE} strokeWidth="1.2" />

      <g fontSize="11" fill={LABEL}>
        <text x="326" y="470" textAnchor="end">
          ترتیب مونتاژ: از بیرون به داخل؛ سمت قفل‌شدن روی بدنه حک شده است.
        </text>
      </g>
    </svg>
  );
}

/** سه تیپ فری‌ویل — دیاگرام‌های متحرک */
export function SpragTypeDiagram({ className, animate = true }: SvgProps) {
  return (
    <svg viewBox="0 0 360 260" className={className} role="img" aria-label="فری‌ویل اسپراگ">
      <defs>
        <marker id="sp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
      </defs>

      <circle cx="120" cy="130" r="104" fill="none" stroke={LINE} strokeWidth="1.4" />
      <circle cx="120" cy="130" r="62" fill="#0d1114" stroke={LINE} strokeWidth="1.4" />

      {Array.from({ length: 6 }, (_, i) => i * 60).map((deg) => (
        <g key={deg} transform={`rotate(${deg} 120 130)`}>
          <g className={animate ? "animate-sprag" : undefined}>
            <path
              d="M 109 66 L 131 66 L 127 96 L 113 96 Z"
              fill="#101417"
              stroke={ACCENT}
              strokeWidth="1.3"
            />
          </g>
        </g>
      ))}

      <line x1="248" y1="60" x2="248" y2="200" stroke={LINE_SOFT} strokeWidth="1.2" />
      <line x1="232" y1="60" x2="264" y2="60" stroke={LINE} strokeWidth="1.2" />
      <line x1="232" y1="200" x2="264" y2="200" stroke={LINE} strokeWidth="1.2" />
      <text x="276" y="132" fontSize="11" fill={LABEL} textAnchor="start">
        تماس خطی
      </text>
      <path d="M 264 120 L 300 120" stroke={ACCENT} strokeWidth="1.2" markerEnd="url(#sp-arrow)" />
      <text x="232" y="30" fontSize="11" fill={LABEL} textAnchor="middle">
        اسپراگ
      </text>
    </svg>
  );
}

export function RollerTypeDiagram({ className, animate = true }: SvgProps) {
  return (
    <svg viewBox="0 0 360 260" className={className} role="img" aria-label="فری‌ویل رولری">
      <defs>
        <marker id="rl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
      </defs>
      {/* سطح گوه‌ای */}
      <path d="M 60 200 L 300 200 L 300 150 Z" fill="none" stroke={LINE} strokeWidth="1.3" />
      <line x1="60" y1="200" x2="300" y2="200" stroke={LINE} strokeWidth="1.3" />
      <circle className={animate ? "animate-roller" : undefined} cx="112" cy="182" r="17" fill="#101417" stroke={ACCENT} strokeWidth="1.4" />
      <text x="112" y="228" fontSize="11" fill={LABEL} textAnchor="middle">
        رولر
      </text>

      <path d="M 100 132 L 300 132" stroke={LINE_SOFT} strokeWidth="1.1" strokeDasharray="6 4" />
      <path d="M 60 200 L 300 150" stroke={ACCENT} strokeWidth="0.9" opacity="0.5" strokeDasharray="4 4" />
      <text x="305" y="154" fontSize="11" fill={LABEL} textAnchor="start" direction="rtl">
        فضای گوه‌ای
      </text>
      <text x="305" y="70" fontSize="11" fill={LABEL} textAnchor="start" direction="rtl">
        رولر در دهانه‌ی گوه قفل می‌شود
      </text>
      <path d="M 130 176 L 210 176" stroke={ACCENT} strokeWidth="1.2" markerEnd="url(#rl-arrow)" />
    </svg>
  );
}

export function MagneticTypeDiagram({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 360 260" className={className} role="img" aria-label="کلاچ یک‌سره مغناطیسی">
      <circle cx="120" cy="130" r="96" fill="none" stroke={LINE} strokeWidth="1.4" />
      <circle cx="120" cy="130" r="58" fill="none" stroke={LINE} strokeWidth="1.4" />

      {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
        <rect
          key={deg}
          x="112"
          y="58"
          width="16"
          height="26"
          rx="2"
          fill="#101417"
          stroke={ACCENT}
          strokeWidth="1.1"
          transform={`rotate(${deg} 120 130)`}
          opacity="0.9"
        />
      ))}

      <path
        d="M 216 130 q 20 -34 40 0 q -20 34 -40 0"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.2"
        className="animate-lock"
      />
      <text x="272" y="112" fontSize="11" fill={LABEL} textAnchor="end">
        خطوط میدان
      </text>
      <text x="272" y="176" fontSize="11" fill={LABEL} textAnchor="end">
        انتقال گشتاور بدون تماس مکانیکی
      </text>
      <text x="120" y="252" fontSize="11" fill={LABEL} textAnchor="middle">
        روتور — استاتور
      </text>
    </svg>
  );
}

/** شِمای نصب بک‌استاپ روی درایو نوار نقاله */
export function BackstopSchematic({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 720 300"
      className={className}
      role="img"
      aria-label="شمای نصب بک‌استاپ روی درایو نوار نقاله: موتور، گیربکس، پولی درایو و فری‌ویل"
    >
      <defs>
        <marker id="bs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
        <marker id="bs-arrow-grey" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={LABEL} />
        </marker>
      </defs>

      {/* موتور */}
      <rect x="24" y="96" width="86" height="86" fill="none" stroke={LINE} strokeWidth="1.4" />
      <circle cx="67" cy="139" r="26" fill="none" stroke={LINE_SOFT} strokeWidth="1.2" />
      <line x1="67" y1="113" x2="67" y2="165" stroke={LINE_SOFT} strokeWidth="1" />
      <text x="67" y="204" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        موتور
      </text>

      {/* کوپلینگ */}
      <line x1="110" y1="139" x2="152" y2="139" stroke={LINE} strokeWidth="2" strokeDasharray="8 4" />

      {/* گیربکس */}
      <path d="M 152 96 L 226 96 L 226 182 L 152 182 Z" fill="none" stroke={LINE} strokeWidth="1.4" />
      <circle cx="189" cy="139" r="18" fill="none" stroke={LINE_SOFT} strokeWidth="1.2" />
      <text x="189" y="204" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        گیربکس کاهنده
      </text>

      {/* شفت و فری‌ویل */}
      <line x1="226" y1="139" x2="560" y2="139" stroke={LINE} strokeWidth="2.4" />
      <circle cx="330" cy="139" r="46" fill="none" stroke={ACCENT} strokeWidth="1.6" />
      <circle cx="330" cy="139" r="30" fill="none" stroke={LINE} strokeWidth="1.2" />
      {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
        <rect
          key={deg}
          x="326"
          y="112"
          width="8"
          height="14"
          fill="#101417"
          stroke={ACCENT}
          strokeWidth="1"
          transform={`rotate(${deg} 330 139)`}
        />
      ))}
      {/* اهرم */}
      <path d="M 330 139 L 382 62 L 470 62" fill="none" stroke={ACCENT} strokeWidth="1.6" />
      <rect x="470" y="48" width="54" height="28" fill="none" stroke={LINE} strokeWidth="1.2" />
      <text x="497" y="40" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        پایه‌ی صلب
      </text>
      <text x="330" y="212" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        فری‌ویل + اهرم
      </text>

      {/* پولی و نوار */}
      <circle cx="560" cy="139" r="70" fill="none" stroke={LINE} strokeWidth="1.4" />
      <circle cx="560" cy="139" r="10" fill="none" stroke={LINE_SOFT} strokeWidth="1.2" />
      <path
        d="M 560 69 L 700 69 L 700 209 L 560 209"
        fill="none"
        stroke={LINE}
        strokeWidth="1.6"
      />
      <text x="640" y="56" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        تسمه‌ی نوار
      </text>
      <text x="560" y="244" fontSize="12" fill={LABEL_STRONG} textAnchor="middle">
        پولی درایو
      </text>

      {/* جهت‌ها */}
      <path d="M 250 96 L 300 96" stroke={LABEL} strokeWidth="1.2" markerEnd="url(#bs-arrow-grey)" />
      <text x="272" y="86" fontSize="11" fill={LABEL} textAnchor="middle">
        کارکرد
      </text>
      <path d="M 300 182 L 250 182" stroke={ACCENT} strokeWidth="1.4" markerEnd="url(#bs-arrow)" />
      <text x="272" y="200" fontSize="11" fill={ACCENT} textAnchor="middle">
        برگشت — قفل
      </text>
    </svg>
  );
}

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
