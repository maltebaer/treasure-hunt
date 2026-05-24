import { useState } from "react";
import { loadProgress, saveProgress } from "./state/progress";

type Option = { emoji: string; label: string; correct: boolean };

const station = {
  id: 1,
  childName: "Finja",
  scarfColorLabel: "rote",
  direction: "NORDWEST",
  question:
    "Ich bin gelb-schwarz gestreift, mache Honig und summe. Wer bin ich?",
  options: [
    { emoji: "🐝", label: "Biene", correct: true },
    { emoji: "🐞", label: "Marienkäfer", correct: false },
    { emoji: "🐛", label: "Raupe", correct: false },
  ] as Option[],
};

type View = "riddle" | "success" | "done";

function initialView(): View {
  return loadProgress().solvedStations.includes(station.id) ? "done" : "riddle";
}

export default function App() {
  const [view, setView] = useState<View>(initialView);

  function handleAnswer(option: Option) {
    if (option.correct) setView("success");
  }

  function handleFound() {
    const progress = loadProgress();
    if (!progress.solvedStations.includes(station.id)) {
      saveProgress({
        solvedStations: [...progress.solvedStations, station.id],
      });
    }
    setView("done");
  }

  if (view === "done") {
    return (
      <main>
        <h1>Fertig!</h1>
      </main>
    );
  }

  if (view === "success") {
    return (
      <main>
        <h1>RICHTIG!</h1>
        <p>Geh nach {station.direction}</p>
        <p>Suche das {station.scarfColorLabel} Tuch!</p>
        <button type="button" onClick={handleFound}>
          Tuch gefunden, weiter
        </button>
      </main>
    );
  }

  return (
    <main>
      <header>
        Station {station.id} · {station.childName}
      </header>
      <h1>{station.question}</h1>
      <div>
        {station.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => handleAnswer(option)}
          >
            <span aria-hidden="true">{option.emoji}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
