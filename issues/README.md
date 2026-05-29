# Issues — Tracer-Bullet Slices

Each issue is a thin, vertical slice: it touches all relevant layers (UI, state, persistence, deploy) and leaves the app in a shippable, demoable state. Issues are ordered: do them top to bottom. Later issues build on earlier ones.

## Workflow per Issue

1. Read the issue file end-to-end. Confirm acceptance criteria.
2. Write failing tests first (TDD). Tests are listed under "Tests".
3. Implement the smallest change that makes tests pass.
4. Run the app, verify the acceptance criteria by hand on an iPad-sized viewport.
5. Commit with `feat(NN): <title>` referencing the issue file.
6. Move to the next issue.

## Slice Order

1. `01-bootstrap.md` — Vite + React + TS scaffold, deployed to Vercel
2. `02-single-station-loop.md` — One station playable end-to-end (Finja, hardcoded)
3. `03-map-screen.md` — Treasure-map main screen with 7 markers
4. `04-station-progression.md` — Solving station unlocks the next
5. `05-data-driven-stations.md` — All 7 stations driven by a data module
6. `06-treasure-finale.md` — Full-screen celebration after Michel's leg
7. `07-confetti.md` — `canvas-confetti` on correct answer and finale
8. `08-direction-arrow-polish.md` — Pulsing direction arrow + word
9. `09-wrong-answer-shake.md` — Wrong answer shakes the button red
10. `10-map-background-art.md` — Hand-drawn-style placeholder background
11. `11-pwa-offline.md` — Service worker, manifest, installable, offline
12. `12-admin-reset.md` — Long-press admin menu (reset, skip, jump)
13. `13-watercolor-design.md` — Watercolor design pass (committed; no issue file)
14. `14-milla-station-colors-difficulty.md` — 8th station (Milla), treasure reveal, new color palette, harder riddles
15. `15-station-1-no-direction.md` — Station 1 skips direction display (stations 2–8 unchanged)

## Conventions

- TypeScript strict.
- Components in `src/components/`, screens in `src/screens/`, data in `src/data/`, state in `src/state/`.
- All UI text in German.
- No backend. LocalStorage only.
- Test stack: Vitest + React Testing Library + jsdom.
