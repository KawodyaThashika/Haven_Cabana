import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { getPackages } from "../../data/packages";
import { formatCurrency } from "../../utils/priceCalculator";

interface PackagesProps {
    onSelectPackage: (id: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
    const packages = getPackages();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="packages" className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Your Stay</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        Choose Your <em className="grad-em">Package</em>
                    </h2>
                    <p className="mt-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Food is not included. Prices are per night.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={pkg.id}
                            className="relative border group card-glow overflow-hidden"
                            style={{
                                borderColor: "var(--color-border)",
                                background: "var(--color-surface)",
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Top accent bar */}
                            <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: "var(--color-gold)" }} />

                            <div className="p-10">
                                {/* Emoji + name */}
                                <div className="flex items-center gap-4 mb-6">
                                    {/* <span className="text-4xl">{pkg.emoji}</span> */}
                                    <div>
                                        <h3 className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>
                                            {pkg.name}
                                        </h3>
                                        <p className="section-label mt-0.5">Up to {pkg.guests} Guests</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="serif text-5xl font-light" style={{ color: "var(--color-accent-text)" }}>
                                            {formatCurrency(pkg.pricePerNight)}
                                        </span>
                                        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>/night</span>
                                    </div>
                                    <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
                                        2 Nights: <strong style={{ color: "var(--color-text)" }}>{formatCurrency(pkg.twoNightPrice)}</strong>
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                                            <Check size={14} style={{ color: "var(--color-accent-text)" }} className="shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        <Check size={14} style={{ color: "var(--color-accent-text)" }} className="shrink-0" />
                                        Food: Not Included
                                    </li>
                                </ul>

                                {/* Button */}
                                <motion.button
                                    onClick={() => onSelectPackage(pkg.id)}
                                    className="w-full btn-primary justify-center text-xs"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Choose {pkg.id === "couple" ? "Couple" : "Family"}
                                    <ArrowRight size={14} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
