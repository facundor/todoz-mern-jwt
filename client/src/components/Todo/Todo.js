import React, { useEffect, useContext } from "react";
import MaterialTable from "material-table";
import { todoService } from "../../services/todoService";
import AlertContext from "../../context/alert/alertContext";

export default function MaterialTableDemo() {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const [state, setState] = React.useState({
    columns: [
      { title: "Description", field: "description" },
      { title: "Done", field: "done", type: "boolean" }
    ],
    data: []
  });

  async function fetchData() {
    try {
      const resp = await todoService.getAll();
      setState({
        ...state,
        data: resp.data
      });
    } catch (error) {
      console.log(error);
      showAlert("Connection error", "error");
    }
  }

  async function addTodoItem(newItem) {
    try {
      await todoService.add(newItem);
      await fetchData();
    } catch (error) {
      console.log(error);
      showAlert("Connection error", "error");
    }
  }

  async function deleteTodoItem(todoItem) {
    try {
      await todoService.remove(todoItem);
      await fetchData();
    } catch (error) {
      console.log(error);
      showAlert("Connection error", "error");
    }
  }

  async function updateTodoItem(todoItem) {
    try {
      await todoService.update(todoItem);
      await fetchData();
    } catch (error) {
      console.log(error);
      showAlert("Connection error", "error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MaterialTable
      title="My TODO list"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            addTodoItem(newData);
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            updateTodoItem(newData);
            resolve();
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            deleteTodoItem(oldData);
            resolve();
          })
      }}
    />
  );
}
