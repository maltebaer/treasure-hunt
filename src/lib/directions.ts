const ARROW_GLYPHS: Record<string, string> = {
  N: "↑",
  NO: "↗",
  O: "→",
  SO: "↘",
  S: "↓",
  SW: "↙",
  W: "←",
  NW: "↖",
};

export function getArrowGlyph(directionShort: string): string {
  return ARROW_GLYPHS[directionShort] ?? "?";
}
