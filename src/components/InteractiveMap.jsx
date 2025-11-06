import React, { useState, useEffect, useRef } from "react";
import MyMapSVG from "../assets/map1.svg?react";
import { SEGMENT_IDS, TABLE_DATA } from "../data/svgMapData";
import SegmentPopup from "./SegmentPopup";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeBox from "./QrCodeBox";
import montePutLogo from "../assets/monteput-logo.svg";
import { translations } from "../i18n";

export default function InteractiveMap() {
  const [activeSegment, setActiveSegment] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Crnogorski");
  const [showLegendDialog, setShowLegendDialog] = useState(false);

  const svgRef = useRef(null);

  const getResponsiveZoom = () => {
    const width = window.innerWidth;
    if (width < 640) return 2.8;
    if (width < 768) return 1.8;
    if (width < 1024) return 1.6;
    if (width < 1440) return 1.5;
    return 1.3;
  }

  // Zoom & Pan
  const [zoom, setZoom] = useState(getResponsiveZoom());
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // === Dynamic zoom limits based on screen size ===
  const getZoomLimits = () => {
    const width = window.innerWidth;
    if (width < 768) {
      // Mobile: Allow more zooming for better detail viewing
      return { MIN_ZOOM: 2.5, MAX_ZOOM: 5.0 };
    } else {
      // Desktop: Standard zoom range
      return { MIN_ZOOM: 1.2, MAX_ZOOM: 1.9 };
    }
  };

  const { MIN_ZOOM, MAX_ZOOM } = getZoomLimits();

  // === Hide legend by default and manage dialog ===
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Always hide legend elements in the SVG
    const legendSelectors = [
      '#LEGENDA',
      '#legenda',
      '[id*="legend" i]',
      '[id*="legenda" i]',
      '[class*="legend" i]',
      '[class*="legenda" i]',
      'g[id*="Legend" i]',
      'g[id*="Legenda" i]',
      'text[id*="legend" i]',
      'rect[id*="legend" i]'
    ];

    legendSelectors.forEach(selector => {
      const elements = svg.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
      });
    });
  }, []);

  // === Get legend content for dialog ===
  const getLegendContent = () => {
    // Return the exact SVG legend markup you provided
    const svgLegend = `
      <svg width="100%" height="200" viewBox="0 833 329 162" xmlns="http://www.w3.org/2000/svg">
        <style>
          .st61 { fill: #A2A2A3; stroke: #ddd; stroke-width: 1; }
          .st12 { fill: #ffffff; }
          .st62 { font-family: Arial, sans-serif; }
          .st63 { font-size: 12px; }
          .st64 { fill: #FFFFFF; stroke: #3E67B0; stroke-width: 2.4046; stroke-linecap: round; stroke-miterlimit: 10; }
          .st29 { fill: #fff; stroke: #333; stroke-width: 1; }
          .st28 { fill: #CD2656; }
          .st65 { fill: none; stroke: #FCC112; stroke-width: 8.865; stroke-miterlimit: 10; }
          .st66 { fill: none; stroke: #F1F1F2; stroke-width: 1.0217; stroke-miterlimit: 10; }
          .st67 { fill: none; stroke: #CD2656; stroke-width: 8.865; stroke-miterlimit: 10; }
          .st68 { stroke: #f39c12; stroke-width: 2; fill: none; }
          .st69 { fill: none; stroke: #3E67B0; stroke-width: 8.865; stroke-miterlimit: 10; }
        </style>
        <g id="LEGENDA">
          <g>
            <rect y="833.87" class="st61" width="328.68" height="161.04"></rect>
            <g>
              <text transform="matrix(1 0 0 1 77.9498 862.4926)">
                <tspan x="0" y="0" class="st12 st62 st63">A1 - HIGHWAY BAR - BOLJARE</tspan>
                <tspan x="0" y="21.92" class="st12 st62 st63">CONSTRUCTED HIGHWAYS SECTION</tspan>
                <tspan x="0" y="43.83" class="st12 st62 st63">A1 - PLANNED INTERCHANGES</tspan>
                <tspan x="0" y="65.75" class="st12 st62 st63">A2 - ADRIATIC IONIAN HIGHWAY</tspan>
                <tspan x="0" y="87.66" class="st12 st62 st63">PLANNED EXPRESSWAYS</tspan>
                <tspan x="0" y="109.58" class="st12 st62 st63">DIVISION OF SECTIONS</tspan>
              </text>
              <g>
                <circle class="st64" cx="54.48" cy="967.14" r="7.13"></circle>
                <circle class="st29" cx="54.48" cy="967.14" r="4.04"></circle>
              </g>
              <g>
                <circle class="st12" cx="54.48" cy="902.09" r="9.44"></circle>
                <circle class="st28" cx="54.48" cy="902.09" r="5.47"></circle>
              </g>
              <g>
                <line class="st65" x1="40.93" y1="945.63" x2="68.02" y2="945.63"></line>
                <line class="st66" x1="40.93" y1="945.63" x2="68.02" y2="945.63"></line>
              </g>
              <g>
                <line class="st67" x1="40.93" y1="879.99" x2="68.02" y2="879.99"></line>
                <line class="st68" x1="41.52" y1="879.99" x2="68.62" y2="879.99"></line>
              </g>
              <g>
                <line class="st67" x1="40.93" y1="858.45" x2="68.02" y2="858.45"></line>
                <line class="st66" x1="40.93" y1="858.45" x2="68.02" y2="858.45"></line>
              </g>
              <g>
                <line class="st69" x1="40.93" y1="923.51" x2="68.02" y2="923.51"></line>
                <line class="st66" x1="40.93" y1="923.51" x2="68.02" y2="923.51"></line>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgLegend, 'image/svg+xml');
    return svgDoc.documentElement;
  };

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
            // ✅ Aktivni segment
            el.style.transform = "scale(1.0)";
            el.style.transformOrigin = "center";
            el.style.transition = "all 0.2s ease-out";
          } else {
            // ❌ Neaktivni segmenti - potamni i smanji
            el.setAttribute("opacity", "0.5");
            el.setAttribute("stroke-width", "1");
            el.style.filter = "brightness(0.1) grayscale(0.1)";
          }
        } else if (hovered === key) {
          // 🟡 Hover 
          el.setAttribute("opacity", "1");
          el.style.filter = "drop-shadow(0 1px 4px rgba(0,0,0,0.3))"; // Only shadow, no color change
          el.style.transform = "scale(1.02)";
          el.style.transformOrigin = "center";
          el.style.transition = "all 0.2s ease-out";
        } else {
          // 🔵 Normalno stanje - potpuno resetovanje
          el.removeAttribute("fill");
          el.removeAttribute("stroke");
          el.removeAttribute("stroke-width");
          el.removeAttribute("opacity");
          el.style.filter = "";
          el.style.transform = "scale(1)";
        }
      });
    });
  }, [activeSegment, hovered]);

  // === Zoom (točkić) - allow zoom on SVG only ===
  const handleWheel = (e) => {
    e.preventDefault(); // Prevent page scroll when zooming SVG
    const scale = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => {
      const next = prev * scale;
      return Math.max(MIN_ZOOM, Math.min(next, MAX_ZOOM));
    });
  };

  // === Touch zoom and pan for mobile ===
  const [touchDistance, setTouchDistance] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [isTouchPanning, setIsTouchPanning] = useState(false);
  const [lastTouchPos, setLastTouchPos] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Two-finger pinch zoom
      e.preventDefault();
      setIsTouchPanning(false); // Stop any single-finger panning
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      setTouchDistance(distance);
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();

      // Handle double tap - reset to default zoom
      if (now - lastTouchTime < 300) {
        e.preventDefault();
        setZoom(getResponsiveZoom());
        setOffset({ x: 0, y: 0 }); // Also reset position to center
        setIsTouchPanning(false);
      } else {
        // Start single-finger panning
        setIsTouchPanning(true);
        setLastTouchPos({ x: touch.clientX, y: touch.clientY });
      }
      setLastTouchTime(now);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Two-finger pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );

      if (touchDistance > 0) {
        const scale = distance / touchDistance;
        const dampedScale = 1 + (scale - 1) * 0.5; // Dampen the zoom for smoother control
        setZoom((prev) => {
          const next = prev * dampedScale;
          return Math.max(MIN_ZOOM, Math.min(next, MAX_ZOOM));
        });
        setTouchDistance(distance);
      }
    } else if (e.touches.length === 1 && isTouchPanning) {
      // Single-finger panning
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouchPos.x;
      const dy = touch.clientY - lastTouchPos.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastTouchPos({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setTouchDistance(0);
    }
    if (e.touches.length === 0) {
      setIsTouchPanning(false);
    }
  };  // === Pan (klik + povuci) ===
  const handleMouseDown = (e) => {
    setIsPanning(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };



  const handleMouseUp = () => setIsPanning(false);

  // === Mouse move handler for SVG panning ===
  const handleSvgMouseMove = (e) => {
    if (isPanning) {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  // === Responsive reset na resize ===
  useEffect(() => {
    const handleResize = () => {
      setZoom(getResponsiveZoom());
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
      <header className={`fixed top-0 left-0 w-full h-[60px] bg-white shadow-sm border-b border-gray-200 z-50 flex items-center justify-between px-5 transition-transform duration-300 ${activeSegment ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'}`}>
        {/* Lijevo – logo */}
        <img
          src={montePutLogo}
          alt="Monteput Logo"
          className="h-7 sm:h-8 object-contain"
        />

        {/* Jezički toggle */}
        <div className="relative flex items-center bg-gray-100 rounded-full px-[3px] py-[2px] shadow-inner w-[130px] h-[28px]">
          {/* Klizni indikator */}
          <div
            className={`absolute top-[2px] bottom-[2px] rounded-full transition-all duration-300 ease-in-out shadow-md shadow-gray-400/50 
      ${selectedLanguage === "Crnogorski" ? "left-[3px]" : "right-[3px]"} 
      w-[60px] bg-gray-400`}
          />
          {/* Dugmad */}
          <button
            onClick={() => setSelectedLanguage("Crnogorski")}
            className={`relative z-10 flex-1 text-[10px] font-medium rounded-full transition-all duration-300 
      ${selectedLanguage === "Crnogorski" ? "text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            Crnogorski
          </button>
          <button
            onClick={() => setSelectedLanguage("English")}
            className={`relative z-10 flex-1 text-[10px] font-medium rounded-full transition-all duration-300 
      ${selectedLanguage === "English" ? "text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            English
          </button>
        </div>
      </header>

      {/* MAPA */}
      <main
        className={`flex-1 flex items-center justify-center overflow-hidden transition-all duration-300 ${activeSegment ? 'mb-80 md:mb-0 md:mt-[60px]' : 'mt-[80px] sm:mt-[90px] md:mt-[60px]'}`}
        onMouseMove={(e) => {
          // === Tooltip praćenje ===
          if (!isPanning) {
            const rect = e.currentTarget.getBoundingClientRect();
            document.documentElement.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            document.documentElement.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          }
        }}
      >
        <div
          className={`relative w-full h-full flex justify-center map-container transition-all duration-300 ${activeSegment ? 'items-start pt-2 mb-12' : 'items-start pt-4 mb-16'}`}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 2290 1280"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full touch-none"
            onWheel={handleWheel}
            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            // onTouchEnd={handleTouchEnd}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleSvgMouseMove}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
            style={{
              // transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: isPanning ? "none" : "transform 0.2s ease-out",
              cursor: isPanning ? "grabbing" : "grab",
              touchAction: "none",
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
              selectedLanguage={selectedLanguage}   // ⬅️ ovo dodaj
            />
          )}

          {/* QR kod */}
          <div className="absolute bottom-6 right-6 z-50 hidden md:block">
            <QrCodeBox url="https://monteput-map.vercel.app/" />
          </div>
        </div>
      </main>

      {/* Legend Dialog */}
      {showLegendDialog && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-50"
          onClick={() => setShowLegendDialog(false)}
        >
          <div
            className="bg-white shadow-xl w-80 max-h-[70vh] sm:w-auto sm:max-w-md sm:max-h-[80vh] overflow-hidden animate-slide-in-left flex flex-col absolute left-0 top-20 sm:left-0 sm:top-8 rounded-r-lg sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">{translations[selectedLanguage].legendTitle}</h3>
              <button
                onClick={() => setShowLegendDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-4 overflow-y-auto flex-1">
              {(() => {
                const legendContent = getLegendContent();
                if (legendContent) {
                  return (
                    <div className="w-full">
                      <div
                        className="legend-svg-content w-full"
                        dangerouslySetInnerHTML={{
                          __html: legendContent.outerHTML
                        }}
                      />
                    </div>
                  );
                } else {
                  // Manual legend based on the SVG content we found
                  return (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 mb-4">Objašnjenje simbola na mapi:</h4>

                      <div className="space-y-3">
                        {/* A1 Highway */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-1 bg-blue-600 rounded"></div>
                          <span className="text-sm">A1 - Autoput Bar - Boljare</span>
                        </div>

                        {/* Constructed sections */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-1 bg-green-600 rounded"></div>
                          <span className="text-sm">Izgrađene dionice autoputa</span>
                        </div>

                        {/* Planned interchanges */}
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                          <span className="text-sm">A1 - Planirana čvorišta</span>
                        </div>

                        {/* A2 Highway */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-1 bg-purple-600 rounded"></div>
                          <span className="text-sm">A2 - Jadranski jonski autoput</span>
                        </div>

                        {/* Planned expressways */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-1 bg-orange-500 rounded border border-orange-300"></div>
                          <span className="text-sm">Planirane brze saobraćajnice</span>
                        </div>

                        {/* Section divisions */}
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                          <span className="text-sm">Podjela dionica</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                          Kliknite na dionice na mapi za detaljne informacije
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowLegendDialog(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {translations[selectedLanguage].close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full bg-white border-t fixed bottom-0 left-0 z-40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 sm:px-6 sm:h-[60px]">
          {/* Mobile: Centered layout, Desktop: Left aligned */}
          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
            {/* Legend Button */}
            <button
              onClick={() => setShowLegendDialog(true)}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 shadow-sm transition-all duration-200 flex items-center gap-2 text-sm font-medium text-blue-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                />
                <circle cx="9" cy="12" r="1" fill="currentColor" />
                <circle cx="15" cy="12" r="1" fill="currentColor" />
              </svg>
              <span className="font-semibold">  {translations[selectedLanguage].legendButton}</span>
            </button>
          </div>

          {/* Copyright - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:block text-center flex-1 mx-4 text-gray-600 text-sm">
            © {new Date().getFullYear()} Monteput d.o.o.  {translations[selectedLanguage].companyRights}
          </div>

          {/* Mobile copyright - bottom row */}
          <div className="text-center text-xs text-gray-500 mt-1 sm:hidden">
            © {new Date().getFullYear()} Monteput d.o.o.
          </div>
        </div>
      </footer>
    </div>
  );
}
