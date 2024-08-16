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
import BoardView from "../components/BoardView";
import { tasks } from "../utils/data";
import Table from "../components/Table";
import AddTask from "../components/AddTask";

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
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  console.log(selectedTask);

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            label="Create Task"
            icon={<IoMdAdd style={{ fontSize: "18px", color: "white" }} />}
            className={styles.addTaskBtn}
            onClick={() => {
              setOpen(true);
            }}
          />
        )}
      </div>
      <div>
        <Tabs tabs={tabs} setSelected={setSelected}>
          {!status && (
            <div className={styles.taskTitleContainer}>
              <TaskTitle
                label="ToDo"
                bg={TASK_TYPE.todo}
                setSelectedTask={setSelectedTask}
              />
              <TaskTitle
                label="In Progress"
                bg={TASK_TYPE["in progress"]}
                setSelectedTask={setSelectedTask}
              />
              <TaskTitle
                label="Completed"
                bg={TASK_TYPE.completed}
                setSelectedTask={setSelectedTask}
              />
            </div>
          )}
          {selected === 0 ? (
            <BoardView tasks={tasks} currentTask={selectedTask} />
          ) : (
            <div>
              <Table tasks={tasks} />
            </div>
          )}
        </Tabs>
        {open && <AddTask open={open} setOpen={setOpen} />}
      </div>
    </div>
  );
}

export default Tasks;
