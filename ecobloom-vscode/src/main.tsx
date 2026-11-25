
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EcoBloom from "./EcoBloom";
import Navbar from "./components/Navbar";
import UpcyclingIdeas from "./pages/UpcyclingIdeas";
import RecyclingGuide from "./pages/RecyclingGuide";

function ComingSoon({ title }: { title: string }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFF9ED",
        padding: "160px 24px 60px",
        textAlign: "center",
        color: "#183D2D",
        boxSizing: "border-box",
      }}
    >
      <h1>{title}</h1>
      <p>Something beautiful is growing here. 🌱</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<EcoBloom />} />
       <Route path="/ideas" element={<UpcyclingIdeas />} />
      <Route path="/recycling" element={<RecyclingGuide />} />
        />
        <Route
          path="/marketplace"
          element={<ComingSoon title="Marketplace" />}
        />
        <Route
          path="/quiz"
          element={<ComingSoon title="Sustainability Quiz" />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
