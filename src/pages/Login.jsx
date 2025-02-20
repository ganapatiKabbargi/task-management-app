import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setUserCredentials } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import { fetchTask } from "../store/taskSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // const id = useSelector((state) => state.auth.user?.id);

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
    console.log("on auth state changed");
    async function fetchData(user) {
      const taskRef = doc(db, "users", user.uid);
      const docRef = doc(taskRef, "tasks/allTasks");
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch(fetchTask(docSnap.data().task));
          navigate("/");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          navigate("/");
        }
        if (isLoading) {
          setIsLoading(false);
        }
      } catch {
        (error) => {
          console.log(error);
        };
      }
    }

    if (user) {
      console.log(user);
      dispatch(
        setUserCredentials({
          id: user.uid,
          email: user.email,
          "display name": user.displayName,
          "profile picture": user.photoURL,
        })
      );
      fetchData(user);
      // navigate("/");
    } else {
      dispatch(setUserCredentials(null));
      if (isLoading) {
        setIsLoading(false);
      }
    }
  });

  function submitHandler(data) {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("signedin");
        toast.success("logged in successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        reset();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      });
  }

  return isLoading ? (
    <Loader />
  ) : (
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
        <Link to={"/forgotPassword"}>Forgot Password ?</Link>
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
  );
}

export default Login;
