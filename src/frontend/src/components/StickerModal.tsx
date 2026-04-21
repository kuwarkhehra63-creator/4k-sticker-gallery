import { Download, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { cn } from "../lib/utils";
import type { Sticker } from "../types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../types";
import { Button } from "./ui/button";

interface StickerModalProps {
  sticker: Sticker;
  onClose: () => void;
}

export function StickerModal({ sticker, onClose }: StickerModalProps) {
  const url = sticker.blob.getDirectURL();
  const date = new Date(
    Number(sticker.uploadDate / 1_000_000n),
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const principal = sticker.uploaderPrincipal.toText();
  const principalShort =
    principal.length > 24
      ? `${principal.slice(0, 10)}…${principal.slice(-6)}`
      : principal;

  // ESC key closes modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    /* Backdrop */
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm w-full max-w-full h-full border-none outline-none"
      aria-label={`Sticker detail: ${sticker.name}`}
      data-ocid="gallery.dialog"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* Animated Panel */}
      <motion.div
        key={sticker.name}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-card border border-border/60 rounded-2xl overflow-hidden max-w-2xl w-full shadow-elevated"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-smooth"
          aria-label="Close modal"
          data-ocid="gallery.close_button"
        >
          <X className="size-4 text-foreground" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image panel */}
          <div className="aspect-square bg-background/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border/40">
            <img
              src={url}
              alt={sticker.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Info panel */}
          <div className="p-6 flex flex-col gap-4">
            {/* Title + category */}
            <div>
              <h2 className="font-display font-bold text-xl text-foreground leading-tight">
                {sticker.name}
              </h2>
              <span
                className={cn(
                  "inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded border",
                  CATEGORY_COLORS[sticker.category],
                )}
              >
                {CATEGORY_LABELS[sticker.category]}
              </span>
            </div>

            {/* Description */}
            {sticker.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sticker.description}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-auto pt-4 border-t border-border/40 space-y-2">
              <MetaRow label="Uploaded" value={date} mono />
              <MetaRow
                label="By"
                value={principalShort}
                fullValue={principal}
                mono
              />
            </div>

            {/* Download CTA */}
            <a
              href={url}
              download={`${sticker.name}.png`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2"
                data-ocid="gallery.download_button"
              >
                <Download className="size-4" />
                Download High-Res
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}

function MetaRow({
  label,
  value,
  fullValue,
  mono,
}: {
  label: string;
  value: string;
  fullValue?: string;
  mono?: boolean;
}) {
  return (
    <div className="text-xs text-muted-foreground flex gap-1.5 items-start">
      <span className="text-foreground/60 shrink-0">{label}:</span>
      <span
        className={cn("truncate min-w-0", mono && "font-mono")}
        title={fullValue ?? value}
      >
        {value}
      </span>
    </div>
  );
}
