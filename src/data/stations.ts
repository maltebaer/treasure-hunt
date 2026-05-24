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
    scarfColor: "#e53935",
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
    markerPosition: { x: 22, y: 30 },
  },
  {
    id: 2,
    childName: "Lina",
    scarfColor: "#1e88e5",
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
    markerPosition: { x: 55, y: 14 },
  },
  {
    id: 3,
    childName: "Friedi",
    scarfColor: "#fdd835",
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
    markerPosition: { x: 82, y: 28 },
  },
  {
    id: 4,
    childName: "Fiete",
    scarfColor: "#43a047",
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
    markerPosition: { x: 70, y: 58 },
  },
  {
    id: 5,
    childName: "Esmee",
    scarfColor: "#fb8c00",
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
    markerPosition: { x: 32, y: 56 },
  },
  {
    id: 6,
    childName: "Ronja",
    scarfColor: "#8e24aa",
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
    markerPosition: { x: 18, y: 82 },
  },
  {
    id: 7,
    childName: "Michel",
    scarfColor: "#fbc02d",
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
    markerPosition: { x: 75, y: 82 },
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
