# 12 — Admin Menu (Reset, Skip, Jump)

## Why

Things will go wrong on the day. The parent needs a hidden escape hatch to reset the game, skip a station, or jump to any station without exposing those buttons to the kids.

## Acceptance Criteria

- Long-pressing (≥1.5s) the "Schatzkarte" title on the map opens an admin overlay.
- Admin overlay shows:
  - "Spiel zurücksetzen" — clears `solvedStations` and returns to station 1 active.
  - "Nächste Station überspringen" — marks the current station solved and unlocks the next.
  - "Springe zu Station X" — a row of 7 buttons; tapping one sets `solvedStations` to all stations BEFORE that one (so the chosen station is active).
- Short taps on the title do nothing visible.
- Closing the admin overlay (button "Schließen") returns to the map without further changes.
- All admin actions persist to localStorage immediately.

## Implementation Notes

- Implement long-press with `onTouchStart` + `setTimeout(1500)`, cancelled by `onTouchEnd`/`onTouchMove`.
- Also support mouse long-press (`onMouseDown`/`onMouseUp`) for desktop testing.
- Reuse the `useProgress` hook; add `resetProgress()`, `jumpToStation(id)` methods.

## Tests (TDD)

- Holding the title for 1500ms opens the admin overlay; releasing before 1500ms does not.
- "Spiel zurücksetzen" clears localStorage progress.
- "Springe zu Station 4" results in `solvedStations: [1,2,3]`, `currentStation === 4`.
- "Nächste Station überspringen" while at station 2 yields `solvedStations: [1,2]`, `currentStation === 3`.

## Dependencies

- Issue 05.

## Out of Scope

PIN-protecting the admin menu (overkill for a birthday party).
