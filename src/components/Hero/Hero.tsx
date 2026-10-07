import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Heart, Users, Leaf } from "lucide-react";
import { images } from "../../data/images";

interface HeroProps {
    onBookNow: () => void;
    onExplore: () => void;
}

const stagger = {
    animate: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.1 } },
};

// Fixed positions so the "fireflies" don't jump around on re-render
const fireflies = [
    { left: "8%", top: "72%", delay: "0s", size: 5 },
    { left: "18%", top: "58%", delay: "2.2s", size: 7 },
    { left: "29%", top: "80%", delay: "4.1s", size: 5 },
    { left: "41%", top: "66%", delay: "1.1s", size: 6 },
    { left: "55%", top: "78%", delay: "5.3s", size: 5 },
    { left: "66%", top: "60%", delay: "3.2s", size: 7 },
    { left: "76%", top: "74%", delay: "0.6s", size: 6 },
    { left: "86%", top: "64%", delay: "4.8s", size: 5 },
    { left: "93%", top: "82%", delay: "2.8s", size: 6 },
    { left: "48%", top: "88%", delay: "6.2s", size: 5 },
];

const chips = [
    { icon: <Heart size={14} />, label: "Couples" },
    { icon: <Users size={14} />, label: "Families" },
    { icon: <Leaf size={14} />, label: "Nature Escape" },
    { icon: <MapPin size={14} />, label: "Sri Lanka" },
];

const heroText = { textShadow: "0 2px 18px rgba(2,20,26,0.55)" };

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
            {/* Background image: parallax + slow Ken Burns zoom */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] top-0"
                style={{ y: bgY }}
            >
                <img
                    src={images.hero}
                    alt="Haven A-Frame Cabana exterior — a beautiful tropical escape in Sri Lanka"
                    className="w-full h-full object-cover animate-kenburns"
                />
                {/* Tropical colour grade + readability overlays */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,34,42,0.62) 0%, rgba(4,34,42,0.35) 38%, rgba(4,34,42,0.72) 100%)" }} />
                <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(115deg, rgba(20,163,168,0.55) 0%, transparent 45%, rgba(255,140,40,0.5) 100%)" }} />
            </motion.div>

            {/* Glowing sun & colour orbs */}
            <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl animate-drift pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,196,46,0.55), transparent 70%)" }} />
            <div className="absolute bottom-20 -left-32 w-[460px] h-[460px] rounded-full blur-3xl animate-drift pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(20,163,168,0.5), transparent 70%)", animationDelay: "-6s" }} />

            {/* Fireflies */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {fireflies.map((f, i) => (
                    <span key={i} className="firefly" style={{ left: f.left, top: f.top, width: f.size, height: f.size, animationDelay: f.delay }} />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-36"
                style={{ y: textY, opacity }}
                variants={stagger}
                initial="initial"
                animate="animate"
            >
                <motion.p
                    variants={fadeIn}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 mb-8 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.3em] uppercase text-white"
                    style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.35)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ffc42e", boxShadow: "0 0 10px #ffc42e" }} />
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
                            background: "linear-gradient(110deg, #ffe28a 0%, #ffb703 30%, #ff8a4c 60%, #ffe28a 100%)",
                            backgroundSize: "220% 100%",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            animation: "gradientX 6s ease infinite",
                            filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.35))",
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

                {/* Quick highlights */}
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
                    {chips.map((c, i) => (
                        <motion.span
                            key={c.label}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white"
                            style={{ background: "rgba(4,34,42,0.45)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                        >
                            <span style={{ color: "#ffc42e" }}>{c.icon}</span>
                            {c.label}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.button
                        onClick={onBookNow}
                        className="btn-primary cta-pulse text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Book Your Stay
                        <ArrowRight size={14} />
                    </motion.button>
                    <motion.button
                        onClick={onExplore}
                        className="btn-outline text-white text-xs !border-white hover:!bg-white hover:!text-[#04222a]"
                        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Explore Haven
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Animated wave divider into the page background */}
            <div className="absolute bottom-0 left-0 right-0 wave-wrap z-[5]" aria-hidden="true">
                <svg viewBox="0 0 2880 120" preserveAspectRatio="none" style={{ height: 90 }}>
                    <path
                        fill="var(--color-bg)"
                        fillOpacity="0.55"
                        d="M0,64 C240,110 480,10 720,50 C960,90 1200,110 1440,64 C1680,18 1920,110 2160,50 C2400,-10 2640,100 2880,64 L2880,120 L0,120 Z"
                    />
                    <path
                        fill="var(--color-bg)"
                        d="M0,86 C240,50 480,116 720,84 C960,52 1200,112 1440,86 C1680,60 1920,116 2160,84 C2400,52 2640,112 2880,86 L2880,120 L0,120 Z"
                    />
                </svg>
            </div>
        </section>
    );
}
