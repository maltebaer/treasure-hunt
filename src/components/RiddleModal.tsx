import { useEffect, useState } from "react";
import type { Option, Station } from "../data/stations";
import { burst } from "../lib/confetti";
import { getArrowGlyph } from "../lib/directions";
import { WCBlob, WCSplash } from "./watercolor";

type Props = {
  station: Station;
  onClose: () => void;
  onSolved: (id: number) => void;
};

export default function RiddleModal({ station, onClose, onSolved }: Props) {
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [shakingLabel, setShakingLabel] = useState<string | null>(null);
  const [wrongLabel, setWrongLabel] = useState<string | null>(null);

  useEffect(() => {
    if (answeredCorrectly) burst();
  }, [answeredCorrectly]);

  function handleAnswer(option: Option) {
    if (option.correct) {
      setAnsweredCorrectly(true);
      return;
    }
    setShakingLabel(option.label);
    setWrongLabel(option.label);
    setTimeout(() => {
      setShakingLabel((prev) => (prev === option.label ? null : prev));
    }, 400);
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
        background: "rgba(60, 70, 50, 0.35)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "min(6vh, 60px) 18px 18px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "#fdfaf2",
          borderRadius: 24,
          padding: "32px 28px",
          maxWidth: 560,
          width: "100%",
          maxHeight: "100%",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 12px 30px -10px rgba(40,30,10,0.35), inset 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <svg
          viewBox="0 0 700 110"
          preserveAspectRatio="none"
          width="100%"
          height="110"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            opacity: 0.6,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <WCBlob cx={120} cy={55} r={70} fill={station.scarfColor} opacity={0.35} seed={5} />
          <WCBlob cx={580} cy={45} r={50} fill="#cee0b8" opacity={0.5} seed={6} />
        </svg>

        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            width: 38,
            height: 38,
            border: "none",
            background: "#f3ead7",
            borderRadius: "50%",
            fontSize: 18,
            color: "#7a5a3d",
            cursor: "pointer",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          ✕
        </button>

        {answeredCorrectly ? (
          <CelebrateView station={station} onContinue={handleFound} />
        ) : (
          <RiddleView
            station={station}
            wrongLabel={wrongLabel}
            shakingLabel={shakingLabel}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}

type RiddleViewProps = {
  station: Station;
  wrongLabel: string | null;
  shakingLabel: string | null;
  onAnswer: (option: Option) => void;
};

function RiddleView({
  station,
  wrongLabel,
  shakingLabel,
  onAnswer,
}: RiddleViewProps) {
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 6,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: station.scarfColor,
            opacity: 0.92,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fbf6ec",
            fontFamily: "Nunito, sans-serif",
            fontSize: 30,
            fontWeight: 900,
            boxShadow: "0 4px 10px -4px rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        >
          {station.id}
        </div>
        <div>
          <div
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 13,
              color: "#9b8e6a",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Station {station.id}
          </div>
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: 38,
              color: "#3d4a35",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {station.childName} ist dran
          </div>
        </div>
      </header>

      <h1
        style={{
          marginTop: 26,
          marginBottom: 0,
          fontFamily: "Nunito, sans-serif",
          fontSize: 26,
          color: "#3d4a35",
          fontWeight: 700,
          lineHeight: 1.25,
        }}
      >
        {station.question}
      </h1>

      {wrongLabel ? (
        <div
          style={{
            marginTop: 12,
            padding: "8px 14px",
            background: "#f9e2dc",
            borderRadius: 10,
            color: "#a33d35",
            fontFamily: "Nunito, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            alignSelf: "flex-start",
          }}
        >
          Nochmal versuchen!
        </div>
      ) : (
        <div
          style={{
            marginTop: 8,
            fontFamily: "Nunito, sans-serif",
            fontSize: 16,
            color: "#9b8e6a",
            fontWeight: 600,
          }}
        >
          Tippe auf die richtige Antwort
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 14,
          marginTop: 22,
        }}
      >
        {station.options.map((option) => (
          <ChoiceButton
            key={option.label}
            option={option}
            isShaking={shakingLabel === option.label}
            isWrong={wrongLabel === option.label}
            onClick={() => onAnswer(option)}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#9b8e6a",
          fontFamily: "Nunito, sans-serif",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <span style={{ fontSize: 18 }} aria-hidden="true">
          🚁
        </span>
        <span>Wenn richtig geantwortet: Drohne starten und Tuch suchen.</span>
      </div>
    </>
  );
}

type ChoiceProps = {
  option: Option;
  isShaking: boolean;
  isWrong: boolean;
  onClick: () => void;
};

function ChoiceButton({ option, isShaking, isWrong, onClick }: ChoiceProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={isShaking ? "shaking" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 20px",
        background: isWrong ? "#f9e2dc" : "#fff",
        borderRadius: 18,
        border: `2px solid ${isWrong ? "#d8625a" : "#ece3cb"}`,
        boxShadow: "0 4px 10px -6px rgba(40,30,10,0.18)",
        fontFamily: "Nunito, sans-serif",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: isWrong ? "#f3cdc3" : "#f6efd9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          flexShrink: 0,
        }}
      >
        {option.emoji}
      </span>
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: isWrong ? "#a33d35" : "#3d4a35",
          flex: 1,
        }}
      >
        {option.label}
      </span>
      {isWrong && (
        <svg width={28} height={28} viewBox="0 0 32 32" aria-hidden="true">
          <circle cx={16} cy={16} r={14} fill="#d8625a" filter="url(#wc-wobble)" />
          <path
            d="M 11 11 L 21 21 M 21 11 L 11 21"
            stroke="#fff"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

type CelebrateProps = {
  station: Station;
  onContinue: () => void;
};

function CelebrateView({ station, onContinue }: CelebrateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        flex: 1,
        position: "relative",
        paddingTop: 8,
      }}
    >
      <div
        style={{
          fontFamily: "Caveat, cursive",
          fontSize: 56,
          color: "#3d4a35",
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        Richtig!
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "Nunito, sans-serif",
          fontSize: 18,
          color: "#6b6354",
          fontWeight: 600,
        }}
      >
        {station.directionShort
          ? `${station.childName}, dein Tuch ist im …`
          : `${station.childName}, hier ist dein Tuch!`}
      </div>

      {station.directionShort && (
        <div
          data-testid="direction-label"
          className="direction-pulse"
          style={{
            position: "relative",
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DirectionDial dirShort={station.directionShort} />
          <span aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
            {getArrowGlyph(station.directionShort)}
          </span>
          <div
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 40,
              fontWeight: 900,
              color: "#3d4a35",
              letterSpacing: 2,
              marginTop: 6,
            }}
          >
            {station.direction}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 22,
          background: "#fdfaf2",
          padding: "14px 20px",
          borderRadius: 22,
          boxShadow: "0 8px 22px -10px rgba(40,30,10,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 18,
          border: "1px solid #ece3cb",
        }}
      >
        <svg width={62} height={62} viewBox="0 0 78 78" aria-hidden="true">
          <WCSplash cx={39} cy={39} r={32} fill={station.scarfColor} seed={9} opacity={0.85} />
          <circle cx={39} cy={39} r={22} fill={station.scarfColor} opacity={0.95} filter="url(#wc-wobble)" />
        </svg>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 13,
              color: "#9b8e6a",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Suche das
          </div>
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: 32,
              color: "#3d4a35",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {station.scarfColorLabel} Tuch
          </div>
        </div>
      </div>

      {station.isTreasure && (
        <div
          style={{
            marginTop: 12,
            fontFamily: "Nunito, sans-serif",
            fontSize: 15,
            color: "#7a5a3d",
            fontWeight: 700,
          }}
        >
          Dort liegt der Schatz!
        </div>
      )}

      <button
        type="button"
        onClick={onContinue}
        style={{
          marginTop: "auto",
          width: "100%",
          padding: "20px 24px",
          background: "#3d4a35",
          color: "#fbf6ec",
          border: "none",
          borderRadius: 22,
          fontFamily: "Nunito, sans-serif",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 0.5,
          boxShadow: "0 8px 22px -8px rgba(40,30,10,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          cursor: "pointer",
        }}
      >
        Tuch gefunden, weiter
        <span aria-hidden="true" style={{ fontSize: 22 }}>
          →
        </span>
      </button>
    </div>
  );
}

const DIR_ANGLES: Record<string, number> = {
  N: 0,
  NO: 45,
  O: 90,
  SO: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};

function DirectionDial({ dirShort }: { dirShort: string }) {
  const angle = DIR_ANGLES[dirShort] ?? 0;
  return (
    <svg width={150} height={150} viewBox="0 0 180 180" aria-hidden="true">
      <circle cx={90} cy={90} r={78} fill="#fdfaf2" opacity={0.85} filter="url(#wc-wobble)" />
      <circle cx={90} cy={90} r={78} fill="none" stroke="#3d4a35" strokeWidth={2} opacity={0.5} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1={90}
          y1={20}
          x2={90}
          y2={28}
          stroke="#7a5a3d"
          strokeWidth={2}
          opacity={0.4}
          transform={`rotate(${a} 90 90)`}
        />
      ))}
      <text x={90} y={16} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={14} fontWeight={900} fill="#3d4a35">N</text>
      <text x={90} y={172} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={14} fontWeight={900} fill="#3d4a35">S</text>
      <text x={10} y={95} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={14} fontWeight={900} fill="#3d4a35">W</text>
      <text x={170} y={95} textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize={14} fontWeight={900} fill="#3d4a35">O</text>
      <g transform={`rotate(${angle} 90 90)`}>
        <path d="M 90 30 L 105 90 L 90 80 L 75 90 Z" fill="#d8625a" filter="url(#wc-wobble)" opacity={0.9} />
      </g>
      <circle cx={90} cy={90} r={6} fill="#3d4a35" />
    </svg>
  );
}
