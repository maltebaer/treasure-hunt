# 11 — PWA: Offline & Installable

## Why

The Pyramiden-Garten has no reliable wifi. The app must work in airplane mode and be installable as a homescreen icon on iPad.

## Acceptance Criteria

- Visiting the deployed URL on Safari iPadOS shows the "Add to Home Screen" option, and the installed icon launches the app full-screen (no Safari chrome).
- After a first online visit, putting the iPad in airplane mode and re-opening the app from the homescreen still loads the app and lets the user play through all 7 stations.
- App manifest sets:
  - `name`: "Schatzsuche für Michel"
  - `short_name`: "Schatzsuche"
  - `display`: "standalone"
  - `theme_color`, `background_color`: parchment-ish
  - `icons`: at least 192×192 and 512×512 PNGs.
- Service worker caches the app shell, all JS/CSS, and any inline-SVG/image assets.

## Implementation Notes

- Use `vite-plugin-pwa` with `registerType: "autoUpdate"`. Workbox `generateSW` strategy.
- Provide 192 and 512 PNG icons (a treasure-chest emoji rasterised is fine for the placeholder).
- Set `apple-touch-icon` link in `index.html` for iPad install support.
- Verify offline: build, serve via `pnpm preview`, open in browser, set DevTools "Offline", reload.

## Tests (TDD)

- A build-time test: the `dist/manifest.webmanifest` exists, parses, and contains the required fields above.
- A build-time test: `dist/sw.js` exists.
- Manual checklist (document in PR): airplane-mode reload works on iPad.

## Dependencies

- Issue 01 (build pipeline) and ideally issue 10 (so cached assets include final art).

## Out of Scope

Push notifications, background sync, custom install prompt UI.
