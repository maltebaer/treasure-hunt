export type Option = {
  emoji: string;
  label: string;
  correct: boolean;
};

export type Station = {
  id: number;
  scarfColor: string;
  scarfColorLabel: string;
  direction: string | null;
  directionShort: string | null;
  isTreasure: boolean;
  question: string;
  options: Option[];
  markerPosition: { x: number; y: number };
};

export const CHILDREN = [
  "FINJA",
  "LINA",
  "FRIEDI",
  "FIETE",
  "ESMEE",
  "RONJA",
  "MILLA",
  "MICHEL",
] as const;

export type ChildName = (typeof CHILDREN)[number];

export const FIXED_ASSIGNMENTS: Record<ChildName, number | null> = {
  FINJA: null,
  LINA: null,
  FRIEDI: null,
  FIETE: null,
  ESMEE: null,
  RONJA: null,
  MILLA: 1,
  MICHEL: 8,
};

export const STATIONS: Station[] = [
  {
    id: 1,
    scarfColor: "#f4a8c4",
    scarfColorLabel: "rosa",
    direction: null,
    directionShort: null,
    isTreasure: false,
    question:
      "Drei Äpfel hängen am Baum. Vier kommen dazu. Wie viele sind es jetzt?",
    options: [
      { emoji: "6️⃣", label: "Sechs", correct: false },
      { emoji: "7️⃣", label: "Sieben", correct: true },
      { emoji: "8️⃣", label: "Acht", correct: false },
    ],
    markerPosition: { x: 32.86, y: 28 },
  },
  {
    id: 2,
    scarfColor: "#6cb5d9",
    scarfColorLabel: "hellblaue",
    direction: "OSTEN",
    directionShort: "O",
    isTreasure: false,
    question:
      "Ein Bauer hat 5 Schafe. Alle außer 3 laufen weg. Wie viele bleiben übrig?",
    options: [
      { emoji: "2️⃣", label: "Zwei", correct: false },
      { emoji: "3️⃣", label: "Drei", correct: true },
      { emoji: "5️⃣", label: "Fünf", correct: false },
    ],
    markerPosition: { x: 68.57, y: 25 },
  },
  {
    id: 3,
    scarfColor: "#d8625a",
    scarfColorLabel: "rote",
    direction: "SÜDWEST",
    directionShort: "SW",
    isTreasure: false,
    question: "Was wird größer, je mehr man davon wegnimmt?",
    options: [
      { emoji: "🎈", label: "Ballon", correct: false },
      { emoji: "🕳️", label: "Loch", correct: true },
      { emoji: "🍰", label: "Kuchen", correct: false },
    ],
    markerPosition: { x: 82.86, y: 43 },
  },
  {
    id: 4,
    scarfColor: "#9a7bb6",
    scarfColorLabel: "lila",
    direction: "SÜDWEST",
    directionShort: "SW",
    isTreasure: false,
    question: "Welches Tier ist das größte auf der Welt?",
    options: [
      { emoji: "🐘", label: "Elefant", correct: false },
      { emoji: "🐋", label: "Blauwal", correct: true },
      { emoji: "🦒", label: "Giraffe", correct: false },
    ],
    markerPosition: { x: 54.29, y: 51 },
  },
  {
    id: 5,
    scarfColor: "#e6c25c",
    scarfColorLabel: "gelbe",
    direction: "WESTEN",
    directionShort: "W",
    isTreasure: false,
    question: "Wie viele Tage hat eine Woche?",
    options: [
      { emoji: "5️⃣", label: "Fünf", correct: false },
      { emoji: "7️⃣", label: "Sieben", correct: true },
      { emoji: "🔟", label: "Zehn", correct: false },
    ],
    markerPosition: { x: 28.57, y: 47 },
  },
  {
    id: 6,
    scarfColor: "#d9874b",
    scarfColorLabel: "orange",
    direction: "SÜDOST",
    directionShort: "SO",
    isTreasure: false,
    question: "Welche Farbe kommt raus, wenn man Blau und Gelb mischt?",
    options: [
      { emoji: "🟢", label: "Grün", correct: true },
      { emoji: "🟠", label: "Orange", correct: false },
      { emoji: "🟣", label: "Lila", correct: false },
    ],
    markerPosition: { x: 17, y: 60 },
  },
  {
    id: 7,
    scarfColor: "#7aa86b",
    scarfColorLabel: "grüne",
    direction: "NORDOSTEN",
    directionShort: "NO",
    isTreasure: false,
    question: "Wie heißt die Hauptstadt von Deutschland?",
    options: [
      { emoji: "🏰", label: "München", correct: false },
      { emoji: "🐻", label: "Berlin", correct: true },
      { emoji: "⚓", label: "Hamburg", correct: false },
    ],
    markerPosition: { x: 25, y: 75 },
  },
  {
    id: 8,
    scarfColor: "#2e4a7a",
    scarfColorLabel: "dunkelblaue",
    direction: "NORDEN",
    directionShort: "N",
    isTreasure: true,
    question:
      "Ein Pirat findet 2 Truhen. In jeder liegen 5 Goldmünzen. Wie viele Goldmünzen hat er?",
    options: [
      { emoji: "7️⃣", label: "Sieben", correct: false },
      { emoji: "🔟", label: "Zehn", correct: true },
      { emoji: "9️⃣", label: "Neun", correct: false },
    ],
    markerPosition: { x: 71.43, y: 72 },
  },
];

if (STATIONS.length !== 8) {
  throw new Error(`Expected 8 stations, got ${STATIONS.length}`);
}
for (const s of STATIONS) {
  if (s.options.length !== 3) {
    throw new Error(`Station ${s.id} must have exactly 3 options`);
  }
  const correctCount = s.options.filter((o) => o.correct).length;
  if (correctCount !== 1) {
    throw new Error(
      `Station ${s.id} must have exactly 1 correct option (got ${correctCount})`,
    );
  }
}
