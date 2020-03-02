import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import PrivateRoute from "../PrivateRoute";
import AuthContext from "../../../context/auth/authContext";

const message = "Home";

function renderPrivateRoute(auth) {
  const home = () => <div>{message}</div>;

  return render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={["/home"]}>
        <PrivateRoute path="/home" component={home} />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("PrivateRoute component", () => {
  test("With token", () => {
    const { queryByText } = renderPrivateRoute({
      token: "test token"
    });
    expect(queryByText(message)).toBeInTheDocument();
  });

  test("Without token", () => {
    const { queryByText } = renderPrivateRoute({
      token: null
    });
    expect(queryByText(message)).not.toBeInTheDocument();
  });
});
