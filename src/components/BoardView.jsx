import React from "react";
import styles from "./BoardView.module.css";
import TaskCard from "./TaskCard";
function BoardView({ tasks }) {
  return (
    <div className={styles.board}>
      {tasks.map((task, i) => {
        return <TaskCard task={task} />;
      })}
    </div>
  );
}

export default BoardView;
