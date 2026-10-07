import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import BookingBar from "../../components/BookingBar/BookingBar";
// import Marquee from "../../components/Marquee/Marquee";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import Experience from "../../components/Experience/Experience";
import Packages from "../../components/Packages/Packages";
import Gallery from "../../components/Gallery/Gallery";
import TravelSection from "../../components/TravelSection/TravelSection";
import Location from "../../components/Location/Location";
import Reviews from "../../components/Reviews/Reviews";
import FAQ from "../../components/FAQ/FAQ";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import BookingModal from "../../components/Booking/BookingModal";
import WhatsAppFloat from "../../components/Contact/WhatsAppFloat";

export default function Home() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<string | undefined>();

    const openBooking = (pkgId?: string) => {
        setSelectedPackage(pkgId);
        setBookingOpen(true);
    };

    const handleExplore = () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar onBookNow={() => openBooking()} />

            {/* Hero + Booking bar */}
            <div className="relative">
                <Hero onBookNow={() => openBooking()} onExplore={handleExplore} />
                <div className="relative z-10 -mt-24 pb-10 pt-0">
                    <BookingBar onSearch={(data) => openBooking(data.packageId)} />
                </div>
            </div>

            {/* <Marquee /> */}

            <About />
            <Features />
            <Experience />
            <Packages onSelectPackage={(id) => openBooking(id)} />
            <Gallery />
            <TravelSection onPlanStay={() => openBooking()} />
            <Location />
            <Reviews />
            <FAQ />
            <Contact />
            <Footer />

            {/* Booking modal */}
            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                initialPackageId={selectedPackage}
            />

            {/* Floating WhatsApp button — mobile only */}
            <WhatsAppFloat />
        </motion.div>
    );
}
