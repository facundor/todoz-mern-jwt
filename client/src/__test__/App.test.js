import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// https://reacttraining.com/react-router/web/guides/testing
function renderApp(initialEntry) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>
  );
}

describe("App component", () => {
  test("Match route", () => {
    const { container } = renderApp("/");
    expect(container.innerHTML).toMatch("Sign in");
  });

  test("No match route", () => {
    const { container } = renderApp("/something-that-does-not-match");
    expect(container.innerHTML).toMatch("No match for");
  });

});
