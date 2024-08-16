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

function Table({ tasks }) {
  function editHandler(id) {}
  function deleteHandler(id) {}

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
      <div className={styles.tasksTable}>
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}

export default Table;
