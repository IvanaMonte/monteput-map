// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow z-50 flex items-center justify-between px-6 md:px-12 py-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Monteput</h1>
      <div className="flex gap-3 md:gap-6">
        <button className="px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          Crnogorski
        </button>
        <button className="px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          English
        </button>
      </div>
    </header>
  );
}
