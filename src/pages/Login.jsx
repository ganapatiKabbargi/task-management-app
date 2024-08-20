import React, { useState } from "react";
import styles from "./Login.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setUserCredentials } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  function redirectToRegisterPage() {
    navigate("/register");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUserCredentials({
          id: user.uid,
          email: user.email,
        })
      );
      navigate("/");
    } else {
      dispatch(setUserCredentials(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  function submitHandler(data) {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessaage = error.messaage;
        console.log(errorMessaage);
      });
  }
  return (
    <>
      {isLoading && <Loader />}
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
        <form onSubmit={handleSubmit(submitHandler)}>
          <p className={styles.logo}>Welcome</p>
          <input
            type="text"
            placeholder="Email"
            required=""
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            required=""
            {...register("password", { required: true })}
          />
          <button className={styles.login} type="submit">
            Log In
          </button>
          <a href="#">Forgot Password ?</a>
          <hr />
          <button
            className={styles.createAccount}
            onClick={redirectToRegisterPage}
            type="button"
          >
            Create New Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
