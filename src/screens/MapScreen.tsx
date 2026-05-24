import { useState } from "react";
import StationMarker, {
  type MarkerState,
} from "../components/StationMarker";
import RiddleModal, { type RiddleStation } from "../components/RiddleModal";
import { useProgress } from "../state/progress";

type MarkerSpec = {
  id: number;
  x: number;
  y: number;
  color: string;
  riddle: RiddleStation | null;
};

const FINJA: RiddleStation = {
  id: 1,
  childName: "Finja",
  scarfColorLabel: "rote",
  direction: "NORDWEST",
  question:
    "Ich bin gelb-schwarz gestreift, mache Honig und summe. Wer bin ich?",
  options: [
    { emoji: "🐝", label: "Biene", correct: true },
    { emoji: "🐞", label: "Marienkäfer", correct: false },
    { emoji: "🐛", label: "Raupe", correct: false },
  ],
};

const LINA: RiddleStation = {
  id: 2,
  childName: "Lina",
  scarfColorLabel: "blaue",
  direction: "OSTEN",
  question: "Wenn du Rot und Gelb mischst — welche Farbe kommt raus?",
  options: [
    { emoji: "🟢", label: "Grün", correct: false },
    { emoji: "🟠", label: "Orange", correct: true },
    { emoji: "🟣", label: "Lila", correct: false },
  ],
};

const MARKERS: MarkerSpec[] = [
  { id: 1, x: 22, y: 30, color: "#e53935", riddle: FINJA },
  { id: 2, x: 55, y: 14, color: "#1e88e5", riddle: LINA },
  { id: 3, x: 82, y: 28, color: "#fdd835", riddle: null },
  { id: 4, x: 70, y: 58, color: "#43a047", riddle: null },
  { id: 5, x: 32, y: 56, color: "#fb8c00", riddle: null },
  { id: 6, x: 18, y: 82, color: "#8e24aa", riddle: null },
  { id: 7, x: 75, y: 82, color: "#fbc02d", riddle: null },
];

export default function MapScreen() {
  const { solvedStations, currentStation, solve } = useProgress();
  const [openStationId, setOpenStationId] = useState<number | null>(null);

  function markerState(spec: MarkerSpec): MarkerState {
    if (solvedStations.includes(spec.id)) return "solved";
    if (spec.id === currentStation && spec.riddle !== null) return "active";
    return "locked";
  }

  const openMarker = MARKERS.find((m) => m.id === openStationId) ?? null;

  function handleSolved(id: number) {
    solve(id);
    setOpenStationId(null);
  }

  return (
    <main
      data-testid="map-screen"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#e8d5a0",
      }}
    >
      <style>{`
        @keyframes marker-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
      {MARKERS.map((m) => (
        <StationMarker
          key={m.id}
          id={m.id}
          x={m.x}
          y={m.y}
          color={m.color}
          state={markerState(m)}
          onClick={() => setOpenStationId(m.id)}
        />
      ))}
      {openMarker?.riddle && (
        <RiddleModal
          station={openMarker.riddle}
          onClose={() => setOpenStationId(null)}
          onSolved={handleSolved}
        />
      )}
    </main>
  );
}
