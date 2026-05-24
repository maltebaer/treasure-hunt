# 06 — Treasure Finale Screen

## Why

The hunt deserves a dramatic ending. When Michel's leg is done (station 7 marked solved), show a full-screen celebration.

## Acceptance Criteria

- After solving station 7, the map is replaced (or fully covered) by a full-screen finale screen.
- Finale contains:
  - Big heading "GESCHAFFT!"
  - Subheading "DER SCHATZ!"
  - Birthday message "Alles Gute zum Geburtstag, Michel!"
  - Treasure-chest emoji 🎂 / 🏆
- Finale persists on reload (i.e. once `solvedStations` contains 7, the finale is the default screen).
- A small discreet "Zurück zur Karte" link returns to the map for re-viewing (does not reset state).

## Implementation Notes

- New component `src/screens/TreasureScreen.tsx`.
- Top-level `App.tsx` switches between `MapScreen` and `TreasureScreen` based on `solvedStations.includes(7)`.
- No confetti yet (issue 07).

## Tests (TDD)

- Given `solvedStations: [1..7]`, `App` renders `TreasureScreen`, not `MapScreen`.
- Given `solvedStations: [1..6]`, `App` renders `MapScreen`.
- "Zurück zur Karte" button shows the map without mutating state.

## Dependencies

- Issue 05.

## Out of Scope

Confetti (issue 07), background art (issue 10).
