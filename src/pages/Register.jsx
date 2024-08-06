import React from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  function redirectToLoginPage() {
    navigate("/");
  }
  return (
    <>
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
    </>
  );
}

export default Register;
