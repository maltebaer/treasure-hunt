import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import MapScreen from "./MapScreen";

const STORAGE_KEY = "treasure-hunt:progress";

async function solveStation(
  user: ReturnType<typeof userEvent.setup>,
  markerId: number,
  correctOptionLabel: RegExp,
) {
  await user.click(screen.getByTestId(`station-marker-${markerId}`));
  const dialog = screen.getByRole("dialog");
  await user.click(within(dialog).getByRole("button", { name: correctOptionLabel }));
  await user.click(
    within(dialog).getByRole("button", { name: /Tuch gefunden/i }),
  );
}

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

  it("activates marker 2 (Lina) after marker 1 is solved", async () => {
    const user = userEvent.setup();
    render(<MapScreen />);
    await solveStation(user, 1, /Biene/i);
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "solved",
    );
    expect(screen.getByTestId("station-marker-2")).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByTestId("station-marker-2")).toBeEnabled();
    for (let id = 3; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeDisabled();
    }
  });

  it("opens Lina's riddle when marker 2 is tapped after station 1 solved", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    const user = userEvent.setup();
    render(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-2"));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/Rot und Gelb/i)).toBeInTheDocument();
  });

  it("marks marker 2 solved and keeps marker 3 locked (no riddle yet)", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    const user = userEvent.setup();
    render(<MapScreen />);
    await solveStation(user, 2, /Orange/i);
    expect(screen.getByTestId("station-marker-2")).toHaveAttribute(
      "data-state",
      "solved",
    );
    expect(screen.getByTestId("station-marker-3")).toHaveAttribute(
      "data-state",
      "locked",
    );
    expect(screen.getByTestId("station-marker-3")).toBeDisabled();
  });

  it("restores progress on mount", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    render(<MapScreen />);
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "solved",
    );
    expect(screen.getByTestId("station-marker-2")).toHaveAttribute(
      "data-state",
      "active",
    );
  });
});
