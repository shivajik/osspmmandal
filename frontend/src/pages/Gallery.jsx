import { useState, useEffect, useCallback } from "react";
import PageHero from "../components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// All images live in /public/gallery — referenced by absolute URL
const GALLERY_FILES = [
  "1000297309.jpg",
  "1000767092.jpg",
  "1000767124.jpg",
  "1000767125.jpg",
  "1000767149.jpg",
  "1000767215.jpg",
  "1000767264.jpg",
  "1000767275.jpg",
  "1000767278.jpg",
  "1000767286.jpg",
  "1001143759.jpg",
  "1001143762.jpg",
  "1001345345.jpg",
  "1001354277.jpg",
  "1001388347.jpg",
  "1001388349.jpg",
  "1002024030.jpg",
  "1002024143.jpg",
  "1002069841.jpg",
  "1002211923.jpg",
  "1002257370.jpg",
  "1002257712.jpg",
  "1002309696.jpg",
  "1002326422.jpg",
];

const CATEGORIES = [
  "Campus Life",
  "Classrooms",
  "Cultural Events",
  "Sports & Activities",
  "Ceremonies",
  "Community",
];

const IMAGES = GALLERY_FILES.map((file, i) => ({
  src: `/gallery/${file}`,
  category: CATEGORIES[i % CATEGORIES.length],
  caption: `OSSPM · ${CATEGORIES[i % CATEGORIES.length]}`,
  index: i,
}));

const FILTERS = ["All", ...CATEGORIES];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    filter === "All" ? IMAGES : IMAGES.filter((img) => img.category === filter);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % filtered.length
      ),
    [filtered.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, next, prev]);

  return (
    <div data-testid="gallery-page">
      <PageHero
        kicker="Gallery · Life at OSSPM"
        title={
          <>
            Moments from our{" "}
            <span className="italic text-[#D4AF37]">campuses</span>.
          </>
        }
        subtitle={`A visual archive of ${IMAGES.length} moments — classrooms, ceremonies, co‑curriculars and community across OSSPM institutions.`}
      />

      {/* Filter bar */}
      <section className="border-b border-[#0A192F]/10 bg-[#FBF9F6] sticky top-[64px] z-30 backdrop-blur-xl bg-[#FBF9F6]/85">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
          <div className="label-kicker text-[#0A192F]/60">
            <span className="text-[#D4AF37]">{filtered.length.toString().padStart(2, "0")}</span>
            <span className="opacity-30 mx-2">/</span>
            <span>{IMAGES.length.toString().padStart(2, "0")} photographs</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-testid={`gallery-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 border ${
                    active
                      ? "bg-[#0A192F] text-[#FBF9F6] border-[#0A192F]"
                      : "bg-transparent text-[#0A192F] border-[#0A192F]/15 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Masonry-ish grid using CSS columns for true tetris feel */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
          {filtered.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="mb-3 md:mb-4 break-inside-avoid relative overflow-hidden border border-[#0A192F]/10 group cursor-zoom-in bg-[#F0F4F8]"
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-auto block object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-[#0A192F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute left-4 right-4 bottom-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="label-kicker text-[#D4AF37] mb-1">
                  {(i + 1).toString().padStart(2, "0")} · {img.category}
                </div>
                <div className="font-display text-[#FBF9F6] text-lg leading-tight">
                  {img.caption}
                </div>
              </figcaption>
              {/* corner accent */}
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#D4AF37] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#D4AF37] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
            </motion.figure>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#4A5568]">
            No photographs in this category yet.
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0A192F]/95 backdrop-blur-sm flex items-center justify-center"
            onClick={close}
            data-testid="gallery-lightbox"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-6 right-6 text-[#FBF9F6] hover:text-[#D4AF37] transition-colors p-2"
              aria-label="Close"
              data-testid="gallery-lightbox-close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 text-[#FBF9F6] hover:text-[#D4AF37] transition-colors p-2"
              aria-label="Previous"
              data-testid="gallery-lightbox-prev"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 text-[#FBF9F6] hover:text-[#D4AF37] transition-colors p-2"
              aria-label="Next"
              data-testid="gallery-lightbox-next"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={filtered[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-[92vw] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="max-w-[92vw] max-h-[80vh] object-contain border border-white/10"
              />
              <div className="mt-4 flex items-center gap-3 label-kicker text-[#FBF9F6]">
                <span className="text-[#D4AF37]">
                  {(lightboxIndex + 1).toString().padStart(2, "0")}
                </span>
                <span className="opacity-30">/</span>
                <span>{filtered.length.toString().padStart(2, "0")}</span>
                <span className="opacity-30">·</span>
                <span>{filtered[lightboxIndex].category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
