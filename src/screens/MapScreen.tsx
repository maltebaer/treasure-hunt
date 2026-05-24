import { useState } from "react";
import StationMarker, {
  type MarkerState,
} from "../components/StationMarker";
import RiddleModal from "../components/RiddleModal";
import { loadProgress, saveProgress } from "../state/progress";

type MarkerSpec = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const MARKERS: MarkerSpec[] = [
  { id: 1, x: 22, y: 30, color: "#e53935" },
  { id: 2, x: 55, y: 14, color: "#1e88e5" },
  { id: 3, x: 82, y: 28, color: "#fdd835" },
  { id: 4, x: 70, y: 58, color: "#43a047" },
  { id: 5, x: 32, y: 56, color: "#fb8c00" },
  { id: 6, x: 18, y: 82, color: "#8e24aa" },
  { id: 7, x: 75, y: 82, color: "#fbc02d" },
];

export default function MapScreen() {
  const [solvedStations, setSolvedStations] = useState<number[]>(
    () => loadProgress().solvedStations,
  );
  const [openStation, setOpenStation] = useState<number | null>(null);

  const currentStationId =
    MARKERS.find((m) => !solvedStations.includes(m.id))?.id ?? null;

  function markerState(id: number): MarkerState {
    if (solvedStations.includes(id)) return "solved";
    if (id === currentStationId) return "active";
    return "locked";
  }

  function handleSolved(id: number) {
    const next = solvedStations.includes(id)
      ? solvedStations
      : [...solvedStations, id];
    setSolvedStations(next);
    saveProgress({ solvedStations: next });
    setOpenStation(null);
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
          state={markerState(m.id)}
          onClick={() => setOpenStation(m.id)}
        />
      ))}
      {openStation !== null && (
        <RiddleModal
          stationId={openStation}
          onClose={() => setOpenStation(null)}
          onSolved={handleSolved}
        />
      )}
    </main>
  );
}
