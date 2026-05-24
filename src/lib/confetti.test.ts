import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import confetti from "canvas-confetti";
import { burst, shower } from "./confetti";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("confetti", () => {
  beforeEach(() => {
    vi.mocked(confetti).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("burst fires canvas-confetti exactly once", () => {
    burst();
    expect(confetti).toHaveBeenCalledTimes(1);
  });

  it("shower fires an initial burst and additional bursts over the next ~3 seconds", () => {
    vi.useFakeTimers();
    shower();
    expect(confetti).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(600);
    expect(vi.mocked(confetti).mock.calls.length).toBeGreaterThanOrEqual(2);
    vi.advanceTimersByTime(2400);
    expect(vi.mocked(confetti).mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it("shower stops firing after 3 seconds", () => {
    vi.useFakeTimers();
    shower();
    vi.advanceTimersByTime(3000);
    const callsAfter3s = vi.mocked(confetti).mock.calls.length;
    vi.advanceTimersByTime(5000);
    expect(vi.mocked(confetti).mock.calls.length).toBe(callsAfter3s);
  });
});
