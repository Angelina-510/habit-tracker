import styles from "../styles/checkBox.module.css";

/**
 * @param {boolean} checked - булевое значение, которое передается как пропс из HabitTable. Оно проверяет была ли выполнена привычка в этот день
 * @param {function} onChange - колбэк ф-ция, которая вызывается при клике
 * @param {string} color - цвет кружочка
 */
function CheckBox({ checked, onChange, color }) {
  return (
    <div className={styles.checkBox}>
      <input
        style={{ background: color }}
        type="checkbox"
        className={styles.checkBoxInput}
        checked={checked}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default CheckBox;
