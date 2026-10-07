"use client";

import {
  Anchor,
  Car,
  CircleDot,
  Cog,
  Disc3,
  Layers,
  Lock,
  ShieldCheck,
  Split,
  SquareStack,
  Wind,
} from "lucide-react";
import {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useState,
  ViewTransition,
  type ReactNode,
} from "react";

import {
  ALL_CATEGORY,
  type Category,
  type CategoryTone,
  type CountedCategory,
} from "@/content/taxonomy";
import { cn } from "@/lib/utils";

/**
 * glyph آیکن هر دسته؛ شناسه‌ی آیکن در taxonomy تعریف می‌شود.
 *
 * آیکن‌ها با switch و تگ استاتیک رندر می‌شوند تا هوایت کامپوننت بین رندرها
 * ثابت بماند (قانون react-hooks/static-components).
 */
function CategoryGlyph({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "lock":
      return <Lock className={className} aria-hidden="true" />;
    case "stack":
      return <SquareStack className={className} aria-hidden="true" />;
    case "split":
      return <Split className={className} aria-hidden="true" />;
    case "cog":
      return <Cog className={className} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck className={className} aria-hidden="true" />;
    case "anchor":
      return <Anchor className={className} aria-hidden="true" />;
    case "wind":
      return <Wind className={className} aria-hidden="true" />;
    case "cup":
      return <CircleDot className={className} aria-hidden="true" />;
    case "disc":
      return <Disc3 className={className} aria-hidden="true" />;
    case "car":
      return <Car className={className} aria-hidden="true" />;
    default:
      return <Layers className={className} aria-hidden="true" />;
  }
}

/** لحن رنگی هر دسته: پس‌زمینه‌ی چیپ فعال، رنگ آیکن غیرفعال و استایل برچسب */
const CATEGORY_TONES: Record<
  CategoryTone,
  { activeBg: string; iconIdle: string; tag: string }
> = {
  coral: {
    activeBg: "bg-[#79301d]",
    iconIdle: "text-accent",
    tag: "border-accent/45 text-accent",
  },
  mint: {
    activeBg: "bg-[#0d3f3a]",
    iconIdle: "text-[#0c6b60]",
    tag: "border-[#0c6b60]/40 text-[#0c6b60]",
  },
  steel: {
    activeBg: "bg-[#3f5a62]",
    iconIdle: "text-fg-muted",
    tag: "border-line-2 text-fg-muted",
  },
  ocean: {
    activeBg: "bg-ocean",
    iconIdle: "text-ocean-light",
    tag: "border-ocean-light/50 text-ocean-light",
  },
};

type FilterState = {
  active: string;
  select: (id: string) => void;
};

const CategoryFilterContext = createContext<FilterState | null>(null);

function useCategoryFilter(): FilterState {
  const state = useContext(CategoryFilterContext);
  if (!state) {
    throw new Error("CategoryChips/CategoryItem باید داخل CategoryFilterProvider باشند");
  }
  return state;
}

/**
 * وضعیت فیلتر دسته‌بندی را نگه می‌دارد.
 *
 * تغییر وضعیت داخل `startTransition` انجام می‌شود؛ بدون آن، View Transition
 * API فعال نمی‌شود و آیتم‌ها به‌جای سر خوردن، می‌پرند.
 */
export function CategoryFilterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string>(ALL_CATEGORY.id);

  const value = useMemo<FilterState>(
    () => ({
      active,
      select: (id: string) => startTransition(() => setActive(id)),
    }),
    [active],
  );

  return (
    <CategoryFilterContext.Provider value={value}>{children}</CategoryFilterContext.Provider>
  );
}

/**
 * برچسب‌های دسته‌بندی.
 *
 * پس‌زمینه‌ی برچسب فعال یک عنصر نام‌دار مشترک (`filter-pill`) است، پس به‌جای
 * خاموش/روشن شدن، بین دو برچسب سر می‌خورد. رنگ پس‌زمینه‌ی فعال و آیکن هر چیپ
 * از `tone` و `icon` خود دسته می‌آید تا خانواده‌ها از هم قابل تشخیص باشند.
 */
export function CategoryChips({
  categories,
  label,
}: {
  categories: CountedCategory[];
  label: string;
}) {
  const { active, select } = useCategoryFilter();
  const activeCategory = categories.find((category) => category.id === active);

  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label={label}
        className="flex flex-wrap items-center gap-2 border border-line bg-panel p-2"
      >
        {categories.map((category) => {
          const isActive = category.id === active;
          const tone = CATEGORY_TONES[category.tone];
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(category.id)}
              className={cn(
                "relative isolate inline-flex min-h-10 items-center gap-2 px-4 text-[12.5px] font-semibold transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive ? "text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              {isActive ? (
                <ViewTransition name="filter-pill" share="filter-pill" default="none">
                  <span className={cn("absolute inset-0 -z-10", tone.activeBg)} aria-hidden="true" />
                </ViewTransition>
              ) : null}
              <CategoryGlyph
                icon={category.icon}
                className={cn("h-3.5 w-3.5", isActive ? "text-white/70" : tone.iconIdle)}
              />
              <span>{category.label}</span>
              <span
                dir="ltr"
                className={cn(
                  "tnum text-[11px]",
                  isActive ? "text-white/60" : "text-fg-dim",
                )}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="text-[12.5px] text-fg-dim">
        {activeCategory && activeCategory.id !== ALL_CATEGORY.id
          ? `${activeCategory.label} — ${activeCategory.hint}`
          : `${categories[0]?.count ?? 0} مورد، بدون فیلتر`}
      </p>
    </div>
  );
}

/**
 * برچسب کوچک دسته روی کارت‌ها؛ همان آیکن و لحن رنگی چیپ فیلتر را دارد تا
 * کاربر رنگ/آیکن چیپ فعال را روی کارت‌ها هم ببیند و دسته‌ها جا بیفتند.
 */
export function CategoryTag({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const tone = CATEGORY_TONES[category.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border bg-panel/80 px-2 py-[3px] text-[10.5px] font-semibold backdrop-blur-sm",
        tone.tag,
        className,
      )}
    >
      <CategoryGlyph icon={category.icon} className="h-3 w-3" />
      {category.label}
    </span>
  );
}

/**
 * یک آیتم فهرست که با فیلتر دسته‌بندی ظاهر/پنهان می‌شود.
 *
 * چون وقتی فیلتر عوض می‌شود واقعاً unmount می‌شود، `enter`/`exit` اجرا می‌شود؛
 * `update="auto"` هم باعث می‌شود آیتم‌های باقی‌مانده به‌جای پرش، سرِ جای
 * جدیدشان سُر بخورند. محتوای داخلش توسط کامپوننت سرور رندر می‌شود.
 */
export function CategoryItem({
  category,
  children,
}: {
  category: string;
  children: ReactNode;
}) {
  const { active } = useCategoryFilter();
  const visible = active === ALL_CATEGORY.id || active === category;

  if (!visible) return null;

  return (
    <ViewTransition enter="filter-in" exit="filter-out" update="auto" default="none">
      {children}
    </ViewTransition>
  );
}
