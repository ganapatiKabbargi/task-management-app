import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  {
    label: "In Progress",
    link: "inprogress/inprogress",
    icon: <MdOutlinePendingActions />,
  },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team ", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

function closeHandler() {}

function Sidebar() {
  let user = {
    id: "uid",
    isAdmin: true,
  };
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <p>
          <MdOutlineAddTask className={styles.addTask} />
        </p>
        <span>Task Manager</span>
      </div>
      <div className={styles.linksContainer}>
        {sidebarLinks.map((el) => {
          return (
            <Link
              to={el.link}
              key={el.label}
              onClick={closeHandler}
              className={`${styles.link} ${
                path === el.link.split("/")[0] ? styles.active : ""
              }`}
            >
              <span>{el.icon}</span>
              <span>{el.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
