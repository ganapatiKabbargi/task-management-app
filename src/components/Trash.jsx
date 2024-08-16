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

function Trash() {
  function TaskTable() {
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
            <th className={styles.tableHeading}>Stage</th>
            <th className={styles.createdAt}>Updated At</th>
          </tr>
        </thead>
      );
    }

    function TableRow({ task }) {
      return (
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
              <span style={{ textTransform: "capitalize" }}>{task.stage}</span>
            </div>
          </td>

          <td className={styles.createdAtDescription}>
            <div className={styles.description}>
              <span>{task.updatedAt.slice(0, 10)}</span>
            </div>
          </td>
          <td className={styles.btnContainer}>
            <Button
              icon={<MdRestore />}
              className={styles.restore}
              onClick={() => editHandler(task._id)}
            />
            <Button
              icon={<MdDelete />}
              className={styles.delete}
              onClick={() => deleteHandler(task._id)}
            />
          </td>
        </tr>
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
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}

export default Trash;
