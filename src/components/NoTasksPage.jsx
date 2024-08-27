import React from "react";
import styles from "./NoTasksPage.module.css";
function NoTasksPage({ setOpen }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.cookieHeading}>
          Currently There Are No Tasks to Display
        </p>
        <p className={styles.cookieDescription}>
          Currently there are no tasks to display.
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.acceptButton} onClick={setOpen}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoTasksPage;
