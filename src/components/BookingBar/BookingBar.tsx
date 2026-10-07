import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Package, ChevronDown } from "lucide-react";
import { usePackages } from "../../data/packages";
import { useBlockedDates, isRangeAvailable } from "../../data/availability";
import { parseDateInput } from "../../utils/dates";
import { format } from "date-fns";

interface BookingBarProps {
    onSearch: (data: { checkIn: Date; checkOut: Date; guests: number; packageId: string }) => void;
}

export default function BookingBar({ onSearch }: BookingBarProps) {
    const packages = usePackages();
    const blocked = useBlockedDates();
    const [notice, setNotice] = useState("");
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [guests, setGuests] = useState(2);
    const [pkgId, setPkgId] = useState(packages[0]?.id || "");

    const toInputValue = (d: Date) => format(d, "yyyy-MM-dd");

    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            <motion.div
                className="glass rounded-none shadow-2xl shadow-black/20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {/* Check-in */}
                        <div className="flex flex-col gap-1.5">
                            <label className="flex items-center gap-2 section-label">
                                <Calendar size={12} />
                                Check-in
                            </label>
                            <input
                                type="date"
                                value={toInputValue(checkIn)}
                                min={toInputValue(today)}
                                onChange={(e) => { const d = parseDateInput(e.target.value); if (d) { setCheckIn(d); setNotice(""); } }}
                                className="haven-input"
                                style={{ colorScheme: "auto" }}
                            />
                        </div>

                        {/* Check-out */}
                        <div className="flex flex-col gap-1.5">
                            <label className="flex items-center gap-2 section-label">
                                <Calendar size={12} />
                                Check-out
                            </label>
                            <input
                                type="date"
                                value={toInputValue(checkOut)}
                                min={toInputValue(checkIn)}
                                onChange={(e) => { const d = parseDateInput(e.target.value); if (d) { setCheckOut(d); setNotice(""); } }}
                                className="haven-input"
                                style={{ colorScheme: "auto" }}
                            />
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col gap-1.5">
                            <label className="flex items-center gap-2 section-label">
                                <Users size={12} />
                                Guests
                            </label>
                            <div className="relative">
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="haven-input appearance-none pr-8 w-full"
                                >
                                    {[1, 2, 3, 4].map((n) => (
                                        <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
                            </div>
                        </div>

                        {/* Package */}
                        <div className="flex flex-col gap-1.5">
                            <label className="flex items-center gap-2 section-label">
                                <Package size={12} />
                                Package
                            </label>
                            <div className="relative">
                                <select
                                    value={pkgId}
                                    onChange={(e) => setPkgId(e.target.value)}
                                    className="haven-input appearance-none pr-8 w-full"
                                >
                                    <option value="">Any Package</option>
                                    {packages.map((p) => (
                                        <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    {notice && <p className="mt-4 text-xs text-red-400 text-center sm:text-right">{notice}</p>}
                    <div className="mt-6 flex justify-center sm:justify-end">
                        <motion.button
                            onClick={() => {
                                if (checkOut <= checkIn) { setNotice("Check-out must be after check-in."); return; }
                                if (!isRangeAvailable(checkIn, checkOut, blocked)) {
                                    setNotice("Sorry, those dates are already booked. Please try different dates.");
                                    return;
                                }
                                setNotice("");
                                onSearch({ checkIn, checkOut, guests, packageId: pkgId });
                            }}
                            className="btn-primary w-full sm:w-auto text-xs justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Check Availability
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
