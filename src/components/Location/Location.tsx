import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function Location() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="location" className="py-24 lg:py-36" ref={ref} style={{ background: "var(--color-bg-alt)" }}>
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Find Us</p>
                    <h2 className="serif text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        Find Your Way to <em style={{ color: "var(--color-gold)" }}>Haven</em>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Map placeholder */}
                    <motion.div
                        className="relative overflow-hidden h-80 lg:h-96"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        style={{ border: "1px solid var(--color-border)" }}
                    >
                        {/* Map placeholder — replace with Google Maps embed or real map */}
                        <div className="w-full h-full flex flex-col items-center justify-center"
                            style={{ background: "var(--color-surface)" }}>
                            <MapPin size={48} style={{ color: "var(--color-gold)", opacity: 0.5 }} className="mb-4" />
                            <p className="serif text-xl" style={{ color: "var(--color-text-muted)" }}>Map Coming Soon</p>
                            <p className="text-xs mt-2 text-center max-w-xs px-4" style={{ color: "var(--color-text-muted)" }}>
                                {siteConfig.location}
                            </p>
                        </div>
                        {/* Decorative corner */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "var(--color-gold)" }} />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "var(--color-gold)" }} />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="p-6 border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
                            <div className="flex items-start gap-4">
                                <MapPin size={20} style={{ color: "var(--color-gold)" }} className="shrink-0 mt-0.5" />
                                <div>
                                    <p className="section-label mb-1">Location</p>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                                        {siteConfig.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href={siteConfig.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex-1 justify-center text-xs"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <ExternalLink size={14} />
                                View on Google Maps
                            </motion.a>
                            <motion.a
                                href={siteConfig.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline flex-1 justify-center text-xs"
                                style={{ color: "var(--color-text)" }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Navigation size={14} />
                                Get Directions
                            </motion.a>
                        </div>

                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            * Exact location details and GPS coordinates will be shared with confirmed guests via WhatsApp.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
