import React from "react";
import styles from "./Navbar.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "./Avatar";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inputContainer}>
        <button className={styles.hamberger}>
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
        <Avatar />
      </div>
    </nav>
  );
}

export default Navbar;
