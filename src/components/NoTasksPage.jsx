import React from "react";
import styles from "./NoTasksPage.module.css";
function NoTasksPage({ setOpen, task, btn }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.cookieHeading}>
          {`Currently There Are No ${task} to Display`}
        </p>
        <p className={styles.cookieDescription}>
          {`Currently There Are No ${task} to Display`}
        </p>
        <div className={styles.buttonContainer}>
          {btn && (
            <button className={styles.acceptButton} onClick={setOpen}>
              Add Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoTasksPage;
