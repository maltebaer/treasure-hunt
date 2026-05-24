# 05 — Data-Driven Stations (All 7)

## Why

Replace inline hardcoded riddles with a single data module. All 7 stations playable.

## Acceptance Criteria

- A new file `src/data/stations.ts` exports an array of 7 station objects with this shape:
  ```ts
  type Station = {
    id: number;              // 1..7
    childName: string;       // e.g. "Finja"
    scarfColor: string;      // CSS colour, e.g. "#e53935" (red)
    scarfColorLabel: string; // German, e.g. "rote"
    direction: string;       // German, e.g. "NORDWEST"
    directionShort: string;  // e.g. "NW"
    isTreasure: boolean;     // true only for id 7
    question: string;        // German riddle text
    options: { emoji: string; label: string; correct: boolean }[]; // exactly 3
    markerPosition: { x: number; y: number }; // percent on map, decorative
  };
  ```
- The data is the single source of truth used by the map and the modal.
- All 7 stations are playable in sequence with the riddles from the PRD.
- Solving station 6 (Michel's riddle) reveals direction NORDEN and the scarf colour "goldene".
- Solving station 6 marks station 7 as "active" but tapping station 7 shows a placeholder "Du hast den Schatz gefunden!" view (full finale comes in issue 06).

## Implementation Notes

- `MapScreen` reads positions from `stations[i].markerPosition`.
- `RiddleModal` receives a `Station` prop and renders its question + options.
- Validate at module load (dev-only check): exactly one `correct: true` per station; exactly 3 options per station; exactly 7 stations.

## Tests (TDD)

- Snapshot or property test on the data module: 7 stations, each with exactly one correct answer and exactly 3 options.
- For each station, rendering the modal and clicking the correct option triggers the success view.
- End-to-end (jsdom): play through all 7 stations; final state has `solvedStations: [1,2,3,4,5,6,7]`.

## Dependencies

- Issue 04.

## Out of Scope

Treasure finale screen, confetti, polish.
