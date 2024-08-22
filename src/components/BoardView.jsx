import React from "react";
import styles from "./BoardView.module.css";
import TaskCard from "./TaskCard";
function BoardView({ tasks, currentTask }) {
  // let currentTasks =
  //   currentTask !== ""
  //     ? tasks.filter((task, i) => {
  //         return task.stage === currentTask.toLowerCase();
  //       })
  //     : tasks;
  return (
    <div className={styles.board}>
      {tasks.map((task, i) => {
        return <TaskCard task={task} key={i} />;
      })}
    </div>
  );
}

export default BoardView;
