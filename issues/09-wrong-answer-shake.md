# 09 — Wrong-Answer Shake Feedback

## Why

Six-year-olds need clear feedback. A wrong button should shake red so the child understands without anyone telling them.

## Acceptance Criteria

- Tapping a wrong answer button animates that button only:
  - Horizontal shake (translateX -8px → 8px → -8px → 0) over ~400ms.
  - Border or background tinted red during the shake.
- After the animation, the button returns to its normal state. The riddle stays open.
- Tapping the correct answer does NOT trigger the shake.
- A pending shake animation does not block tapping another button.

## Implementation Notes

- CSS keyframe `@keyframes shake { ... }` + a transient class `shaking` added via `setTimeout(() => removeClass(), 400)`, or use a `useState` boolean per button.
- Keep the wrong-button feedback local to the tapped button; do not gray out or disable others.

## Tests (TDD)

- Clicking a wrong option adds class `shaking` to that button for ~400ms.
- Clicking the correct option does NOT add `shaking`.
- After 400ms, `shaking` is removed.

## Dependencies

- Issue 05.

## Out of Scope

Sound effects, vibration.
