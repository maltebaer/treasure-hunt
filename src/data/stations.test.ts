import { describe, it, expect } from "vitest";
import { CHILDREN, FIXED_ASSIGNMENTS, STATIONS } from "./stations";

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

  it("marks only station 8 as the treasure", () => {
    const treasures = STATIONS.filter((s) => s.isTreasure);
    expect(treasures).toHaveLength(1);
    expect(treasures[0].id).toBe(8);
  });

  it("fills the required text fields", () => {
    for (const s of STATIONS) {
      expect(s.scarfColor, `station ${s.id} scarfColor`).toMatch(/^#[0-9a-f]{6}$/i);
      expect(s.scarfColorLabel, `station ${s.id} scarfColorLabel`).toBeTruthy();
      expect(s.question, `station ${s.id} question`).toBeTruthy();
      if (s.id === 1) {
        expect(s.direction, `station ${s.id} direction`).toBeNull();
        expect(s.directionShort, `station ${s.id} directionShort`).toBeNull();
      } else {
        expect(s.direction, `station ${s.id} direction`).toBeTruthy();
        expect(s.directionShort, `station ${s.id} directionShort`).toBeTruthy();
      }
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

  it("matches the direction / scarf chain per slot", () => {
    const expected = [
      { id: 1, directionShort: null, scarfColorLabel: "rosa" },
      { id: 2, directionShort: "O", scarfColorLabel: "hellblaue" },
      { id: 3, directionShort: "SW", scarfColorLabel: "rote" },
      { id: 4, directionShort: "SW", scarfColorLabel: "lila" },
      { id: 5, directionShort: "W", scarfColorLabel: "gelbe" },
      { id: 6, directionShort: "SO", scarfColorLabel: "orange" },
      { id: 7, directionShort: "NO", scarfColorLabel: "grüne" },
      { id: 8, directionShort: "N", scarfColorLabel: "dunkelblaue" },
    ];
    expect(
      STATIONS.map((s) => ({
        id: s.id,
        directionShort: s.directionShort,
        scarfColorLabel: s.scarfColorLabel,
      })),
    ).toEqual(expected);
  });
});

describe("CHILDREN list", () => {
  it("contains exactly the 8 expected names in order", () => {
    expect(CHILDREN).toEqual([
      "FINJA",
      "LINA",
      "FRIEDI",
      "FIETE",
      "ESMEE",
      "RONJA",
      "MILLA",
      "MICHEL",
    ]);
  });

  it("locks MILLA to slot 1 and MICHEL to slot 8 in FIXED_ASSIGNMENTS", () => {
    expect(FIXED_ASSIGNMENTS.MILLA).toBe(1);
    expect(FIXED_ASSIGNMENTS.MICHEL).toBe(8);
  });

  it("leaves the other 6 children unfixed (null)", () => {
    for (const name of ["FINJA", "LINA", "FRIEDI", "FIETE", "ESMEE", "RONJA"] as const) {
      expect(FIXED_ASSIGNMENTS[name], name).toBeNull();
    }
  });
});
