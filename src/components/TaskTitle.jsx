import React from "react";
import styles from "./TaskTitle.module.css";
import { IoMdAdd } from "react-icons/io";

function TaskTitle({ label, bg }) {
  function onClickHandler() {}
  return (
    <div className={styles.taskTitle}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div
          className={styles.taskTitleItems}
          style={{ backgroundColor: bg }}
        />
        <p className={styles.label}>{label}</p>
      </div>
      <button onClick={onClickHandler} className={styles.btn}>
        <IoMdAdd style={{ fontSize: "18px", color: "white" }} />
      </button>
    </div>
  );
}

export default TaskTitle;
