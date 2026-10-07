import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Triangle, Bed, ShowerHead, Layers, TreePine, Heart } from "lucide-react";

const features = [
    {
        icon: <Triangle size={28} />,
        title: "A-Frame Architecture",
        desc: "A distinctive triangular design that makes Haven a truly memorable place to stay.",
    },
    {
        icon: <Bed size={28} />,
        title: "Comfortable Bed",
        desc: "A large comfortable bed designed for a deeply relaxing night's sleep.",
    },
    {
        icon: <ShowerHead size={28} />,
        title: "Private Bathroom",
        desc: "A private bathroom exclusively for your use throughout your stay.",
    },
    {
        icon: <Layers size={28} />,
        title: "Rooftop Relaxation",
        desc: "An upper-level mattress area where you can unwind and enjoy the unique space.",
    },
    {
        icon: <TreePine size={28} />,
        title: "Nature Escape",
        desc: "A peaceful environment away from the noise and rush of busy city life.",
    },
    {
        icon: <Heart size={28} />,
        title: "Couples & Families",
        desc: "A flexible stay designed for romantic escapes and small family getaways.",
    },
];

export default function Features() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="experience" className="relative overflow-hidden py-24 lg:py-36" ref={ref} style={{ background: "var(--color-bg-alt)" }}>
            <div className="blob w-96 h-96 -top-20 -left-24" style={{ background: "#14a3a8" }} />
            <div className="blob w-80 h-80 bottom-0 -right-20" style={{ background: "#ffb703", animationDelay: "-5s" }} />
            <div className="relative max-w-7xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    className="text-center max-w-xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Why Haven</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        Why Stay at <em className="grad-em">Haven?</em>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            className="group p-8 border card-glow cursor-default"
                            style={{
                                borderColor: "var(--color-border)",
                                background: "var(--color-surface)",
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.08, duration: 0.7 }}
                            whileHover={{ y: -6 }}
                        >
                            <div className="icon-bubble mb-6">
                                {f.icon}
                            </div>
                            <h3 className="serif text-xl font-medium mb-3" style={{ color: "var(--color-text)" }}>
                                {f.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {f.desc}
                            </p>
                            {/* Bottom accent */}
                            <div
                                className="h-px mt-6 w-0 group-hover:w-full transition-all duration-500"
                                style={{ background: "var(--color-gold)" }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
