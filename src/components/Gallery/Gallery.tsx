import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../../data/images";

type Category = "all" | "haven" | "interior" | "nature" | "experience";
const categories: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Haven", value: "haven" },
    { label: "Interior", value: "interior" },
    { label: "Nature", value: "nature" },
    { label: "Experience", value: "experience" },
];

export default function Gallery() {
    const [active, setActive] = useState<Category>("all");
    const [lightbox, setLightbox] = useState<number | null>(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const filtered = active === "all"
        ? images.gallery
        : images.gallery.filter((img) => img.category === active);

    const current = lightbox !== null ? filtered[lightbox] : null;

    const prev = () => setLightbox((n) => (n !== null ? (n - 1 + filtered.length) % filtered.length : null));
    const next = () => setLightbox((n) => (n !== null ? (n + 1) % filtered.length : null));

    // Keyboard nav
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightbox === null) return;
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox, filtered.length]);

    return (
        <section id="gallery" className="py-24 lg:py-36" ref={ref} style={{ background: "var(--color-bg-alt)" }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Gallery</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        A Glimpse of <em className="grad-em">Haven</em>
                    </h2>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-12"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActive(cat.value)}
                            className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-sans font-semibold transition-all duration-300 border ${active === cat.value ? "text-[#1c1c1c]" : ""
                                }`}
                            style={{
                                background: active === cat.value ? "var(--color-gold)" : "transparent",
                                borderColor: active === cat.value ? "var(--color-gold)" : "var(--color-border)",
                                color: active === cat.value ? "#1c1c1c" : "var(--color-text-muted)",
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry grid */}
                <div className="masonry-grid">
                    <AnimatePresence>
                        {filtered.map((img, i) => (
                            <motion.div
                                key={img.src + active}
                                className="relative overflow-hidden cursor-pointer group"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => setLightbox(i)}
                                whileHover={{ scale: 1.01 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ display: "block" }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs tracking-widest uppercase font-sans">
                                        View
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && current && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <button onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition z-10 p-2">
                            <ChevronLeft size={32} />
                        </button>

                        <motion.div
                            className="max-w-4xl max-h-[85vh] mx-auto px-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={current.src}
                                alt={current.alt}
                                className="max-h-[80vh] w-full object-contain"
                            />
                            <p className="text-white/60 text-center text-sm mt-3 font-sans">{current.alt}</p>
                        </motion.div>

                        <button onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition z-10 p-2">
                            <ChevronRight size={32} />
                        </button>

                        <button onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition z-10 p-2">
                            <X size={24} />
                        </button>

                        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-sans">
                            {lightbox + 1} / {filtered.length}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
