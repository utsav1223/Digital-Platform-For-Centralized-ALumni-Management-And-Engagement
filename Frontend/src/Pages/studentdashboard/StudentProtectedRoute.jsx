import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function StudentProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (auth.loading) return null;

  if (!auth.studentLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
