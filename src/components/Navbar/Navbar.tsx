import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "Experience", href: "/#experience" },
    { label: "Stay", href: "/#stay" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Packages", href: "/#packages" },
    { label: "Location", href: "/#location" },
    { label: "FAQ", href: "/#faq" },
];

interface NavbarProps {
    onBookNow: () => void;
}

export default function Navbar({ onBookNow }: NavbarProps) {
    const { isDark, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollPct, setScrollPct] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => {
            const sy = window.scrollY;
            setScrolled(sy > 60);
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(docH > 0 ? (sy / docH) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        if (href.startsWith("/#")) {
            const id = href.replace("/#", "");
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <>
            {/* Scroll progress */}
            <motion.div
                id="scroll-progress"
                style={{ scaleX: scrollPct / 100 }}
            />

            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg shadow-black/10 py-3" : "bg-transparent py-5"
                    }`}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="serif font-light tracking-[0.25em] text-2xl select-none"
                        style={{ color: "var(--color-text)" }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <span style={{ color: "var(--color-gold)" }}>H</span>AVEN
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className="relative text-xs tracking-widest uppercase font-sans font-medium group transition-colors duration-200"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    {link.label}
                                    <span
                                        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                                        style={{ background: "var(--color-gold)" }}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
                            style={{ color: "var(--color-text-muted)" }}
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isDark ? "sun" : "moon"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        {/* Book now — desktop */}
                        <motion.button
                            onClick={onBookNow}
                            className="hidden lg:flex btn-primary text-xs"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Book Your Stay
                        </motion.button>

                        {/* Hamburger — mobile */}
                        <button
                            className="lg:hidden w-9 h-9 flex items-center justify-center"
                            style={{ color: "var(--color-text)" }}
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex flex-col pt-20"
                        style={{ background: "var(--color-bg)" }}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col items-center justify-center flex-1 gap-8 pb-20">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href)}
                                    className="serif text-3xl font-light tracking-widest"
                                    style={{ color: "var(--color-text)" }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.button
                                onClick={() => { setMenuOpen(false); onBookNow(); }}
                                className="btn-primary mt-4 text-xs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.06 }}
                            >
                                Book Your Stay
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
