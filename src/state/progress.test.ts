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

  it("returns currentStation === null when all 7 are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7] }),
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
});
