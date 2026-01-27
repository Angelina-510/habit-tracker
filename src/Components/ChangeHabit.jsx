import { useContext, useEffect, useState } from "react";
import { ModalContext, MyContext } from "../MyContext";
import styles from "../styles/changeHabit.module.css";

function ChangeHabit() {
  const { changeHabit, setChangeHabit } = useContext(ModalContext);
  const { listHabit, setListHabit } = useContext(MyContext);
  const colorList = [
    { name: "Peachpuff", codeColor: "#ffdab9" },
    { name: "Warm Cream", codeColor: "#EFE2C6" },
    { name: "Soft Champagne", codeColor: "#E6D3A3" },
    { name: "Pale Peach", codeColor: "#F2C1A0" },
    { name: "Dusty Mint", codeColor: "#A8CFC6" },
    { name: "Olive Green", codeColor: "#bad3d0" },
    { name: "Soft Teal", codeColor: "#B7C4A3" },
    { name: "Muted Turquoise", codeColor: "#d5f7f8" },
    { name: "Foggy Blue", codeColor: "#b2c5d0" },
    { name: "Blush Rose", codeColor: "#d0efcd" },
    { name: "Terracotta Light", codeColor: "#e2c0c0" },
    { name: "Muted Gold", codeColor: "#d6bada" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChangeName(e) {
    setChangeHabit((prev) => ({ ...prev, name: e.target.value }));
  }

  function handleChangeDescription(e) {
    setChangeHabit((prev) => ({ ...prev, description: e.target.value }));
  }

  function handleChangeColor(newColor) {
    setChangeHabit((prev) => ({ ...prev, color: newColor }));
  }

  function handleSaveChange(idHabit, newNameHabit) {
    setListHabit((prev) =>
      prev.map((el) => {
        if (el.id === idHabit && newNameHabit !== "") {
          setChangeHabit(undefined);
          return changeHabit;
        }
        return el;
      }),
    );
  }

  function handleCancel() {
    setChangeHabit(undefined);
  }

  function handleDeleteHabit(idHabit) {
    setListHabit((prev) => prev.filter((el) => el.id !== idHabit));
    setChangeHabit(undefined);
  }

  function closeSideBar(e) {
    const myClickX = e.clientX;
    const clickOverlayX = window.innerWidth - 550;
    if (myClickX < clickOverlayX) {
      setChangeHabit(undefined);
    }
  }

  function isActive(colorActive) {
    return changeHabit.color === colorActive;
  }

  return (
    <div className={styles.overlay} onClick={closeSideBar}>
      <form className={styles.containerChange} onSubmit={handleSubmit}>
        <label>
          Название
          <input
            type="text"
            value={changeHabit.name}
            onChange={handleChangeName}
            className={styles.changeInput}
            required
          />
        </label>
        <div className={styles.changeDescription}>
          <label htmlFor="descriptionHabit">Описание</label>
          <textarea
            id="descriptionHabit"
            rows={10}
            cols={50}
            value={changeHabit.description}
            onChange={handleChangeDescription}
            className={styles.changeInput}
          ></textarea>
        </div>

        <ul className={styles.listColor}>
          {colorList.map((el) => (
            <li
              className={`${styles.itemColor} ${isActive(el.codeColor) ? styles.itemColorActive : ""}`}
              key={el.name}
              style={{
                backgroundColor: el.codeColor,
              }}
              onClick={() => handleChangeColor(el.codeColor)}
            ></li>
          ))}
        </ul>
        <div className={styles.changeBtns}>
          <button
            className={styles.changeBtn}
            onClick={() => handleSaveChange(changeHabit.id, changeHabit.name)}
          >
            Сохранить
          </button>
          <button
            className={styles.changeBtn}
            onClick={() => handleCancel(changeHabit.id)}
          >
            Отмена
          </button>
        </div>
        <div className={styles.deleteBtnContainer}>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDeleteHabit(changeHabit.id)}
          >
            Удалить привычку
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeHabit;
