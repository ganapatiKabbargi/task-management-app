import React from "react";
import styles from "./Trash.module.css";
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
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { updateTask } from "../store/taskSlice";
import { toast } from "react-toastify";

function Trash() {
  const tasks = useSelector((state) => state.task.tasks);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const restoreAllHandler = async () => {
    if (confirm("Are you sure want to restore all tasks")) {
      try {
        let tasksAfterRestore = tasks.map((task) => {
          if (task.isTrashed === true) {
            return {
              ...task,
              isTrashed: false,
            };
          }
          return task;
        });
        const docRef = doc(db, "users", user.id);
        await setDoc(doc(docRef, `tasks/allTasks`), {
          task: tasksAfterRestore,
        });
        dispatch(updateTask(tasksAfterRestore));
        toast.success("All Tasks Resored Successfully", { autoClose: 2000 });
      } catch (error) {
        toast.error("Could'nt Resore All Tasks Properly", { autoClose: 2000 });
      }
    }
  };
  return (
    <div className={styles.tasksContainer}>
      <div className={styles.header}>
        <Title title={"Trash"} />
        <div className={styles.btns}>
          <Button
            label={"Restore All"}
            icon={<MdRestore />}
            className={styles.restore}
            onClick={restoreAllHandler}
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
