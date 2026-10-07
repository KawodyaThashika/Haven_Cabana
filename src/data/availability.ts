// ============================================================
// HAVEN — AVAILABILITY (live from Firestore)
// Firestore doc: settings/availability  { blockedDates: ["2026-10-12", ...] }
// A date in the list = that NIGHT is booked.
// ============================================================
import { useSyncExternalStore } from "react";
import { doc, onSnapshot, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../lib/firebase";
import { nightsBetween } from "../utils/dates";

const CACHE_KEY = "haven_blocked_cache";
const EMPTY: string[] = [];

function loadCache(): string[] {
    try {
        const s = localStorage.getItem(CACHE_KEY);
        if (s) return JSON.parse(s) as string[];
    } catch { /* ignore */ }
    return EMPTY;
}

let current: string[] = loadCache();
const listeners = new Set<() => void>();

function set(next: string[]) {
    current = next;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    listeners.forEach((l) => l());
}

export const getBlockedDates = () => current;
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
export const useBlockedDates = () => useSyncExternalStore(subscribe, getBlockedDates);

let started = false;
export function startAvailabilitySync() {
    if (started || !db) return;
    started = true;
    onSnapshot(
        doc(db, "settings", "availability"),
        (snap) => set(snap.exists() ? ((snap.data().blockedDates as string[]) ?? []) : []),
        (err) => console.error("Availability sync failed", err)
    );
}

export function isRangeAvailable(checkIn: Date, checkOut: Date, blocked: string[]): boolean {
    const set = new Set(blocked);
    return !nightsBetween(checkIn, checkOut).some((k) => set.has(k));
}

// ── Admin writes (Firestore rules only allow the admin account) ──
export async function setDatesBlocked(dates: string[], blocked: boolean) {
    if (!db) throw new Error("Firebase is not configured");
    if (dates.length === 0) return;
    await setDoc(
        doc(db, "settings", "availability"),
        { blockedDates: blocked ? arrayUnion(...dates) : arrayRemove(...dates) },
        { merge: true }
    );
}
