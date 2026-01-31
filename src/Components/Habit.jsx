import { useContext } from "react";
import styles from "../styles/itemHabit.module.css";
import { ModalContext } from "../MyContext";

/**
 *
 * @param {object} habit - объект привычкт со всей инфомацией о ней
 *
 */

function Habit({ habit }) {
  const { setChangeHabit } = useContext(ModalContext);

  return (
    <div className={styles.itemHabit} onClick={() => setChangeHabit(habit)}>
      <span>{habit.name}</span>
      <div className={styles.habitPencil}>✎</div>
    </div>
  );
}

export default Habit;
