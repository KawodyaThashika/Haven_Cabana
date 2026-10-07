// ============================================================
// HAVEN — IMAGE URLS
// Replace the placeholder URLs below with real Haven photos.
// All images sourced from Unsplash (free to use for development).
// ============================================================

export const images = {
    // ── Hero (Full-screen background) ─────────────────────────
    // Replace with: A stunning A-frame exterior shot at golden hour
    hero: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=80",

    // ── Exterior ──────────────────────────────────────────────
    // Replace with: Wide-angle A-frame cabana exterior
    exterior: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=1200&q=80",

    // ── Exterior 2 ────────────────────────────────────────────
    // Replace with: Another exterior angle / entrance
    exterior2: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",

    // ── Bedroom ───────────────────────────────────────────────
    // Replace with: Interior shot of the large comfortable bed
    bedroom: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",

    // ── Bed Close-up ──────────────────────────────────────────
    // Replace with: Close-up of the cozy bed with pillows
    bed: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80",

    // ── Bathroom ──────────────────────────────────────────────
    // Replace with: Private bathroom interior
    bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",

    // ── Rooftop / Upper Mattress Area ─────────────────────────
    // Replace with: Upper-level relaxation space inside the A-frame
    rooftop: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",

    // ── Nature / Surroundings ─────────────────────────────────
    // Replace with: Lush tropical nature surrounding Haven
    nature: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80",

    // ── Sri Lanka Landscape ───────────────────────────────────
    // Replace with: Scenic Sri Lankan landscape near Haven
    sriLanka: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1920&q=80",

    // ── Couple Experience ─────────────────────────────────────
    // Replace with: Couple enjoying their stay at Haven
    couple: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",

    // ── Family Experience ─────────────────────────────────────
    // Replace with: Family enjoying their stay at Haven
    family: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",

    // ── About Section ─────────────────────────────────────────
    // Replace with: Warm welcoming shot of Haven
    about: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",

    // ── Sri Lanka Travel Cards ────────────────────────────────
    travel: {
        beaches: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        mountains: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
        waterfalls: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=800&q=80",
        wildlife: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
        culture: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        food: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        adventure: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    },

    // ── Gallery ───────────────────────────────────────────────
    // Replace each with real Haven photographs
    gallery: [
        { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80", alt: "Haven A-Frame Exterior", category: "haven" },
        { src: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&q=80", alt: "Cabana Exterior View", category: "haven" },
        { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Cozy Bedroom Interior", category: "interior" },
        { src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80", alt: "Comfortable Bed", category: "interior" },
        { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", alt: "Private Bathroom", category: "interior" },
        { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", alt: "Upper Relaxation Area", category: "interior" },
        { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", alt: "Tropical Nature", category: "nature" },
        { src: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80", alt: "Lush Surroundings", category: "nature" },
        { src: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80", alt: "Sri Lankan Landscape", category: "nature" },
        { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Couple Getaway", category: "experience" },
        { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", alt: "Family Getaway", category: "experience" },
        { src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", alt: "Peaceful Outdoor Relaxation", category: "experience" },
    ],
};

export type ImageKey = keyof typeof images;
