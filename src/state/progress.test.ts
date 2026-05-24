import { describe, it, expect, beforeEach } from "vitest";
import { loadProgress, saveProgress } from "./progress";

describe("progress", () => {
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
    localStorage.setItem("treasure-hunt:progress", "{not json");
    expect(loadProgress()).toEqual({ solvedStations: [] });
  });

  it("returns default when solvedStations is missing or wrong type", () => {
    localStorage.setItem("treasure-hunt:progress", '{"foo":"bar"}');
    expect(loadProgress()).toEqual({ solvedStations: [] });
  });
});
