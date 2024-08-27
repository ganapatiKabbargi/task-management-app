import React from "react";
import TrashCard from "./TrashCard";
import styles from "./TrashBoard.module.css";

function TrashBoard({ tasks }) {
  let trashedTasks = tasks.filter((task, i) => {
    return task.isTrashed === true;
  });
  return (
    <>
      <div className={styles.board}>
        {trashedTasks.map((task, i) => {
          return <TrashCard task={task} key={i} />;
        })}
      </div>
    </>
  );
}

export default TrashBoard;
