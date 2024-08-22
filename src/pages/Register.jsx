import React from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../store/authSlice";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function redirectToLoginPage() {
    navigate("/login");
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
    } else {
      dispatch(setUserCredentials(null));
    }
  });

  function submitHandler(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setDoc(
            doc(db, "users", user.uid),
            {
              email: user.email,
              uid: user.uid,
            },
            { merge: true }
          );
        }
        reset();
        if (userCredential.user) {
          navigate("/login");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessaage = error.messaage;
        console.log(errorMessaage);
      });
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
          <input
            type="password"
            placeholder="Confirm Password"
            required=""
            {...register("confirmPassword", { required: true })}
          />
          <button className={styles.register} type="submit">
            Register
          </button>
          <span>Already user ?</span>
          <hr />
          <button
            className={styles.signIn}
            onClick={redirectToLoginPage}
            type="button"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
