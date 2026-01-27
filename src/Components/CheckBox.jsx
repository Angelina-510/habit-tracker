import styles from "../styles/checkBox.module.css";

function CheckBox({ checked, onChange, style }) {
  return (
    <div className={styles.checkBox}>
      <input
        style={style}
        type="checkbox"
        className={styles.checkBoxInput}
        checked={checked}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default CheckBox;
