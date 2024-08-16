import React from "react";
import styles from "./Modal.module.css";
function Modal({ setOpen }) {
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setOpen(false);
      }}
    />
  );
}

export default Modal;
