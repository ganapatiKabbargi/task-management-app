import React from "react";
import { useState } from "react";
import styles from "./MobileSidebar.module.css";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { closeSideBar } from "../store/authSlice";

function MobileSidebar() {
  const isOpen = useSelector((state) => state.auth.isSidebarOpen);
  const dispatch = useDispatch();
  function closeSidebarHandler() {
    dispatch(closeSideBar());
  }
  return (
    <>
      {isOpen && (
        <div className={styles.backdrop} onClick={closeSidebarHandler}></div>
      )}
      <div
        className={`${styles.mobileSidebarContainer} ${
          isOpen ? styles.open : styles.close
        }`}
      >
        <button className={styles.closeBtn} onClick={closeSidebarHandler}>
          X
        </button>

        <Sidebar />
      </div>
    </>
  );
}

export default MobileSidebar;
