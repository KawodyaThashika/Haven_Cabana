import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook } from "../ui/SocialIcons";
import { siteConfig } from "../../config/siteConfig";
import { openWhatsAppDefault } from "../../utils/whatsapp";

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const contacts = [
        {
            icon: <MessageCircle size={22} />,
            label: "WhatsApp Us",
            value: `+${siteConfig.whatsappNumber}`,
            action: openWhatsAppDefault,
            primary: true,
        },
        {
            icon: <Phone size={22} />,
            label: "Call Us",
            value: siteConfig.phone,
            action: () => window.open(`tel:${siteConfig.phone}`),
        },
        {
            icon: <Mail size={22} />,
            label: "Email Us",
            value: siteConfig.email,
            action: () => window.open(`mailto:${siteConfig.email}`),
        },
    ];

    return (
        <section id="contact" className="py-24 lg:py-36" ref={ref}>
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Get In Touch</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        Let's Plan Your <em className="grad-em">Escape</em>
                    </h2>
                </motion.div>

                {/* Contact cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-14">
                    {contacts.map((c, i) => (
                        <motion.button
                            key={c.label}
                            onClick={c.action}
                            className="p-8 text-center border group card-glow"
                            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.7 }}
                            whileHover={{ y: -6 }}
                        >
                            <div className="flex justify-center mb-4 transition-colors duration-300" style={{ color: "var(--color-accent-text)" }}>
                                {c.icon}
                            </div>
                            <p className="section-label mb-1">{c.label}</p>
                            <p className="text-sm mt-2 break-all" style={{ color: "var(--color-text-muted)" }}>{c.value}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Social & location */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    <div className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        <MapPin size={16} style={{ color: "var(--color-accent-text)" }} />
                        {siteConfig.location}
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center border transition-all hover:opacity-70"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                            <Instagram size={16} />
                        </a>
                        <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center border transition-all hover:opacity-70"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                            <Facebook size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
