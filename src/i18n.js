// export const translations = {
//   Crnogorski: {
//     legendTitle: "Legenda mape",
//     close: "Zatvori",
//     legendButton: "Legenda",
//     valueLabel: "Procijenjena vrijednost",
//     ideaSolution: "Idejno rješenje",
//     ideaProject: "Idejni projekat",
//     mainProject: "Glavni projekat i izvođenje radova",
//     video: "🎥 Video",
//     docs: "📄 Dokumentacija",
//     sectionLabel: "Podjela dionica",
//     builtSections: "Izgrađene dionice autoputa",
//     clickTip: "Kliknite na dionice na mapi za detaljne informacije",
//     companyRights: "Sva prava zadržana.",
//       projectPhaseStatus: "Status faze projekta",
//     finished: "Završeno",
//     inProgress: "U toku",
//     planned: "Planirano",
//     noData: "Nema podataka",
//   },

import { i } from "framer-motion/client";

//   English: {
//     legendTitle: "Map Legend",
//     close: "Close",
//     legendButton: "Legend",
//     valueLabel: "Estimated value",
//     ideaSolution: "Concept design",
//     ideaProject: "Preliminary design",
//     mainProject: "Main project and construction works",
//     video: "🎥 Video",
//     docs: "📄Documentation",
//     sectionLabel: "Section division",
//     builtSections: "Constructed highway sections",
//     clickTip: "Click on the map sections for detailed information",
//     companyRights: "All rights reserved.",
//       projectPhaseStatus: "Project Phase Status",
//     finished: "Completed",
//     inProgress: "In Progress",
//     planned: "Planned",
//     noData: "No Data",
//   },
// };

// src/i18n.js
export const translations = {
  Crnogorski: {
    // Header / filters
    headerLanguageMe: "Crnogorski",
    headerLanguageEn: "English",
    phaseIdejno: "Idejno rješenje",
    phaseIdejni: "Idejni projekat",
    phaseGlavni: "Glavni projekat i izvođenje radova",

    // Status legend (boje po fazama)
    projectPhaseStatus: "Status faze projekta",
    finished: "Završeno",
    inProgress: "U toku",
    planned: "Planirano",
    noData: "Nema podataka",

    // Popup / info (ako bude trebalo)
    ideaSolution: "Idejno rješenje",
    ideaProject: "Idejni projekat",
    mainProject: "Glavni projekat i izvođenje radova",
    video: "🎥 Video",
    docs: "📄 Dokumentacija",
    valueLabel: "Procijenjena vrijednost",
    // možeš dodati još: projectStatus: "Status projekta", itd.

    // Glavna legenda (donji dijalog)
    legendTitle: "Legenda",
    legendButton: "Legenda",
    legendA1: "A1 - Autoput Bar - Boljare",
    legendConstructed: "Izgrađene dionice autoputa",
    legendInterchanges: "A1 - Planirana čvorišta",
    legendA2: "A2 - Jadransko-jonski autoput",
    legendExpressways: "Planirane brze saobraćajnice",
    legendSections: "Podjela dionica",
    legendClickHint: "Kliknite na dionice na mapi za detaljne informacije",
    close: "Zatvori",

    // Footer
    companyRights: "Sva prava zadržana.",
  },

  English: {
    // Header / filters
    headerLanguageMe: "Montenegrin",
    headerLanguageEn: "English",
    phaseIdejno: "Conceptual design",
    phaseIdejni: "Preliminary design",
    phaseGlavni: "Main design and construction works",
    valueLabel: "Estimated value",

    // Status legend (phase colors)
    projectPhaseStatus: "Project phase status",
    finished: "Completed",
    inProgress: "In progress",
    planned: "Planned",
    noData: "No data",

    // Popup / info
    ideaSolution: "Conceptual design",
    ideaProject: "Preliminary design",
    mainProject: "Main design and construction works",
    video: "🎥 Video",
    docs: "📄Documentation",

    // Main legend (dialog)
    legendTitle: "Legend",
    legendButton: "Legend",
    legendA1: "A1 - Bar–Boljare motorway",
    legendConstructed: "Constructed motorway sections",
    legendInterchanges: "A1 - Planned interchanges",
    legendA2: "A2 - Adriatic–Ionian motorway",
    legendExpressways: "Planned expressways",
    legendSections: "Division of sections",
    legendClickHint: "Click on a section on the map for more details",
    close: "Close",

    // Footer
    companyRights: "All rights reserved.",
  },
};

/** Optional helper hook for cleaner use */
export const useTranslation = (lang) => (key) =>
  translations[lang]?.[key] || key;
