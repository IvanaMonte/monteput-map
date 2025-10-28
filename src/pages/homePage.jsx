// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InteractiveMap from "../components/InteractiveMap";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Glavni sadržaj */}
      <main className="flex-1 mt-[100px] flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-[1600px]">
          <InteractiveMap />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
