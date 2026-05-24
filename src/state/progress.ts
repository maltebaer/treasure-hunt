const STORAGE_KEY = "treasure-hunt:progress";

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
