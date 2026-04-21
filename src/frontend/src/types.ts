import type { Principal } from "@icp-sdk/core/principal";
import { StickerCategory } from "./backend";
export type { StickerCategory };
export { StickerCategory as StickerCategoryEnum } from "./backend";

export interface Sticker {
  id: bigint;
  name: string;
  description: string;
  category: StickerCategory;
  uploaderPrincipal: Principal;
  uploadDate: bigint;
  blob: {
    getDirectURL: () => string;
    getBytes: () => Promise<Uint8Array<ArrayBuffer>>;
  };
}

export const CATEGORY_LABELS: Record<StickerCategory, string> = {
  [StickerCategory.Abstract]: "Abstract",
  [StickerCategory.Nature]: "Nature",
  [StickerCategory.Art]: "Art",
  [StickerCategory.Tech]: "Tech",
  [StickerCategory.Other]: "Other",
};

export const CATEGORY_COLORS: Record<StickerCategory, string> = {
  [StickerCategory.Abstract]: "bg-chart-4/10 text-chart-4 border-chart-4/30",
  [StickerCategory.Nature]: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  [StickerCategory.Art]: "bg-chart-5/10 text-chart-5 border-chart-5/30",
  [StickerCategory.Tech]: "bg-accent/10 text-accent border-accent/30",
  [StickerCategory.Other]: "bg-muted text-muted-foreground border-border",
};

export const ALL_CATEGORIES = Object.values(StickerCategory);
