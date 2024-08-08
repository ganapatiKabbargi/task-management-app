import React from "react";
import styles from "./Navbar.module.css";
import { MdOutlineSearch } from "react-icons/md";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inputContainer}>
        <button className={styles.hamberger}>0</button>
        <div className={styles.searchContainer}>
          <MdOutlineSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchbox}
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
