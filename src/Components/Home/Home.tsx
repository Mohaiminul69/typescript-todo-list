import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import "./home.css";

const Home = () => {
  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (getLocal === "{}") {
      console.log("valo hoise");
    }
    console.log(getLocal);
    setTodos(getLocal);
  }, []);
  const [todos, setTodos] = useState<Todo[]>([]);

  interface Todo {
    id: number;
    task: string;
  }

  const getTask = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (getTask.current) {
      const todo: Todo = {
        id: Math.floor(Math.random() * 50) + todos.length,
        task: getTask.current?.value || "",
      };
      setTodos([...todos, todo]);
      getTask.current.value = "";
      console.log(todos);
      const localTasks: object[] = [...todos];
      localTasks.push(todo);
      console.log(localTasks);
      localStorage.setItem("tasks", JSON.stringify(localTasks));
    }
  };

  const removeTask = (todo: Todo) => {
    const newTodos = todos.filter((oldTodo) => oldTodo.id !== todo.id);
    setTodos(newTodos);
    localStorage.setItem("tasks", JSON.stringify(newTodos));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <h1>Todo List</h1>
        <div className="inputWrapper">
          <TextField
            inputRef={getTask}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
          <Button onClick={addTask} variant="contained">
            Add
          </Button>
        </div>
        <List>
          {todos.map((todo) => (
            <ListItem
              disablePadding
              key={todo.id}
              sx={{ mx: "auto", width: 400 }}
            >
              <ListItemButton>{todo.task}</ListItemButton>{" "}
              <Button onClick={() => removeTask(todo)} variant="contained">
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
};

export default Home;
