import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { images } from "../../data/images";
import { ArrowRight } from "lucide-react";

const destinations = [
    { label: "Beaches", img: images.travel.beaches, desc: "Golden shores and crystal waters" },
    { label: "Mountains", img: images.travel.mountains, desc: "Misty peaks and tea country" },
    { label: "Waterfalls", img: images.travel.waterfalls, desc: "Hidden cascades in lush forest" },
    { label: "Wildlife", img: images.travel.wildlife, desc: "Elephants, leopards and more" },
    { label: "Culture", img: images.travel.culture, desc: "Ancient temples and rich heritage" },
    { label: "Food", img: images.travel.food, desc: "Spices, curries and coastal flavours" },
    { label: "Adventure", img: images.travel.adventure, desc: "Hiking, surfing and beyond" },
];

interface TravelSectionProps {
    onPlanStay: () => void;
}

export default function TravelSection({ onPlanStay }: TravelSectionProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Discover Sri Lanka</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light mb-6" style={{ color: "var(--color-text)" }}>
                        Your Sri Lankan Adventure<br />
                        <em className="grad-em">Starts Here</em>
                    </h2>
                    <p className="leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        From misty mountains to golden beaches, ancient cities to wild national parks,
                        Sri Lanka is made for unforgettable journeys.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {destinations.slice(0, 4).map((d, i) => (
                        <DestCard key={d.label} dest={d} index={i} inView={inView} />
                    ))}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {destinations.slice(4).map((d, i) => (
                        <DestCard key={d.label} dest={d} index={i + 4} inView={inView} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    <motion.button
                        onClick={onPlanStay}
                        className="btn-primary text-xs"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Plan Your Stay <ArrowRight size={14} />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}

function DestCard({ dest, index, inView }: {
    dest: { label: string; img: string; desc: string };
    index: number;
    inView: boolean;
}) {
    return (
        <motion.div
            className="relative overflow-hidden group cursor-default h-64 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.06 * index, duration: 0.7 }}
        >
            <img
                src={dest.img}
                alt={`Sri Lanka ${dest.label}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,34,42,0.88) 0%, rgba(4,34,42,0.25) 55%, transparent 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-soft-light" style={{ background: "linear-gradient(135deg, #14a3a8, #ffb703)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="serif text-2xl text-white" style={{ fontWeight: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{dest.label}</h3>
                <p className="text-white text-xs mt-1 font-sans font-medium md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:translate-y-2 group-hover:translate-y-0">
                    {dest.desc}
                </p>
            </div>
        </motion.div>
    );
}
