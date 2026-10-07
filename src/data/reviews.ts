// ============================================================
// HAVEN — SAMPLE REVIEWS
// These are placeholder testimonials. Replace with real reviews.
// ============================================================

export interface Review {
    id: string;
    name: string;
    country: string;
    rating: number;
    text: string;
    avatar?: string;
}

// SAMPLE DATA — Replace with real guest reviews
export const reviews: Review[] = [
    {
        id: "r1",
        name: "Sarah",
        country: "United Kingdom",
        rating: 5,
        text: "Such a beautiful little escape. The A-frame design made the stay feel completely different from a normal hotel. Woke up feeling completely refreshed.",
    },
    {
        id: "r2",
        name: "Kasun",
        country: "Sri Lanka",
        rating: 5,
        text: "Perfect for a peaceful weekend with the family. Loved the unique design and the upper sleeping area — the kids absolutely loved it!",
    },
    {
        id: "r3",
        name: "Emma & James",
        country: "Australia",
        rating: 5,
        text: "We had the most magical romantic getaway here. Completely different from anywhere we've stayed before. Haven is truly special.",
    },
    {
        id: "r4",
        name: "Priya",
        country: "India",
        rating: 5,
        text: "A hidden gem! The triangular cabin was charming and the surroundings were incredibly peaceful. Will definitely be back.",
    },
    {
        id: "r5",
        name: "Michael",
        country: "Germany",
        rating: 5,
        text: "Finally — a stay that lives up to its photos. Cozy, beautiful, and utterly peaceful. Booking was simple through WhatsApp too.",
    },
];
