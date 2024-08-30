import React from "react";
import styles from "./BoardView.module.css";
import TaskCard from "./TaskCard";
import Loader from "./Loader";
import NoTasksPage from "./NoTasksPage";
import { useLocation } from "react-router-dom";
function BoardView({ tasks, currentTask, isLoading, setOpen }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  console.log(path);
  let activeTasks = tasks.filter((task, i) => {
    return task.isTrashed === false;
  });
  let currentTasks;
  if (path[1] === "tasks") {
    currentTasks =
      currentTask === "" || currentTask === "Active"
        ? activeTasks
        : activeTasks.filter((task, i) => {
            return task.stage === currentTask.toLowerCase();
          });
  } else {
    currentTasks =
      path[1] === "tasks"
        ? activeTasks
        : activeTasks.filter((task, i) => {
            return task.stage.split(" ").join("") === path[1];
          });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : currentTasks.length === 0 ? (
        <NoTasksPage
          setOpen={setOpen}
          btn={true}
          task={(currentTask || "") + " Tasks"}
        />
      ) : (
        <div className={styles.board}>
          {currentTasks.map((task, i) => {
            return <TaskCard task={task} key={i} />;
          })}
        </div>
      )}
    </>
  );
}

export default BoardView;
