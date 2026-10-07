import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import { startPackagesSync } from "./data/packages";
import { startAvailabilitySync } from "./data/availability";

function AppContent() {
  // Initialize theme on mount
  useTheme();

  // Live data from Firestore (packages + booked dates)
  useEffect(() => {
    startPackagesSync();
    startAvailabilitySync();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return <AppContent />;
}