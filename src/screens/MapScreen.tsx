import { useRef, useState } from "react";
import StationMarker, {
  type MarkerState,
} from "../components/StationMarker";
import RiddleModal from "../components/RiddleModal";
import MapBackground from "../components/MapBackground";
import AdminMenu from "../components/AdminMenu";
import { useProgress } from "../state/progress";
import { STATIONS } from "../data/stations";

const LONG_PRESS_MS = 1500;

export default function MapScreen() {
  const { solvedStations, currentStation, solve } = useProgress();
  const [openStationId, setOpenStationId] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function startPress() {
    if (pressTimerRef.current !== null) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => {
      setAdminOpen(true);
      pressTimerRef.current = null;
    }, LONG_PRESS_MS);
  }

  function cancelPress() {
    if (pressTimerRef.current !== null) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  }

  const lastSolvedId =
    solvedStations.length > 0 ? Math.max(...solvedStations) : null;
  const lastSolved =
    lastSolvedId !== null
      ? (STATIONS.find((s) => s.id === lastSolvedId) ?? null)
      : null;
  const nextStation =
    currentStation !== null
      ? (STATIONS.find((s) => s.id === currentStation) ?? null)
      : null;

  let arrow: { x: number; y: number; angle: number } | null = null;
  if (lastSolved && nextStation) {
    const mx =
      (lastSolved.markerPosition.x + nextStation.markerPosition.x) / 2;
    const my =
      (lastSolved.markerPosition.y + nextStation.markerPosition.y) / 2;
    const dx = nextStation.markerPosition.x - lastSolved.markerPosition.x;
    const dy = nextStation.markerPosition.y - lastSolved.markerPosition.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    arrow = { x: mx, y: my, angle };
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
        @keyframes direction-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        .direction-pulse {
          animation: direction-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <MapBackground />
      <button
        type="button"
        data-testid="map-title"
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        onTouchMove={cancelPress}
        onTouchCancel={cancelPress}
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
          border: "none",
          fontSize: "2.5rem",
          fontFamily:
            "'Bradley Hand', 'Marker Felt', 'Brush Script MT', cursive",
          fontWeight: 700,
          color: "#3e2723",
          cursor: "default",
          padding: "0.25rem 1rem",
          userSelect: "none",
          WebkitUserSelect: "none",
          zIndex: 1,
        }}
      >
        Schatzkarte
      </button>
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
      {arrow && (
        <div
          data-testid="direction-arrow"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${arrow.x}%`,
            top: `${arrow.y}%`,
            transform: `translate(-50%, -50%) rotate(${arrow.angle}deg)`,
            fontSize: "2rem",
            color: "#5d4037",
            animation: "direction-pulse 1.5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          →
        </div>
      )}
      {openStation && (
        <RiddleModal
          station={openStation}
          onClose={() => setOpenStationId(null)}
          onSolved={handleSolved}
        />
      )}
      {adminOpen && <AdminMenu onClose={() => setAdminOpen(false)} />}
    </main>
  );
}
