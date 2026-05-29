# 14 — Milla Station, Treasure Reveal, Color Refresh, Harder Riddles

## Why

A round of small content tweaks after the design pass:

- One more friend wants in: Milla joins as an 8th station.
- The treasure icon on the map is permanently dimmed (opacity 0.5). It should pop to full opacity once the final riddle is solved, so the kids actually see what they're walking toward at the end.
- Scarf colors need a refresh to a brighter, more distinct palette.
- The riddles are too easy for this age group — bump the difficulty.

## Acceptance Criteria

### Milla station

- `STATIONS` contains 8 entries (was 7); the new entry is Milla.
- The hard-coded length check in `src/data/stations.ts` is updated to expect 8.
- Marker position for Milla fits the existing map layout without overlapping other markers.
- Milla is **not** the treasure station — Michel remains the finale (`isTreasure: true`).
- `AdminMenu` "Springe zu Station X" row renders 8 buttons.

### Treasure reveal on map

- Before the final station is solved: treasure group on the map renders at `opacity={0.5}` (current behavior).
- After the final station is solved: treasure group renders at `opacity={1}`.
- The reveal applies on the map screen only; the modal/finale screen are unchanged.

### Color refresh

The 8 scarf colors, in station order, are: **rosa, hellblau, rot, lila, gelb, orange, grün, dunkelblau**.

- Each station's `scarfColor` (hex) and `scarfColorLabel` (German adjective form, e.g. `"rosa"`, `"hellblaue"`) are updated to match.
- Colors are visually distinct on the map at iPad size — no two markers should be confusable at a glance.
- Wrong-answer shake and correct-answer confetti still read clearly against the new colors.

### Harder riddles

Each of the 8 `question` + `options` sets is replaced with the version below. Each station has exactly 3 options, exactly 1 correct. All UI text in German.

| # | Child  | Theme            | Question                                                                            | Options (✅ = correct)                                                       |
| - | ------ | ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1 | Finja  | Rechnen          | "Drei Äpfel hängen am Baum. Vier kommen dazu. Wie viele sind es jetzt?"             | 6️⃣ Sechs · 7️⃣ Sieben ✅ · 8️⃣ Acht                                            |
| 2 | Lina   | Logik / Trick    | "Ein Bauer hat 5 Schafe. Alle außer 3 laufen weg. Wie viele bleiben übrig?"         | 2️⃣ Zwei · 3️⃣ Drei ✅ · 5️⃣ Fünf                                               |
| 3 | Friedi | Klassik-Rätsel   | "Was wird größer, je mehr man davon wegnimmt?"                                      | 🎈 Ballon · 🕳️ Loch ✅ · 🍰 Kuchen                                            |
| 4 | Fiete  | Tierwissen       | "Welches Tier ist das größte auf der Welt?"                                         | 🐘 Elefant · 🐋 Blauwal ✅ · 🦒 Giraffe                                       |
| 5 | Esmee  | Zeit             | "Wie viele Tage hat eine Woche?"                                                    | 5️⃣ Fünf · 7️⃣ Sieben ✅ · 🔟 Zehn                                              |
| 6 | Ronja  | Farben mischen   | "Welche Farbe kommt raus, wenn man Blau und Gelb mischt?"                           | 🟢 Grün ✅ · 🟠 Orange · 🟣 Lila                                              |
| 7 | Milla  | Geographie       | "Wie heißt die Hauptstadt von Deutschland?"                                         | 🏰 München · 🐻 Berlin ✅ · ⚓ Hamburg                                        |
| 8 | Michel | Pirat rechnet    | "Ein Pirat findet 2 Truhen. In jeder liegen 5 Goldmünzen. Wie viele hat er?"        | 7️⃣ Sieben · 🔟 Zehn ✅ · 1️⃣5️⃣ Fünfzehn                                       |

## Implementation Notes

- Keep the `Station` type unchanged — only data and the length check change.
- Re-check `markerPosition` percentages so the 8 markers spread across the map without clustering. The current 7 use roughly the corners + center; one natural slot is around `{ x: 50, y: 85 }` or `{ x: 15, y: 60 }`.
- `AdminMenu` currently hard-codes 7 jump buttons; replace the literal with `STATIONS.length` or map over `STATIONS`.
- For the treasure opacity, plumb a boolean (e.g. `treasureRevealed`) into `MapBackground` from the map screen, derived from `solvedStations.includes(STATIONS.at(-1)!.id)`.

## Tests (TDD)

- `STATIONS.length === 8` and the runtime validation passes.
- Exactly one station has `isTreasure: true`, and it is Michel.
- `MapBackground` renders the treasure `<g>` with `opacity={0.5}` when `treasureRevealed={false}` and `opacity={1}` when `treasureRevealed={true}`.
- `AdminMenu` renders 8 jump buttons.
- Existing data-validation tests (3 options, 1 correct) still pass for all 8 entries.

## Dependencies

- Issues 05, 06, 10, 12.

## Out of Scope

- Reworking the map background art for 8 markers (current layout has room).
- Animating the treasure reveal — a hard opacity swap is fine.
- Per-station difficulty tuning beyond "harder than current".
