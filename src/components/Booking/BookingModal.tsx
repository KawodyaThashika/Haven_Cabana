import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ArrowRight, Check } from "lucide-react";
import { format } from "date-fns";
import { useBooking } from "../../hooks/useBooking";
import { getPackages } from "../../data/packages";
import { formatCurrency } from "../../utils/priceCalculator";
import { generateWhatsAppMessage, openWhatsApp } from "../../utils/whatsapp";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPackageId?: string;
}

const inputClass = "haven-input";

export default function BookingModal({ isOpen, onClose, initialPackageId }: BookingModalProps) {
    const { state, packages, updateField, goToSummary, goBack, markSent, reset } = useBooking(initialPackageId);
    const { formData, selectedPackage, nights, priceBreakdown, errors, step } = state;

    const countries = [
        "Sri Lanka", "United Kingdom", "Australia", "Germany", "France", "India", "Singapore",
        "United States", "Canada", "Netherlands", "Japan", "South Korea", "Other",
    ];

    const handleClose = () => { reset(); onClose(); };

    const handleConfirm = () => {
        if (!selectedPackage || !formData.checkIn || !formData.checkOut || !priceBreakdown) return;
        const msg = generateWhatsAppMessage({
            guestName: formData.guestName,
            whatsapp: formData.whatsapp,
            email: formData.email,
            country: formData.country,
            packageName: selectedPackage.name,
            guests: formData.guests,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            nights,
            pricePerNight: selectedPackage.pricePerNight,
            totalPrice: priceBreakdown.total,
        });
        openWhatsApp(msg);
        markSent();
    };

    const toVal = (d: Date | null) => d ? format(d, "yyyy-MM-dd") : "";
    const today = format(new Date(), "yyyy-MM-dd");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
                            <div className="flex items-center gap-3">
                                {step === "summary" && (
                                    <button onClick={goBack} className="mr-2" style={{ color: "var(--color-text-muted)" }}>
                                        <ChevronLeft size={18} />
                                    </button>
                                )}
                                <div>
                                    <p className="section-label">Haven</p>
                                    <h2 className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>
                                        {step === "form" && "Book Your Stay"}
                                        {step === "summary" && "Booking Summary"}
                                        {step === "sent" && "Request Sent!"}
                                    </h2>
                                </div>
                            </div>
                            <button onClick={handleClose} style={{ color: "var(--color-text-muted)" }} className="hover:opacity-70 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {/* ── FORM STEP ─────────────────────────────────── */}
                                {step === "form" && (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        {/* Guest details */}
                                        <div>
                                            <p className="section-label mb-4">Guest Details</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Full Name *</label>
                                                    <input className={inputClass} placeholder="John Doe" value={formData.guestName}
                                                        onChange={(e) => updateField("guestName", e.target.value)} />
                                                    {errors.guestName && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.guestName}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>WhatsApp Number *</label>
                                                    <input className={inputClass} placeholder="+94 XX XXX XXXX" value={formData.whatsapp}
                                                        onChange={(e) => updateField("whatsapp", e.target.value)} />
                                                    {errors.whatsapp && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Email *</label>
                                                    <input className={inputClass} type="email" placeholder="your@email.com" value={formData.email}
                                                        onChange={(e) => updateField("email", e.target.value)} />
                                                    {errors.email && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Country *</label>
                                                    <select className={inputClass} value={formData.country}
                                                        onChange={(e) => updateField("country", e.target.value)}>
                                                        <option value="">Select country</option>
                                                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                    {errors.country && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.country}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stay details */}
                                        <div>
                                            <p className="section-label mb-4">Stay Details</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Package *</label>
                                                    <select className={inputClass} value={formData.packageId}
                                                        onChange={(e) => updateField("packageId", e.target.value)}>
                                                        <option value="">Select package</option>
                                                        {packages.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                    {errors.packageId && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.packageId}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Guests *</label>
                                                    <input className={inputClass} type="number" min={1} max={4} value={formData.guests}
                                                        onChange={(e) => updateField("guests", Number(e.target.value))} />
                                                    {errors.guests && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.guests}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Check-in *</label>
                                                    <input className={inputClass} type="date" min={today} value={toVal(formData.checkIn)}
                                                        onChange={(e) => updateField("checkIn", new Date(e.target.value))}
                                                        style={{ colorScheme: "auto" }} />
                                                    {(errors as any).checkIn && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{(errors as any).checkIn}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>Check-out *</label>
                                                    <input className={inputClass} type="date" min={toVal(formData.checkIn) || today} value={toVal(formData.checkOut)}
                                                        onChange={(e) => updateField("checkOut", new Date(e.target.value))}
                                                        style={{ colorScheme: "auto" }} />
                                                    {(errors as any).checkOut && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{(errors as any).checkOut}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price preview */}
                                        {priceBreakdown && nights > 0 && (
                                            <div className="p-5 border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-alt)" }}>
                                                <p className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>
                                                    {selectedPackage?.name} · {formatCurrency(selectedPackage!.pricePerNight)} × {nights} night{nights > 1 ? "s" : ""}
                                                </p>
                                                <p className="serif text-3xl" style={{ color: "var(--color-accent-text)" }}>
                                                    Total: {formatCurrency(priceBreakdown.total)}
                                                </p>
                                            </div>
                                        )}

                                        <motion.button
                                            onClick={goToSummary}
                                            className="btn-primary w-full justify-center text-xs"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Review Summary <ArrowRight size={14} />
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* ── SUMMARY STEP ──────────────────────────────── */}
                                {step === "summary" && priceBreakdown && selectedPackage && formData.checkIn && formData.checkOut && (
                                    <motion.div
                                        key="summary"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-6 border" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-alt)" }}>
                                            <p className="section-label mb-6 text-center tracking-widest">Haven — Booking Summary</p>
                                            {[
                                                ["Guest", formData.guestName],
                                                ["Package", selectedPackage.name],
                                                ["Guests", String(formData.guests)],
                                                ["Check-in", format(formData.checkIn, "dd MMM yyyy")],
                                                ["Check-out", format(formData.checkOut, "dd MMM yyyy")],
                                                ["Stay", `${nights} Night${nights > 1 ? "s" : ""}`],
                                                ["Price", `${formatCurrency(selectedPackage.pricePerNight)} / Night`],
                                            ].map(([k, v]) => (
                                                <div key={k} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
                                                    <span className="text-xs tracking-widest uppercase font-sans" style={{ color: "var(--color-text-muted)" }}>{k}</span>
                                                    <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{v}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-5">
                                                <span className="text-xs tracking-widest uppercase font-sans font-semibold" style={{ color: "var(--color-text-muted)" }}>Total</span>
                                                <span className="serif text-2xl" style={{ color: "var(--color-accent-text)" }}>{formatCurrency(priceBreakdown.total)}</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={handleConfirm}
                                            className="btn-primary w-full justify-center text-xs bg-green-600 hover:bg-green-700 border-green-600"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ background: "#25d366", borderColor: "#25d366", color: "#fff" }}
                                        >
                                            Confirm & Send via WhatsApp
                                        </motion.button>
                                        <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                                            You'll be redirected to WhatsApp with a pre-filled booking message.
                                        </p>
                                    </motion.div>
                                )}

                                {/* ── SENT STEP ─────────────────────────────────── */}
                                {step === "sent" && (
                                    <motion.div
                                        key="sent"
                                        className="text-center py-10"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                            style={{ background: "#25d366" }}>
                                            <Check size={28} color="white" />
                                        </div>
                                        <h3 className="serif text-3xl font-light mb-3" style={{ color: "var(--color-text)" }}>
                                            Request Sent!
                                        </h3>
                                        <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "var(--color-text-muted)" }}>
                                            Your booking request has been sent via WhatsApp. Haven will confirm your reservation shortly.
                                        </p>
                                        <motion.button
                                            onClick={handleClose}
                                            className="btn-outline mt-8 text-xs"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            Close
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
