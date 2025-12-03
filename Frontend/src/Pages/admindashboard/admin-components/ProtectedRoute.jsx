// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute (wrapper): checks for a client-side `admin_token` in localStorage
 * The token should be a JSON string with { value, expiry } where expiry is a ms timestamp.
 * If the token is missing/expired/malformed, the user is redirected to `/admin/login`.
 */
export default function ProtectedRoute({ children }) {
  try {
    const raw = localStorage.getItem("admin_token");
    if (!raw) return <Navigate to="/admin/login" replace />;
    const token = JSON.parse(raw);
    if (!token || !token.expiry || Date.now() > token.expiry) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("isAdminLoggedIn");
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch (err) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("isAdminLoggedIn");
    return <Navigate to="/admin/login" replace />;
  }
}
