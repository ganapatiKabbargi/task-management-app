import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

function Modal({ setOpen }) {
  const overlay = document.querySelector(".overlay");
  return (
    <>
      {ReactDom.createPortal(
        <div
          className={styles.wrapper}
          onClick={() => {
            setOpen(false);
          }}
        />,
        overlay
      )}
    </>
  );
}

export default Modal;
