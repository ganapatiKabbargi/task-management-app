import React from "react";
import styles from "./Title.module.css";
function Title({ title, className }) {
  return <h2 className={styles.hedaing}>{title}</h2>;
}

export default Title;
