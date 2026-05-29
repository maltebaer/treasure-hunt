import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  loadProgress,
  ProgressProvider,
  saveProgress,
  useProgress,
} from "./progress";

const STORAGE_KEY = "treasure-hunt:progress";

describe("loadProgress / saveProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty progress when localStorage is empty", () => {
    expect(loadProgress()).toEqual({ solvedStations: [] });
  });

  it("round-trips saved progress", () => {
    saveProgress({ solvedStations: [1, 2] });
    expect(loadProgress()).toEqual({ solvedStations: [1, 2] });
  });

  it("returns default on invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadProgress()).toEqual({ solvedStations: [] });
  });

  it("returns default when solvedStations is missing or wrong type", () => {
    localStorage.setItem(STORAGE_KEY, '{"foo":"bar"}');
    expect(loadProgress()).toEqual({ solvedStations: [] });
  });
});

describe("useProgress (via ProgressProvider)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty solvedStations and currentStation === 1", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    expect(result.current.solvedStations).toEqual([]);
    expect(result.current.currentStation).toBe(1);
  });

  it("solve(1) updates solvedStations and currentStation === 2", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.solve(1));
    expect(result.current.solvedStations).toEqual([1]);
    expect(result.current.currentStation).toBe(2);
  });

  it("hydrates currentStation from existing localStorage progress", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    expect(result.current.currentStation).toBe(2);
  });

  it("returns currentStation === null when all 8 are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7, 8] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    expect(result.current.currentStation).toBeNull();
  });

  it("solve persists to localStorage", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.solve(1));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.solvedStations).toEqual([1]);
  });

  it("solve is idempotent", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.solve(1));
    act(() => result.current.solve(1));
    expect(result.current.solvedStations).toEqual([1]);
  });

  it("reset clears solvedStations and localStorage", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.reset());
    expect(result.current.solvedStations).toEqual([]);
    expect(result.current.currentStation).toBe(1);
    expect(
      JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").solvedStations,
    ).toEqual([]);
  });

  it("jumpTo(4) marks 1-3 solved and currentStation === 4", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.jumpTo(4));
    expect(result.current.solvedStations).toEqual([1, 2, 3]);
    expect(result.current.currentStation).toBe(4);
  });

  it("jumpTo(1) clears progress", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.jumpTo(1));
    expect(result.current.solvedStations).toEqual([]);
    expect(result.current.currentStation).toBe(1);
  });

  it("jumpTo clamps to valid range", () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.jumpTo(99));
    expect(result.current.solvedStations).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(result.current.currentStation).toBe(8);
  });

  it("skipCurrent marks the current station solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.skipCurrent());
    expect(result.current.solvedStations).toEqual([1, 2]);
    expect(result.current.currentStation).toBe(3);
  });

  it("skipCurrent is a no-op when all stations are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7, 8] }),
    );
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider,
    });
    act(() => result.current.skipCurrent());
    expect(result.current.solvedStations).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result.current.currentStation).toBeNull();
  });
});
