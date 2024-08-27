import React from "react";
import styles from "./Title.module.css";
function Title({ title, className }) {
  return <h2 className={styles.heading}>{title}</h2>;
}

export default Title;
