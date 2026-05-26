export type Option = {
  emoji: string;
  label: string;
  correct: boolean;
};

export type Station = {
  id: number;
  childName: string;
  scarfColor: string;
  scarfColorLabel: string;
  direction: string;
  directionShort: string;
  isTreasure: boolean;
  question: string;
  options: Option[];
  markerPosition: { x: number; y: number };
};

export const STATIONS: Station[] = [
  {
    id: 1,
    childName: "Finja",
    scarfColor: "#d8625a",
    scarfColorLabel: "rote",
    direction: "NORDWEST",
    directionShort: "NW",
    isTreasure: false,
    question:
      "Ich bin gelb-schwarz gestreift, mache Honig und summe. Wer bin ich?",
    options: [
      { emoji: "🐝", label: "Biene", correct: true },
      { emoji: "🐞", label: "Marienkäfer", correct: false },
      { emoji: "🐛", label: "Raupe", correct: false },
    ],
    markerPosition: { x: 32.86, y: 28 },
  },
  {
    id: 2,
    childName: "Lina",
    scarfColor: "#5b8fc7",
    scarfColorLabel: "blaue",
    direction: "OSTEN",
    directionShort: "O",
    isTreasure: false,
    question: "Wenn du Rot und Gelb mischst — welche Farbe kommt raus?",
    options: [
      { emoji: "🟢", label: "Grün", correct: false },
      { emoji: "🟠", label: "Orange", correct: true },
      { emoji: "🟣", label: "Lila", correct: false },
    ],
    markerPosition: { x: 68.57, y: 25 },
  },
  {
    id: 3,
    childName: "Friedi",
    scarfColor: "#e6c25c",
    scarfColorLabel: "gelbe",
    direction: "SÜDWEST",
    directionShort: "SW",
    isTreasure: false,
    question: "Wer hat einen roten Mantel und besucht die Oma im Wald?",
    options: [
      { emoji: "🧚", label: "Fee", correct: false },
      { emoji: "👧", label: "Rotkäppchen", correct: true },
      { emoji: "👸", label: "Prinzessin", correct: false },
    ],
    markerPosition: { x: 82.86, y: 43 },
  },
  {
    id: 4,
    childName: "Fiete",
    scarfColor: "#7aa86b",
    scarfColorLabel: "grüne",
    direction: "SÜDWEST",
    directionShort: "SW",
    isTreasure: false,
    question: "Wie viele Beine hat eine Spinne?",
    options: [
      { emoji: "6️⃣", label: "Sechs", correct: false },
      { emoji: "8️⃣", label: "Acht", correct: true },
      { emoji: "🔟", label: "Zehn", correct: false },
    ],
    markerPosition: { x: 54.29, y: 51 },
  },
  {
    id: 5,
    childName: "Esmee",
    scarfColor: "#d9874b",
    scarfColorLabel: "orange",
    direction: "WESTEN",
    directionShort: "W",
    isTreasure: false,
    question: "Welches Tier macht 'Muh'?",
    options: [
      { emoji: "🐷", label: "Schwein", correct: false },
      { emoji: "🐮", label: "Kuh", correct: true },
      { emoji: "🐔", label: "Huhn", correct: false },
    ],
    markerPosition: { x: 28.57, y: 47 },
  },
  {
    id: 6,
    childName: "Ronja",
    scarfColor: "#9a7bb6",
    scarfColorLabel: "lila",
    direction: "SÜDOST",
    directionShort: "SO",
    isTreasure: false,
    question: "Was wächst auf einem Apfelbaum?",
    options: [
      { emoji: "🍓", label: "Erdbeeren", correct: false },
      { emoji: "🍎", label: "Äpfel", correct: true },
      { emoji: "🍌", label: "Bananen", correct: false },
    ],
    markerPosition: { x: 40, y: 68 },
  },
  {
    id: 7,
    childName: "Michel",
    scarfColor: "#c89a3f",
    scarfColorLabel: "goldene",
    direction: "NORDEN",
    directionShort: "N",
    isTreasure: true,
    question: "Was suchen Piraten?",
    options: [
      { emoji: "🦴", label: "Knochen", correct: false },
      { emoji: "💰", label: "Schatz", correct: true },
      { emoji: "🍕", label: "Pizza", correct: false },
    ],
    markerPosition: { x: 71.43, y: 72 },
  },
];

if (STATIONS.length !== 7) {
  throw new Error(`Expected 7 stations, got ${STATIONS.length}`);
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
