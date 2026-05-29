import { describe, it, expect } from "vitest";
import { STATIONS } from "./stations";

describe("STATIONS data", () => {
  it("contains exactly eight stations", () => {
    expect(STATIONS).toHaveLength(8);
  });

  it("uses consecutive IDs 1-8", () => {
    expect(STATIONS.map((s) => s.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
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

  it("marks only station 8 (Michel) as the treasure", () => {
    const treasures = STATIONS.filter((s) => s.isTreasure);
    expect(treasures).toHaveLength(1);
    expect(treasures[0].id).toBe(8);
    expect(treasures[0].childName).toBe("Michel");
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

  it("matches the child / direction / scarf chain", () => {
    const expected = [
      { id: 1, childName: "Finja", directionShort: "NW", scarfColorLabel: "rosa" },
      { id: 2, childName: "Lina", directionShort: "O", scarfColorLabel: "hellblaue" },
      { id: 3, childName: "Friedi", directionShort: "SW", scarfColorLabel: "rote" },
      { id: 4, childName: "Fiete", directionShort: "SW", scarfColorLabel: "lila" },
      { id: 5, childName: "Esmee", directionShort: "W", scarfColorLabel: "gelbe" },
      { id: 6, childName: "Ronja", directionShort: "SO", scarfColorLabel: "orange" },
      { id: 7, childName: "Milla", directionShort: "NO", scarfColorLabel: "grüne" },
      { id: 8, childName: "Michel", directionShort: "N", scarfColorLabel: "dunkelblaue" },
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
