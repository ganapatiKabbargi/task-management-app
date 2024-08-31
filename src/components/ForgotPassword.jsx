import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Email Sent! Check your inbox for password reset instruction.",
        { position: "top-center", autoClose: false }
      );
      setEmail("");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Could'nt reset password properly! try again", {
        autoclose: 2000,
        position: "top-center",
      });
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>Change Password</div>

        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <button className={styles.form_submit_btn} type="submit">
            Send Email
          </button>
        </form>

        {/* <p className={styles.signup_link}>
        Don't have an account?
        <a href="#" className={styles.signup_sublink}>
          {" "}
          Sign up now
        </a>
      </p> */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className={styles.btn}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
