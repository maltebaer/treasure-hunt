import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the map with all seven station markers", () => {
    render(<App />);
    for (let id = 1; id <= 7; id++) {
      expect(screen.getByTestId(`station-marker-${id}`)).toBeInTheDocument();
    }
  });
});
