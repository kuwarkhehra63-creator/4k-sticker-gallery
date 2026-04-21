import { cn } from "../lib/utils";
import type { StickerCategory } from "../types";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "../types";

const FILTER_ALL = "all" as const;
export type FilterValue = typeof FILTER_ALL | StickerCategory;
export { FILTER_ALL };

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const tabClass = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border whitespace-nowrap",
      active
        ? "bg-primary text-primary-foreground border-primary/50 shadow-sm"
        : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:border-border",
    );

  return (
    <div
      className="flex gap-2 flex-wrap"
      role="tablist"
      aria-label="Filter stickers by category"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === FILTER_ALL}
        onClick={() => onChange(FILTER_ALL)}
        className={tabClass(value === FILTER_ALL)}
        data-ocid="gallery.filter.tab"
      >
        All
      </button>
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={value === cat}
          onClick={() => onChange(cat)}
          className={tabClass(value === cat)}
          data-ocid={`gallery.filter.${String(cat).toLowerCase()}`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
