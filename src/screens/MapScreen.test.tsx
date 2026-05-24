import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import MapScreen from "./MapScreen";

describe("MapScreen", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders seven station markers", () => {
    render(<MapScreen />);
    for (let id = 1; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeInTheDocument();
    }
  });

  it("enables only marker 1 and disables markers 2-7 at the start", () => {
    render(<MapScreen />);
    expect(screen.getByTestId("station-marker-1")).toBeEnabled();
    for (let id = 2; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeDisabled();
    }
  });

  it("opens the riddle modal when marker 1 is tapped", async () => {
    const user = userEvent.setup();
    render(<MapScreen />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/Honig/i)).toBeInTheDocument();
  });

  it("closes the modal without solving when the close button is tapped", async () => {
    const user = userEvent.setup();
    render(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /schließen/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "active",
    );
  });

  it("marks station 1 as solved and closes the modal after the full riddle flow", async () => {
    const user = userEvent.setup();
    render(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /Biene/i }));
    await user.click(
      within(dialog).getByRole("button", { name: /Tuch gefunden/i }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "solved",
    );
  });

  it("restores solved state on mount when localStorage already has station 1", () => {
    localStorage.setItem(
      "treasure-hunt:progress",
      JSON.stringify({ solvedStations: [1] }),
    );
    render(<MapScreen />);
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "solved",
    );
  });
});
