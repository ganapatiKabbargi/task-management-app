import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";
import Trash from "./components/Trash";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { addTask } from "./store/taskSlice";
import ForgotPassword from "./components/ForgotPassword";

function Layout() {
  const navigate = useNavigate();
  let user = useSelector((state) => state.auth.user);
  console.log(user);
  return user ? (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className={styles.rightContainer}>
        <Navbar />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  // const dispatch = useDispatch();
  // const id = useSelector((state) => state.auth.user.id);

  // useEffect(() => {
  //   const taskRef = doc(db, "users", id);
  //   const docRef = doc(taskRef, "tasks/allTasks");
  //   async function fetchData() {
  //     try {
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log("Document data:", docSnap.data());
  //         dispatch(addTask(docSnap.data().task));
  //       } else {
  //         // docSnap.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     } catch {
  //       (error) => {
  //         console.log(error);
  //       };
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <main className={styles.main}>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/inprogress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          {/* <Route path="/team" element={<Users />} /> */}
          <Route path="/trashed" element={<Trash />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </main>
  );
}

export default App;
