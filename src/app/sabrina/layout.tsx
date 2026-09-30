/**
 * Sabrina Residences route layout.
 *
 * The page belongs to freewheel.ir, so it keeps the site's header, footer and
 * RTL document. What it adds here is its own type: Playfair Display, Archivo
 * and Manrope are self-hosted from `public/fonts` (the spec's Google fonts,
 * served locally so no page render ever waits on fonts.googleapis.com),
 * and Persian text falls back to the site's Vazirmatn.
 */
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./sabrina.css";

const playfair = localFont({
  src: [
    { path: "../../../public/fonts/playfair-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/playfair-display-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const archivo = localFont({
  src: [
    { path: "../../../public/fonts/archivo-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/archivo-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "../../../public/fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

/** If JavaScript never arrives, nothing may stay invisible. */
const NO_SCRIPT_CSS = `
.sbr-word,.sbr-card,.sbr-nav__item,.sbr-showreel,.sbr-hero__media{opacity:1 !important;filter:none !important;transform:none !important;animation:none !important}
.sbr-grid i,.sbr-bars__hit span{transform:none !important}
`;

export default function SabrinaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${playfair.variable} ${archivo.variable} ${manrope.variable}`}>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_CSS }} />
      </noscript>
      {children}
    </div>
  );
}
