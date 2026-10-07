import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Camera } from "lucide-react";

import { Reveal } from "@/components/motion";
import type { StoryPart } from "@/content/story";

/**
 * قطعه‌های داستان با عکس واقعی.
 *
 * الگوی شماره‌گذاری از کاتالوگ‌های صنعتی آمده، ولی به‌جای نقشه‌ی خطی، هر شماره
 * روی عکس واقعی خود قطعه می‌نشیند: شماره‌ی کورال گوشه‌ی عکس، برچسب نقطه‌ی نصب،
 * و نقش قطعه. عکس‌ها از `product-images.ts` می‌آیند، یعنی همان آرشیوی که کارت‌های
 * بقیه‌ی سایت هم از آن تغذیه می‌کنند.
 */
export function StoryParts({ items, note }: { items: StoryPart[]; note: string }) {
  return (
    <div>
      <p className="flex items-start gap-2 text-[12px] leading-6 text-white/55">
        <Camera className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" aria-hidden="true" />
        {note}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            key={item.numeral}
            as="li"
            delay={index * 0.05}
            className="flex h-full min-w-0"
          >
            <Link
              href={item.link.href}
              transitionTypes={["nav-forward"]}
              className="group flex w-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.045] backdrop-blur-sm transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-mint/40 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0b2630]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ocean/85 via-ocean/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-coral text-[14px] font-bold text-ocean shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]">
                  {item.numeral}
                </span>
                <span className="absolute bottom-3 right-3 left-3 rounded-full border border-white/20 bg-ocean/70 px-3 py-1.5 text-[10.5px] text-white backdrop-blur-sm">
                  {item.position}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15.5px] font-bold leading-7 text-white">{item.title}</h3>
                  <ArrowUpLeft
                    className="mt-1 h-4 w-4 shrink-0 text-mint transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-[12.5px] font-semibold text-mint/90">{item.role}</p>
                <p className="mt-2.5 text-[12.5px] leading-7 text-white/60">{item.detail}</p>
                <span className="mt-4 inline-flex items-center gap-2 border-t border-white/10 pt-3.5 text-[12px] font-semibold text-white/75 transition-colors group-hover:text-mint">
                  {item.link.label}
                  <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
