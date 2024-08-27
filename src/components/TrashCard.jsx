import React from "react";
import styles from "./TrashCard.module.css";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdList,
} from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import UserDetail from "./UserDetail";
import { restoreTasks } from "../store/taskSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function TrashCard({ task }) {
  const icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const user = useSelector((state) => state.auth.user);

  const restoreTaskHandler = async () => {
    try {
      let newTasks = tasks.map((t) => {
        if (task._id === t._id) {
          return {
            ...task,
            isTrashed: false,
          };
        }
        return t;
      });

      const docRef = doc(db, "users", user.id);
      await setDoc(doc(docRef, `tasks/allTasks`), {
        task: newTasks,
      });
      dispatch(restoreTasks(newTasks));
      toast.success("task restored successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error("Could'nt restore task properly", { autoClose: 2000 });
    }
  };
  return (
    <>
      <div className={styles.taskCard}>
        <div className={styles.container2}>
          <div className={styles.priority}>
            <span
              className={styles.priorityIcon}
              style={{ color: `${PRIOTITYSTYELS[task?.priority]}` }}
            >
              {icons[task.priority]}
            </span>
            <span
              style={{
                textTransform: "uppercase",
                color: `${PRIOTITYSTYELS[task?.priority]}`,
              }}
            >
              {task.priority} Priority
            </span>
          </div>
        </div>
        <>
          <div className={styles.container3}>
            <div
              className={styles.stage}
              style={{ backgroundColor: `${TASK_TYPE[task.stage]}` }}
            />

            <div className={styles.title}>{task.title}</div>
          </div>
          <span className={styles.date}>{task?.date}</span>
        </>
        <hr />
        <div className={styles.container4}>
          <div className={styles.activity}>
            <div className={styles.message}>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className={styles.message}>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className={styles.message}>
              <MdList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>
          <div className={styles.team}>
            {task?.team?.map((member, i) => {
              return (
                <div
                  key={i}
                  className={styles.member}
                  style={{
                    backgroundColor: `${
                      BGS[Math.floor(Math.random() * BGS.length)]
                    }`,
                  }}
                >
                  <UserDetail user={member} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.restoreBtn} onClick={restoreTaskHandler}>
            Restore
          </button>
          <button className={styles.deleteBtn}>Delete</button>
        </div>
        {/* {<SubTask/>} */}
      </div>
    </>
  );
}

export default TrashCard;
