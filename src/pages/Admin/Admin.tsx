import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    LayoutDashboard, Calendar, Package, Settings, Image, LogOut,
    Search, Filter, Eye, CheckCircle, XCircle, Clock, TrendingUp,
    Users, DollarSign, Home, Edit2, Save, X, ChevronDown
} from "lucide-react";
import { format } from "date-fns";
import { getPackages, savePackages, defaultPackages, HavenPackage } from "../../data/packages";
import { formatCurrency } from "../../utils/priceCalculator";
import { images as imageData } from "../../data/images";
import { siteConfig } from "../../config/siteConfig";

// ── Auth ────────────────────────────────────────────────────
const ADMIN_PASSWORD = "haven2024"; // Demo only — not real security
const AUTH_KEY = "haven_admin_auth";

// ── Sample booking data ────────────────────────────────────
const BOOKINGS_KEY = "haven_bookings";

interface Booking {
    id: string;
    guestName: string;
    whatsapp: string;
    email: string;
    country: string;
    packageId: string;
    packageName: string;
    guests: number;
    checkIn: string;
    checkOut: string;
    nights: number;
    total: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    createdAt: string;
}

function getSampleBookings(): Booking[] {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    if (stored) return JSON.parse(stored);
    // Seed with sample data
    const samples: Booking[] = [
        { id: "HVN001", guestName: "Sarah Johnson", whatsapp: "+447911123456", email: "sarah@email.com", country: "United Kingdom", packageId: "couple", packageName: "Couple Package", guests: 2, checkIn: "2026-10-12", checkOut: "2026-10-14", nights: 2, total: 20000, status: "confirmed", createdAt: "2026-10-01" },
        { id: "HVN002", guestName: "Kasun Perera", whatsapp: "+94711234567", email: "kasun@email.com", country: "Sri Lanka", packageId: "family", packageName: "Family Package", guests: 4, checkIn: "2026-10-20", checkOut: "2026-10-22", nights: 2, total: 30000, status: "pending", createdAt: "2026-10-02" },
        { id: "HVN003", guestName: "Emma & James", whatsapp: "+61412345678", email: "emma@email.com", country: "Australia", packageId: "couple", packageName: "Couple Package", guests: 2, checkIn: "2026-11-05", checkOut: "2026-11-06", nights: 1, total: 10000, status: "pending", createdAt: "2026-10-03" },
        { id: "HVN004", guestName: "Priya Sharma", whatsapp: "+919876543210", email: "priya@email.com", country: "India", packageId: "couple", packageName: "Couple Package", guests: 2, checkIn: "2026-09-15", checkOut: "2026-09-17", nights: 2, total: 20000, status: "completed", createdAt: "2026-09-10" },
    ];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(samples));
    return samples;
}

