import React from "react";
import { TABLE_DATA } from "../data/svgMapData";

const SegmentPopup = ({ segmentKey, onClose }) => {
  const data = TABLE_DATA[segmentKey];
  if (!data) return null;

  const formatValue = (v) => {
    if (!v) return "—";
    const num = parseFloat(v);
    return isNaN(num)
      ? v
      : `${num.toLocaleString("de-DE", { minimumFractionDigits: 0 })} €`;
  };

  return (
    <div
      className="popup-container fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 md:bg-transparent md:inset-auto md:absolute md:top-20 md:right-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 rounded-xl shadow-2xl border border-gray-200 w-[90%] md:w-96 max-h-[90vh] overflow-y-auto font-sans animate-fadeIn"
        style={{ animation: "fadeIn 0.3s ease-in-out" }}
      >
        <h3 className="text-lg font-semibold text-gray-900 m-0">{data.naziv}</h3>

        <div className="flex items-center gap-2 mt-2 mb-3">
          <span className="bg-pink-600 text-white font-bold rounded-md px-3 py-1 text-sm">
            {segmentKey}
          </span>
          <span className="text-gray-600 text-sm">{data.duzinaKm} km</span>
        </div>

        <PopupRow label="Idejno rješenje" value={data.idejno} />
        <PopupRow label="Idejni projekat" value={data.idejni} />
        <PopupRow label="Glavni projekat" value={data.glavni} />

        <div className="mt-4 bg-gray-100 p-3 rounded-lg text-center text-gray-800 text-sm">
          <strong>Procijenjena vrijednost: </strong>
          {formatValue(data.vrijednost)}
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
          >
            🎥 Video
          </a>
          <button className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition">
            📄 Dokumentacija
          </button>
          <button
            onClick={onClose}
            className="w-full md:w-auto bg-white border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const PopupRow = ({ label, value }) => {
  const color =
    value?.toLowerCase().includes("zavr") || value?.includes("završen")
      ? "#34c759"
      : value?.toLowerCase().includes("toku")
      ? "#ff9500"
      : "#ffd60a";

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-md px-3 py-2 mb-2 text-sm">
      <span className="text-gray-700">{label}</span>
      <span
        className="rounded-md px-3 py-1 font-medium capitalize"
        style={{
          background: color,
          color: color === "#ffd60a" ? "#333" : "#fff",
        }}
      >
        {value || "—"}
      </span>
    </div>
  );
};

export default SegmentPopup;
