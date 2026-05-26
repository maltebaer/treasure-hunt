import type { CSSProperties } from "react";

export const SCARF = {
  red: "#d8625a",
  blue: "#5b8fc7",
  yellow: "#e6c25c",
  green: "#7aa86b",
  orange: "#d9874b",
  purple: "#9a7bb6",
  gold: "#c89a3f",
} as const;

export const PAPER = "#fbf6ec";
export const INK = "#3d4a35";
export const EARTH = "#7a5a3d";
export const MUTED = "#9b8e6a";

export function WatercolorDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="wc-wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
        <filter id="wc-wobble-strong" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="12" />
        </filter>
      </defs>
    </svg>
  );
}

type BlobProps = {
  cx: number;
  cy: number;
  r?: number;
  fill: string;
  opacity?: number;
  seed?: number;
  wobble?: "wc-wobble" | "wc-wobble-strong";
  style?: CSSProperties;
};

export function WCBlob({
  cx,
  cy,
  r = 40,
  fill,
  opacity = 0.55,
  seed = 0,
  wobble = "wc-wobble",
  style,
}: BlobProps) {
  const N = 24;
  const pts: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const j = 0.78 + 0.32 * Math.abs(Math.sin(seed * 13.7 + i * 4.9));
    pts.push([cx + Math.cos(a) * r * j, cy + Math.sin(a) * r * j]);
  }
  const d = "M" + pts.map((p) => p.join(",")).join(" L") + " Z";
  return (
    <path
      d={d}
      fill={fill}
      opacity={opacity}
      filter={`url(#${wobble})`}
      style={style}
    />
  );
}

type SplashProps = {
  cx: number;
  cy: number;
  r?: number;
  fill: string;
  seed?: number;
  opacity?: number;
};

export function WCSplash({
  cx,
  cy,
  r = 80,
  fill,
  seed = 1,
  opacity = 0.45,
}: SplashProps) {
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      <WCBlob cx={cx} cy={cy} r={r * 1.1} fill={fill} opacity={opacity * 0.55} seed={seed} />
      <WCBlob cx={cx + r * 0.1} cy={cy - r * 0.1} r={r * 0.85} fill={fill} opacity={opacity * 0.75} seed={seed + 1} />
      <WCBlob cx={cx - r * 0.15} cy={cy + r * 0.08} r={r * 0.65} fill={fill} opacity={opacity * 0.9} seed={seed + 2} />
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + seed;
        const dr = r * (1.05 + 0.25 * Math.sin(seed + i * 2.1));
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * dr}
            cy={cy + Math.sin(a) * dr}
            r={1.2 + 1.4 * Math.abs(Math.sin(seed * 2 + i))}
            fill={fill}
            opacity={opacity * 0.7}
          />
        );
      })}
    </g>
  );
}

type TreeProps = {
  cx: number;
  cy: number;
  r?: number;
  hue?: string;
  seed?: number;
};

export function WCTree({ cx, cy, r = 26, hue = "#7aa86b", seed = 1 }: TreeProps) {
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      <WCBlob cx={cx} cy={cy + r * 0.4} r={r * 0.4} fill="#8a7355" opacity={0.35} seed={seed + 9} />
      <WCBlob cx={cx} cy={cy} r={r} fill={hue} opacity={0.55} seed={seed} />
      <WCBlob cx={cx - r * 0.2} cy={cy - r * 0.15} r={r * 0.7} fill={hue} opacity={0.7} seed={seed + 1} />
      <WCBlob cx={cx + r * 0.25} cy={cy + r * 0.1} r={r * 0.55} fill="#5d8a4f" opacity={0.45} seed={seed + 2} />
    </g>
  );
}
