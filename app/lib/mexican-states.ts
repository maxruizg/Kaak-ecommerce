export const mexicanStates = [
  { value: "AGU", label: "Aguascalientes" },
  { value: "BCN", label: "Baja California" },
  { value: "BCS", label: "Baja California Sur" },
  { value: "CAM", label: "Campeche" },
  { value: "CHP", label: "Chiapas" },
  { value: "CHH", label: "Chihuahua" },
  { value: "COA", label: "Coahuila" },
  { value: "COL", label: "Colima" },
  { value: "CMX", label: "Ciudad de México" },
  { value: "DUR", label: "Durango" },
  { value: "GUA", label: "Guanajuato" },
  { value: "GRO", label: "Guerrero" },
  { value: "HID", label: "Hidalgo" },
  { value: "JAL", label: "Jalisco" },
  { value: "MEX", label: "Estado de México" },
  { value: "MIC", label: "Michoacán" },
  { value: "MOR", label: "Morelos" },
  { value: "NAY", label: "Nayarit" },
  { value: "NLE", label: "Nuevo León" },
  { value: "OAX", label: "Oaxaca" },
  { value: "PUE", label: "Puebla" },
  { value: "QUE", label: "Querétaro" },
  { value: "ROO", label: "Quintana Roo" },
  { value: "SLP", label: "San Luis Potosí" },
  { value: "SIN", label: "Sinaloa" },
  { value: "SON", label: "Sonora" },
  { value: "TAB", label: "Tabasco" },
  { value: "TAM", label: "Tamaulipas" },
  { value: "TLA", label: "Tlaxcala" },
  { value: "VER", label: "Veracruz" },
  { value: "YUC", label: "Yucatán" },
  { value: "ZAC", label: "Zacatecas" },
];

export function normalizeStateName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const stateNameToAbbr: Record<string, string> = {
  aguascalientes: "AGU",
  "baja california": "BCN",
  "baja california sur": "BCS",
  campeche: "CAM",
  chiapas: "CHP",
  chihuahua: "CHH",
  coahuila: "COA",
  "coahuila de zaragoza": "COA",
  colima: "COL",
  "ciudad de mexico": "CMX",
  "distrito federal": "CMX",
  durango: "DUR",
  guanajuato: "GUA",
  guerrero: "GRO",
  hidalgo: "HID",
  jalisco: "JAL",
  "estado de mexico": "MEX",
  mexico: "MEX",
  michoacan: "MIC",
  "michoacan de ocampo": "MIC",
  morelos: "MOR",
  nayarit: "NAY",
  "nuevo leon": "NLE",
  oaxaca: "OAX",
  puebla: "PUE",
  queretaro: "QUE",
  "queretaro de arteaga": "QUE",
  "quintana roo": "ROO",
  "san luis potosi": "SLP",
  sinaloa: "SIN",
  sonora: "SON",
  tabasco: "TAB",
  tamaulipas: "TAM",
  tlaxcala: "TLA",
  veracruz: "VER",
  "veracruz de ignacio de la llave": "VER",
  yucatan: "YUC",
  zacatecas: "ZAC",
};

export function getStateAbbr(apiStateName: string): string | undefined {
  return stateNameToAbbr[normalizeStateName(apiStateName)];
}

const abbrToLabel: Record<string, string> = Object.fromEntries(
  mexicanStates.map((s) => [s.value, s.label])
);

export function getStateLabel(abbr: string): string {
  return abbrToLabel[abbr] ?? abbr;
}
