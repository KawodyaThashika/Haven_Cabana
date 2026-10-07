// ============================================================
// HAVEN — WHATSAPP MESSAGE GENERATOR
// ============================================================

import { siteConfig } from "../config/siteConfig";
import { formatCurrency } from "./priceCalculator";
import { format } from "date-fns";

export interface BookingDetails {
    guestName: string;
    whatsapp: string;
    email: string;
    country: string;
    packageName: string;
    guests: number;
    checkIn: Date;
    checkOut: Date;
    nights: number;
    pricePerNight: number;
    totalPrice: number;
}

export function generateWhatsAppMessage(booking: BookingDetails): string {
    return `Hello! I would like to book a stay at Haven.

Guest Name: ${booking.guestName}
WhatsApp: ${booking.whatsapp}
Email: ${booking.email}
Country: ${booking.country}

Package: ${booking.packageName}
Guests: ${booking.guests}

Check-in: ${format(booking.checkIn, "dd MMM yyyy")}
Check-out: ${format(booking.checkOut, "dd MMM yyyy")}
Nights: ${booking.nights}

Price per Night: ${formatCurrency(booking.pricePerNight)}
Total Price: ${formatCurrency(booking.totalPrice)}

Please confirm the availability.

Thank you!`;
}

export function openWhatsApp(message: string): void {
    // WhatsApp number comes from siteConfig — never hardcoded in components
    const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
}

export function openWhatsAppDefault(): void {
    const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${number}`, "_blank");
}
