import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import Login from './Pages/Login/UserLogin.jsx';
import Home from './Pages/Home/Home.jsx'; 
import AdminDashboard from './Pages/admindashboard/admin-components/switcher.jsx'; 
import Adminlogin from './Pages/admindashboard/Admin-login/adminLogin.jsx'; 
import Register from './Pages/Register/Register.jsx';
import ProtectedRoute from './Pages/admindashboard/admin-components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin public login */}
        <Route path="/admin/login" element={<Adminlogin />} />

        {/* Keep plain /admin -> admin login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Explicitly protect the dashboard route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protect any other admin subroutes (optional) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional: catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
