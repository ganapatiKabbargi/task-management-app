import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import styles from "./Dashboard.module.css";
import { summary } from "../utils/data";
import Card from "../components/Card";
import Chart from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import UserDetail from "../components/UserDetail";
import moment from "moment";

function TaskTable({ tasks }) {
  const icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  function TableHeader() {
    return (
      <thead
        className={styles.tableHead}
        style={{ borderBottomWidth: "2px", borderColor: "#454" }}
      >
        <tr className={styles.tableRow}>
          <th className={styles.tableHeading}>Task Title</th>
          <th className={styles.tableHeading}>Prioroty</th>
          <th className={styles.tableHeading}>Team</th>
          <th className={styles.createdAt}>Created At</th>
        </tr>
      </thead>
    );
  }

  function TableRow({ task }) {
    return (
      <tr className={styles.taskRow}>
        <td className={styles.tableDescription}>
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
            <span style={{ textTransform: "capitalize" }}>{task.priority}</span>
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
      </tr>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <TableHeader />
        <tbody>
          {tasks.map((task, id) => {
            return <TableRow key={id} task={task} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
function Dashboard() {
  const totals = summary.tasks;
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "#1d4ed8",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "#0f766e",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "#f59e0b",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "#be185d" || 0,
    },
  ];
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        {stats.map(({ total, icon, label, bg }, i) => {
          return (
            <Card key={i} count={total} label={label} bg={bg} icon={icon} />
          );
        })}
      </div>
      <div className={styles.chartContainer}>
        <h4 className={styles.chartHeading}>chart by Priority</h4>
        <Chart />
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.tasksTable}>
          <TaskTable tasks={summary.last10Task} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
