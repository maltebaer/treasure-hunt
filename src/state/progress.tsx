import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "treasure-hunt:progress";
export const TOTAL_STATIONS = 7;

export type Progress = {
  solvedStations: number[];
};

const DEFAULT_PROGRESS: Progress = { solvedStations: [] };

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as { solvedStations?: unknown }).solvedStations)
    ) {
      return { ...DEFAULT_PROGRESS };
    }
    const solved = (parsed as { solvedStations: unknown[] }).solvedStations
      .filter((n): n is number => typeof n === "number");
    return { solvedStations: solved };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function deriveCurrentStation(solvedStations: number[]): number | null {
  for (let id = 1; id <= TOTAL_STATIONS; id++) {
    if (!solvedStations.includes(id)) return id;
  }
  return null;
}

export type UseProgressResult = {
  solvedStations: number[];
  currentStation: number | null;
  solve: (stationId: number) => void;
};

const ProgressContext = createContext<UseProgressResult | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [solvedStations, setSolvedStations] = useState<number[]>(
    () => loadProgress().solvedStations,
  );

  const solve = useCallback((stationId: number) => {
    setSolvedStations((prev) => {
      if (prev.includes(stationId)) return prev;
      const next = [...prev, stationId];
      saveProgress({ solvedStations: next });
      return next;
    });
  }, []);

  const currentStation = useMemo(
    () => deriveCurrentStation(solvedStations),
    [solvedStations],
  );

  const value = useMemo<UseProgressResult>(
    () => ({ solvedStations, currentStation, solve }),
    [solvedStations, currentStation, solve],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): UseProgressResult {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
