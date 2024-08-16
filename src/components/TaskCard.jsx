import React from "react";
import styles from "./TaskCard.module.css";
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
function TaskCard({ task }) {
  const icons = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
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
          <span className={styles.date}>{task?.date.slice(0, 10)}</span>
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
        {/* {<SubTask/>} */}
      </div>
    </>
  );
}

export default TaskCard;
