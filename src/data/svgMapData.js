export const SVG_SIZE = { width: 4152.48, height: 3650.22 };

/** ✅ ID-jevi dionica iz NOVOG map.svg fajla */
export const SEGMENT_IDS = {
  // A1 — Autoput Bar–Boljare
  'A1-1': ['A1-1_00000142885664381229336540000015656124021157689486_'],
  'A1-2': ['A1-2_00000146460194143559316510000005386766641536961950_'],
  'A1-3': ['A1-3_00000044172087366339723090000003344439387456730504_'],
  'A1-4': ['A1-4'],
  'A1-5': ['A1-5_00000117677984599332341950000014471125896648593541_'],
  'A1-6': ['A1-6'],
  'A1-7': ['A1-7_00000150801629294073892830000012245625696818596261_'],

  // A2 — Jadransko–jonski autoput
  'A2-1': ['A2-1'],
  'A2-2': ['A2-2'],
  'A2-3': ['A2-3'],
  'A2-4': ['A2-4'],

  // Brze saobraćajnice B1..B5
  'B1-1': ['B1-1'],
  'B1-2': ['B1-2_00000149348799120372746020000012096856545398821054_'],
  'B1-3': ['B1-3'],
  'B1-4': ['B1-4'],

  'B2-1': [
    'B2-1_00000016762406574707419000000012253638685064227215_',
  ],
  'B2-2': ['B2-2'],

  'B3-1': ['B3-1_00000155840640251091934230000014960399914808849828_'],

  'B4-1': ['B4-1_00000010989868262717661150000007388536919914740640_'],
  'B4-2': ['B4-2'],
  'B4-3': ['B4-3'],
  'B4-4': ['B4-4'],
  'B4-5': ['B4-5'],

  'B5-1': ['B5-1_00000159445163079924626410000011015967458678746807_'],
};

/** Klik-zone (ako budu potrebne) */
export const SEGMENT_LABELS = {
  'A1-1': { x: 1965.1746, y: 2086.7598 },
  'A1-2': { x: 2201.7642, y: 1821.0876 },
  'A1-3': { x: 2450.6904, y: 1723.1704 },
  'A1-4': { x: 2466.053,  y: 1487.8457 },
  'A1-5': { x: 1722.709,  y: 2224.3223 },
  'A1-6': { x: 1615.9423, y: 2424.4607 },
};

