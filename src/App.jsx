import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";

function Layout() {
  const navigate = useNavigate();
  let user = true;
  return user ? (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
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
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
