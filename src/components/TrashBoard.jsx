import React from "react";
import TrashCard from "./TrashCard";
import styles from "./TrashBoard.module.css";
import NoTasksPage from "./NoTasksPage";
function TrashBoard({ tasks }) {
  let trashedTasks = tasks.filter((task, i) => {
    return task.isTrashed === true;
  });
  return (
    <>
      {trashedTasks.length === 0 ? (
        <NoTasksPage task={"Trashed"} btn={false} />
      ) : (
        <div className={styles.board}>
          {trashedTasks.map((task, i) => {
            return <TrashCard task={task} key={i} />;
          })}
        </div>
      )}
    </>
  );
}

export default TrashBoard;
