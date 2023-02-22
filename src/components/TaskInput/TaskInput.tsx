import { useState } from "react";
import styles from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
}

function TaskInput(props: TaskInputProps) {
  const { addTodo } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(name);
    setName("");
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="caption goes here"
          value={name}
          onChange={changeInput}
        />
        <button type="submit">➕</button>
      </form>
    </div>
  );
}

export default TaskInput;
