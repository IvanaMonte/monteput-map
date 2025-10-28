import React, { useState, useEffect, useRef } from "react";
import MyMapSVG from "../assets/map.svg?react";
import { SEGMENT_IDS, TABLE_DATA } from "../data/svgMapData";
import SegmentPopup from "./SegmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeBox from "./QrCodeBox";

// ===== InteractiveMap (bez react-svg-pan-zoom) =====
export default function InteractiveMap() {
  const [activeSegment, setActiveSegment] = useState(null);
  const [hovered, setHovered] = useState(null);

  const svgRef = useRef(null);

  // Zoom & Pan
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;

  // === Aktivacija hover/klik događaja ===
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    Object.entries(SEGMENT_IDS).forEach(([key, ids]) => {
      ids.forEach((id) => {
        const el = svg.querySelector(`#${CSS.escape(id)}`);
        if (!el) return;
        el.style.cursor = "pointer";

        const onEnter = () => setHovered(key);
        const onLeave = () => setHovered(null);
        const onClick = (e) => {
          e.stopPropagation();
          setActiveSegment((prev) => (prev === key ? null : key));
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("click", onClick);
      });
    });
  }, []);

  // === Hover efekti (posvijetli aktivni, potamni ostale) ===
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    Object.entries(SEGMENT_IDS).forEach(([key, ids]) => {
      ids.forEach((id) => {
        const el = svg.querySelector(`#${CSS.escape(id)}`);
        if (!el) return;

        if (activeSegment) {
          el.style.filter =
            key === activeSegment ? "brightness(1.4)" : "brightness(0.5)";
          el.style.strokeWidth = key === activeSegment ? "6px" : "2px";
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

  // === Zoom (točkić) ===
  const handleWheel = (e) => {
    e.preventDefault();
    const scale = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => {
      const next = prev * scale;
      return Math.max(MIN_ZOOM, Math.min(next, MAX_ZOOM));
    });
  };

  // === Pan (klik + povuci) ===
  const handleMouseDown = (e) => {
    setIsPanning(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsPanning(false);

  // === Responsive reset na resize ===
  useEffect(() => {
    const handleResize = () => {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow z-50 flex items-center justify-between px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Monteput
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-base md:text-xl border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Crnogorski
          </button>
          <button className="px-4 py-2 text-base md:text-xl border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            English
          </button>
        </div>
      </header>

      {/* MAPA */}
      <main
        className="flex-1 mt-[100px] flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 1920 1280"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin: "center",
              transition: isPanning ? "none" : "transform 0.2s ease-out",
              cursor: isPanning ? "grabbing" : "grab",
            }}
          >
            <MyMapSVG />
          </svg>

          {/* Tooltip */}
<AnimatePresence>
  {hovered && (
    <motion.div
      key={hovered}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="absolute bg-black/80 text-white text-sm md:text-base font-medium px-4 py-2 rounded-lg shadow-lg pointer-events-none backdrop-blur-sm border border-white/10"
      style={{
        top: "var(--mouse-y)",
        left: "var(--mouse-x)",
        transform: "translate(15px, 15px)",
        whiteSpace: "nowrap",
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

          {/* QR kod u donjem desnom uglu */}
          <div className="absolute bottom-6 right-6 z-50">
            <QrCodeBox url="https://monteput-silk.vercel.app/" />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full h-[60px] bg-white border-t flex items-center justify-center text-gray-600 text-sm fixed bottom-0 left-0">
        © {new Date().getFullYear()} Monteput d.o.o. Sva prava zadržana.
      </footer>
    </div>
  );
}
