import { motion } from "motion/react";
import { cn } from "../lib/utils";
import type { Sticker } from "../types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../types";

interface StickerCardProps {
  sticker: Sticker;
  index: number;
  onClick: () => void;
}

export function StickerCard({ sticker, index, onClick }: StickerCardProps) {
  const url = sticker.blob.getDirectURL();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative aspect-square bg-card rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated card-hover border border-border/40 w-full text-left"
      onClick={onClick}
      data-ocid={`gallery.item.${index + 1}`}
      aria-label={`View sticker: ${sticker.name}`}
    >
      <img
        src={url}
        alt={sticker.name}
        className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay gradient with title + badge */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card/95 via-card/60 to-transparent p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display font-semibold text-sm text-foreground truncate leading-tight">
          {sticker.name}
        </p>
        <span
          className={cn(
            "inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded border",
            CATEGORY_COLORS[sticker.category],
          )}
        >
          {CATEGORY_LABELS[sticker.category]}
        </span>
      </div>
      {/* Teal accent ring on hover */}
      <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-primary/40 transition-all duration-300 pointer-events-none" />
    </motion.button>
  );
}
