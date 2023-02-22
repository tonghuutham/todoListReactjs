import TaskInput from "../TaskInput";
import { useState } from "react";
import { Todo } from "../../@types/todo.type";
import TaskList from "../TastList";
import style from "./todoList.module.scss";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [curentTodo, setCurentTodo] = useState<Todo | null>(null);
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

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id);
    if (findedTodo) {
      setCurentTodo(findedTodo);
    }
  };

  const editTodo = (name: string) => {
    setCurentTodo((prev) => {
      if (prev) {
        return { ...prev, name: name };
      } else return prev;
    });
  };

  const finishTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === curentTodo?.id) {
          // curentTodo: Todo | null thì ? thay thế cho TH null hoăc có thể viết thành curentTodo as Todo
          return curentTodo as Todo;
        }
        return todo;
      });
    });
    setCurentTodo(null); // khi đã edit xong rồi thì cho setCurentTodo =null đẻ nó xóa dữ liệu trong ô input
  };

  return (
    <div className={style.todoList}>
      <div className={style.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          curentTodo={curentTodo}
          editTodo={editTodo}
          finishTodo={finishTodo}
        />
        <TaskList
          todos={notDoneTodo}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodo}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
      </div>
    </div>
  );
}

export default TodoList;
