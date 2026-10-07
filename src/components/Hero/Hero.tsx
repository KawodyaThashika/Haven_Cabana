import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { images } from "../../data/images";

interface HeroProps {
    onBookNow: () => void;
    onExplore: () => void;
}

const stagger = {
    animate: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.1 } },
};

export default function Hero({ onBookNow, onExplore }: HeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            id="home"
            ref={ref}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background image with parallax */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] top-0"
                style={{ y: bgY }}
            >
                <img
                    src={images.hero}
                    alt="Haven A-Frame Cabana exterior — a beautiful tropical escape in Sri Lanka"
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                style={{ y: textY, opacity }}
                variants={stagger}
                initial="initial"
                animate="animate"
            >
                <motion.p
                    variants={fadeIn}
                    className="section-label text-white/70 mb-6 tracking-[0.4em]"
                >
                    A Unique Stay in Sri Lanka
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    className="serif text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-wide mb-6"
                >
                    Find Your<br />
                    <em className="not-italic" style={{ color: "var(--color-gold)" }}>Haven.</em>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed mb-3"
                >
                    Stay close to nature. Wake up somewhere unforgettable.
                </motion.p>

                <motion.p
                    variants={fadeUp}
                    className="text-white/60 text-base max-w-lg mx-auto leading-relaxed mb-12"
                >
                    A unique A-frame escape designed for couples, families and travelers
                    looking for a peaceful and memorable stay in Sri Lanka.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.button
                        onClick={onBookNow}
                        className="btn-primary text-xs"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Book Your Stay
                        <ArrowRight size={14} />
                    </motion.button>
                    <motion.button
                        onClick={onExplore}
                        className="btn-outline text-white text-xs border-white/50 hover:border-amber-400"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Explore Haven
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity }}
            >
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
                <ChevronDown size={16} />
            </motion.div>
        </section>
    );
}
