"use client";

import {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useState,
  ViewTransition,
  type ReactNode,
} from "react";

import { ALL_CATEGORY, type CountedCategory } from "@/content/taxonomy";
import { cn } from "@/lib/utils";

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
 * خاموش/روشن شدن، بین دو برچسب سر می‌خورد.
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
                  <span className="absolute inset-0 -z-10 bg-ocean" aria-hidden="true" />
                </ViewTransition>
              ) : null}
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
