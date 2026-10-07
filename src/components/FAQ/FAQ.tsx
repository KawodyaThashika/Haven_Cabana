import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "Is Haven suitable for couples?",
        a: "Yes. The Couple Package is designed for up to 2 guests and is perfect for a romantic escape.",
    },
    {
        q: "Can families stay at Haven?",
        a: "Yes. The Family Package accommodates up to 4 guests, with a large bed and an upper-level mattress area.",
    },
    {
        q: "Is food included in the packages?",
        a: "Food is not included in the current packages. Guests are welcome to arrange their own meals.",
    },
    {
        q: "How do I book a stay at Haven?",
        a: "Simply select your package and dates, enter your guest details and send the booking request directly through WhatsApp. Haven will confirm availability with you.",
    },
    {
        q: "Is there a swimming pool?",
        a: "Haven does not have a swimming pool.",
    },
    {
        q: "Is there a private bathroom?",
        a: "Yes. Haven includes a private bathroom for your exclusive use throughout your stay.",
    },
    {
        q: "Is Wi-Fi available?",
        a: "Wi-Fi availability will be confirmed by the Haven team. Please ask during your booking enquiry.",
    },
    {
        q: "What are the check-in and check-out times?",
        a: "Check-in and check-out times will be confirmed during your booking. Please enquire via WhatsApp for specific timings.",
    },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full py-5 text-left group"
            >
                <span
                    className="serif text-lg font-light pr-8 group-hover:text-opacity-80 transition-all duration-200"
                    style={{ color: "var(--color-text)" }}
                >
                    {q}
                </span>
                <motion.span
                    style={{ color: "var(--color-accent-text)" }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        <p className="pb-5 pr-8 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="faq" className="py-24 lg:py-36" ref={ref} style={{ background: "var(--color-bg-alt)" }}>
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-label mb-4">Questions</p>
                    <h2 className="serif title-flourish text-4xl md:text-5xl font-light" style={{ color: "var(--color-text)" }}>
                        Frequently Asked <em className="grad-em">Questions</em>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            q={faq.q}
                            a={faq.a}
                            isOpen={open === i}
                            onToggle={() => setOpen(open === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
