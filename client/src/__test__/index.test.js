// https://stackoverflow.com/a/57269873/948938
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("Should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(<Router><App /></Router>, div);
  });
});
