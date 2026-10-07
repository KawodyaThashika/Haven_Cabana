// ============================================================
// HAVEN — SITE CONFIGURATION
// Replace values below with actual Haven details
// ============================================================

export const siteConfig = {
    name: "Haven",
    tagline: "A peaceful place to escape and relax",
    heroTagline: "Find Your Haven.",
    description:
        "Discover Haven, a unique A-frame cabana in Sri Lanka designed for couples, families and travelers looking for a peaceful and unforgettable escape.",

    // ── Contact ─────────────────────────────────────────────
    whatsappNumber: "94XXXXXXXXX", // Replace with owner's WhatsApp number (no + or spaces)
    phone: "+94 XX XXX XXXX",       // Replace with owner's phone number
    email: "hello@havencabana.lk",  // Replace with owner's email

    // ── Location ─────────────────────────────────────────────
    location: "YOUR HAVEN LOCATION, Sri Lanka", // Replace with actual location
    googleMapsUrl: "https://maps.google.com",   // Replace with actual Google Maps link
    directionsUrl: "https://maps.google.com",   // Replace with actual directions link

    // ── Social Media ─────────────────────────────────────────
    instagram: "https://instagram.com/havencabana", // Replace with actual Instagram URL
    facebook: "https://facebook.com/havencabana",  // Replace with actual Facebook URL

    // ── Policy ────────────────────────────────────────────────
    checkInTime: "2:00 PM",   // Replace with actual check-in time
    checkOutTime: "11:00 AM",  // Replace with actual check-out time

    // ── Amenities (set to true only when confirmed) ────────────
    hasWifi: false, // Set to true when confirmed
    hasAC: false, // Set to true when confirmed
    hasParking: false, // Set to true when confirmed
    hasBreakfast: false, // Breakfast is not included in packages
    hasPool: false, // No swimming pool
};

export type SiteConfig = typeof siteConfig;
