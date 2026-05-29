import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CHILDREN,
  FIXED_ASSIGNMENTS,
  type ChildName,
} from "../data/stations";

const STORAGE_KEY = "treasure-hunt:progress";
const ASSIGNMENTS_KEY = "treasure-hunt:assignments";
export const TOTAL_STATIONS = 8;

export type Progress = {
  solvedStations: number[];
};

export type Assignments = Record<number, ChildName>;

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

export function loadAssignments(): Assignments {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const out: Assignments = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      const slot = Number(k);
      if (
        Number.isInteger(slot) &&
        slot >= 1 &&
        slot <= TOTAL_STATIONS &&
        typeof v === "string" &&
        (CHILDREN as readonly string[]).includes(v)
      ) {
        out[slot] = v as ChildName;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function saveAssignments(assignments: Assignments): void {
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

function deriveCurrentStation(solvedStations: number[]): number | null {
  for (let id = 1; id <= TOTAL_STATIONS; id++) {
    if (!solvedStations.includes(id)) return id;
  }
  return null;
}

export function pickSlotForName(
  childName: ChildName,
  assignments: Assignments,
  randomFn: () => number = Math.random,
): number | null {
  if (Object.values(assignments).includes(childName)) return null;
  const fixed = FIXED_ASSIGNMENTS[childName];
  if (fixed !== null) {
    return assignments[fixed] ? null : fixed;
  }
  const taken = new Set(Object.keys(assignments).map(Number));
  const candidates: number[] = [];
  for (let id = 2; id <= TOTAL_STATIONS - 1; id++) {
    if (!taken.has(id)) candidates.push(id);
  }
  if (candidates.length === 0) return null;
  const i = Math.floor(randomFn() * candidates.length);
  return candidates[i];
}

export type UseProgressResult = {
  solvedStations: number[];
  currentStation: number | null;
  assignments: Assignments;
  solve: (stationId: number) => void;
  reset: () => void;
  jumpTo: (stationId: number) => void;
  skipCurrent: () => void;
  commitAssignment: (slot: number, childName: ChildName) => void;
  resetAssignments: () => void;
};

const ProgressContext = createContext<UseProgressResult | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [solvedStations, setSolvedStations] = useState<number[]>(
    () => loadProgress().solvedStations,
  );
  const [assignments, setAssignments] = useState<Assignments>(
    () => loadAssignments(),
  );

  const solve = useCallback((stationId: number) => {
    setSolvedStations((prev) => {
      if (prev.includes(stationId)) return prev;
      const next = [...prev, stationId];
      saveProgress({ solvedStations: next });
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSolvedStations([]);
    setAssignments({});
    saveProgress({ solvedStations: [] });
    saveAssignments({});
  }, []);

  const jumpTo = useCallback((stationId: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_STATIONS, stationId));
    const next = Array.from({ length: clamped - 1 }, (_, i) => i + 1);
    setSolvedStations(next);
    saveProgress({ solvedStations: next });
  }, []);

  const skipCurrent = useCallback(() => {
    setSolvedStations((prev) => {
      const current = deriveCurrentStation(prev);
      if (current === null) return prev;
      const next = [...prev, current];
      saveProgress({ solvedStations: next });
      return next;
    });
  }, []);

  const commitAssignment = useCallback(
    (slot: number, childName: ChildName) => {
      setAssignments((prev) => {
        if (prev[slot]) return prev;
        if (Object.values(prev).includes(childName)) return prev;
        const next = { ...prev, [slot]: childName };
        saveAssignments(next);
        return next;
      });
    },
    [],
  );

  const resetAssignments = useCallback(() => {
    setAssignments({});
    saveAssignments({});
  }, []);

  const currentStation = useMemo(
    () => deriveCurrentStation(solvedStations),
    [solvedStations],
  );

  const value = useMemo<UseProgressResult>(
    () => ({
      solvedStations,
      currentStation,
      assignments,
      solve,
      reset,
      jumpTo,
      skipCurrent,
      commitAssignment,
      resetAssignments,
    }),
    [
      solvedStations,
      currentStation,
      assignments,
      solve,
      reset,
      jumpTo,
      skipCurrent,
      commitAssignment,
      resetAssignments,
    ],
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
