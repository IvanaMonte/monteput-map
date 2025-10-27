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

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Hover/klik efekti
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
    <div className="relative w-full h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="font-semibold text-lg text-gray-800">Monteput</h1>
      </header>

      <div className="flex-1 relative overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 4152.48 3650.22"
          className="w-full h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: activeSegment ? "scale(1.1)" : "scale(1)",
            transformOrigin: "center",
          }}
        >
          <MyMapSVG />
        </svg>

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

        {activeSegment && (
          <SegmentPopup
            segmentKey={activeSegment}
            onClose={() => setActiveSegment(null)}
          />
        )}
      </div>
    </div>
  );
}
