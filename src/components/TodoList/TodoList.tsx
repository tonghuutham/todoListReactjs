import TaskInput from "../TaskInput";
import { useState } from "react";
import { Todo } from "../../@types/todo.type";
import TaskList from "../TastList";
import style from "./todoList.module.scss";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const doneTodo = todos.filter((todo) => todo.done);
  const notDoneTodo = todos.filter((todo) => !todo.done);
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, todo]);
  };
  console.log(todos);

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: done };
        }
        return todo;
      });
    });
  };

  return (
    <div className={style.todoList}>
      <div className={style.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={notDoneTodo} handleDoneTodo={handleDoneTodo} />
        <TaskList
          doneTaskList
          todos={doneTodo}
          handleDoneTodo={handleDoneTodo}
        />
      </div>
    </div>
  );
}

export default TodoList;
