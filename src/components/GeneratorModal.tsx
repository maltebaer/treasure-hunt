import { useEffect, useRef, useState } from "react";
import { useProgress, pickSlotForName } from "../state/progress";
import { CHILDREN, STATIONS, type ChildName } from "../data/stations";
import { burst } from "../lib/confetti";

type Props = {
  onClose: () => void;
};

const SPIN_TICK_MS = 120;
const SPIN_TOTAL_MS = 1500;

export default function GeneratorModal({ onClose }: Props) {
  const { assignments, commitAssignment } = useProgress();
  const [spinningName, setSpinningName] = useState<ChildName | null>(null);
  const [spotlightedSlot, setSpotlightedSlot] = useState<number | null>(null);
  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);

  function handlePick(childName: ChildName) {
    if (spinningName) return;
    const target = pickSlotForName(childName, assignments);
    if (target === null) return;
    setSpinningName(childName);

    let i = 0;
    tickTimerRef.current = setInterval(() => {
      i = (i + 1) % STATIONS.length;
      setSpotlightedSlot(STATIONS[i].id);
    }, SPIN_TICK_MS);

    endTimerRef.current = setTimeout(() => {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
      setSpotlightedSlot(target);
      commitAssignment(target, childName);
      burst();
      setSpinningName(null);
    }, SPIN_TOTAL_MS);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Glücksrad"
      data-testid="generator-modal"
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
          padding: "26px 22px",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              Wer kriegt welches Tuch?
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
              Glücksrad
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Glücksrad schließen"
            disabled={spinningName !== null}
            style={{
              width: 38,
              height: 38,
              border: "none",
              background: "#f3ead7",
              borderRadius: "50%",
              fontSize: 18,
              color: "#7a5a3d",
              fontWeight: 700,
              cursor: spinningName ? "default" : "pointer",
              opacity: spinningName ? 0.5 : 1,
            }}
          >
            ✕
          </button>
        </div>

        <div
          data-testid="generator-tiles"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${STATIONS.length}, 1fr)`,
            gap: 6,
          }}
        >
          {STATIONS.map((s) => {
            const assignedName = assignments[s.id] ?? null;
            const isSpotlighted = spotlightedSlot === s.id;
            return (
              <div
                key={s.id}
                data-testid={`generator-tile-${s.id}`}
                data-spotlighted={isSpotlighted ? "true" : "false"}
                style={{
                  background: s.scarfColor,
                  borderRadius: 12,
                  padding: "10px 0 8px",
                  textAlign: "center",
                  color: "#fbf6ec",
                  border: isSpotlighted
                    ? "3px solid #3d4a35"
                    : "3px solid transparent",
                  transform: isSpotlighted ? "scale(1.08)" : "scale(1)",
                  transition: "transform 100ms ease-out",
                  minHeight: 60,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
                  {s.id}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    marginTop: 4,
                    minHeight: 12,
                  }}
                >
                  {assignedName ?? ""}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: "#ece3cb" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}
        >
          {CHILDREN.map((name) => {
            const isAssigned = Object.values(assignments).includes(name);
            const assignedSlot = Object.entries(assignments).find(
              ([, n]) => n === name,
            )?.[0];
            const disabled = isAssigned || spinningName !== null;
            const isSpinningThis = spinningName === name;
            return (
              <button
                key={name}
                type="button"
                disabled={disabled}
                onClick={() => handlePick(name)}
                aria-label={`${name} zuweisen`}
                style={{
                  padding: "14px 14px",
                  borderRadius: 14,
                  border: "1.5px solid #ece3cb",
                  background: isAssigned ? "#f1ead4" : "#fdfaf2",
                  color: isAssigned ? "#9b8e6a" : "#3d4a35",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: 17,
                  fontWeight: 800,
                  textAlign: "left",
                  cursor: disabled ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  opacity: disabled && !isSpinningThis ? 0.6 : 1,
                }}
              >
                <span>{name}</span>
                {isAssigned && assignedSlot && (
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 12,
                      background: "#ece3cb",
                      borderRadius: 8,
                      padding: "2px 8px",
                      fontWeight: 700,
                    }}
                  >
                    #{assignedSlot}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={spinningName !== null}
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
            cursor: spinningName ? "default" : "pointer",
            opacity: spinningName ? 0.5 : 1,
          }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