// ── Status badge ────────────────────────────────────────────
function StatusBadge({ status }: { status: Booking["status"] }) {
    const colors: Record<string, string> = {
        pending: "bg-amber-500/20 text-amber-800 dark:text-amber-300",
        confirmed: "bg-green-500/20 text-green-800 dark:text-green-300",
        cancelled: "bg-red-500/20 text-red-800 dark:text-red-300",
        completed: "bg-blue-500/20 text-blue-800 dark:text-blue-300",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${colors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

// ── Login screen ────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [pw, setPw] = useState("");
    const [err, setErr] = useState("");

    const handleLogin = () => {
        if (pw === ADMIN_PASSWORD) { onLogin(); }
        else { setErr("Incorrect password"); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-bg)" }}>
            <motion.div
                className="w-full max-w-sm p-10 border"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="serif text-4xl font-light mb-1 text-center" style={{ color: "var(--color-text)" }}>
                    <span style={{ color: "var(--color-accent-text)" }}>H</span>AVEN
                </p>
                <p className="section-label text-center mb-8">Admin Dashboard</p>
                <div className="space-y-4">
                    <input type="password" className="haven-input" placeholder="Password" value={pw}
                        onChange={(e) => { setPw(e.target.value); setErr(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                    {err && <p className="text-red-600 dark:text-red-400 text-xs">{err}</p>}
                    <button onClick={handleLogin} className="btn-primary w-full justify-center text-xs">
                        Sign In
                    </button>
                </div>
                <p className="text-xs text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
                    Demo password: <span className="font-mono" style={{ color: "var(--color-accent-text)" }}>haven2024</span>
                </p>
                <p className="text-xs text-center mt-2" style={{ color: "var(--color-text-muted)" }}>
                    This is a demo admin — not real security.
                </p>
                <div className="text-center mt-6">
                    <Link to="/" className="text-xs hover:opacity-70 transition" style={{ color: "var(--color-text-muted)" }}>
                        ← Back to Website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

// ── Sidebar ─────────────────────────────────────────────────
const sideLinks = [
    // { id: "overview", label: "Overview", icon: <LayoutDashboard size={17} /> },
    // { id: "bookings", label: "Bookings", icon: <Calendar size={17} /> },
    { id: "packages", label: "Packages", icon: <Package size={17} /> },
    { id: "content", label: "Content", icon: <Settings size={17} /> },
    { id: "images", label: "Images", icon: <Image size={17} /> },
];

// ── Overview stats ──────────────────────────────────────────
function Overview({ bookings }: { bookings: Booking[] }) {
    const total = bookings.length;
    const upcoming = bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length;
    const revenue = bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.total, 0);
    const couples = bookings.filter((b) => b.packageId === "couple").length;
    const families = bookings.filter((b) => b.packageId === "family").length;

    const stats = [
        { label: "Total Bookings", value: total, icon: <Calendar size={20} />, color: "var(--color-accent-text)" },
        { label: "Upcoming", value: upcoming, icon: <Clock size={20} />, color: "#60a5fa" },
        { label: "Est. Revenue", value: formatCurrency(revenue), icon: <TrendingUp size={20} />, color: "#4ade80" },
        { label: "Couple Bookings", value: couples, icon: <Users size={20} />, color: "#f87171" },
        { label: "Family Bookings", value: families, icon: <Users size={20} />, color: "#c084fc" },
    ];

    return (
        <div>
            <h2 className="serif text-2xl font-light mb-8" style={{ color: "var(--color-text)" }}>Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        className="p-6 border"
                        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                    >
                        <div style={{ color: s.color }} className="mb-3">{s.icon}</div>
                        <p className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>{s.value}</p>
                        <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent bookings preview */}
            <div className="mt-10">
                <h3 className="serif text-xl font-light mb-5" style={{ color: "var(--color-text)" }}>Recent Bookings</h3>
                <div className="overflow-x-auto border" style={{ borderColor: "var(--color-border)" }}>
                    <table className="admin-table w-full" style={{ background: "var(--color-surface)" }}>
                        <thead>
                            <tr>
                                <th>ID</th><th>Guest</th><th>Package</th><th>Check-in</th><th>Total</th><th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.slice(0, 4).map((b) => (
                                <tr key={b.id}>
                                    <td className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{b.id}</td>
                                    <td style={{ color: "var(--color-text)" }}>{b.guestName}</td>
                                    <td style={{ color: "var(--color-text-muted)" }}>{b.packageName}</td>
                                    <td style={{ color: "var(--color-text-muted)" }}>{b.checkIn}</td>
                                    <td style={{ color: "var(--color-accent-text)" }}>{formatCurrency(b.total)}</td>
                                    <td><StatusBadge status={b.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ── Bookings manager ────────────────────────────────────────
function BookingsManager({ bookings, setBookings }: { bookings: Booking[]; setBookings: (b: Booking[]) => void }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [detail, setDetail] = useState<Booking | null>(null);

    const filtered = bookings.filter((b) =>
        (filter === "all" || b.status === filter) &&
        (b.guestName.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase()))
    );

    const updateStatus = (id: string, status: Booking["status"]) => {
        const updated = bookings.map((b) => b.id === id ? { ...b, status } : b);
        setBookings(updated);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
        if (detail?.id === id) setDetail({ ...detail, status });
    };

    return (
        <div>
            <h2 className="serif text-2xl font-light mb-6" style={{ color: "var(--color-text)" }}>Booking Management</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                    <input className="haven-input pl-9" placeholder="Search by name or ID…" value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select className="haven-input w-auto min-w-36" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border" style={{ borderColor: "var(--color-border)" }}>
                <table className="admin-table w-full" style={{ background: "var(--color-surface)" }}>
                    <thead>
                        <tr>
                            <th>ID</th><th>Guest</th><th>Package</th><th>Guests</th>
                            <th>Check-in</th><th>Check-out</th><th>Nights</th><th>Total</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((b) => (
                            <tr key={b.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{b.id}</td>
                                <td className="font-medium" style={{ color: "var(--color-text)" }}>{b.guestName}</td>
                                <td style={{ color: "var(--color-text-muted)" }}>{b.packageName}</td>
                                <td style={{ color: "var(--color-text-muted)" }}>{b.guests}</td>
                                <td style={{ color: "var(--color-text-muted)" }}>{b.checkIn}</td>
                                <td style={{ color: "var(--color-text-muted)" }}>{b.checkOut}</td>
                                <td style={{ color: "var(--color-text-muted)" }}>{b.nights}</td>
                                <td style={{ color: "var(--color-accent-text)" }}>{formatCurrency(b.total)}</td>
                                <td><StatusBadge status={b.status} /></td>
                                <td>
                                    <div className="flex gap-1">
                                        <button onClick={() => setDetail(b)} className="p-1 hover:opacity-70 transition"
                                            style={{ color: "var(--color-text-muted)" }}><Eye size={14} /></button>
                                        {b.status === "pending" && (
                                            <>
                                                <button onClick={() => updateStatus(b.id, "confirmed")} className="p-1 hover:opacity-70" style={{ color: "#4ade80" }}><CheckCircle size={14} /></button>
                                                <button onClick={() => updateStatus(b.id, "cancelled")} className="p-1 hover:opacity-70" style={{ color: "#f87171" }}><XCircle size={14} /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="py-12 text-center" style={{ color: "var(--color-text-muted)" }}>No bookings found.</div>
                )}
            </div>

            {/* Detail modal */}
            <AnimatePresence>
                {detail && (
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="absolute inset-0 bg-black/60" onClick={() => setDetail(null)} />
                        <motion.div className="relative w-full max-w-md p-8 border shadow-2xl"
                            style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="serif text-xl font-light" style={{ color: "var(--color-text)" }}>Booking {detail.id}</h3>
                                <button onClick={() => setDetail(null)} style={{ color: "var(--color-text-muted)" }}><X size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    ["Guest", detail.guestName],
                                    ["WhatsApp", detail.whatsapp],
                                    ["Email", detail.email],
                                    ["Country", detail.country],
                                    ["Package", detail.packageName],
                                    ["Guests", String(detail.guests)],
                                    ["Check-in", detail.checkIn],
                                    ["Check-out", detail.checkOut],
                                    ["Nights", String(detail.nights)],
                                    ["Total", formatCurrency(detail.total)],
                                    ["Status", detail.status],
                                ].map(([k, v]) => (
                                    <div key={k} className="flex justify-between text-sm border-b pb-2" style={{ borderColor: "var(--color-border)" }}>
                                        <span style={{ color: "var(--color-text-muted)" }}>{k}</span>
                                        <span style={{ color: "var(--color-text)" }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-6">
                                {detail.status === "pending" && (
                                    <>
                                        <button onClick={() => updateStatus(detail.id, "confirmed")} className="btn-primary text-xs flex-1 justify-center">Confirm</button>
                                        <button onClick={() => updateStatus(detail.id, "cancelled")} className="btn-outline text-xs flex-1 justify-center" style={{ color: "var(--color-text)", borderColor: "currentColor" }}>Cancel</button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Package manager ─────────────────────────────────────────
function PackageManager() {
    const [pkgs, setPkgs] = useState<HavenPackage[]>(getPackages());
    const [editing, setEditing] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const save = () => {
        savePackages(pkgs);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setEditing(null);
    };

    const reset = () => { setPkgs(defaultPackages); savePackages(defaultPackages); };

    const updatePkg = (id: string, field: keyof HavenPackage, value: unknown) => {
        setPkgs((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>Package Management</h2>
                <div className="flex gap-3">
                    <button onClick={reset} className="btn-outline text-xs" style={{ color: "var(--color-text)" }}>Reset Defaults</button>
                    <button onClick={save} className="btn-primary text-xs">
                        {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save All</>}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {pkgs.map((pkg) => (
                    <div key={pkg.id} className="border p-8" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                {/* <span className="text-3xl">{pkg.emoji}</span> */}
                                <div>
                                    <p className="font-medium" style={{ color: "var(--color-text)" }}>{pkg.name}</p>
                                    <p className="section-label">{pkg.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setEditing(editing === pkg.id ? null : pkg.id)} style={{ color: "var(--color-accent-text)" }}>
                                <Edit2 size={16} />
                            </button>
                        </div>

                        {editing === pkg.id ? (
                            <div className="space-y-4">
                                {[
                                    { label: "Name", field: "name" as const, type: "text" },
                                    { label: "Max Guests", field: "guests" as const, type: "number" },
                                    { label: "Price / Night (Rs.)", field: "pricePerNight" as const, type: "number" },
                                    { label: "2-Night Price (Rs.)", field: "twoNightPrice" as const, type: "number" },
                                    { label: "Description", field: "description" as const, type: "text" },
                                ].map(({ label, field, type }) => (
                                    <div key={field}>
                                        <label className="text-xs mb-1 block" style={{ color: "var(--color-text-muted)" }}>{label}</label>
                                        <input type={type} className="haven-input" value={String(pkg[field])}
                                            onChange={(e) => updatePkg(pkg.id, field, type === "number" ? Number(e.target.value) : e.target.value)} />
                                    </div>
                                ))}
                                <div className="flex items-center gap-3">
                                    <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>Food Included</label>
                                    <input type="checkbox" checked={pkg.foodIncluded}
                                        onChange={(e) => updatePkg(pkg.id, "foodIncluded", e.target.checked)} />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm">
                                {[
                                    ["Max Guests", String(pkg.guests)],
                                    ["Price/Night", formatCurrency(pkg.pricePerNight)],
                                    ["2-Night Price", formatCurrency(pkg.twoNightPrice)],
                                    ["Food", pkg.foodIncluded ? "Included" : "Not Included"],
                                    ["Description", pkg.description],
                                ].map(([k, v]) => (
                                    <div key={k} className="flex justify-between border-b py-1.5" style={{ borderColor: "var(--color-border)" }}>
                                        <span style={{ color: "var(--color-text-muted)" }}>{k}</span>
                                        <span style={{ color: "var(--color-text)" }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Content settings ────────────────────────────────────────
function ContentSettings() {
    const CONTENT_KEY = "haven_content";
    const defaultContent = {
        name: siteConfig.name, tagline: siteConfig.tagline, description: siteConfig.description,
        whatsappNumber: siteConfig.whatsappNumber, phone: siteConfig.phone, email: siteConfig.email,
        location: siteConfig.location, instagram: siteConfig.instagram, facebook: siteConfig.facebook,
        googleMapsUrl: siteConfig.googleMapsUrl,
    };
    const [content, setContent] = useState(() => {
        const stored = localStorage.getItem(CONTENT_KEY);
        return stored ? JSON.parse(stored) : defaultContent;
    });
    const [saved, setSaved] = useState(false);

    const save = () => {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
        setSaved(true); setTimeout(() => setSaved(false), 2000);
    };

    const fields = [
        { label: "Haven Name", key: "name" },
        { label: "Tagline", key: "tagline" },
        { label: "Description", key: "description" },
        { label: "WhatsApp Number (no + or spaces)", key: "whatsappNumber" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Location", key: "location" },
        { label: "Instagram URL", key: "instagram" },
        { label: "Facebook URL", key: "facebook" },
        { label: "Google Maps URL", key: "googleMapsUrl" },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>Content Settings</h2>
                <button onClick={save} className="btn-primary text-xs">
                    {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save</>}
                </button>
            </div>
            <div className="max-w-2xl space-y-5">
                {fields.map(({ label, key }) => (
                    <div key={key}>
                        <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>{label}</label>
                        <input className="haven-input" value={(content as any)[key] || ""}
                            onChange={(e) => setContent((prev: typeof content) => ({ ...prev, [key]: e.target.value }))} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Image settings ──────────────────────────────────────────
function ImageSettings() {
    const IMG_KEY = "haven_images";
    const defaultImgs = {
        hero: imageData.hero, exterior: imageData.exterior, bedroom: imageData.bedroom,
        bathroom: imageData.bathroom, rooftop: imageData.rooftop, nature: imageData.nature,
    };
    const [imgs, setImgs] = useState(() => {
        const stored = localStorage.getItem(IMG_KEY);
        return stored ? JSON.parse(stored) : defaultImgs;
    });
    const [saved, setSaved] = useState(false);

    const save = () => {
        localStorage.setItem(IMG_KEY, JSON.stringify(imgs));
        setSaved(true); setTimeout(() => setSaved(false), 2000);
    };

    const fields = [
        { label: "Hero Image URL", key: "hero" },
        { label: "Exterior Image URL", key: "exterior" },
        { label: "Bedroom Image URL", key: "bedroom" },
        { label: "Bathroom Image URL", key: "bathroom" },
        { label: "Rooftop / Upper Area Image URL", key: "rooftop" },
        { label: "Nature / Surroundings Image URL", key: "nature" },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="serif text-2xl font-light" style={{ color: "var(--color-text)" }}>Image Settings</h2>
                <button onClick={save} className="btn-primary text-xs">
                    {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save</>}
                </button>
            </div>
            <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
                Replace the placeholder URLs below with real Haven image URLs to update the website images.
                Images are stored in LocalStorage for this frontend demo.
            </p>
            <div className="space-y-6">
                {fields.map(({ label, key }) => (
                    <div key={key} className="grid sm:grid-cols-2 gap-4 items-start">
                        <div>
                            <label className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>{label}</label>
                            <input className="haven-input" value={(imgs as any)[key] || ""}
                                onChange={(e) => setImgs((prev: typeof imgs) => ({ ...prev, [key]: e.target.value }))} />
                        </div>
                        <div className="overflow-hidden" style={{ height: "80px" }}>
                            {(imgs as any)[key] && (
                                <img src={(imgs as any)[key]} alt={label} className="w-full h-full object-cover" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main Admin Dashboard ────────────────────────────────────
export default function Admin() {
    const [authenticated, setAuthenticated] = useState(() => !!localStorage.getItem(AUTH_KEY));
    const [activeSection, setActiveSection] = useState("packages");
    // const [bookings, setBookings] = useState<Booking[]>(getSampleBookings());
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogin = () => {
        localStorage.setItem(AUTH_KEY, "1");
        setAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        setAuthenticated(false);
    };

    if (!authenticated) return <LoginScreen onLogin={handleLogin} />;

    return (
        <div className="min-h-screen flex" style={{ background: "var(--color-bg)" }}>
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-60 border-r shrink-0" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-alt)" }}>
                <div className="p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
                    <p className="serif text-2xl font-light tracking-widest" style={{ color: "var(--color-text)" }}>
                        <span style={{ color: "var(--color-accent-text)" }}>H</span>AVEN
                    </p>
                    <p className="section-label mt-0.5">Admin Panel</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {sideLinks.map((link) => (
                        <button key={link.id} onClick={() => setActiveSection(link.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-200 ${activeSection === link.id ? "border-l-2" : "opacity-60 hover:opacity-100"}`}
                            style={{
                                borderColor: activeSection === link.id ? "var(--color-gold)" : "transparent",
                                color: activeSection === link.id ? "var(--color-accent-text)" : "var(--color-text)",
                                background: activeSection === link.id ? "var(--color-border)" : "transparent",
                            }}>
                            {link.icon} {link.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <Link to="/" className="flex items-center gap-2 text-xs mb-2 hover:opacity-70 transition" style={{ color: "var(--color-text-muted)" }}>
                        <Home size={14} /> View Website
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-xs hover:opacity-70 transition" style={{ color: "var(--color-text-muted)" }}>
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {/* Top bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-bg-alt)" }}>
                    <h1 className="serif text-xl font-light" style={{ color: "var(--color-text)" }}>
                        {sideLinks.find((l) => l.id === activeSection)?.label}
                    </h1>
                    <div className="lg:hidden">
                        <select className="haven-input text-xs" value={activeSection} onChange={(e) => setActiveSection(e.target.value)}>
                            {sideLinks.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                        </select>
                    </div>
                </div>

                <div className="p-6 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* {activeSection === "overview" && <Overview bookings={bookings} />}
                            {activeSection === "bookings" && <BookingsManager bookings={bookings} setBookings={setBookings} />} */}
                            {activeSection === "packages" && <PackageManager />}
                            {activeSection === "content" && <ContentSettings />}
                            {activeSection === "images" && <ImageSettings />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
