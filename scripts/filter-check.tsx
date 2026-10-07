/**
 * Bundled by scripts/verify-filter.mjs — exercises the real filter components.
 *
 * `react` is aliased to `next/dist/compiled/react` at bundle time, which is the
 * same module the App Router ships, so `ViewTransition` resolves exactly as it
 * does in the app.
 */
import { act } from "react";
import { createRoot } from "react-dom/client";

import {
  CategoryChips,
  CategoryFilterProvider,
  CategoryItem,
} from "@/components/category-filter";
import { APPLICATIONS } from "@/content/applications";
import { BRAND_CATEGORIES, FILTERABLE_BRANDS, brandCategory } from "@/content/taxonomy";
import { RINGSPANN_SERIES } from "@/content/ringspann";
import {
  APPLICATION_CATEGORIES,
  SERIES_CATEGORIES,
  applicationCategory,
  seriesCategory,
  withCounts,
} from "@/content/taxonomy";

type Result = { label: string; actual: unknown; expected: unknown }[];
const results: Result = [];
const record = (label: string, actual: unknown, expected: unknown) =>
  results.push({ label, actual, expected });

function App({
  categories,
  items,
}: {
  categories: ReturnType<typeof withCounts>;
  items: { slug: string; label: string; category: string }[];
}) {
  return (
    <CategoryFilterProvider>
      <CategoryChips categories={categories} label="فیلتر آزمایشی" />
      <div data-filter-grid>
        {items.map((item) => (
          <CategoryItem key={item.slug} category={item.category}>
            <a href={`/${item.slug}`}>{item.label}</a>
          </CategoryItem>
        ))}
      </div>
    </CategoryFilterProvider>
  );
}

async function scenario(
  name: string,
  categories: ReturnType<typeof withCounts>,
  items: { slug: string; label: string; category: string }[],
  expectations: [chipLabel: string, expectedCount: number][],
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App categories={categories} items={items} />);
  });

  const count = () => container.querySelectorAll("[data-filter-grid] a").length;
  const pressed = () =>
    [...container.querySelectorAll('[role="group"] button[aria-pressed="true"]')].map((b) =>
      (b.textContent ?? "").replace(/\d+$/, ""),
    );

  record(`${name}: unfiltered count`, count(), items.length);

  for (const [chipLabel, expectedCount] of expectations) {
    const button = [...container.querySelectorAll("[role='group'] button")].find((b) =>
      (b.textContent ?? "").includes(chipLabel),
    );
    if (!button) {
      record(`${name}: chip "${chipLabel}" exists`, false, true);
      continue;
    }
    await act(async () => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    record(`${name}: count for "${chipLabel}"`, count(), expectedCount);
    record(`${name}: pressed chip for "${chipLabel}"`, pressed().join(","), chipLabel);
  }

  await act(async () => {
    root.unmount();
  });
  container.remove();
}

export async function main() {
  await scenario(
    "applications",
    withCounts(
      APPLICATION_CATEGORIES,
      APPLICATIONS.map((a) => a.slug),
      applicationCategory,
    ),
    APPLICATIONS.map((a) => ({
      slug: a.slug,
      label: a.title,
      category: applicationCategory(a.slug),
    })),
    [
      ["بک‌استاپ", 2],
      ["ایندکسینگ و حرکت پله‌ای", 2],
      ["اورانینگ و جداسازی", 2],
      ["همه", 6],
    ],
  );

  await scenario(
    "ringspann",
    withCounts(
      SERIES_CATEGORIES,
      RINGSPANN_SERIES.map((s) => s.slug),
      seriesCategory,
    ),
    RINGSPANN_SERIES.map((s) => ({
      slug: s.slug,
      label: s.designation,
      category: seriesCategory(s.slug),
    })),
    [
      ["پایه و داخلی", 2],
      ["کامل و آب‌بندی‌شده", 2],
      ["بک‌استاپ با اهرم", 2],
      ["دور آزاد بالا و لیفت‌آف", 1],
      ["همه", 7],
    ],
  );

  await scenario(
    "brands",
    withCounts(
      BRAND_CATEGORIES,
      FILTERABLE_BRANDS.map((b) => b.slug),
      brandCategory,
    ),
    FILTERABLE_BRANDS.map((b) => ({
      slug: b.slug,
      label: b.name,
      category: brandCategory(b.slug),
    })),
    [
      ["کلاچ کاپ کشیده", 3],
      ["بلبرینگ‌ساز جامع", 2],
      ["انتقال قدرت خودرو", 1],
      ["همه", 6],
    ],
  );

  return results;
}
