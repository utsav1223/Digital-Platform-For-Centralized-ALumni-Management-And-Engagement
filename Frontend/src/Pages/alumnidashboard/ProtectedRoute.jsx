import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

/*
  This component:
  ✔ checks if alumni is logged in (via session)
  ✔ allows access if logged in
  ❌ redirects to login if not
*/
export default function AlumniProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Backend session check
    fetch("http://localhost:8000/api/alumni/me", {
      credentials: "include", // REQUIRED for sessions
    })
      .then((res) => {
        if (res.ok) setIsAuth(true);
        else setIsAuth(false);
      })
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  // While checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  // If logged in → allow dashboard
  if (isAuth) {
    return children;
  }

  // If not logged in → redirect to login
  return <Navigate to="/login" replace />;
}
