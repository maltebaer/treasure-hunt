import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import MapScreen from "./MapScreen";

const STORAGE_KEY = "treasure-hunt:progress";

const CORRECT_OPTION_LABEL: Record<number, RegExp> = {
  1: /Biene/i,
  2: /Orange/i,
  3: /Rotkäppchen/i,
  4: /Acht/i,
  5: /Kuh/i,
  6: /Äpfel/i,
  7: /Schatz/i,
};

async function solveStation(
  user: ReturnType<typeof userEvent.setup>,
  markerId: number,
) {
  await user.click(screen.getByTestId(`station-marker-${markerId}`));
  const dialog = screen.getByRole("dialog");
  await user.click(
    within(dialog).getByRole("button", { name: CORRECT_OPTION_LABEL[markerId] }),
  );
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
    await solveStation(user, 1);
    expect(screen.getByTestId("station-marker-1")).toHaveAttribute(
      "data-state",
      "solved",
    );
    expect(screen.getByTestId("station-marker-2")).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByTestId("station-marker-2")).toBeEnabled();
  });

  it("activates marker 3 (Friedi) after marker 2 is solved", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    const user = userEvent.setup();
    render(<MapScreen />);
    await solveStation(user, 2);
    expect(screen.getByTestId("station-marker-3")).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByTestId("station-marker-3")).toBeEnabled();
  });

  it("plays through all seven stations and reveals the treasure placeholder", async () => {
    const user = userEvent.setup();
    render(<MapScreen />);
    for (let id = 1; id <= 7; id++) {
      await solveStation(user, id);
    }
    expect(screen.getByTestId("treasure-placeholder")).toBeInTheDocument();
    expect(screen.getByText(/Du hast den Schatz gefunden/i)).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.solvedStations).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("shows the treasure placeholder on mount when all stations are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7] }),
    );
    render(<MapScreen />);
    expect(screen.getByTestId("treasure-placeholder")).toBeInTheDocument();
  });
});
