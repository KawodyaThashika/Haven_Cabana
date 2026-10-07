// ============================================================
// HAVEN — PRICE CALCULATOR UTILITY
// ============================================================

import { HavenPackage } from "../data/packages";

export interface PriceBreakdown {
    packageName: string;
    pricePerNight: number;
    nights: number;
    total: number;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / msPerDay));
}

export function calculatePrice(pkg: HavenPackage, nights: number): PriceBreakdown {
    return {
        packageName: pkg.name,
        pricePerNight: pkg.pricePerNight,
        nights,
        total: pkg.pricePerNight * nights,
    };
}

export function formatCurrency(amount: number): string {
    return `Rs. ${amount.toLocaleString("en-LK")}`;
}
