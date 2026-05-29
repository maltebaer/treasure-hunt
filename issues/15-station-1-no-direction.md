# 15 — Station 1 Has No Direction

## Why

Station 1 (Finja) is the **starting** station — the kid is already at home when answering its riddle. There is nowhere to walk to find Finja's scarf; the scarf is given as soon as the riddle is solved. The current success view points the kid NW (toward station 2), which is misleading: the NW instruction belongs *after* station 1, not on it. Station 1's success view should skip the direction entirely.

Stations 2–8 are unchanged.

## Acceptance Criteria

- In the `STATIONS` data, station 1 has no direction set (`direction` and `directionShort` are nullable/empty).
- The riddle modal's success view for station 1 does **not** render the direction arrow + word block (no `direction-label` testid, no `↖`, no compass word).
- The scarf reward UI and the "Tuch gefunden, weiter" continue button still render exactly as today on the station 1 success view.
- Solving station 1 still unlocks station 2 (no regression to progression).
- Stations 2–8 are unchanged: their data, success views, and direction-labels render exactly as before.

## Implementation Notes

- Change `Station.direction` and `Station.directionShort` to `string | null` (or make them optional `?`). Pick whichever requires fewer call-site changes.
- In `RiddleModal`, wrap the direction-label JSX in a `station.directionShort && (...)` guard.
- No changes needed to the map screen (the on-map arrow was already removed).
- Update station 1's data entry only: `direction: null`, `directionShort: null` (or omit if optional).

## Tests (TDD)

- Station 1 success view: `direction-label` is **not** in the document; "Tuch gefunden, weiter" button **is** in the document.
- Station 2 success view: `direction-label` is in the document and contains `"→"` and `"OSTEN"` (regression guard).
- Solving station 1 marks it `solved` and activates station 2 (regression guard).

## Dependencies

- Issue 14.

## Out of Scope

- Any changes to stations 2–8.
- Removing any non-direction UI from station 1's success view.
