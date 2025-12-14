import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    alumniLoggedIn: false,
    alumni: null,
    studentLoggedIn: false,
    student: null,
  });

  // const checkAuth = async () => {
  //   try {
  //     /* ---------- CHECK ALUMNI ---------- */
  //     const alumniRes = await fetch("http://localhost:8000/api/alumni/me", {
  //       credentials: "include",
  //     });

  //     if (alumniRes.ok) {
  //       const data = await alumniRes.json();
  //       return setAuth({
  //         loading: false,
  //         alumniLoggedIn: true,
  //         alumni: data.alumni,
  //         studentLoggedIn: false,
  //         student: null,
  //       });
  //     }

  //     /* ---------- CHECK STUDENT ---------- */
  //     const studentRes = await fetch("http://localhost:8000/api/student/me", {
  //       credentials: "include",
  //     });

  //     if (studentRes.ok) {
  //       const data = await studentRes.json();
  //       return setAuth({
  //         loading: false,
  //         alumniLoggedIn: false,
  //         alumni: null,
  //         studentLoggedIn: true,
  //         student: data.student,
  //       });
  //     }

  //     /* ---------- NO SESSION ---------- */
  //     setAuth({
  //       loading: false,
  //       alumniLoggedIn: false,
  //       alumni: null,
  //       studentLoggedIn: false,
  //       student: null,
  //     });

  //   } catch (error) {
  //     setAuth({
  //       loading: false,
  //       alumniLoggedIn: false,
  //       alumni: null,
  //       studentLoggedIn: false,
  //       student: null,
  //     });
  //   }
  // };
  const checkAuth = async () => {
    try {
      /* ---------- CHECK STUDENT FIRST ---------- */
      const studentRes = await fetch("http://localhost:8000/api/student/me", {
        credentials: "include",
      });

      if (studentRes.ok) {
        const data = await studentRes.json();
        return setAuth({
          loading: false,
          alumniLoggedIn: false,
          alumni: null,
          studentLoggedIn: true,
          student: data.student,
        });
      }

      /* ---------- CHECK ALUMNI ---------- */
      const alumniRes = await fetch("http://localhost:8000/api/alumni/me", {
        credentials: "include",
      });

      if (alumniRes.ok) {
        const data = await alumniRes.json();
        return setAuth({
          loading: false,
          alumniLoggedIn: true,
          alumni: data.alumni,
          studentLoggedIn: false,
          student: null,
        });
      }

      /* ---------- NO SESSION ---------- */
      setAuth({
        loading: false,
        alumniLoggedIn: false,
        alumni: null,
        studentLoggedIn: false,
        student: null,
      });
    } catch {
      setAuth({
        loading: false,
        alumniLoggedIn: false,
        alumni: null,
        studentLoggedIn: false,
        student: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
