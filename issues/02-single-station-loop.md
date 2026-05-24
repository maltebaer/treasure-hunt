# 02 — Single Station Playable End-to-End

## Why

Prove the core game loop with a single hardcoded station before generalising to seven. This is the second tracer bullet: one full riddle → answer → direction round-trip with persistence.

## Acceptance Criteria

- App shows a single screen for Finja's station with:
  - Header: "Station 1 · Finja"
  - Question: "Ich bin gelb-schwarz gestreift, mache Honig und summe. Wer bin ich?"
  - Three buttons (emoji + label): 🐝 Biene, 🐞 Marienkäfer, 🐛 Raupe
- Tapping a wrong button keeps the screen unchanged but the question is still answerable.
- Tapping the correct button (Biene) replaces the screen content with:
  - "RICHTIG!"
  - "Geh nach NORDWEST"
  - "Suche das rote Tuch!"
  - Button "Tuch gefunden, weiter"
- Tapping "Tuch gefunden, weiter" sets `solvedStations: [1]` in `localStorage` and shows a placeholder "Fertig!" screen.
- Reloading the page after a correct answer skips back to the "Fertig!" screen (state persisted).

## Implementation Notes

- Single React component tree, no router yet.
- Local component state for "answered / not answered".
- `src/state/progress.ts` exports `loadProgress()` / `saveProgress()` that read/write `localStorage` key `treasure-hunt:progress` with shape `{ solvedStations: number[] }`.
- Hardcode Finja's data inline; data-driven version comes in issue 05.

## Tests (TDD)

- Renders the question and three answer buttons.
- Clicking "Marienkäfer" does NOT advance to the success view.
- Clicking "Biene" shows "RICHTIG!" and "NORDWEST".
- Clicking "Tuch gefunden, weiter" writes `{ solvedStations: [1] }` to localStorage.
- On mount, if localStorage already has `{ solvedStations: [1] }`, the "Fertig!" screen renders directly.

## Dependencies

- Issue 01.

## Out of Scope

No map, no other stations, no confetti, no shake animation.
