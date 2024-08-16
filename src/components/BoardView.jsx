import React from "react";
import styles from "./BoardView.module.css";
import TaskCard from "./TaskCard";
function BoardView({ tasks, currentTask }) {
  let currentTasks =
    currentTask !== ""
      ? tasks.filter((task, i) => {
          return task.stage === currentTask.toLowerCase();
        })
      : tasks;
  return (
    <div className={styles.board}>
      {currentTasks.map((task, i) => {
        return <TaskCard task={task} />;
      })}
    </div>
  );
}

export default BoardView;
