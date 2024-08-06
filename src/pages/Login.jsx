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
    </>
  );
}

export default Login;
