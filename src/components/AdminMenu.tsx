import { useProgress } from "../state/progress";
import { STATIONS } from "../data/stations";

type Props = {
  onClose: () => void;
};

export default function AdminMenu({ onClose }: Props) {
  const { reset, jumpTo, skipCurrent, solvedStations, currentStation } =
    useProgress();
  const currentKid =
    currentStation !== null
      ? STATIONS.find((s) => s.id === currentStation)
      : null;

  function handleReset() {
    reset();
    onClose();
  }

  function handleSkip() {
    skipCurrent();
    onClose();
  }

  function handleJump(stationId: number) {
    jumpTo(stationId);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admin-Menü"
      data-testid="admin-menu"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(40, 50, 30, 0.45)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "min(6vh, 60px) 18px 18px",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "#fdfaf2",
          borderRadius: 22,
          padding: "26px 26px",
          boxShadow: "0 14px 32px -8px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 560,
          width: "100%",
          maxHeight: "100%",
          overflowY: "auto",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontSize: 12,
                color: "#9b8e6a",
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Admin · Malte
            </div>
            <div
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: 40,
                color: "#3d4a35",
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              Spielleitung
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Menü ausblenden"
            style={{
              width: 38,
              height: 38,
              border: "none",
              background: "#f3ead7",
              borderRadius: "50%",
              fontSize: 18,
              color: "#7a5a3d",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#6b6354",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          Fortschritt: <strong>{solvedStations.length} / {STATIONS.length}</strong> Stationen
          {currentKid && (
            <>
              {" "}· Aktuell{" "}
              <strong style={{ color: currentKid.scarfColor }}>
                {currentKid.childName}
              </strong>{" "}
              (Station {currentKid.id})
            </>
          )}
        </div>

        <div style={{ height: 1, background: "#ece3cb" }} />

        <div>
          <div
            style={{
              fontSize: 13,
              color: "#9b8e6a",
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Zu Station springen
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${STATIONS.length}, 1fr)`, gap: 8 }}>
            {STATIONS.map((s) => {
              const isCurrent = s.id === currentStation;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Springe zu Station ${s.id}`}
                  onClick={() => handleJump(s.id)}
                  style={{
                    padding: "12px 0",
                    border: "none",
                    borderRadius: 12,
                    background: isCurrent ? s.scarfColor : "#f6efd9",
                    color: isCurrent ? "#fbf6ec" : "#3d4a35",
                    fontFamily: "Nunito, sans-serif",
                    fontSize: 18,
                    fontWeight: 900,
                    boxShadow: isCurrent
                      ? `0 4px 0 ${shade(s.scarfColor, -0.15)}`
                      : "inset 0 0 0 1px #ece3cb",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                  }}
                >
                  {s.id}
                  <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.85 }}>
                    {s.childName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ height: 1, background: "#ece3cb" }} />

        <AdminAction
          icon="⏭"
          title="Nächste Station überspringen"
          hint="Markiert aktuelle Station als gelöst"
          onClick={handleSkip}
        />
        <AdminAction
          icon="↺"
          title="Spiel zurücksetzen"
          hint="Fortschritt löschen, neu starten"
          danger
          onClick={handleReset}
        />

        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: 6,
            padding: "14px",
            background: "transparent",
            color: "#7a6f56",
            border: "2px dashed #c9b787",
            borderRadius: 14,
            fontFamily: "Nunito, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

type ActionProps = {
  icon: string;
  title: string;
  hint?: string;
  danger?: boolean;
  onClick: () => void;
};

function AdminAction({ icon, title, hint, danger, onClick }: ActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "#fdfaf2",
        border: `1.5px solid ${danger ? "#f0c5bf" : "#ece3cb"}`,
        borderRadius: 14,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: danger ? "#f9e2dc" : "#f6efd9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>
        <span
          style={{
            display: "block",
            fontFamily: "Nunito, sans-serif",
            fontSize: 16,
            fontWeight: 800,
            color: danger ? "#a33d35" : "#3d4a35",
          }}
        >
          {title}
        </span>
        {hint && (
          <span
            style={{
              display: "block",
              fontFamily: "Nunito, sans-serif",
              fontSize: 12,
              color: "#9b8e6a",
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            {hint}
          </span>
        )}
      </span>
      <span aria-hidden="true" style={{ color: "#9b8e6a", fontSize: 22, fontWeight: 600 }}>
        ›
      </span>
    </button>
  );
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 0xff;
  let g = (n >> 8) & 0xff;
  let b = n & 0xff;
  r = Math.max(0, Math.min(255, Math.round(r + 255 * amt)));
  g = Math.max(0, Math.min(255, Math.round(g + 255 * amt)));
  b = Math.max(0, Math.min(255, Math.round(b + 255 * amt)));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}
