import React from "react";
import styles from "./Confirmbox.module.css";
import { useDispatch } from "react-redux";
import { closeConfirmBox, toggleDeleteConfirmation } from "../store/taskSlice";

function Confirmbox({ heading, subHeading, primary }) {
  const dispatch = useDispatch();
  function cancelHandler() {
    dispatch(closeConfirmBox());
  }
  function deleteHandler() {
    dispatch(toggleDeleteConfirmation());
  }
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <p className={styles.card_heading}>{heading || "Delete file?"}</p>
        <p className={styles.card_description}>
          {subHeading || "Lorem ipsum dolor sit amet, consectetur adi"}
        </p>
      </div>
      <div className={styles.card_button_wrapper}>
        <button
          className={`${styles.card_button} ${styles.secondary}`}
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button
          className={`${styles.card_button} ${styles.primary}`}
          onClick={deleteHandler}
        >
          {primary || "Delete"}
        </button>
      </div>
      <button className={styles.exit_button} onClick={cancelHandler}>
        <svg height="20px" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
        </svg>
      </button>
    </div>
  );
}

export default Confirmbox;
