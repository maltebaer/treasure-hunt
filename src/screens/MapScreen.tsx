import { useRef, useState } from "react";
import StationMarker, {
  type MarkerState,
} from "../components/StationMarker";
import RiddleModal from "../components/RiddleModal";
import MapBackground from "../components/MapBackground";
import AdminMenu from "../components/AdminMenu";
import { WatercolorDefs } from "../components/watercolor";
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

  return (
    <main
      data-testid="map-screen"
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#efe9d8",
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
    >
      <WatercolorDefs />
      <MapBackground
        treasureRevealed={solvedStations.includes(STATIONS.at(-1)!.id)}
      />

      <header
        style={{
          position: "absolute",
          top: 16,
          left: 0,
          right: 0,
          padding: "12px 22px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <button
          type="button"
          data-testid="map-title"
          aria-label="Schatzkarte"
          onMouseDown={startPress}
          onMouseUp={cancelPress}
          onMouseLeave={cancelPress}
          onTouchStart={startPress}
          onTouchEnd={cancelPress}
          onTouchMove={cancelPress}
          onTouchCancel={cancelPress}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "default",
            userSelect: "none",
            WebkitUserSelect: "none",
            textAlign: "left",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: 38,
              color: "#3d4a35",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            Schatzsuche
          </div>
          <div
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 14,
              color: "#6b6354",
              marginTop: 4,
              fontWeight: 600,
            }}
          >
            Schatzsuche im Pyramiden-Garten
          </div>
        </button>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {STATIONS.map((s) => {
            const solved = solvedStations.includes(s.id);
            return (
              <div
                key={s.id}
                aria-hidden="true"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: solved ? s.scarfColor : "transparent",
                  border: `2px solid ${solved ? s.scarfColor : "#c9c1ad"}`,
                  opacity: solved ? 1 : 0.6,
                }}
              />
            );
          })}
        </div>
      </header>

      {STATIONS.map((s) => (
        <StationMarker
          key={s.id}
          id={s.id}
          x={s.markerPosition.x}
          y={s.markerPosition.y}
          color={s.scarfColor}
          state={markerState(s.id)}
          childName={s.childName}
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
      {adminOpen && <AdminMenu onClose={() => setAdminOpen(false)} />}
    </main>
  );
}
