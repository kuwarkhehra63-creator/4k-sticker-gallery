import { Link } from "@tanstack/react-router";
import { Search, Upload, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import type { FilterValue } from "../components/CategoryFilter";
import { FILTER_ALL } from "../components/CategoryFilter";
import { StickerCard } from "../components/StickerCard";
import { StickerModal } from "../components/StickerModal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { useStickers } from "../hooks/useStickers";
import type { Sticker } from "../types";

export default function Gallery() {
  const { data: stickers = [], isLoading } = useStickers();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>(FILTER_ALL);
  const [selected, setSelected] = useState<Sticker | null>(null);

  const filtered = stickers.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q);
    const matchesFilter = filter === FILTER_ALL || s.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div data-ocid="gallery.page">
      {/* Hero Banner */}
      <section className="relative bg-card border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-5xl sm:text-7xl text-foreground leading-none tracking-tight"
            >
              Sticker
              <br />
              <span className="text-primary">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4 text-muted-foreground text-lg max-w-md"
            >
              Browse and download premium 4K stickers. Upload your own to share
              with the world.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated transition-smooth gap-2 font-display font-semibold text-base px-8"
              data-ocid="gallery.upload_cta_button"
            >
              <Link to="/upload">
                <Upload className="size-5" />
                Upload Stickers
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search bar */}
      <section className="bg-muted/30 border-b border-border/40 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CategoryFilter value={filter} onChange={setFilter} />

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stickers…"
              className="pl-9 pr-9 bg-card border-border/60 focus:border-primary/60"
              data-ocid="gallery.search_input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="size-4 text-muted-foreground hover:text-foreground transition-smooth" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Sticker Grid */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-ocid="gallery.section"
      >
        {isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            data-ocid="gallery.loading_state"
          >
            {Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((key) => (
              <Skeleton key={key} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
            data-ocid="gallery.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Search className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground">
              No stickers found
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {search || filter !== FILTER_ALL
                ? "Try adjusting your filters or search query."
                : "Be the first to upload a sticker!"}
            </p>
            <Button
              asChild
              className="mt-2 bg-primary text-primary-foreground"
              data-ocid="gallery.empty_upload_button"
            >
              <Link to="/upload">
                <Upload className="size-4 mr-2" />
                Upload Sticker
              </Link>
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            data-ocid="gallery.list"
          >
            <AnimatePresence>
              {filtered.map((sticker, i) => (
                <StickerCard
                  key={sticker.id.toString()}
                  sticker={sticker}
                  index={i}
                  onClick={() => setSelected(sticker)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Detail Modal — rendered via portal-style overlay */}
      <AnimatePresence>
        {selected && (
          <StickerModal sticker={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
