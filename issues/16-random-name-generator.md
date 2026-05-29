# 16 — Random Name Generator (Compass Modal)

## Why

The kids don't know in advance which scarf they get. We want a small "Glücksrad" moment: the parent (or a kid) taps the compass, picks a name, and a spinner reveals which colored station that name is assigned to. Slot 1 is always Milla and slot 8 is always Michel (the birthday kid finds the treasure), but the spin still plays for them so the show is consistent.

## Acceptance Criteria

### Map screen — initial state

- All 8 station markers render with their fixed scarf color and number from the start.
- Each unassigned marker's label below reads `???` instead of a child name.
- The compass graphic on the map is now an interactive control (`role="button"`, accessible name "Glücksrad öffnen" or similar). Tapping it opens the generator modal.

### Generator modal

- The modal can be opened any time from the compass.
- The modal shows 8 buttons, one per child, with the names: Finja, Lina, Friedi, Fiete, Esmee, Ronja, Milla, Michel.
- Already-assigned names render disabled (greyed) and show their assigned slot number/color as a small chip on the button.
- Tapping an enabled name button starts the spin animation (see below) and ends with the name assigned to a slot.
  - **Milla** always assigns to slot **1**.
  - **Michel** always assigns to slot **8**.
  - Any other name assigns to a uniformly-random **currently unassigned** slot from {2, 3, 4, 5, 6, 7}.
- A "Schließen" button closes the modal.

### Spin animation

- Roughly 1.5 seconds total.
- Visually highlights a sequence of slot markers (cycling through them) and finally settles on the chosen slot.
- On settle: confetti burst is optional but allowed (reuse `burst()` from `lib/confetti`); the modal stays open so subsequent names can be assigned.
- Animation runs even for Milla/Michel (deterministic outcome but same visual treatment).

### Marker reveal

- The moment a slot gets an assignment, its marker label updates from `???` to the assigned child name.
- This change is immediate and persists (it does not require the modal to close).

### Riddle modal

- The riddle modal continues to use the assigned child name for the "{name}, dein Tuch ist im …" / "{name}, hier ist dein Tuch!" line.
- A station marker is **not** tappable until its slot has an assigned name (in addition to the existing `active` gating). Tapping an unassigned active marker is a no-op.

### Persistence

- Assignments persist to `localStorage` under a new key (e.g. `treasure-hunt:assignments`) as `{ slotId: childName }`.
- On reload, assignments are restored and the spin does not re-run.
- "Spiel zurücksetzen" in the admin menu clears assignments **and** solved stations.
- "Springe zu Station X" and "Nächste Station überspringen" do **not** touch assignments.

## Implementation Notes

- Decouple `childName` from `Station`: remove the field from `Station`, add a separate `CHILDREN: string[]` constant (`["Finja","Lina","Friedi","Fiete","Esmee","Ronja","Milla","Michel"]`), and add an `assignments` slice to the progress state.
- The `useProgress` hook (or a new `useAssignments` hook) exposes:
  - `assignments: Record<number, string>` (slotId → childName)
  - `assignName(childName: string)` — runs the assignment logic above and persists.
  - `resetAssignments()` — wiped by admin reset.
- StationMarker takes the child name as a prop (already does) — pass `assignments[s.id] ?? "???"` from the map screen.
- The compass currently lives inside `MapBackground.tsx` at viewBox `translate(80, 920)`. Easiest path: keep the compass graphic in the background, but also render an absolutely-positioned `<button>` overlay in `MapScreen.tsx` at the same screen coordinates, with the SVG as visual only. This avoids making the background SVG interactive.
- For the spin animation, a simple approach: while spinning, briefly set a `spotlightedSlotId` state that cycles through `[1..8]` every ~120ms; the marker reads a `spotlighted` style (e.g. larger ring, brighter outline). At ~1.4s, stop on the target slot, then commit the assignment at 1.5s.
- For Milla/Michel buttons, the spin cycles freely but the final settle target is fixed (1 or 8).

## Tests (TDD)

- Markers render with `childName="???"` initially.
- Compass button has accessible role and label; clicking it opens the generator modal.
- Modal renders exactly 8 name buttons.
- Clicking the **Milla** button assigns slot 1 to Milla (`assignments[1] === "Milla"`); marker label updates.
- Clicking the **Michel** button assigns slot 8 to Michel.
- Clicking a non-fixed name assigns to one of slots 2–7 (use a seeded or mocked `Math.random` to make it deterministic in tests).
- An already-assigned name button is disabled.
- An unassigned marker is not clickable, even when it is the current station.
- After all 8 assignments, the modal still opens but every name button is disabled.
- "Spiel zurücksetzen" clears both `solvedStations` and `assignments`.
- Hydration: pre-seeded `assignments` in localStorage restore the marker labels on mount.

## Dependencies

- Issues 05, 12, 14, 15.

## Out of Scope

- Animating the marker reveal beyond the spotlight cycle (e.g., flip-card animation).
- Sound effects for the spin.
- Allowing re-rolling an already-assigned name (re-assignment requires admin reset for now).
- A non-modal inline generator on the map screen itself.
