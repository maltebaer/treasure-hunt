# 07 — Confetti Celebration

## Why

Pure polish: reward correct answers and the treasure finale with confetti for the kids.

## Acceptance Criteria

- Tapping the correct answer in any station modal triggers a confetti burst inside the modal (or full-viewport, designer's call — keep it short, ~1.5s).
- Opening the treasure finale triggers a longer, fuller confetti shower (~3s, multiple bursts).
- Confetti does not block interaction (the "Tuch gefunden, weiter" button must remain tappable while confetti is on screen).
- Wrong answers do not trigger confetti.

## Implementation Notes

- Add `canvas-confetti` as a dependency.
- Wrap calls in a small helper `src/lib/confetti.ts` exporting `burst()` (single shot) and `shower()` (multi-burst for finale) so tests can mock it.
- Trigger via `useEffect` in the success view and the treasure screen.

## Tests (TDD)

- Mock the confetti module. On correct answer, assert `burst` was called once.
- On wrong answer, assert `burst` was NOT called.
- On treasure finale mount, assert `shower` was called.

## Dependencies

- Issue 06.

## Out of Scope

Sound, vibration (explicitly disabled in PRD).
