# 03 — Treasure-Map Main Screen

## Why

Replace the single-station screen with the real game shell: a map that hosts all seven stations. The riddle moves into a modal opened from the map.

## Acceptance Criteria

- App default screen is a map (placeholder background colour or simple SVG — real art comes in issue 10).
- Seven X-shaped markers are positioned on the map at hardcoded decorative coordinates (NOT mirroring real geography). Spread them roughly across the viewport so all are visible on an iPad (1180×820 portrait or 820×1180 landscape).
- Marker states:
  - **Active** (only station 1 at the start): pulsing, coloured (red for Finja), tappable.
  - **Locked** (stations 2–7): dim/grey, not tappable.
- Tapping the active marker opens a modal with Finja's riddle (from issue 02).
- Modal has an explicit close button (✕) that returns to the map.
- Solving the riddle closes the modal and marks station 1 as solved (checkmark on the marker). Station 2 remains locked until issue 04.
- LocalStorage progress survives reload (map renders correct marker states).

## Implementation Notes

- New component `src/screens/MapScreen.tsx`.
- New component `src/components/StationMarker.tsx` (props: state, colour, position, onClick).
- New component `src/components/RiddleModal.tsx`. Modal overlay dims the map background (`rgba(0,0,0,0.5)`).
- Hardcode the 7 marker positions as `{ x: %, y: % }` in `MapScreen.tsx` for now; move to data file in issue 05.
- Direction text still shows inside the modal (as in issue 02). Pulsing on-map direction arrow comes in issue 08.

## Tests (TDD)

- Map renders 7 markers.
- Only the first marker is enabled; the others are disabled.
- Clicking the active marker opens the modal.
- Clicking ✕ closes the modal without marking solved.
- Solving the riddle closes the modal and the first marker now shows a checkmark.

## Dependencies

- Issue 02.

## Out of Scope

No unlocking of stations 2–7, no real map art, no confetti, no animations.
