import React, { useRef, useState } from "react";
import { TABLE_DATA, TABLE_DATA_EN } from "../data/svgMapData";
import { translations } from "../i18n";

//  BOJE STATUSA – ISTE LOGIKE KAO NA MAPI (ME + EN)
const getStatusBadgeColor = (statusRaw) => {
  if (!statusRaw) return "#9CA3AF"; // siva – nema podataka

  const v = statusRaw.toLowerCase();

  // 🟢 završeno / completed
  if (
    v.includes("zavr") ||          // završeno, završen...
    v.includes("completed") ||     // completed
    v.includes("done")
  ) {
    return "#22C55E";
  }

  // 🟡 u toku / revizija / izrada / ongoing
  if (
    v.includes("u toku") ||
    v.includes("revizija") ||
    v.includes("izrada") ||
    v.includes("revision in progress") ||
    v.includes("project preparation") ||
    v.includes("preparation") ||
    v.includes("ongoing") ||
    v.includes("in progress")
  ) {
    return "#F7D774";
  }

  // 🔴 tender / planirano / planned
  if (
    v.includes("tender") ||
    v.includes("raspis") ||
    v.includes("plan") ||
    v.includes("planned")
  ) {
    return "#e53935";
  }

  // default siva
  return "#9CA3AF";
};

const SegmentPopup = ({
  segmentKey,
  onClose,
  selectedLanguage = "Crnogorski",
}) => {
  const data =
    selectedLanguage === "English"
      ? TABLE_DATA_EN[segmentKey]
      : TABLE_DATA[segmentKey];

  if (!data) return null;

  const sheetRef = useRef(null);
  const [startY, setStartY] = useState(null);
  const [translateY, setTranslateY] = useState(0);

  // Povlačenje za zatvaranje (samo mobilni bottom sheet)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (startY !== null && e.touches.length === 1) {
      const diff = e.touches[0].clientY - startY;
      if (diff > 0) setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 100) onClose();
    else setTranslateY(0);
    setStartY(null);
  };

  const formatValue = (v) => {
    if (!v) return "—";
    const num = parseFloat(v);
    return isNaN(num)
      ? v
      : `${num.toLocaleString("de-DE", { minimumFractionDigits: 0 })} €`;
  };

  return (
    <div
      className="popup-container fixed inset-0 z-[9999] flex items-end sm:items-start sm:justify-start bg-transparent sm:bg-transparent"
      onClick={onClose}
    >
      {/* === MOBILNI bottom sheet === */}
      <div
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="block sm:hidden pointer-events-auto bg-white w-full rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.1)] border-t border-gray-200 px-4 py-4 max-h-[45vh] overflow-y-auto transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${translateY}px)`,
          animation: "slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Dragger bar */}
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />

        {/* Naslov */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug truncate">
          {data.naziv}
        </h3>

        {/* Oznaka dionice + km */}
        <div className="flex items-center gap-1.5 mt-1 mb-2">
          <span className="bg-pink-600 text-white font-bold rounded-md px-2 py-[2px] text-[11px] leading-none">
            {segmentKey}
          </span>
          <span className="text-gray-600 text-[11px] leading-none">
            {data.duzinaKm} km
          </span>
        </div>

        {/* Statusi po fazi */}
        <div className="space-y-1.5">
          <PopupRow
            label={translations[selectedLanguage].ideaSolution}
            value={data.idejno}
          />
          <PopupRow
            label={translations[selectedLanguage].ideaProject}
            value={data.idejni}
          />
          <PopupRow
            label={translations[selectedLanguage].mainProject}
            value={data.glavni}
          />
        </div>

        {/* Vrijednost */}
        <div className="mt-3 bg-gray-100 p-2.5 rounded-lg text-center text-gray-800 text-xs">
          <strong>{translations[selectedLanguage].valueLabel}: </strong>
          {formatValue(data.vrijednost)}
        </div>

        {/* Linkovi i close */}
        <div className="mt-3 flex flex-col justify-between items-center gap-2">
          {data.video && (
            <a
              href={data.video}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs hover:bg-gray-100 transition"
            >
              {translations[selectedLanguage].video}
            </a>
          )}
          {data.pdf && (
            <a
              href={data.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs hover:bg-gray-100 transition"
            >
              {translations[selectedLanguage].docs}
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* === DESKTOP popup – top-right (ispod headera) === */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="hidden sm:block absolute top-[176px] right-8 z-[10000] bg-white p-5 rounded-xl shadow-2xl border border-gray-200 w-[380px] max-h-[85vh] overflow-y-auto font-sans animate-fadeIn"
        style={{ animation: "fadeIn 0.3s ease-in-out" }}
      >
        <h3 className="text-lg font-semibold text-gray-900 m-0">
          {data.naziv}
        </h3>

        <div className="flex items-center gap-2 mt-2 mb-3">
          <span className="bg-pink-600 text-white font-bold rounded-md px-3 py-1 text-sm">
            {segmentKey}
          </span>
          <span className="text-gray-600 text-sm">{data.duzinaKm} km</span>
        </div>

        <PopupRow
          label={translations[selectedLanguage].ideaSolution}
          value={data.idejno}
        />
        <PopupRow
          label={translations[selectedLanguage].ideaProject}
          value={data.idejni}
        />
        <PopupRow
          label={translations[selectedLanguage].mainProject}
          value={data.glavni}
        />

        <div className="mt-4 bg-gray-100 p-3 rounded-lg text-center text-gray-800 text-sm">
          <strong>{translations[selectedLanguage].valueLabel} </strong>
          {formatValue(data.vrijednost)}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          {data.video && (
            <a
              href={data.video}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
            >
              {translations[selectedLanguage].video}
            </a>
          )}
          {data.pdf && (
            <a
              href={data.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
            >
              {translations[selectedLanguage].docs}
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

const PopupRow = ({ label, value }) => {
  const color = getStatusBadgeColor(value);
  const isLightBg = color === "#EAB308" || color === "#9CA3AF"; // žuta i siva → tamniji tekst

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-md px-3 py-2 text-sm">
      <span className="text-gray-700">{label}</span>
      <span
        className="rounded-md px-3 py-1 font-medium capitalize"
        style={{
          backgroundColor: color,
          color: isLightBg ? "#111827" : "#ffffff",
        }}
      >
        {value || "—"}
      </span>
    </div>
  );
};

export default SegmentPopup;
