// ============================================================
// HAVEN — PACKAGE DATA
// Initial package prices as specified by the owner.
// Admin can override via LocalStorage.
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

const STORAGE_KEY = "haven_packages";

export function getPackages(): HavenPackage[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored) as HavenPackage[];
    } catch {
        // fallback to defaults
    }
    return defaultPackages;
}

export function savePackages(packages: HavenPackage[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}
