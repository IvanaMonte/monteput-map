export const translations = {
  Crnogorski: {
    legendTitle: "Legenda mape",
    close: "Zatvori",
    legendButton: "Legenda",
    valueLabel: "Procijenjena vrijednost",
    ideaSolution: "Idejno rješenje",
    ideaProject: "Idejni projekat",
    mainProject: "Glavni projekat",
    video: "🎥 Video",
    docs: "📄 Dokumentacija",
    sectionLabel: "Podjela dionica",
    builtSections: "Izgrađene dionice autoputa",
    clickTip: "Kliknite na dionice na mapi za detaljne informacije",
    companyRights: "Sva prava zadržana.",
  },

  English: {
    legendTitle: "Map Legend",
    close: "Close",
    legendButton: "Legend",
    valueLabel: "Estimated value",
    ideaSolution: "Concept design",
    ideaProject: "Preliminary design",
    mainProject: "Main project",
    video: "🎥 Video",
    docs: "📄Documentation",
    sectionLabel: "Section division",
    builtSections: "Constructed highway sections",
    clickTip: "Click on the map sections for detailed information",
    companyRights: "All rights reserved.",
  },
};

/** Optional helper hook for cleaner use */
export const useTranslation = (lang) => (key) =>
  translations[lang]?.[key] || key;
