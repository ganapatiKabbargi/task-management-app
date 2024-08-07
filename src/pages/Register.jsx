import React from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  function redirectToLoginPage() {
    navigate("/login");
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Firebase based Task Manager</h1>
          <div className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.subTitle}>
            Manage all your tasks in one place
          </div>
        </div>
        <form>
          <p className={styles.logo}>Welcome</p>
          <input type="text" placeholder="Email" required="" />
          <input type="password" placeholder="Password" required="" />
          <input type="password" placeholder="Confirm Password" required="" />
          <button className={styles.register}>Register</button>
          <span>Already user ?</span>
          <hr />
          <button className={styles.signIn} onClick={redirectToLoginPage}>
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
