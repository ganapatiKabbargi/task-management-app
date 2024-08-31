import React from "react";
import styles from "./Navbar.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdUpdate } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { CgMoveTask } from "react-icons/cg";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { openSideBar } from "../store/authSlice";
import Notification from "./Notification";
function Navbar() {
  const dispatch = useDispatch();

  function openSidebarHandler() {
    dispatch(openSideBar());
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.inputContainer}>
        <button className={styles.hamberger} onClick={openSidebarHandler}>
          <RxHamburgerMenu className={styles.ham_icon} />
        </button>
        <div className={styles.searchContainer}>
          <MdOutlineSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchbox}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className={styles.navbar_right}>
        <div className={styles.btnContainer}>
          <button className={styles.btn}>{<MdOutlineMessage />}</button>
          <button className={styles.btn}>{<MdUpdate />}</button>
        </div>
        <Notification />
        <Avatar />
      </div>
    </nav>
  );
}

export default Navbar;
