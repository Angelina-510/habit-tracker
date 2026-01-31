import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import styles from "../styles/newHabit.module.css";

/**
 * Компонент создание новой привычки через ввод в input
 *
 */

function NewHabit() {
  const [newHabit, setNewHabit] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { setListHabit } = useContext(MyContext);

  function handleAddNewHabit(e) {
    e.preventDefault();
    if (!newHabit.trim()) {
      return;
    }
    setListHabit((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newHabit,
        checkedDates: [],
        description: "",
        color: "#b2c5d0",
      },
    ]);
    setShowInput(!showInput);
    setNewHabit("");
  }
  function handleOpenInput() {
    setShowInput((prev) => !prev);
  }

  function handleChange(e) {
    setNewHabit(e.target.value);
  }

  return (
    <div>
      {showInput ? (
        <form onSubmit={handleAddNewHabit} className={styles.formInputNewHabit}>
          <input
            type="text"
            placeholder="Введите новую привычку"
            value={newHabit}
            onChange={handleChange}
            autoFocus
            className={styles.inputNewHabit}
          ></input>
          <button className={styles.btnInputNewHabit}>+</button>
        </form>
      ) : (
        <button
          onClick={() => handleOpenInput()}
          className={styles.btnAddHabit}
        >
          + Добавить новую привычку
        </button>
      )}
    </div>
  );
}

export default NewHabit;
