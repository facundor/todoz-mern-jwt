import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, act, fireEvent, waitForElement } from "@testing-library/react";
import Todo from "./Todo";
import AlertContext from "../../context/alert/alertContext";

jest.mock('../../services/todoService');

async function renderTodo() {
  const showAlert = () => {};
  let result = null;
  await act(async () => {
    result = render(
      <AlertContext.Provider value={{ showAlert }}>
        <Todo />
      </AlertContext.Provider>
    );
  });
  return result;
}

describe("Home component", () => {
  
  test("Delete element", async () => {
    const { queryByText, getAllByText, getByTitle, container, getByText } = await renderTodo();

    await waitForElement(() => queryByText("Services"));

    expect(queryByText("Services")).toBeInTheDocument();
    expect(queryByText("Controllers")).toBeInTheDocument();
    expect(queryByText("Backend init")).toBeInTheDocument();

    const deleteButton = getAllByText("delete_outline")[0].closest("button");
    fireEvent.click(deleteButton);

    expect(getByText("Are you sure you want to delete this row?")).toBeInTheDocument();

    const confirmDeleteButton = getByTitle("Save");
    fireEvent.click(confirmDeleteButton);

    /*
       TODO
    await waitForElementToBeRemoved(() => getByTitle("Save"));
    await waitForElementToBeRemoved(() => queryByText("Services"));

    expect(queryByText("Services")).not.toBeInTheDocument();
    expect(queryByText("Controllers")).toBeInTheDocument();
    expect(queryByText("Backend init")).toBeInTheDocument();*/
  });
});
