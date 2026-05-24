# PRD: Schatzsuche (Drone-Assisted Treasure Hunt)

## Context

Birthday app for Michel (6 years old). Seven children play a drone-assisted treasure hunt in the Pyramiden-Garten Potsdam. Markers are coloured juggling scarves placed on top of small pyramids. A drone with live video to its controller helps spot the markers from above. Each child "owns" one leg of the hunt and pilots the drone for that leg. The app runs on a shared iPad (10th gen) in the browser, must work offline, and is in German.

## Goal

A single-tablet web app that guides seven children through seven sequential stations. Each station presents a riddle. Solving the riddle reveals the cardinal direction to the next station, where the next child finds their coloured scarf with the drone. The final station is the treasure for the birthday child.

## Non-Goals

- No multi-device sync, no user accounts, no backend.
- App does not control or display the drone feed (drone is operated separately).
- App does not use the device compass (iPad 10th gen lacks a magnetometer); a physical compass is used in the field.
- Map markers in the app do not mirror real-world positions (no spoilers).

## Users

- Primary: seven children aged ~6, one tablet shared between them, parent reads riddles aloud.
- Operator: parent (Malte), starts the app, handles admin/reset, pilots drone as backup.

## Children & Sequence

| # | Child   | Scarf colour | Riddle is at | Direction to next | Target     |
|---|---------|--------------|--------------|-------------------|------------|
| 1 | Finja   | red          | Start        | NW                | Station 1  |
| 2 | Lina    | blue         | Station 1    | O                 | Station 2  |
| 3 | Friedi  | yellow       | Station 2    | SW                | Station 3  |
| 4 | Fiete   | green        | Station 3    | SW                | Station 4  |
| 5 | Esmee   | orange       | Station 4    | W                 | Station 5  |
| 6 | Ronja   | purple       | Station 5    | SO                | Station 6  |
| 7 | Michel  | gold         | Station 6    | N                 | Treasure   |

Each child "owns" the riddle at the station where they trigger the next leg. Michel's leg ends at the treasure.

## Riddles (placeholder content, German, neutral phrasing)

1. Gelb-schwarz, macht Honig, summt — **Biene**
2. Rot + Gelb gemischt — **Orange**
3. Roter Mantel, besucht Oma im Wald — **Rotkäppchen**
4. Beine einer Spinne — **8**
5. Tier macht "Muh" — **Kuh**
6. Wächst auf einem Apfelbaum — **Äpfel**
7. Piraten suchen — **Schatz**

Each riddle: 3 multiple-choice options (emoji + text label). Wrong answer: try again. Correct: show direction + scarf colour.

## Screens

1. **Map screen (default)**: hand-drawn treasure-map background, 7 X-markers placed decoratively (NOT mirroring real geography). Marker states: locked (dim), active (pulsing, kid colour), solved (checkmark). Pulsing direction arrow appears between the most recently solved station and the next one.
2. **Riddle modal**: opens on tap of active station. Shows station number + child name, question text, 3 image buttons. Wrong = shake red. Correct = swap modal content to celebration view with confetti, pulsing direction arrow + word ("NORDWEST"), scarf colour reminder, and "Tuch gefunden, weiter" button.
3. **Treasure finale**: full-screen overlay after Michel's leg. Confetti, birthday message.
4. **Admin menu (hidden)**: long-press app title (3s) opens menu with reset, skip-station, jump-to-station.

## Tech Stack

- React + Vite + TypeScript
- `vite-plugin-pwa` for service worker + manifest (offline + installable)
- `canvas-confetti` for celebrations
- Apple system font, no sounds, no haptics
- LocalStorage for progress: `{ solvedStations: number[], currentStation: number }`
- Vitest + React Testing Library for tests (TDD)
- Hosting: Vercel
- Package manager: pnpm (prefer) or npm

## Fallback Plan

- Drone fails → kids search scarves on foot using the cardinal direction shown.
- App crashes → admin menu lets parent jump to next station.
- iPad battery → charge beforehand, powerbank on standby.

## Success Criteria

- All 7 stations playable in order on the iPad in airplane mode.
- App installable as PWA (Add to Home Screen).
- Progress survives reload.
- Admin can reset and jump between stations.
- A 6-year-old can tap the right answer button without help.
