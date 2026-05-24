# 08 — Pulsing Direction Arrow

## Why

The cardinal direction is the load-bearing piece of information after a correct answer. Make it large, animated, unmissable.

## Acceptance Criteria

- In the modal success view, the direction word (e.g. "NORDWEST") is rendered with a large arrow glyph next to it that points the correct way (NW = ↖, N = ↑, etc.).
- The arrow + word pulse (subtle scale 1.0 → 1.1 → 1.0, ~1.5s loop).
- On the map, after a station is solved and before the next is solved, a small pulsing arrow icon appears between the last-solved marker and the next-active marker, pointing roughly from one to the other (this is decorative on the map; the real direction lives in the modal success view).

## Implementation Notes

- Mapping `directionShort` → unicode arrow: `{ N: "↑", NO: "↗", O: "→", SO: "↘", S: "↓", SW: "↙", W: "←", NW: "↖" }`. Put this in `src/lib/directions.ts`.
- CSS keyframe animation: `@keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.1) } }`.
- The on-map arrow placement: midpoint between the two markers' positions.

## Tests (TDD)

- For each direction, `getArrowGlyph(direction)` returns the expected unicode arrow.
- Success view renders the arrow + word with class `pulse` (or similar marker).
- After solving station 1 and before solving station 2, the map renders an arrow element between markers 1 and 2.

## Dependencies

- Issue 06.

## Out of Scope

Animated camera pans, full SVG path drawing.
