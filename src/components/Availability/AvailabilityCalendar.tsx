import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, startOfMonth, getDaysInMonth, format } from "date-fns";
import { toKey } from "../../utils/dates";

interface Props {
    blocked: string[];
    /** Admin mode: clicking a day calls this. Omit for read-only (guests). */
    onToggle?: (dateKey: string, currentlyBlocked: boolean) => void;
}

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function AvailabilityCalendar({ blocked, onToggle }: Props) {
    const [month, setMonth] = useState(() => startOfMonth(new Date()));
    const blockedSet = new Set(blocked);
    const todayKey = toKey(new Date());
    const offset = month.getDay();
    const days = getDaysInMonth(month);
    const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

    return (
        <div className="border p-4 w-full" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
            <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={() => setMonth(addMonths(month, -1))} className="p-1 hover:opacity-70" style={{ color: "var(--color-text)" }}>
                    <ChevronLeft size={16} />
                </button>
                <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{format(month, "MMMM yyyy")}</p>
                <button type="button" onClick={() => setMonth(addMonths(month, 1))} className="p-1 hover:opacity-70" style={{ color: "var(--color-text)" }}>
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {WEEK.map((w) => (
                    <div key={w} className="text-[10px] tracking-widest uppercase py-1" style={{ color: "var(--color-text-muted)" }}>{w}</div>
                ))}
                {cells.map((day, i) => {
                    if (day === null) return <div key={`e${i}`} />;
                    const key = toKey(new Date(month.getFullYear(), month.getMonth(), day));
                    const isBlocked = blockedSet.has(key);
                    const isPast = key < todayKey;
                    const clickable = !!onToggle && !(isPast && !isBlocked);
                    return (
                        <button
                            key={key}
                            type="button"
                            disabled={!clickable}
                            onClick={() => onToggle?.(key, isBlocked)}
                            title={isBlocked ? "Booked" : isPast ? "" : "Available"}
                            className={`h-9 text-xs transition ${clickable ? "hover:opacity-80" : "cursor-default"} ${isBlocked ? "line-through" : ""}`}
                            style={{
                                background: isBlocked ? "rgba(239,68,68,0.22)" : "transparent",
                                color: isBlocked ? "#f87171" : isPast ? "var(--color-text-muted)" : "var(--color-text)",
                                opacity: isPast && !isBlocked ? 0.4 : 1,
                                border: key === todayKey ? "1px solid var(--color-gold)" : "1px solid transparent",
                            }}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-4 mt-3 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3" style={{ background: "rgba(239,68,68,0.35)" }} /> Booked</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 border" style={{ borderColor: "var(--color-border)" }} /> Available</span>
                {onToggle && <span className="ml-auto">Click a date to toggle</span>}
            </div>
        </div>
    );
}
