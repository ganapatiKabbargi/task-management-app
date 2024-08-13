import React, { useState } from "react";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import styles from "./Tasks.module.css";
import Title from "../components/Title";
import { FaList } from "react-icons/fa";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
const tabs = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "rgb(37 99 235)",
  "in progress": "rgb(202 138 4)",
  completed: "rgb(22 163 74)",
};
function Tasks() {
  const params = useParams();
  const status = params?.status || "";
  const [selected, setSelected] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            label="Create Task"
            icon={<IoMdAdd style={{ fontSize: "18px", color: "white" }} />}
            className={styles.addTaskBtn}
          />
        )}
      </div>
      <div>
        <Tabs tabs={tabs} setSelected={setSelected}>
          {!status && (
            <div className={styles.taskTitleContainer}>
              <TaskTitle label="To Do" bg={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" bg={TASK_TYPE["in progress"]} />
              <TaskTitle label="Completed" bg={TASK_TYPE.completed} />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Tasks;
