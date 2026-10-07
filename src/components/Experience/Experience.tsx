import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { images } from "../../data/images";

const scenes = [
    {
        label: "Scene 01",
        heading: "Arrive",
        text: "Leave the busy world behind and step into your own little escape.",
        img: images.exterior,
        alt: "Haven exterior — arriving at your private A-frame escape",
    },
    {
        label: "Scene 02",
        heading: "Unwind",
        text: "Settle into the comfort of Haven and let the day slow down.",
        img: images.bedroom,
        alt: "Haven bedroom — cozy and comfortable interior",
    },
    {
        label: "Scene 03",
        heading: "Look Up",
        text: "Discover the unique upper-level space designed for relaxing moments.",
        img: images.rooftop,
        alt: "Haven upper level relaxation area",
    },
    {
        label: "Scene 04",
        heading: "Stay Longer",
        text: "Wake up refreshed and make your Sri Lankan journey unforgettable.",
        img: images.nature,
        alt: "Lush tropical nature surrounding Haven",
    },
];

function SceneBlock({ scene, index }: { scene: typeof scenes[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`grid lg:grid-cols-2 gap-0 items-stretch ${!isEven ? "lg:flex-row-reverse" : ""}`}
        >
            {/* Image */}
            <motion.div
                className={`relative overflow-hidden h-[400px] lg:h-[520px] ${!isEven ? "lg:order-2" : ""}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src={scene.img}
                    alt={scene.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </motion.div>

            {/* Text */}
            <motion.div
                className={`flex flex-col justify-center p-12 lg:p-20 ${!isEven ? "lg:order-1" : ""}`}
                style={{ background: "var(--color-bg-alt)" }}
                initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="section-label mb-4">{scene.label}</p>
                <h3 className="serif text-5xl md:text-6xl font-light mb-6" style={{ color: "var(--color-text)" }}>
                    {scene.heading}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {scene.text}
                </p>
                <div className="h-px w-12 mt-8" style={{ background: "var(--color-gold)" }} />
            </motion.div>
        </div>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">The Experience</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        The <em className="grad-em">Haven</em> Experience
                    </h2>
                </motion.div>
            </div>

            <div className="overflow-hidden">
                {scenes.map((scene, i) => (
                    <SceneBlock key={scene.label} scene={scene} index={i} />
                ))}
            </div>
        </section>
    );
}