/** Podaci iz Excel tabele */
export const TABLE_DATA = {
  "A1-1": {"oznaka": "1", "naziv": "Smokovac - Mateševo", "duzinaKm": 42.0, "vrijednost": "Izgrađena i otvorena za saobraćaj 13.07.2022. godine", "idejno": "—", "idejni": "—", "glavni": "—"},
  "A1-2": {"oznaka": "2", "naziv": "Mateševo - Andrijevica", "duzinaKm": 22.0, "vrijednost": "549295000", "idejno": "završeno", "idejni": "završen", "glavni": "EBRD tender u toku"},
  "A1-3": {"oznaka": "3", "naziv": "Andrijevica - Crnča", "duzinaKm": 28.0, "vrijednost": "470000000", "idejno": "završeno", "idejni": "izrada projekta u toku", "glavni": "raspisivanje tendera 2026."},
  "A1-4": {"oznaka": "4", "naziv": "Crnča - Boljare", "duzinaKm": 23.0, "vrijednost": "415000000", "idejno": "završeno", "idejni": "izrada projekta u toku", "glavni": "raspisivanje tendera 2026-2027."},
  "A1-5": {"oznaka": "5", "naziv": "Smokovac - Tološi", "duzinaKm": 10.0, "vrijednost": "150000000", "idejno": "završeno", "idejni": "izrada projekta u toku", "glavni": "raspisivanje tendera 2026."},
  "A1-A2-6": {"oznaka": "6", "naziv": "Tološi - Virpazar", "duzinaKm": 40.0, "vrijednost": "580000000", "idejno": "završeno", "idejni": "tender u toku", "glavni": "raspisivanje tendera 2026."},
  "A1-A2-8": {"oznaka": "8", "naziv": "Virpazar - Zaljevo", "duzinaKm": 23.0, "vrijednost": "420000000", "idejno": "revizija u toku", "idejni": "izrada projekta u toku", "glavni": "raspisivanje tendera 2026."},
  "A2-1": {"oznaka": "1", "naziv": "Gradac - Čevo", "duzinaKm": 25.0, "vrijednost": "370000000", "idejno": "završeno", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2027."},
  "A2-2": {"oznaka": "2", "naziv": "Čevo - Grahovo", "duzinaKm": 10.0, "vrijednost": "200000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2027."},
  "A2-3": {"oznaka": "3", "naziv": "Grahovo - Granica sa Bosnom i Hercegovinom", "duzinaKm": 21.0, "vrijednost": "270000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2028."},
  "A2-4": {"oznaka": "4", "naziv": "Zaljevo - Ulcinj - granica sa Albanijom", "duzinaKm": 23.0, "vrijednost": "420000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2027."},
  "B1-1": {"oznaka": "1", "naziv": "Autoput Bar - Boljare - Markovići", "duzinaKm": 15.0, "vrijednost": "380000000", "idejno": "završeno", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2026-2027."},
  "B1-2": {"oznaka": "2", "naziv": "Obilaznica Budve (Markovići - Lastva Grbaljska)", "duzinaKm": 8.0, "vrijednost": "200000000", "idejno": "završeno", "idejni": "-", "glavni": "tender u toku"},
  "B1-3": {"oznaka": "3", "naziv": "Lastva Grbaljska - Luštica", "duzinaKm": 19.0, "vrijednost": "500000000", "idejno": "završeno", "idejni": "-", "glavni": "-"},
  "B2-2": {"oznaka": "2", "naziv": "Pljevlja - granica sa Bosnom i Hercegovinom", "duzinaKm": 30.0, "vrijednost": "400000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2029."},
  "B2-1": {"oznaka": "1", "naziv": "Crnča - Pljevlja", "duzinaKm": 64.0, "vrijednost": "900000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2028."},
  "B3-1": {"oznaka": "1", "naziv": "Smokovac - Tuzi - Božaj", "duzinaKm": 24.0, "vrijednost": "322000000", "idejno": "završeno", "idejni": "raspisivanje tendera 2025-2026.", "glavni": "raspisivanje tendera 2028."},
  "B4-1": {"oznaka": "1", "naziv": "Podgorica - Danilovgrad", "duzinaKm": 16.0, "vrijednost": "230000000", "idejno": "izrada projekta u toku", "idejni": "raspisivanje tendera 2026.", "glavni": "raspisivanje tendera 2027."},
  "B4-2": {"oznaka": "2", "naziv": "Danilovgrad - Nikšić", "duzinaKm": 34.0, "vrijednost": "470000000", "idejno": "revizija u toku", "idejni": "raspisivanje tendera 2026.", "glavni": "raspisivanje tendera 2027."},
  "B4-3": {"oznaka": "3", "naziv": "Nikšić - Šavnik", "duzinaKm": 35.0, "vrijednost": "495000000", "idejno": "izrada projekta u toku", "idejni": "raspisivanje tendera 2026.", "glavni": "raspisivanje tendera 2029."},
  "B4-4": {"oznaka": "4", "naziv": "Šavnik - Žabljak", "duzinaKm": 22.0, "vrijednost": "310000000", "idejno": "izrada projekta u toku", "idejni": "raspisivanje tendera 2026.", "glavni": "raspisivanje tendera 2029."},
  "B4-5": {"oznaka": "5", "naziv": "Žabljak - Pljevlja (Vrulja)", "duzinaKm": 38.0, "vrijednost": "535000000", "idejno": "izrada projekta u toku", "idejni": "raspisivanje tendera 2026.", "glavni": "raspisivanje tendera 2029."},
  "B5-1": {"oznaka": "1", "naziv": "Andrijevica - granica sa Kosovom", "duzinaKm": 27.0, "vrijednost": "480000000", "idejno": "završeno", "idejni": "raspisivanje tendera 2025.", "glavni": "raspisivanje tendera 2029."}
};
