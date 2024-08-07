import React from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function redirectToRegisterPage() {
    navigate("/register");
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
          <button className={styles.login}>Log In</button>
          <a href="#">Forgot Password ?</a>
          <hr />
          <button
            className={styles.createAccount}
            onClick={redirectToRegisterPage}
          >
            Create New Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
