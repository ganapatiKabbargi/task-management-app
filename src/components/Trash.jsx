import React from "react";
import styles from "./Trash.module.css";
import { tasks } from "../utils/data";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdRestore,
} from "react-icons/md";
import Button from "./Button";
import Title from "./Title";
import TrashBoard from "./TrashBoard";
import { useSelector } from "react-redux";

function Trash() {
  const tasks = useSelector((state) => state.task.tasks);

  return (
    <div className={styles.tasksContainer}>
      <div className={styles.header}>
        <Title title={"Trash"} />
        <div className={styles.btns}>
          <Button
            label={"Restore All"}
            icon={<MdRestore />}
            className={styles.restore}
          />
          <Button
            label={"Delete All"}
            icon={<MdDelete />}
            className={styles.delete}
          />
        </div>
      </div>
      <div className={styles.tasksTable}>
        <TrashBoard tasks={tasks} />
      </div>
    </div>
  );
}

export default Trash;
