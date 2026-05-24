import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import MapScreen from "./MapScreen";
import { renderWithProgress } from "../test/render";
import { burst } from "../lib/confetti";

vi.mock("../lib/confetti", () => ({
  burst: vi.fn(),
  shower: vi.fn(),
}));

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
    vi.mocked(burst).mockClear();
  });

  it("renders seven station markers", () => {
    renderWithProgress(<MapScreen />);
    for (let id = 1; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeInTheDocument();
    }
  });

  it("renders the treasure-map background labelled 'Schatzkarte'", () => {
    renderWithProgress(<MapScreen />);
    expect(
      screen.getByRole("img", { name: /Schatzkarte/i }),
    ).toBeInTheDocument();
  });

  it("enables only marker 1 and disables markers 2-7 at the start", () => {
    renderWithProgress(<MapScreen />);
    expect(screen.getByTestId("station-marker-1")).toBeEnabled();
    for (let id = 2; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeDisabled();
    }
  });

  it("opens the riddle modal when marker 1 is tapped", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/Honig/i)).toBeInTheDocument();
  });

  it("closes the modal without solving when the close button is tapped", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
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
    renderWithProgress(<MapScreen />);
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
    renderWithProgress(<MapScreen />);
    await solveStation(user, 2);
    expect(screen.getByTestId("station-marker-3")).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByTestId("station-marker-3")).toBeEnabled();
  });

  it("fires confetti once when the correct answer is tapped", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /Biene/i }));
    expect(burst).toHaveBeenCalledTimes(1);
  });

  it("does not fire confetti when a wrong answer is tapped", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: /Marienkäfer/i }),
    );
    expect(burst).not.toHaveBeenCalled();
  });

  it("adds 'shaking' class to a wrong button and removes it after ~400ms", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProgress(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    const wrong = within(dialog).getByRole("button", {
      name: /Marienkäfer/i,
    });
    await user.click(wrong);
    expect(wrong.className).toMatch(/shaking/);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(wrong.className).not.toMatch(/shaking/);
    vi.useRealTimers();
  });

  it("does not add 'shaking' on a correct answer (success view replaces the buttons)", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /Biene/i }));
    expect(
      within(dialog).queryByRole("button", { name: /Biene/i }),
    ).not.toBeInTheDocument();
    expect(within(dialog).getByTestId("direction-label")).toBeInTheDocument();
  });

  it("renders no direction arrow before any station is solved", () => {
    renderWithProgress(<MapScreen />);
    expect(screen.queryByTestId("direction-arrow")).not.toBeInTheDocument();
  });

  it("renders a direction arrow between last-solved and active marker", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    renderWithProgress(<MapScreen />);
    expect(screen.getByTestId("direction-arrow")).toBeInTheDocument();
  });

  it("renders no direction arrow when all stations are solved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1, 2, 3, 4, 5, 6, 7] }),
    );
    renderWithProgress(<MapScreen />);
    expect(screen.queryByTestId("direction-arrow")).not.toBeInTheDocument();
  });

  it("renders the direction arrow + word with pulse animation in the success view", async () => {
    const user = userEvent.setup();
    renderWithProgress(<MapScreen />);
    await user.click(screen.getByTestId("station-marker-1"));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /Biene/i }));
    const directionLabel = within(dialog).getByTestId("direction-label");
    expect(directionLabel).toHaveTextContent("↖");
    expect(directionLabel).toHaveTextContent("NORDWEST");
    expect(directionLabel.className).toMatch(/direction-pulse/);
  });

  it("restores progress on mount", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedStations: [1] }),
    );
    renderWithProgress(<MapScreen />);
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
