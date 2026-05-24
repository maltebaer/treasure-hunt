import { useState } from "react";

export type Option = { emoji: string; label: string; correct: boolean };

export type RiddleStation = {
  id: number;
  childName: string;
  scarfColorLabel: string;
  direction: string;
  question: string;
  options: Option[];
};

type Props = {
  station: RiddleStation;
  onClose: () => void;
  onSolved: (id: number) => void;
};

export default function RiddleModal({ station, onClose, onSolved }: Props) {
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  function handleAnswer(option: Option) {
    if (option.correct) setAnsweredCorrectly(true);
  }

  function handleFound() {
    onSolved(station.id);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Station ${station.id} · ${station.childName}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "32rem",
          width: "100%",
          position: "relative",
        }}
      >
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {answeredCorrectly ? (
          <div>
            <h1>RICHTIG!</h1>
            <p>
              Geh nach <strong>{station.direction}</strong>
            </p>
            <p>Suche das {station.scarfColorLabel} Tuch!</p>
            <button type="button" onClick={handleFound}>
              Tuch gefunden, weiter
            </button>
          </div>
        ) : (
          <div>
            <header>
              Station {station.id} · {station.childName}
            </header>
            <h1>{station.question}</h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {station.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  style={{
                    fontSize: "1.25rem",
                    padding: "1rem 1.5rem",
                    borderRadius: "0.75rem",
                    border: "2px solid #ccc",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: "2.5rem" }}>
                    {option.emoji}
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
