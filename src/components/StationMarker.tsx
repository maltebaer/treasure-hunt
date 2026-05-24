export type MarkerState = "active" | "locked" | "solved";

type Props = {
  id: number;
  x: number;
  y: number;
  color: string;
  state: MarkerState;
  onClick: () => void;
};

export default function StationMarker({
  id,
  x,
  y,
  color,
  state,
  onClick,
}: Props) {
  const isActive = state === "active";
  const isSolved = state === "solved";
  const displayColor = isActive || isSolved ? color : "#888";
  const opacity = state === "locked" ? 0.4 : 1;

  return (
    <button
      type="button"
      aria-label={`Station ${id}`}
      data-testid={`station-marker-${id}`}
      data-state={state}
      disabled={!isActive}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        color: displayColor,
        opacity,
        background: "transparent",
        border: "none",
        padding: 0,
        fontSize: "3rem",
        cursor: isActive ? "pointer" : "default",
        animation: isActive ? "marker-pulse 1.5s ease-in-out infinite" : "none",
        lineHeight: 1,
      }}
    >
      {isSolved ? "✓" : "✗"}
    </button>
  );
}
