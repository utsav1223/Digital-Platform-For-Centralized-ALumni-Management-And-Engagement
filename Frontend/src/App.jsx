import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ---------- PUBLIC PAGES ---------- */
import Home from "./Pages/Home/Home.jsx";
import UserLogin from "./Pages/Login/UserLogin.jsx";
import Register from "./Pages/Register/Register.jsx";
import ForgotPassword from "./Pages/Login/ForgotPassword.jsx";
import ResetPassword from "./Pages/Login/ResetPassword.jsx";
import StudentForgotPassword from "./Pages/Login/StudentForgotPassword";
import StudentResetPassword from "./Pages/Login/StudentResetPassword";


/* ---------- ADMIN ---------- */
import Adminlogin from "./Pages/admindashboard/Admin-login/adminLogin.jsx";
import AdminDashboard from "./Pages/admindashboard/admin-components/switcher.jsx";
import AdminProtectedRoute from "./Pages/admindashboard/admin-components/ProtectedRoute.jsx";

/* ---------- ALUMNI ---------- */
import AlumniDashboard from "./Pages/alumnidashboard/start.jsx";
import AlumniProtectedRoute from "./Pages/alumnidashboard/ProtectedRoute.jsx";

/* ---------- STUDENT ---------- */
import StudentDashboard from "./Pages/studentdashboard/StudentDashboard.jsx";
import StudentProtectedRoute from "./Pages/studentdashboard/StudentProtectedRoute.jsx";
function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Forgot / Reset Password */}
        <Route path="/alumni/forgot-password" element={<ForgotPassword />} />
        <Route path="/alumni/reset-password" element={<ResetPassword />} />
        <Route path="/student/forgot-password" element={<StudentForgotPassword />} />
        <Route path="/student/reset-password" element={<StudentResetPassword />} />

        {/* ================= ALUMNI DASHBOARD (PROTECTED) ================= */}
        <Route
          path="/alumnidashboard/*"
          element={
            <AlumniProtectedRoute>
              <AlumniDashboard />
            </AlumniProtectedRoute>
          }
        />

        {/* ================= STUDENT DASHBOARD ================= */}
        {/* <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route
          path="/studentdashboard"
          element={
            <StudentProtectedRoute>
              <StudentDashboard />
            </StudentProtectedRoute>
          }
        /> */}
        <Route
          path="/studentdashboard"
          element={
            <StudentProtectedRoute>
              <StudentDashboard />
            </StudentProtectedRoute>
          }
        />



        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
