import React from "react";
import styles from "./Register.module.css";
function Register() {
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
        <button className={styles.signIn}>Sign in</button>
      </form>
    </>
  );
}

export default Register;
