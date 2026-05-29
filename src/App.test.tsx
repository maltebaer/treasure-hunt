import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

const STORAGE_KEY = "treasure-hunt:progress";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the map with all eight station markers", () => {
    render(<App />);
    for (let id = 1; id <= 8; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeInTheDocument();
    }
  });

  it("renders the MapScreen when not all stations are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7] }),
    );
    render(<App />);
    expect(screen.getByTestId("map-screen")).toBeInTheDocument();
    expect(screen.queryByText(/GESCHAFFT/i)).not.toBeInTheDocument();
  });

  it("renders the TreasureScreen when all stations are solved on mount", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7, 8] }),
    );
    render(<App />);
    expect(screen.getByText(/GESCHAFFT/i)).toBeInTheDocument();
    expect(screen.queryByTestId("map-screen")).not.toBeInTheDocument();
  });

  it("returns to the map without resetting progress when 'Zurück zur Karte' is tapped", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7, 8] }),
    );
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: /Zurück zur Karte/i }),
    );
    expect(screen.getByTestId("map-screen")).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.solvedStations).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("switches to TreasureScreen after solving the eighth (final) station from the map", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7] }),
    );
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTestId("station-marker-8"));
    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: /(?<!Fünf)Zehn/i }),
    );
    await user.click(
      within(dialog).getByRole("button", { name: /Tuch gefunden/i }),
    );
    expect(screen.getByText(/GESCHAFFT/i)).toBeInTheDocument();
    expect(screen.queryByTestId("map-screen")).not.toBeInTheDocument();
  });
});
