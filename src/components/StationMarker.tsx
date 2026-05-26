import { WCSplash } from "./watercolor";

export type MarkerState = "active" | "locked" | "solved";

type Props = {
  id: number;
  x: number;
  y: number;
  color: string;
  state: MarkerState;
  childName?: string;
  onClick: () => void;
};

const SIZE = 80;

export default function StationMarker({
  id,
  x,
  y,
  color,
  state,
  childName,
  onClick,
}: Props) {
  const isActive = state === "active";
  const isSolved = state === "solved";
  const isLocked = state === "locked";

  return (
    <button
      type="button"
      aria-label={`Station ${id}${childName ? ` · ${childName}` : ""}`}
      data-testid={`station-marker-${id}`}
      data-state={state}
      disabled={!isActive}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: SIZE,
        height: SIZE,
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: isActive ? "pointer" : "default",
        opacity: isLocked ? 0.45 : 1,
        animation: isActive
          ? "marker-pulse 2.4s ease-in-out infinite"
          : "none",
        lineHeight: 1,
        zIndex: 2,
      }}
    >
      <svg viewBox="-50 -50 100 100" width={SIZE} height={SIZE}>
        <WCSplash
          cx={0}
          cy={0}
          r={28}
          fill={color}
          seed={id + 31}
          opacity={isLocked ? 0.35 : 0.55}
        />
        <circle r={26} fill="#fbf6ec" />
        <circle
          r={26}
          fill={color}
          opacity={isSolved ? 0.85 : 0.92}
          filter="url(#wc-wobble)"
        />
        <circle r={26} fill="none" stroke="#3d4a35" strokeWidth={1.5} opacity={0.4} />
        {isSolved ? (
          <path
            d="M -10,0 L -3,9 L 13,-9"
            fill="none"
            stroke="#fbf6ec"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fbf6ec"
            fontFamily="Nunito, sans-serif"
            fontWeight={900}
            fontSize={32}
            style={{ paintOrder: "stroke" }}
            stroke="rgba(60,50,30,0.25)"
            strokeWidth={1}
          >
            {id}
          </text>
        )}
      </svg>
      {childName && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translate(-50%, 2px)",
            fontFamily: "Nunito, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#3d4a35",
            whiteSpace: "nowrap",
            textShadow:
              "0 0 4px #fbf6ec, 0 0 4px #fbf6ec, 0 0 4px #fbf6ec",
            pointerEvents: "none",
          }}
        >
          {childName}
        </span>
      )}
    </button>
  );
}
