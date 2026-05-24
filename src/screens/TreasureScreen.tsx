type Props = {
  onViewMap: () => void;
};

export default function TreasureScreen({ onViewMap }: Props) {
  return (
    <main
      data-testid="treasure-screen"
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #fbc02d 0%, #fff8e1 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <div style={{ fontSize: "6rem", lineHeight: 1 }} aria-hidden="true">
        🏆
      </div>
      <h1 style={{ fontSize: "3rem", margin: 0 }}>GESCHAFFT!</h1>
      <h2 style={{ fontSize: "2rem", margin: 0 }}>DER SCHATZ!</h2>
      <p style={{ fontSize: "1.5rem", margin: 0 }}>
        Alles Gute zum Geburtstag, Michel! 🎂
      </p>
      <button
        type="button"
        onClick={onViewMap}
        style={{
          marginTop: "2rem",
          background: "transparent",
          border: "none",
          textDecoration: "underline",
          fontSize: "1rem",
          cursor: "pointer",
          color: "#5d4037",
        }}
      >
        Zurück zur Karte
      </button>
    </main>
  );
}
