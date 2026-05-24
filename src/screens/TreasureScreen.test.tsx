import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TreasureScreen from "./TreasureScreen";

describe("TreasureScreen", () => {
  it("renders the GESCHAFFT heading, treasure subheading and birthday message", () => {
    render(<TreasureScreen onViewMap={() => {}} />);
    expect(screen.getByText(/GESCHAFFT/i)).toBeInTheDocument();
    expect(screen.getByText(/DER SCHATZ/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Alles Gute zum Geburtstag, Michel/i),
    ).toBeInTheDocument();
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
