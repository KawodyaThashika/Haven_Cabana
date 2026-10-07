import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "../../data/reviews";

export default function Reviews() {
    const [idx, setIdx] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const prev = () => setIdx((i) => (i - 1 + reviews.length) % reviews.length);
    const next = () => setIdx((i) => (i + 1) % reviews.length);

    const current = reviews[idx];

    return (
        <section className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Guest Stories</p>
                    <h2 className="serif text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        What Guests Say About <em style={{ color: "var(--color-gold)" }}>Haven</em>
                    </h2>
                    <p className="text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
                        Sample reviews — will be replaced with real guest testimonials
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            className="p-10 md:p-14 text-center border"
                            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.45 }}
                        >
                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-6">
                                {Array.from({ length: current.rating }).map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" style={{ color: "var(--color-gold)" }} />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="serif text-2xl md:text-3xl font-light leading-relaxed mb-8"
                                style={{ color: "var(--color-text)" }}>
                                "{current.text}"
                            </blockquote>

                            {/* Author */}
                            <div>
                                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{current.name}</p>
                                <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                                    {current.country}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            onClick={prev}
                            className="w-10 h-10 flex items-center justify-center border transition-all duration-200 hover:opacity-70"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft size={18} />
                        </motion.button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        background: i === idx ? "var(--color-gold)" : "var(--color-border)",
                                        transform: i === idx ? "scale(1.4)" : "scale(1)",
                                    }}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={next}
                            className="w-10 h-10 flex items-center justify-center border transition-all duration-200 hover:opacity-70"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
