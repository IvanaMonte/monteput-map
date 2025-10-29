import React, { useState, useEffect, useRef } from "react";
import MyMapSVG from "../assets/map1.svg?react";
import { SEGMENT_IDS, TABLE_DATA } from "../data/svgMapData";
import SegmentPopup from "./SegmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeBox from "./QrCodeBox";
import montePutLogo from "../assets/monteput-logo.svg";

export default function InteractiveMap() {
  const [activeSegment, setActiveSegment] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Crnogorski");

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

    const listeners = [];

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

        listeners.push({ el, onEnter, onLeave, onClick });
      });
    });

    // 🔁 Clean-up — sprečava gubljenje klikova i višestruke evente
    return () => {
      listeners.forEach(({ el, onEnter, onLeave, onClick }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("click", onClick);
      });
    };
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
  if (key === activeSegment) {
    // ✅ Aktivni segment - lagano posvijetli, zadrži boju
    el.style.filter = "brightness(1.3)";
    el.style.opacity = "1";
    el.style.strokeWidth = "6px";
  } else {
    // ❌ Ostali segmenti - zatamni, deluju "disabled"
    el.style.filter = "brightness(0.4)";
    el.style.opacity = "0.5";
    el.style.strokeWidth = "2px";
  }
} else if (hovered === key) {
  // 🟡 Hover (kad ništa nije aktivno)
  el.style.filter = "brightness(1.2)";
  el.style.opacity = "1";
  el.style.strokeWidth = "4px";
} else {
  // 🔵 Normalno stanje
  el.style.filter = "";
  el.style.opacity = "1";
  el.style.strokeWidth = "2px";
}
      });
    });
  }, [activeSegment, hovered]);

  // === Zoom (točkić) ===
  const handleWheel = (e) => {
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
        // === Zatvaranje popup-a klikom van segmenta ===
   useEffect(() => {
        const handleOutsideClick = (e) => {
          // ako nema aktivnog popup-a, ništa ne radi
          if (!activeSegment) return;

          // ako je kliknut unutar popup-a ili QR kutije — ignoriši
          const popup = document.querySelector(".popup-container");
          if (popup && popup.contains(e.target)) return;

          // ako je kliknut unutar SVG segmenta — ignoriši (da se ne zatvori odmah)
          const svg = svgRef.current;
          if (svg && svg.contains(e.target)) {
            const clickedSegment = Object.values(SEGMENT_IDS)
              .flat()
              .some((id) => e.target.closest(`#${CSS.escape(id)}`));
            if (clickedSegment) return;
          }

          // inače, zatvori popup
          setActiveSegment(null);
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
      }, [activeSegment]);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* HEADER */}
<header className="fixed top-0 left-0 w-full h-[45px] bg-white shadow-sm border-b border-gray-200 z-50 flex items-center justify-between px-5">
  {/* Lijevo – logo */}
  <img
    src={montePutLogo}
    alt="Monteput Logo"
    className="h-5 sm:h-6 object-contain"
  />

  {/* Desno – jezički toggle */}
  <div className="relative flex items-center bg-gray-100 rounded-full px-[3px] py-[2px] shadow-inner w-[105px] h-[26px]">
    {/* Klizni indikator */}
    <div
      className={`absolute top-[2px] bottom-[2px] rounded-full transition-all duration-300 ease-in-out shadow-md shadow-gray-400/50 ${
        selectedLanguage === "Crnogorski"
          ? "left-[3px] w-[50px] bg-gray-400"
          : "right-[3px] w-[50px] bg-gray-400"
      }`}
    />
    {/* Dugmad */}
    <button
      onClick={() => setSelectedLanguage("Crnogorski")}
      className={`relative z-10 px-2 text-[10px] font-medium rounded-full transition-all duration-300 ${
        selectedLanguage === "Crnogorski"
          ? "text-white"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      Srpski
    </button>
    <button
      onClick={() => setSelectedLanguage("English")}
      className={`relative z-10 px-2 text-[10px] font-medium rounded-full transition-all duration-300 ${
        selectedLanguage === "English"
          ? "text-white"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      English
    </button>
  </div>
</header>




      {/* MAPA */}
      <main
        className="flex-1 mt-[70px] sm:mt-[80px] md:mt-[40px] flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
    // === Pan kontrola ===
    if (isPanning) {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
      return; // ako panujemo, ne treba tooltip
    }

    // === Tooltip praćenje ===
    const rect = e.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 2290 1280"
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

          {/* QR kod */}
          <div className="absolute bottom-6 right-6 z-50 hidden md:block">
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
