import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Instagram, Facebook } from "../ui/SocialIcons";
import { siteConfig } from "../../config/siteConfig";
import { openWhatsAppDefault } from "../../utils/whatsapp";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: "var(--color-bg-alt)", borderTop: "1px solid var(--color-border)" }}>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <p className="serif text-3xl font-light mb-2 tracking-widest" style={{ color: "var(--color-text)" }}>
                            <span style={{ color: "var(--color-gold)" }}>H</span>AVEN
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="section-label mb-4">Navigate</p>
                        <ul className="space-y-2">
                            {[
                                ["Home", "/#home"],
                                ["Experience", "/#experience"],
                                ["Packages", "/#packages"],
                                ["Gallery", "/#gallery"],
                                ["FAQ", "/#faq"],
                                ["Contact", "/#contact"],
                            ].map(([label, href]) => (
                                <li key={label}>
                                    <a href={href} className="text-sm transition-colors hover:opacity-70"
                                        style={{ color: "var(--color-text-muted)" }}>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="section-label mb-4">Contact</p>
                        <div className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                            <p>{siteConfig.phone}</p>
                            <p>{siteConfig.email}</p>
                            <p className="text-xs leading-relaxed">{siteConfig.location}</p>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button onClick={openWhatsAppDefault}
                                className="w-9 h-9 flex items-center justify-center border hover:opacity-70 transition"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                                <MessageCircle size={15} />
                            </button>
                            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center border hover:opacity-70 transition"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                                <Instagram size={15} />
                            </a>
                            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center border hover:opacity-70 transition"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                                <Facebook size={15} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t gap-4"
                    style={{ borderColor: "var(--color-border)" }}>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        © {year} Haven. All rights reserved.
                    </p>
                    <Link to="/admin"
                        className="text-xs hover:opacity-70 transition"
                        style={{ color: "var(--color-text-muted)" }}>
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
