import React, { useState, useEffect, useRef } from "react";
import MyMapSVG from "../assets/map.svg?react";
import { SEGMENT_IDS, TABLE_DATA } from "../data/svgMapData";
import SegmentPopup from "./SegmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeBox from "./QrCodeBox";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";

export default function InteractiveMap() {
  const [activeSegment, setActiveSegment] = useState(null);
  const [hovered, setHovered] = useState(null);
  const viewerRef = useRef(null);
  const svgRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inicijalizacija path događaja
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
  }, []);

  // Hover efekti
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

  useEffect(() => {
    if (viewerRef.current) viewerRef.current.fitToViewer("center", "center");
  }, [dimensions]);
  useEffect(() => {
  const svg = svgRef.current;
  if (!svg) return;

  console.log("SVG loaded:", svg.querySelectorAll("path").length, "paths found");
  Object.entries(SEGMENT_IDS).forEach(([key, ids]) => {
    ids.forEach((id) => {
      const el = svg.querySelector(`#${CSS.escape(id)}`);
      if (!el) console.warn("Not found:", id);
    });
  });
}, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[160px] bg-white shadow z-50 flex items-center justify-between px-12 py-6">
        <h1 className="text-6xl font-bold text-gray-800">Monteput</h1>
        <div className="flex gap-6">
          <button className="px-8 py-4 text-2xl font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
            Crnogorski
          </button>
          <button className="px-8 py-4 text-2xl font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
            English
          </button>
        </div>
      </header>

      {/* Mapa */}
      <main className="flex-1 relative mt-[160px]">
        <UncontrolledReactSVGPanZoom
          ref={viewerRef}
          width={dimensions.width}
          height={dimensions.height - 160}
          background="#f5f5f5"
          tool="none"
          miniatureProps={{ position: "none" }}
          toolbarProps={{ position: "none" }}
          scaleFactorMin={3}      // ⬅️ ovo sprečava zoom-out ispod 1×
  scaleFactorMax={6}      // ⬅️ možeš zumirati do 6×
 // preventPanOutside={true} // ⬅️ ne možeš pomjeriti mapu van granica
        >
<svg
  ref={svgRef}
  viewBox="0 0 1920 1280"
  preserveAspectRatio="xMidYMid meet"
  className="w-full h-full"
>

            <MyMapSVG />
          </svg>
        </UncontrolledReactSVGPanZoom>


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

        {/* QR kod dolje desno */}
        <div className="absolute bottom-6 right-6 z-50">
          <QrCodeBox url="https://monteput-silk.vercel.app/" />
        </div>
      </main>
    </div>
  );
}
