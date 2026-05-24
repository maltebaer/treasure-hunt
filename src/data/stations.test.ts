import { describe, it, expect } from "vitest";
import { STATIONS } from "./stations";

describe("STATIONS data", () => {
  it("contains exactly seven stations", () => {
    expect(STATIONS).toHaveLength(7);
  });

  it("uses consecutive IDs 1-7", () => {
    expect(STATIONS.map((s) => s.id)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("has exactly three options per station", () => {
    for (const s of STATIONS) {
      expect(s.options, `station ${s.id}`).toHaveLength(3);
    }
  });

  it("has exactly one correct option per station", () => {
    for (const s of STATIONS) {
      const correct = s.options.filter((o) => o.correct);
      expect(correct, `station ${s.id}`).toHaveLength(1);
    }
  });

  it("marks only station 7 as the treasure", () => {
    const treasures = STATIONS.filter((s) => s.isTreasure);
    expect(treasures).toHaveLength(1);
    expect(treasures[0].id).toBe(7);
  });

  it("fills the required text fields", () => {
    for (const s of STATIONS) {
      expect(s.childName, `station ${s.id} childName`).toBeTruthy();
      expect(s.scarfColor, `station ${s.id} scarfColor`).toMatch(/^#[0-9a-f]{6}$/i);
      expect(s.scarfColorLabel, `station ${s.id} scarfColorLabel`).toBeTruthy();
      expect(s.direction, `station ${s.id} direction`).toBeTruthy();
      expect(s.directionShort, `station ${s.id} directionShort`).toBeTruthy();
      expect(s.question, `station ${s.id} question`).toBeTruthy();
    }
  });

  it("places markers within the [0,100] range", () => {
    for (const s of STATIONS) {
      expect(s.markerPosition.x).toBeGreaterThanOrEqual(0);
      expect(s.markerPosition.x).toBeLessThanOrEqual(100);
      expect(s.markerPosition.y).toBeGreaterThanOrEqual(0);
      expect(s.markerPosition.y).toBeLessThanOrEqual(100);
    }
  });

  it("matches the PRD child / direction / scarf chain", () => {
    const expected = [
      { id: 1, childName: "Finja", directionShort: "NW", scarfColorLabel: "rote" },
      { id: 2, childName: "Lina", directionShort: "O", scarfColorLabel: "blaue" },
      { id: 3, childName: "Friedi", directionShort: "SW", scarfColorLabel: "gelbe" },
      { id: 4, childName: "Fiete", directionShort: "SW", scarfColorLabel: "grüne" },
      { id: 5, childName: "Esmee", directionShort: "W", scarfColorLabel: "orange" },
      { id: 6, childName: "Ronja", directionShort: "SO", scarfColorLabel: "lila" },
      { id: 7, childName: "Michel", directionShort: "N", scarfColorLabel: "goldene" },
    ];
    expect(
      STATIONS.map((s) => ({
        id: s.id,
        childName: s.childName,
        directionShort: s.directionShort,
        scarfColorLabel: s.scarfColorLabel,
      })),
    ).toEqual(expected);
  });
});
