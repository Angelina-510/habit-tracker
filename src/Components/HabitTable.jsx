import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import CheckBox from "./CheckBox";
import styles from "../styles/habitTable.module.css";
import Habit from "./Habit";
import NewHabit from "./NewHabit";

/**
 * Компонент таблица, который состоит из списка привычек и календаря выполнения привычек
 *
 */

function HabitTable() {
  const { listHabit, setListHabit } = useContext(MyContext);
  const [dateNow, setDateNow] = useState(new Date());
  const month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  function getWeek(start) {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }

  function onBackWeek() {
    setDateNow((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() - 7);
      return date;
    });
  }

  function onNextWeek() {
    setDateNow((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() + 7);
      return date;
    });
  }

  function checkedDate(date, indexHabit) {
    setListHabit((prev) =>
      prev.map((el, index) =>
        index === indexHabit
          ? { ...el, checkedDates: [...el.checkedDates, date] }
          : el,
      ),
    );
  }

  function deleteCheckedDate(dateDelete, indexHabit) {
    setListHabit((prev) =>
      prev.map((el, index) =>
        indexHabit === index
          ? {
              ...el,
              checkedDates: el.checkedDates.filter(
                (checkDate) => checkDate !== dateDelete,
              ),
            }
          : el,
      ),
    );
  }

  function checkOrDeleteDate(habit, date, indexHabit) {
    habit.checkedDates.includes(date.toLocaleDateString())
      ? deleteCheckedDate(date.toLocaleDateString(), indexHabit)
      : checkedDate(date.toLocaleDateString(), indexHabit);
  }

  function HabitItem({ habit }) {
    return <div>{habit.name}</div>;
  }

  const week = getWeek(dateNow);

  return (
    <div className={styles.sheet}>
      <div className={styles.habitSheet}>
        <div className={styles.habitSheetDateBtns}>
          <button
            className={styles.habitSheetDateBtn}
            onClick={() => onBackWeek()}
          >
            ❮
          </button>
          <button
            className={styles.habitSheetDateBtn}
            onClick={() => onNextWeek()}
          >
            ❯
          </button>
        </div>
        {week.map((el) => (
          <div key={el.toLocaleDateString()} className={styles.habitSheetDate}>
            <div>{`${el.getDate()} ${month[el.getMonth()]}`}</div>
            <div>{el.toLocaleDateString("ru-RU", { weekday: "short" })}</div>
          </div>
        ))}

        {listHabit.map((el, indexHabit) => (
          <>
            <Habit key={el.id} habit={el} />
            {week.map((date) => (
              <CheckBox
                color={el.color}
                checked={el.checkedDates.includes(date.toLocaleDateString())}
                onChange={() => checkOrDeleteDate(el, date, indexHabit)}
              />
            ))}
          </>
        ))}
      </div>
      <NewHabit />
    </div>
  );
}

export default HabitTable;
