import React, { useState, useEffect, useRef } from "react";
import MyMapSVG from "../assets/map.svg?react";
import { SEGMENT_IDS, TABLE_DATA } from "../data/svgMapData";
import SegmentPopup from "./SegmentPopup";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveMap() {
  const [activeSegment, setActiveSegment] = useState(null);
  const [hovered, setHovered] = useState(null);
  const svgRef = useRef(null);

  // Inicijalizacija event listenera
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    Object.entries(SEGMENT_IDS).forEach(([key, ids]) => {
      ids.forEach((id) => {
        const el = svg.querySelector(`#${CSS.escape(id)}`);
        if (!el) return;
        el.style.cursor = "pointer";

        el.addEventListener("mouseenter", () => setHovered(key));
        el.addEventListener("mouseleave", () => setHovered(null));
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setActiveSegment((prev) => (prev === key ? null : key));
        });
      });
    });

    const handleOutsideClick = (e) => {
      if (!svg.contains(e.target)) setActiveSegment(null);
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Hover / klik efekti
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    Object.entries(SEGMENT_IDS).forEach(([key, ids]) => {
      ids.forEach((id) => {
        const el = svg.querySelector(`#${CSS.escape(id)}`);
        if (!el) return;

        if (activeSegment) {
          if (key === activeSegment) {
            el.style.filter = "brightness(1.4)";
            el.style.strokeWidth = "6px";
          } else {
            el.style.filter = "brightness(0.5)";
            el.style.strokeWidth = "2px";
          }
        } else if (hovered === key) {
          el.style.filter = "brightness(1.2)";
          el.style.strokeWidth = "4px";
        } else {
          el.style.filter = "";
          el.style.strokeWidth = "";
        }
      });
    });
  }, [activeSegment, hovered]);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* 🔹 HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 md:px-10 py-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Monteput
        </h1>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
            Srpski
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
            English
          </button>
        </div>
      </header>

      {/* 🔹 Mapa */}
      <main className="flex-1 relative mt-[56px] md:mt-[64px] flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center px-2 md:px-8">
          <svg
            ref={svgRef}
            viewBox="0 0 4152.48 3650.22"
            className="w-full h-auto max-w-[90vw] max-h-[80vh]"
            preserveAspectRatio="xMidYMid meet"
            style={{
              transform: activeSegment ? "scale(1.02)" : "scale(1)",
              transformOrigin: "center",
              transition: "transform 0.4s ease",
            }}
          >
            <MyMapSVG />
          </svg>
        </div>

        {/* Hover label */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute bg-black/75 text-white text-xs px-2 py-1 rounded-md pointer-events-none"
              style={{
                top: "var(--mouse-y)",
                left: "var(--mouse-x)",
                transform: "translate(10px, 10px)",
              }}
            >
              {TABLE_DATA[hovered]?.naziv ?? hovered}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup */}
        {activeSegment && (
          <SegmentPopup
            segmentKey={activeSegment}
            onClose={() => setActiveSegment(null)}
          />
        )}
      </main>
    </div>
  );
}
