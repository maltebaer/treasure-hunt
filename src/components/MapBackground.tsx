import { STATIONS } from "../data/stations";
import { WCBlob, WCTree, WCSplash } from "./watercolor";

const VB_W = 700;
const VB_H = 1000;
const TREASURE = { x: 380, y: 870 };

export default function MapBackground() {
  const points = STATIONS.map((s) => ({
    x: (s.markerPosition.x / 100) * VB_W,
    y: (s.markerPosition.y / 100) * VB_H,
  }));

  return (
    <svg
      role="img"
      aria-label="Schatzkarte"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <rect width={VB_W} height={VB_H} fill="#fbf6ec" />

      <WCBlob cx={300} cy={400} r={300} fill="#bfd8a8" opacity={0.45} seed={1} wobble="wc-wobble-strong" />
      <WCBlob cx={480} cy={700} r={260} fill="#cae3b0" opacity={0.4} seed={2} wobble="wc-wobble-strong" />
      <WCBlob cx={180} cy={750} r={180} fill="#b6cf9a" opacity={0.5} seed={3} />

      <WCTree cx={80} cy={260} r={26} hue="#7aa86b" seed={4} />
      <WCTree cx={620} cy={180} r={30} hue="#6b9858" seed={5} />
      <WCTree cx={650} cy={550} r={24} hue="#7aa86b" seed={6} />
      <WCTree cx={50} cy={580} r={28} hue="#8ab87a" seed={7} />
      <WCTree cx={150} cy={400} r={22} hue="#6b9858" seed={8} />
      <WCTree cx={420} cy={380} r={20} hue="#7aa86b" seed={9} />
      <WCTree cx={300} cy={580} r={24} hue="#8ab87a" seed={10} />
      <WCTree cx={580} cy={830} r={28} hue="#6b9858" seed={11} />

      {points.map((p, i) => {
        if (i === 0) return null;
        const prev = points[i - 1];
        const len = Math.hypot(p.x - prev.x, p.y - prev.y);
        const steps = Math.floor(len / 22);
        return [...Array(steps)].map((_, j) => {
          const t = (j + 1) / (steps + 1);
          const px = prev.x + (p.x - prev.x) * t + Math.sin(j * 2 + i) * 4;
          const py = prev.y + (p.y - prev.y) * t + Math.cos(j * 1.7 + i) * 4;
          return (
            <circle
              key={`${i}-${j}`}
              cx={px}
              cy={py}
              r={3}
              fill="#9b8868"
              opacity={0.6}
            />
          );
        });
      })}

      <g transform={`translate(${TREASURE.x},${TREASURE.y})`} opacity={0.5}>
        <WCSplash cx={0} cy={0} r={50} fill="#c89a3f" seed={40} opacity={0.5} />
        <rect x={-30} y={-20} width={60} height={38} rx={5} fill="#a87938" filter="url(#wc-wobble)" />
        <rect x={-30} y={-20} width={60} height={12} rx={3} fill="#7a5a28" filter="url(#wc-wobble)" />
        <text
          y={55}
          textAnchor="middle"
          fontFamily="Nunito, sans-serif"
          fontSize={14}
          fontWeight={700}
          fill="#7a5a3d"
        >
          Schatz
        </text>
      </g>

      <g transform="translate(80, 920)">
        <circle r={48} fill="#fbf6ec" opacity={0.9} filter="url(#wc-wobble)" />
        <circle r={48} fill="none" stroke="#7a5a3d" strokeWidth={2} opacity={0.6} />
        <path d="M 0,-44 L 7,0 L 0,44 L -7,0 Z" fill="#d8625a" opacity={0.78} filter="url(#wc-wobble)" />
        <path d="M -44,0 L 0,-7 L 44,0 L 0,7 Z" fill="#3d4a35" opacity={0.55} filter="url(#wc-wobble)" />
        <text y={-52} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={13} fontWeight={800} fill="#3d4a35">N</text>
        <text y={62} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={13} fontWeight={800} fill="#3d4a35">S</text>
        <text x={-56} y={5} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={13} fontWeight={800} fill="#3d4a35">W</text>
        <text x={56} y={5} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={13} fontWeight={800} fill="#3d4a35">O</text>
      </g>
    </svg>
  );
}
