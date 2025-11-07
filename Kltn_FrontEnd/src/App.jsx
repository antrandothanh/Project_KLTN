import React from "react";
import Sidebar from "./components/ManagerPage/Sidebar";
import styles from "./styles/App.module.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/ManagerPage/Home";
import Mailbox from "./components/ManagerPage/Mailbox";
import Analytics from "./components/ManagerPage/Analytics";
import Employees from "./components/ManagerPage/Employees";
import Departments from "./components/ManagerPage/Departments";
import SignIn from "./components/SignIn";
import EmployeeSidebar from "./components/EmployeePage/EmployeeSidebar";
import EmployeeAttendance from "./components/EmployeePage/EmployeeAttendance";
import EmployeeHome from "./components/EmployeePage/EmployeeHome"
import CameraCaptureRegisterFace from "./components/EmployeePage/CameraCaptureRegisterFace";
import CameraCaptureFaceAttendance from "./components/EmployeePage/CameraCaptureFaceAttendance";

// Layout có Sidebar
function AdminLayout() {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.pageContent}>
        <Outlet /> {/* nơi render các page con */}
      </div>
    </div>
  );
}

// Layout không có Sidebar
function AuthLayout() {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
}

// Layout của riêng cho nhân viên
function EmployeeLayout() {
  return (
    <div className={styles.App}>
      <EmployeeSidebar />
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </div>
  )
}

// function CameraCaptureLayout() {
//   return (
//     <div>
//       <CameraCapture/>
//     </div>
//   )
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout có Sidebar */}
        <Route element={<AdminLayout />}>
          <Route path="/manager" element={<Home />} />
          <Route path="/manager/employees" element={<Employees />} />
          <Route path="/manager/departments" element={<Departments />} />
        </Route>

        {/* Layout không có Sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* Layout của nhân viên */}
        <Route element={<EmployeeLayout />}>
          <Route path="/employee" element={<EmployeeHome />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/absence" element={<Departments />} />
        </Route>

        {/* Route chụp hình điểm danh */}
        <Route path="/camera/:type" element={<CameraCaptureFaceAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
