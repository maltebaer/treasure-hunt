export default function MapBackground() {
  return (
    <svg
      role="img"
      aria-label="Schatzkarte"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      {/* Parchment edge vignette */}
      <defs>
        <radialGradient id="parchment-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#e8d5a0" stopOpacity="0" />
          <stop offset="100%" stopColor="#a98c4a" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#parchment-vignette)" />

      {/* Meandering dashed path */}
      <path
        d="M 5 25 Q 30 10, 45 30 T 80 35 Q 90 45, 70 60 T 35 70 Q 15 80, 25 95"
        stroke="#6d4c2a"
        strokeWidth="0.6"
        strokeDasharray="1.5 1.2"
        fill="none"
        opacity="0.65"
      />

      {/* Trees */}
      <Tree x={6} y={55} />
      <Tree x={45} y={42} />
      <Tree x={92} y={48} />
      <Tree x={48} y={88} />

      {/* Compass rose, top-right */}
      <g transform="translate(89 9)">
        <circle r="6" fill="none" stroke="#5d4037" strokeWidth="0.4" />
        <polygon points="0,-5 1.2,0 0,5 -1.2,0" fill="#5d4037" />
        <polygon points="-5,0 0,1.2 5,0 0,-1.2" fill="#8d6e63" />
        <text x="0" y="-6.5" fontSize="2.2" textAnchor="middle" fill="#5d4037">N</text>
        <text x="6.5" y="0.8" fontSize="2.2" textAnchor="middle" fill="#5d4037">O</text>
        <text x="0" y="8.3" fontSize="2.2" textAnchor="middle" fill="#5d4037">S</text>
        <text x="-6.5" y="0.8" fontSize="2.2" textAnchor="middle" fill="#5d4037">W</text>
      </g>

    </svg>
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-0.5" y="0" width="1" height="2" fill="#6d4c2a" />
      <polygon points="0,-4 -2.5,1 2.5,1" fill="#3e7d3a" />
      <polygon points="0,-2 -2,2 2,2" fill="#4a9050" />
    </g>
  );
}
