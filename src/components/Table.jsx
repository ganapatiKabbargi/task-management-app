import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdList,
} from "react-icons/md";
const icons = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
import styles from "./Table.module.css";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import UserDetail from "./UserDetail";
import moment from "moment";
import { BiMessageAltDetail } from "react-icons/bi";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import NoTasksPage from "./NoTasksPage";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { deleteTask } from "../store/taskSlice";
import { toast } from "react-toastify";

function Table({ tasks, currentTask }) {
  const [openEdit, setOpenEdit] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

  function editHandler(id) {
    setOpenEdit(true);
  }

  const deleteHandler = async (id) => {
    try {
      let newTasks = tasks.map((task) => {
        if (task._id === id) {
          return {
            ...task,
            isTrashed: true,
          };
        }
        return task;
      });

      const docRef = doc(db, "users", user.id);
      await setDoc(doc(docRef, `tasks/allTasks`), {
        task: newTasks,
      });
      dispatch(deleteTask(newTasks));
      toast.success("task Added To The Recycle bin", { autoClose: 2000 });
    } catch (error) {
      toast.error("Could'nt delete task properly", { autoClose: 2000 });
    }
  };

  function TaskTable({ tasks }) {
    const icons = {
      high: <MdKeyboardDoubleArrowUp />,
      medium: <MdKeyboardArrowUp />,
      low: <MdKeyboardArrowDown />,
    };

    function TableHeader() {
      return (
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeading}>Task Title</th>
            <th className={styles.tableHeading}>Prioroty</th>
            <th className={styles.tableHeading}>Team</th>
            <th className={styles.createdAt}>Created At</th>
            <th className={styles.assets}>Assets</th>
          </tr>
        </thead>
      );
    }

    function TableRow({ task }) {
      return (
        <>
          <tr className={styles.taskRow}>
            <td className={styles.taskDetailData}>
              <div className={styles.taskDetailContainer}>
                <div
                  className={styles.taskDetail}
                  style={{ backgroundColor: `${TASK_TYPE[task.stage]}` }}
                />

                <p className={styles.taskTitle}>{task.title}</p>
              </div>
            </td>
            <td className={styles.tableDescription}>
              <div className={styles.description}>
                <span
                  className={styles.priorityIcon}
                  style={{ color: `${PRIOTITYSTYELS[task.priority]}` }}
                >
                  {icons[task.priority]}
                </span>
                <span style={{ textTransform: "capitalize" }}>
                  {task.priority}
                </span>
              </div>
            </td>
            <td className={styles.tableDescription}>
              <div style={{ display: "flex" }}>
                {task.team.map((m, i) => {
                  return (
                    <div
                      key={i}
                      className={styles.team}
                      style={{ backgroundColor: `${BGS[i % BGS.length]}` }}
                    >
                      <UserDetail user={m} />
                    </div>
                  );
                })}
              </div>
            </td>
            <td className={styles.createdAtDescription}>
              <div className={styles.description}>
                <span>{moment(task.date).fromNow()}</span>
              </div>
            </td>
            <td className={styles.createdAtDescription}>
              <div className={styles.description}>
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
              </div>
            </td>
            <td className={styles.btnContainer}>
              <Button
                label="Edit"
                className={styles.edit}
                onClick={() => editHandler(task._id)}
              />
              <Button
                label="Delete"
                className={styles.delete}
                onClick={() => deleteHandler(task._id)}
              />
            </td>
          </tr>
          {openEdit && <AddTask setOpen={setOpenEdit} selectedTask={task} />}
        </>
      );
    }

    return (
      <div className={styles.tableContainer}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            cellSpacing={"0px"}
            cellPadding={"30px"}
          >
            <TableHeader />
            <tbody>
              {tasks.map((task, id) => {
                return <TableRow key={id} task={task} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return currentTasks.length === 0 ? (
    <NoTasksPage task={(currentTask || "") + " Tasks"} />
  ) : (
    <div className={styles.tasksContainer}>
      <div className={styles.tasksTable}>
        <TaskTable tasks={currentTasks} />
      </div>
    </div>
  );
}

export default Table;
