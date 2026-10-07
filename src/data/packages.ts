import { useSyncExternalStore } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// ============================================================
// HAVEN — PACKAGE DATA
// Initial package prices as specified by the owner.
// Live prices/details are loaded from Firestore (settings/packages).
// ============================================================

export interface HavenPackage {
    id: string;
    name: string;
    emoji: string;
    guests: number;
    pricePerNight: number;
    twoNightPrice: number;
    foodIncluded: boolean;
    description: string;
    features: string[];
}

export const defaultPackages: HavenPackage[] = [
    {
        id: "couple",
        name: "Couple Package",
        emoji: "❤️",
        guests: 2,
        pricePerNight: 10000,
        twoNightPrice: 20000,
        foodIncluded: false,
        description: "A cozy escape for two. Perfect for romantic getaways.",
        features: [
            "Up to 2 guests",
            "Large comfortable bed",
            "Private bathroom",
            "Upper relaxation area",
            "Peaceful environment",
        ],
    },
    {
        id: "family",
        name: "Family Package",
        emoji: "👨‍👩‍👧‍👦",
        guests: 4,
        pricePerNight: 15000,
        twoNightPrice: 30000,
        foodIncluded: false,
        description: "A comfortable getaway for the whole family.",
        features: [
            "Up to 4 guests",
            "Large comfortable bed",
            "Upper mattress area",
            "Private bathroom",
            "Family-friendly environment",
        ],
    },
];

const STORAGE_KEY = "haven_packages"; // local cache of the last known live data

function loadCache(): HavenPackage[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored) as HavenPackage[];
    } catch {
        // fallback to defaults
    }
    return defaultPackages;
}

let current: HavenPackage[] = loadCache();
const listeners = new Set<() => void>();

function setCurrent(next: HavenPackage[]) {
    current = next;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    listeners.forEach((l) => l());
}

export function getPackages(): HavenPackage[] {
    return current;
}

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

/** React hook: re-renders whenever packages change (live). */
export const usePackages = () => useSyncExternalStore(subscribe, getPackages);

let started = false;
export function startPackagesSync() {
    if (started || !db) return;
    started = true;
    onSnapshot(
        doc(db, "settings", "packages"),
        (snap) => {
            if (snap.exists()) setCurrent((snap.data().items as HavenPackage[]) ?? defaultPackages);
        },
        (err) => console.error("Packages sync failed", err)
    );
}

/** Admin only (Firestore rules enforce this). */
export async function savePackages(packages: HavenPackage[]): Promise<void> {
    if (!db) throw new Error("Firebase is not configured");
    await setDoc(doc(db, "settings", "packages"), { items: packages });
}
