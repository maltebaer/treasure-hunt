# 01 — Bootstrap & Deploy

## Why

Prove the full build-and-deploy path works before adding any feature code. A blank app that ships to production is the first tracer bullet.

## Acceptance Criteria

- `pnpm dev` starts a Vite dev server, browser shows a page with the heading "Schatzsuche".
- `pnpm build` produces a production build with no errors.
- `pnpm test` runs Vitest and the example test passes.
- The app is deployed to Vercel and the production URL shows the same heading.

## Implementation Notes

- Scaffold with `pnpm create vite@latest treasure-hunt --template react-ts` (or run inside the existing directory).
- Add Vitest + React Testing Library + jsdom; configure `vitest.config.ts` with `environment: "jsdom"` and a setup file that imports `@testing-library/jest-dom`.
- Create `src/App.tsx` containing only `<h1>Schatzsuche</h1>`.
- Set Apple system font in `src/index.css`: `font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;`.
- Vercel: connect GitHub repo, framework preset = Vite, no env vars needed.

## Tests (TDD)

- `src/App.test.tsx`: renders `<App />`, asserts the heading "Schatzsuche" is in the document.

## Dependencies

None. This is the first slice.

## Out of Scope

No map, no riddles, no state, no PWA.
