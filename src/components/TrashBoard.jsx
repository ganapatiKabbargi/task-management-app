import React from "react";
import TrashCard from "./TrashCard";
import styles from "./TrashBoard.module.css";

function TrashBoard({ tasks }) {
  return (
    <>
      <div className={styles.board}>
        {tasks
          .filter((task, i) => {
            return task.isTrashed === true;
          })
          .map((t, i) => {
            return <TrashCard task={t} key={i} />;
          })}
      </div>
    </>
  );
}

export default TrashBoard;
