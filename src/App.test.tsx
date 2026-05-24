import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App — Finja's station", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders header, question and three answer buttons", () => {
    render(<App />);
    expect(screen.getByText(/Station 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Finja/i)).toBeInTheDocument();
    expect(screen.getByText(/Honig/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Biene/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Marienkäfer/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Raupe/i })).toBeInTheDocument();
  });

  it("does not advance when a wrong answer is tapped", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Marienkäfer/i }));
    expect(screen.queryByText(/RICHTIG/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Biene/i })).toBeInTheDocument();
  });

  it("shows the success view with direction and scarf colour on correct answer", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Biene/i }));
    expect(screen.getByText(/RICHTIG/)).toBeInTheDocument();
    expect(screen.getByText(/NORDWEST/)).toBeInTheDocument();
    expect(screen.getByText(/rote/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Tuch gefunden/i }),
    ).toBeInTheDocument();
  });

  it("persists progress and shows Fertig when 'Tuch gefunden' is tapped", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Biene/i }));
    await user.click(screen.getByRole("button", { name: /Tuch gefunden/i }));
    expect(screen.getByText(/Fertig/i)).toBeInTheDocument();
    const stored = JSON.parse(
      localStorage.getItem("treasure-hunt:progress") ?? "{}",
    );
    expect(stored.solvedStations).toEqual([1]);
  });

  it("renders Fertig directly when station 1 is already solved on mount", () => {
    localStorage.setItem(
      "treasure-hunt:progress",
      JSON.stringify({ solvedStations: [1] }),
    );
    render(<App />);
    expect(screen.getByText(/Fertig/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Biene/i }),
    ).not.toBeInTheDocument();
  });
});
