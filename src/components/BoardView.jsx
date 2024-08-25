import React from "react";
import styles from "./BoardView.module.css";
import TaskCard from "./TaskCard";
import Loader from "./Loader";
function BoardView({ tasks, currentTask, isLoading }) {
  // let currentTasks =
  //   currentTask !== ""
  //     ? tasks.filter((task, i) => {
  //         return task.stage === currentTask.toLowerCase();
  //       })
  //     : tasks;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.board}>
          {tasks
            .filter((task, i) => {
              return task.isTrashed === false;
            })
            .map((task, i) => {
              return <TaskCard task={task} key={i} />;
            })}
        </div>
      )}
    </>
  );
}

export default BoardView;
