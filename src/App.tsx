import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";

function AppContent() {
  // Initialize theme on mount
  useTheme();

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