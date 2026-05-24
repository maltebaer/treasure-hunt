import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TreasureScreen from "./TreasureScreen";
import { shower } from "../lib/confetti";

vi.mock("../lib/confetti", () => ({
  burst: vi.fn(),
  shower: vi.fn(),
}));

describe("TreasureScreen", () => {
  beforeEach(() => {
    vi.mocked(shower).mockClear();
  });

  it("renders the GESCHAFFT heading, treasure subheading and birthday message", () => {
    render(<TreasureScreen onViewMap={() => {}} />);
    expect(screen.getByText(/GESCHAFFT/i)).toBeInTheDocument();
    expect(screen.getByText(/DER SCHATZ/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Alles Gute zum Geburtstag, Michel/i),
    ).toBeInTheDocument();
  });

  it("fires confetti shower on mount", () => {
    render(<TreasureScreen onViewMap={() => {}} />);
    expect(shower).toHaveBeenCalledTimes(1);
  });

  it("calls onViewMap when 'Zurück zur Karte' is tapped", async () => {
    const onViewMap = vi.fn();
    const user = userEvent.setup();
    render(<TreasureScreen onViewMap={onViewMap} />);
    await user.click(
      screen.getByRole("button", { name: /Zurück zur Karte/i }),
    );
    expect(onViewMap).toHaveBeenCalledTimes(1);
  });
});
