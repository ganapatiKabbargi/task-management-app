import React from "react";
import styles from "./AddTask.module.css";
import Modal from "./Modal";
import Button from "./Button";
import { useForm } from "react-hook-form";

function AddTask({ open, setOpen }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function submitHandler(data) {
    console.log(data);
    setOpen(false);
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
              {...register("taskName", { required: true })}
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
                {...register("taskStage")}
              >
                <option value="todo" className={styles.option}>
                  Todo
                </option>
                <option value="in progress">In Progress</option>
                <option value="completed">completed</option>
              </select>
              {/* <input type="text" className={styles.input} /> */}
            </div>
            <div>
              <label className={styles.label}>Task Date</label>
              <input
                type="date"
                className={styles.input}
                {...register("taskDate", { required: true })}
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
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
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
