import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./App.module.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";

function Layout() {
  const navigate = useNavigate();
  let user = true;
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
    navigate("/login")
  );
}

function App() {
  return (
    <main className={styles.main}>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
