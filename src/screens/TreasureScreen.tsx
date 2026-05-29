import { useEffect } from "react";
import { shower } from "../lib/confetti";
import { WCBlob, WCSplash, WatercolorDefs } from "../components/watercolor";

type Props = {
  onViewMap: () => void;
};

const CONFETTI_COLORS = [
  "#d8625a",
  "#5b8fc7",
  "#e6c25c",
  "#7aa86b",
  "#d9874b",
  "#9a7bb6",
  "#c89a3f",
];

export default function TreasureScreen({ onViewMap }: Props) {
  useEffect(() => {
    shower();
  }, []);

  return (
    <main
      data-testid="treasure-screen"
      style={{
        position: "fixed",
        inset: 0,
        background: "#fbf6ec",
        overflow: "hidden",
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
    >
      <WatercolorDefs />

      <svg
        viewBox="0 0 700 1000"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <g style={{ mixBlendMode: "multiply" }}>
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M 350 500 L ${350 + Math.cos((i * Math.PI) / 6) * 600} ${
                500 + Math.sin((i * Math.PI) / 6) * 600
              } L ${
                350 + Math.cos(((i + 0.5) * Math.PI) / 6) * 600
              } ${500 + Math.sin(((i + 0.5) * Math.PI) / 6) * 600} Z`}
              fill={i % 2 === 0 ? "#f5e6b8" : "#fbf2d3"}
              opacity={0.5}
              filter="url(#wc-wobble-strong)"
            />
          ))}
        </g>
        <WCSplash cx={350} cy={520} r={260} fill="#e6c25c" seed={1} opacity={0.6} />
        {[...Array(60)].map((_, i) => {
          const c = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
          const x = (i * 89 + 13) % 700;
          const y = (i * 53 + 7) % 1000;
          const rot = (i * 23) % 360;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={8}
              height={14}
              fill={c}
              opacity={0.85}
              transform={`rotate(${rot} ${x + 4} ${y + 7})`}
              filter="url(#wc-wobble)"
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "min(8vh, 70px) 26px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: 72,
            color: "#3d4a35",
            lineHeight: 0.95,
            fontWeight: 700,
            margin: 0,
          }}
        >
          Schatz gefunden!
        </h1>
        <p
          style={{
            margin: 0,
            marginTop: 8,
            fontFamily: "Nunito, sans-serif",
            fontSize: 22,
            color: "#6b6354",
            fontWeight: 700,
          }}
        >
          Herzlichen Glückwunsch, Michel
          <span aria-hidden="true"> 🎉</span>
        </p>
        <h2
          style={{
            margin: 0,
            marginTop: 6,
            fontFamily: "Caveat, cursive",
            fontSize: 36,
            color: "#7a5a3d",
            fontWeight: 700,
          }}
        >
          GESCHAFFT! DER SCHATZ!
        </h2>

        <svg
          width={260}
          height={190}
          viewBox="0 0 280 200"
          style={{ marginTop: 24 }}
          aria-hidden="true"
        >
          <WCBlob cx={140} cy={140} r={120} fill="#7a5a3d" opacity={0.18} seed={3} />
          <rect x={50} y={70} width={180} height={110} rx={10} fill="#a87938" filter="url(#wc-wobble)" />
          <rect x={50} y={70} width={180} height={40} rx={8} fill="#7a5a28" filter="url(#wc-wobble)" />
          <rect x={50} y={108} width={180} height={6} fill="#5a3f18" opacity={0.7} />
          <rect x={128} y={96} width={24} height={28} rx={3} fill="#3d2818" />
          <circle cx={140} cy={108} r={4} fill="#e6c25c" />
          <circle cx={90} cy={70} r={14} fill="#e6c25c" filter="url(#wc-wobble)" />
          <circle cx={120} cy={62} r={11} fill="#f0d27a" filter="url(#wc-wobble)" />
          <circle cx={155} cy={66} r={13} fill="#e6c25c" filter="url(#wc-wobble)" />
          <circle cx={185} cy={70} r={10} fill="#f0d27a" filter="url(#wc-wobble)" />
          <circle cx={75} cy={186} r={9} fill="#e6c25c" filter="url(#wc-wobble)" />
          <circle cx={210} cy={184} r={10} fill="#f0d27a" filter="url(#wc-wobble)" />
        </svg>

        <p
          style={{
            margin: 0,
            marginTop: 18,
            background: "rgba(253,250,242,0.85)",
            padding: "18px 24px",
            borderRadius: 22,
            boxShadow: "0 8px 22px -10px rgba(40,30,10,0.2)",
            fontFamily: "Nunito, sans-serif",
            fontSize: 18,
            color: "#3d4a35",
            fontWeight: 600,
            lineHeight: 1.4,
            maxWidth: 480,
          }}
        >
          Alles Gute zum Geburtstag, Michel <span aria-hidden="true">🎂</span>
          <br />
          Alle acht Stationen gemeistert. Ihr seid{" "}
          <strong style={{ color: "#7a5a3d" }}>Schatzsuch-Profis</strong>!
        </p>

        <button
          type="button"
          onClick={onViewMap}
          style={{
            marginTop: "auto",
            width: "100%",
            maxWidth: 480,
            padding: "18px",
            background: "transparent",
            color: "#7a6f56",
            border: "2px dashed #c9b787",
            borderRadius: 18,
            fontFamily: "Nunito, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Zurück zur Karte
        </button>
      </div>
    </main>
  );
}
