import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Heart, Users, Leaf } from "lucide-react";
import { images } from "../../data/images";

interface HeroProps {
    onBookNow: () => void;
    onExplore: () => void;
}

const stagger = {
    animate: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const chips = [
    { icon: <Heart size={14} />, label: "Couples" },
    { icon: <Users size={14} />, label: "Families" },
    { icon: <Leaf size={14} />, label: "Nature Escape" },
    { icon: <MapPin size={14} />, label: "Sri Lanka" },
];

const heroText = { textShadow: "0 2px 18px rgba(2,20,26,0.55)" };

export default function Hero({ onBookNow, onExplore }: HeroProps) {
    return (
        <section
            id="home"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background image (static) */}
            <div className="absolute inset-0">
                <img
                    src={images.hero}
                    alt="Haven A-Frame Cabana exterior — a beautiful tropical escape in Sri Lanka"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,34,42,0.62) 0%, rgba(4,34,42,0.38) 40%, rgba(4,34,42,0.75) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(20,163,168,0.25) 0%, transparent 50%, rgba(255,140,40,0.22) 100%)" }} />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-36"
                variants={stagger}
                initial="initial"
                animate="animate"
            >
                <motion.p
                    variants={fadeUp}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 mb-8 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.3em] uppercase text-white"
                    style={{ background: "rgba(4,34,42,0.5)", border: "1px solid rgba(255,255,255,0.35)" }}
                >
                    <span className="w-2 h-2 rounded-full" style={{ background: "#ffc42e" }} />
                    A Unique Stay in Sri Lanka
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    className="serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.95] tracking-wide mb-6"
                    style={{ ...heroText, fontWeight: 600 }}
                >
                    Find Your<br />
                    <em
                        className="not-italic"
                        style={{
                            textShadow: "none",
                            background: "linear-gradient(110deg, #ffe28a 0%, #ffb703 50%, #ff8a4c 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                        }}
                    >
                        Haven.
                    </em>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-white text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed mb-3"
                    style={heroText}
                >
                    Stay close to nature. Wake up somewhere unforgettable.
                </motion.p>

                <motion.p
                    variants={fadeUp}
                    className="text-white/90 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8"
                    style={heroText}
                >
                    A unique A-frame escape designed for couples, families and travelers
                    looking for a peaceful and memorable stay in Sri Lanka.
                </motion.p>

                {/* Highlights (no animation) */}
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
                    {chips.map((c) => (
                        <span
                            key={c.label}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white"
                            style={{ background: "rgba(4,34,42,0.55)", border: "1px solid rgba(255,255,255,0.25)" }}
                        >
                            <span style={{ color: "#ffc42e" }}>{c.icon}</span>
                            {c.label}
                        </span>
                    ))}
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onClick={onBookNow} className="btn-primary text-xs">
                        Book Your Stay
                        <ArrowRight size={14} />
                    </button>
                    <button
                        onClick={onExplore}
                        className="btn-outline text-white text-xs !border-white hover:!bg-white hover:!text-[#04222a]"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                        Explore Haven
                    </button>
                </motion.div>
            </motion.div>

            {/* Static wave into the page background */}
            <div className="absolute bottom-0 left-0 right-0 z-[5] leading-none" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full" style={{ height: 80 }}>
                    <path fill="var(--color-bg)" d="M0,70 C240,20 480,110 720,70 C960,30 1200,110 1440,60 L1440,120 L0,120 Z" />
                </svg>
            </div>
        </section>
    );
}