import React from "react";
import styles from "./Card.module.css";
function Card({ count, label, bg, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.card1}>
        <p className={styles.label}>{label}</p>
        <span className={styles.count}>{count}</span>
        <span className={styles.prev}>{"110 last month"}</span>
      </div>
      <div className={styles.icon} style={{ backgroundColor: bg }}>
        {icon}
      </div>
    </div>
  );
}

export default Card;
