import { describe, it, expect } from "vitest";
import { getArrowGlyph } from "./directions";

describe("getArrowGlyph", () => {
  it("returns the correct arrow for each cardinal direction", () => {
    expect(getArrowGlyph("N")).toBe("↑");
    expect(getArrowGlyph("NO")).toBe("↗");
    expect(getArrowGlyph("O")).toBe("→");
    expect(getArrowGlyph("SO")).toBe("↘");
    expect(getArrowGlyph("S")).toBe("↓");
    expect(getArrowGlyph("SW")).toBe("↙");
    expect(getArrowGlyph("W")).toBe("←");
    expect(getArrowGlyph("NW")).toBe("↖");
  });

  it("returns a fallback for an unknown direction", () => {
    expect(getArrowGlyph("XYZ")).toBe("?");
  });
});
