import { useState } from "react";
import { Todo } from "../../@types/todo.type";
import styles from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
  curentTodo: Todo | null;
  editTodo: (name: string) => void;
  finishTodo: () => void;
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, curentTodo, editTodo, finishTodo } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (curentTodo) {
      finishTodo();
      // clear bug khi có dữ liệu ô input mà k add nhưng lại click vào edit thì khi e dit xong ô input vẫn  còn gia trị trước
      if (name) {
        setName("");
      }
    } else {
      addTodo(name);
      setName("");
    }
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (curentTodo) {
      editTodo(value);
    } else {
      setName(value);
    }
  };
  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="caption goes here"
          value={curentTodo ? curentTodo.name : name}
          onChange={changeInput}
        />
        <button type="submit">{curentTodo ? "✔" : "➕"}</button>
      </form>
    </div>
  );
}

export default TaskInput;
