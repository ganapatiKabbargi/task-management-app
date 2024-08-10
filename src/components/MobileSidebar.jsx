import React from "react";
import { useState } from "react";
import styles from "./MobileSidebar.module.css";
import Sidebar from "./Sidebar";

function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  function closeSidebarHandler() {
    setIsOpen(false);
  }
  return (
    <>
      <div
        className={`${styles.mobileSidebarContainer} ${
          isOpen ? styles.open : styles.close
        }`}
      >
        <div className={styles.btnContainer}>
          <button className={styles.closeBtn} onClick={closeSidebarHandler}>
            X
          </button>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default MobileSidebar;
