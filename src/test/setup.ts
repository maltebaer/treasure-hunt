import "@testing-library/jest-dom";
import { vi } from "vitest";

// canvas-confetti needs a real canvas; in jsdom it throws when the animation
// frame fires. Tests that care about confetti mock our wrapper lib directly.
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));


// Node 22+ ships an experimental `localStorage` global that lacks several
// Storage methods (e.g. `clear`) when no `--localstorage-file` is set, which
// collides with jsdom's implementation. Replace it with a plain in-memory
// Storage so the app and tests see a normal Storage API.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

Object.defineProperty(globalThis, "localStorage", {
  value: new MemoryStorage(),
  writable: true,
  configurable: true,
});
