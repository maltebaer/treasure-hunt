import { useState } from "react";
import StationMarker, {
  type MarkerState,
} from "../components/StationMarker";
import RiddleModal from "../components/RiddleModal";
import { useProgress } from "../state/progress";
import { STATIONS } from "../data/stations";

export default function MapScreen() {
  const { solvedStations, currentStation, solve } = useProgress();
  const [openStationId, setOpenStationId] = useState<number | null>(null);

  function markerState(id: number): MarkerState {
    if (solvedStations.includes(id)) return "solved";
    if (id === currentStation) return "active";
    return "locked";
  }

  const openStation =
    openStationId !== null
      ? (STATIONS.find((s) => s.id === openStationId) ?? null)
      : null;

  function handleSolved(id: number) {
    solve(id);
    setOpenStationId(null);
  }

  const allSolved = solvedStations.length === STATIONS.length;

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
      {STATIONS.map((s) => (
        <StationMarker
          key={s.id}
          id={s.id}
          x={s.markerPosition.x}
          y={s.markerPosition.y}
          color={s.scarfColor}
          state={markerState(s.id)}
          onClick={() => setOpenStationId(s.id)}
        />
      ))}
      {openStation && (
        <RiddleModal
          station={openStation}
          onClose={() => setOpenStationId(null)}
          onSolved={handleSolved}
        />
      )}
      {allSolved && (
        <div
          data-testid="treasure-placeholder"
          role="status"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 215, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            padding: "2rem",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Du hast den Schatz gefunden!
        </div>
      )}
    </main>
  );
}
