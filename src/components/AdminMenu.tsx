import { useProgress } from "../state/progress";
import { STATIONS } from "../data/stations";

type Props = {
  onClose: () => void;
};

export default function AdminMenu({ onClose }: Props) {
  const { reset, jumpTo, skipCurrent } = useProgress();

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
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "28rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Admin</h2>
        <button type="button" onClick={handleReset}>
          Spiel zurücksetzen
        </button>
        <button type="button" onClick={handleSkip}>
          Nächste Station überspringen
        </button>
        <div>
          <p style={{ margin: "0 0 0.5rem 0" }}>Springe zu Station:</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {STATIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Springe zu Station ${s.id}`}
                onClick={() => handleJump(s.id)}
                style={{
                  minWidth: "3rem",
                  padding: "0.75rem",
                  fontSize: "1.25rem",
                }}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}
