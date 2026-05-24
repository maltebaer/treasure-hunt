# 04 — Station Progression (Unlock Next)

## Why

The game must progress: solving station N unlocks station N+1. Wire the state machine for unlocking, still with hardcoded data for stations 1 and 2.

## Acceptance Criteria

- After solving station 1, station 2 becomes active (pulsing, coloured blue for Lina) and tappable. Stations 3–7 remain locked.
- Tapping station 2 opens its modal with Lina's riddle (still hardcoded inline is OK; data file comes in issue 05).
- Solving station 2 marks it solved and would activate station 3 — but station 3 has no riddle yet, so the marker may stay locked-but-styled-as-next, or simply remain locked. Document the chosen behaviour in the implementation.
- Progress shape in localStorage: `{ solvedStations: number[], currentStation: number }`.
- Reloading at any point restores the correct active/locked/solved states.

## Implementation Notes

- Extract a `useProgress()` hook from `src/state/progress.ts` that exposes `{ solvedStations, currentStation, solve(stationId) }`.
- `currentStation` = first station id NOT in `solvedStations`, or `null` if all solved.
- `StationMarker` derives its state from `(stationId === currentStation) ? "active" : solvedStations.includes(stationId) ? "solved" : "locked"`.
- Add Lina's data inline next to Finja's.

## Tests (TDD)

- After solving station 1, station 2 is active.
- After solving station 2, station 2 is marked solved.
- `useProgress` hook: `solve(1)` adds 1 to `solvedStations` and sets `currentStation` to 2.
- LocalStorage round-trip: write `{ solvedStations: [1] }`, reload, hook returns `currentStation === 2`.

## Dependencies

- Issue 03.

## Out of Scope

Stations 3–7 content, animations, confetti.
