import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, B as Button, L as Link, U as Upload, S as Skeleton } from "./index-730L02pa.js";
import { A as ALL_CATEGORIES, C as CATEGORY_LABELS, m as motion, a as CATEGORY_COLORS, X, u as useStickers, I as Input, b as AnimatePresence } from "./useStickers-CzTTNHni.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const FILTER_ALL = "all";
function CategoryFilter({ value, onChange }) {
  const tabClass = (active) => cn(
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border whitespace-nowrap",
    active ? "bg-primary text-primary-foreground border-primary/50 shadow-sm" : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-2 flex-wrap",
      role: "tablist",
      "aria-label": "Filter stickers by category",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": value === FILTER_ALL,
            onClick: () => onChange(FILTER_ALL),
            className: tabClass(value === FILTER_ALL),
            "data-ocid": "gallery.filter.tab",
            children: "All"
          }
        ),
        ALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": value === cat,
            onClick: () => onChange(cat),
            className: tabClass(value === cat),
            "data-ocid": `gallery.filter.${String(cat).toLowerCase()}`,
            children: CATEGORY_LABELS[cat]
          },
          cat
        ))
      ]
    }
  );
}
function StickerCard({ sticker, index, onClick }) {
  const url = sticker.blob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 24, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: {
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1]
      },
      className: "group relative aspect-square bg-card rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated card-hover border border-border/40 w-full text-left",
      onClick,
      "data-ocid": `gallery.item.${index + 1}`,
      "aria-label": `View sticker: ${sticker.name}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: url,
            alt: sticker.name,
            className: "w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-110",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-card/95 via-card/60 to-transparent p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate leading-tight", children: sticker.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded border",
                CATEGORY_COLORS[sticker.category]
              ),
              children: CATEGORY_LABELS[sticker.category]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-primary/40 transition-all duration-300 pointer-events-none" })
      ]
    }
  );
}
function StickerModal({ sticker, onClose }) {
  const url = sticker.blob.getDirectURL();
  const date = new Date(
    Number(sticker.uploadDate / 1000000n)
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const principal = sticker.uploaderPrincipal.toText();
  const principalShort = principal.length > 24 ? `${principal.slice(0, 10)}…${principal.slice(-6)}` : principal;
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  return (
    /* Backdrop */
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm w-full max-w-full h-full border-none outline-none",
        "aria-label": `Sticker detail: ${sticker.name}`,
        "data-ocid": "gallery.dialog",
        onClick: onClose,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.94, y: 16 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.94, y: 16 },
            transition: { duration: 0.25, ease: "easeOut" },
            className: "relative bg-card border border-border/60 rounded-2xl overflow-hidden max-w-2xl w-full shadow-elevated",
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "gallery.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-background/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: url,
                    alt: sticker.name,
                    className: "max-w-full max-h-full object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground leading-tight", children: sticker.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded border",
                          CATEGORY_COLORS[sticker.category]
                        ),
                        children: CATEGORY_LABELS[sticker.category]
                      }
                    )
                  ] }),
                  sticker.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: sticker.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4 border-t border-border/40 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaRow, { label: "Uploaded", value: date, mono: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetaRow,
                      {
                        label: "By",
                        value: principalShort,
                        fullValue: principal,
                        mono: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: url,
                      download: `${sticker.name}.png`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2",
                          "data-ocid": "gallery.download_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
                            "Download High-Res"
                          ]
                        }
                      )
                    }
                  )
                ] })
              ] })
            ]
          },
          sticker.name
        )
      }
    )
  );
}
function MetaRow({
  label,
  value,
  fullValue,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex gap-1.5 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60 shrink-0", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn("truncate min-w-0", mono && "font-mono"),
        title: fullValue ?? value,
        children: value
      }
    )
  ] });
}
function Gallery() {
  const { data: stickers = [], isLoading } = useStickers();
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState(FILTER_ALL);
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = stickers.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    const matchesFilter = filter === FILTER_ALL || s.category === filter;
    return matchesSearch && matchesFilter;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "gallery.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, x: -24 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              className: "font-display font-black text-5xl sm:text-7xl text-foreground leading-none tracking-tight",
              children: [
                "Sticker",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Gallery" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "mt-4 text-muted-foreground text-lg max-w-md",
              children: "Browse and download premium 4K stickers. Upload your own to share with the world."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.15, duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated transition-smooth gap-2 font-display font-semibold text-base px-8",
                "data-ocid": "gallery.upload_cta_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-5" }),
                  "Upload Stickers"
                ] })
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border/40 sticky top-16 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilter, { value: filter, onChange: setFilter }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search stickers…",
            className: "pl-9 pr-9 bg-card border-border/60 focus:border-primary/60",
            "data-ocid": "gallery.search_input"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-muted-foreground hover:text-foreground transition-smooth" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        "data-ocid": "gallery.section",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
            "data-ocid": "gallery.loading_state",
            children: Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, key))
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-24 text-center gap-4",
            "data-ocid": "gallery.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: "No stickers found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: search || filter !== FILTER_ALL ? "Try adjusting your filters or search query." : "Be the first to upload a sticker!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "mt-2 bg-primary text-primary-foreground",
                  "data-ocid": "gallery.empty_upload_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4 mr-2" }),
                    "Upload Sticker"
                  ] })
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
            "data-ocid": "gallery.list",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((sticker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              StickerCard,
              {
                sticker,
                index: i,
                onClick: () => setSelected(sticker)
              },
              sticker.id.toString()
            )) })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(StickerModal, { sticker: selected, onClose: () => setSelected(null) }) })
  ] });
}
export {
  Gallery as default
};
