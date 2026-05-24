# 10 — Treasure-Map Background Art (Placeholder)

## Why

Replace the plain placeholder map with something that looks like a pirate treasure map. Keep it simple — this is a children's birthday app, not a print job.

## Acceptance Criteria

- The map screen renders a hand-drawn treasure-map look:
  - Parchment-coloured background (e.g. `#e8d5a0`).
  - A few decorative SVG elements: a couple of trees, a coastline or path, a compass rose in a corner, the word "Schatzkarte" handwritten-style at the top.
  - The 7 marker positions remain visible and tappable above the art (z-index above background).
  - No mention of "Pyramiden-Garten" — markers must not give away the real geography (per PRD).
- Works at iPad portrait (820×1180) and landscape (1180×820) viewports without overflow.
- Either inline SVG or a single background image asset is acceptable. Keep total asset size under 200 KB.

## Implementation Notes

- Inline SVG is preferred (no extra fetch, sharp on retina, easy to tweak).
- A serif-ish font like Apple's "Papyrus" or Georgia is fine for the title to evoke treasure-map vibes (system fonts only — no web font fetches; PWA must work offline).
- Compass rose can be a simple SVG with N/O/S/W labels — purely decorative.

## Tests (TDD)

- The map screen contains an element with role `img` (or aria-label `Schatzkarte`).
- All 7 markers remain in the document with their existing test ids.
- At a 820×1180 viewport, no element overflows the viewport (jsdom can't measure this — add a manual checklist note instead, OR measure with `getBoundingClientRect` mocked).

## Dependencies

- Issue 03.

## Out of Scope

Real geography of the Pyramiden-Garten, AI-generated art, custom web fonts.
