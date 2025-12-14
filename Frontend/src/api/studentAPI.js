// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000/api/student",
//   withCredentials: true,
// });

// export const getStudentProfile = () => API.get("/me");
// export const updateStudentProfile = (formData) =>
//   API.put("/update-profile", formData);

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/student",
  withCredentials: true, // 🔥 REQUIRED for sessions
});

export const getStudentProfile = () => API.get("/profile");

export const updateStudentProfile = (formData) =>
  API.put("/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
