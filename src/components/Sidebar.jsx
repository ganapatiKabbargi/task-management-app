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
// import styles from "./SidebarDark.module.css";
import { Link, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../store/authSlice";
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

function Sidebar({ closeHandler }) {
  const dispatch = useDispatch();
  const location = useLocation();

  let user = {
    id: "uid",
    isAdmin: true,
  };

  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  function closeHandler() {
    dispatch(closeSideBar());
  }

  return (
    <div className={styles.sidebar}>
      <div>
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
                {el.icon}
                <span>{el.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "10px 16px" }}>
        <Link
          to={"/setting"}
          onClick={closeHandler}
          className={`${styles.link} ${
            path === "setting" ? styles.active : ""
          }`}
        >
          <span>{<IoMdSettings size={16} />}</span>
          <span style={{ marginBottom: "3px" }}>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
