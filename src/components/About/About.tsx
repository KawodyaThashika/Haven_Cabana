import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { images } from "../../data/images";

const stats = [
    { value: "2", label: "Couple Guests" },
    { value: "4", label: "Family Guests" },
    { value: "1", label: "Unique Haven" },
    { value: "∞", label: "Memories" },
];

function CountUp({ value, run }: { value: string; run: boolean }) {
    const target = Number(value);
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!run || Number.isNaN(target)) return;
        let raf = 0;
        const start = performance.now();
        const tick = (t: number) => {
            const p = Math.min((t - start) / 1400, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [run, target]);
    return <>{Number.isNaN(target) ? value : n}</>;
}

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.7 }}
        >
            <p className="serif text-5xl md:text-6xl" style={{ fontWeight: 700, color: "var(--color-accent-text)" }}>
                <CountUp value={value} run={inView} />
            </p>
            <p className="section-label mt-2" style={{ color: "var(--color-text-muted)" }}>
                {label}
            </p>
        </motion.div>
    );
}

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="stay" className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={images.about}
                                alt="Haven A-frame cabana — a warm welcome awaits"
                                className="w-full h-[560px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                        </div>
                        {/* Decorative frame */}
                        <div
                            className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 -z-10 rounded-3xl"
                            style={{ borderColor: "var(--color-gold)", opacity: 0.7 }}
                        />
                        {/* Badge */}
                        <motion.div
                            className="absolute -bottom-4 -left-4 glass p-5 shadow-xl rounded-2xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <p className="serif text-3xl font-light" style={{ color: "var(--color-accent-text)" }}>A-Frame</p>
                            <p className="text-xs tracking-widest uppercase font-sans mt-0.5" style={{ color: "var(--color-text-muted)" }}>Cabana Stay</p>
                        </motion.div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="section-label mb-4">Welcome to Haven</p>
                        <h2 className="serif text-4xl md:text-5xl font-light leading-tight mb-6" style={{ color: "var(--color-text)" }}>
                            A Little Place to Escape<br />
                            <em className="grad-em">the Ordinary</em>
                        </h2>
                        <p className="leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
                            Haven is a unique A-frame cabana created for travelers who want to slow down,
                            reconnect with nature and experience Sri Lanka differently.
                        </p>

                        <ul className="space-y-3 mb-10">
                            {[
                                "Distinctive A-frame triangular architecture",
                                "Large, comfortable bed for restful sleep",
                                "Private bathroom for your comfort",
                                "Upper-level mattress relaxation area",
                                "Peaceful environment away from city life",
                                "Perfect for couples and small families",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                                    <span className="w-4 h-px mt-2.5 shrink-0" style={{ background: "var(--color-gold)" }} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
                            {stats.map((s, i) => (
                                <StatItem key={s.label} {...s} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
