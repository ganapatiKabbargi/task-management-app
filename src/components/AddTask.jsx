import React from "react";
import styles from "./AddTask.module.css";
import Modal from "./Modal";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../store/taskSlice";
import { toast } from "react-toastify";

function AddTask({ open, setOpen, selectedTask }) {
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();

  const defaultData = {
    title: selectedTask?.title || "",
    stage: selectedTask?.stage || "",
    date: selectedTask?.date || "",
    priority: selectedTask?.priority || "",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: defaultData });

  async function updateExsistingTask(data) {
    try {
      const updatedTaskList = tasks.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            ...data,
          };
        }
        return task;
      });

      const docRef = doc(db, "users", user.id);
      await setDoc(doc(docRef, `tasks/allTasks`), {
        task: updatedTaskList,
      });
      dispatch(updateTask(updatedTaskList));
      toast.success("Task Edited Successfully", { autoClose: 2000 });
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function addNewTask(data) {
    try {
      const taskData = {
        ...data,
        team: [
          {
            _id: "65c202d4aa62f32ffd1303cc",
            name: "Codewave Asante",
            title: "Administrator",
            email: "admin@gmail.com",
          },
          {
            _id: "65c30b96e639681a13def0b5",
            name: "Jane Smith",
            title: "Product Manager",
            email: "jane.smith@example.com",
          },
          {
            _id: "65c317360fd860f958baa08e",
            name: "Alex Johnson",
            title: "UX Designer",
            email: "alex.johnson@example.com",
          },
        ],
        createdAt: new Date().toLocaleTimeString(),
        updatedAt: "",
        isThrashed: false,
        subTasks: [],
        activities: [],
        assets: [],
        _id: Date.now(),
      };
      console.log(data);

      const docRef = doc(db, "users", user.id);
      await setDoc(doc(docRef, `tasks/allTasks`), {
        task: [...tasks, taskData],
      });
      dispatch(addTask([taskData]));
      toast.success("Task added Successfully", { autoClose: 2000 });
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function submitHandler(data) {
    selectedTask?._id ? updateExsistingTask(data) : addNewTask(data);
  }
  return (
    <>
      <Modal setOpen={setOpen} />

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.title}>
            <span>Create Task</span>
          </div>

          <div>
            <label className={styles.label}>Task Name</label>
            {errors.taskName?.type === "required" && (
              <p role="alert">First name is required</p>
            )}
            <input
              type="text"
              className={styles.input}
              {...register("title", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
          </div>
          <div>
            <label className={styles.label}>Assigned To</label>
            <input type="text" className={styles.input} disabled />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.selectContainer}>
              <label className={styles.label}>Task Stage</label>
              <select
                name="stage"
                id=""
                className={styles.select}
                {...register("stage")}
              >
                <option value="todo" className={styles.option}>
                  Todo
                </option>
                <option value="in progress">In Progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Task Date</label>
              <input
                type="date"
                className={styles.input}
                {...register("date", { required: true })}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.selectContainer}>
              <label className={styles.label}>Priority Level</label>
              <select
                name="stage"
                id=""
                className={styles.select}
                {...register("priority")}
              >
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {/* <input type="text" className={styles.input} /> */}
            </div>
            <div>
              <label className={styles.label}>Assets</label>
              <input type="text" className={styles.input} disabled />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button
              label="Cancel"
              className={styles.cancelBtn}
              onClick={() => {
                setOpen(false);
              }}
            />
            <Button label="Submit" className={styles.submitBtn} type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTask;
