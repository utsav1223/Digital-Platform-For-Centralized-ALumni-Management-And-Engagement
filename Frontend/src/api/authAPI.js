import axios from "axios";

// VERY IMPORTANT: withCredentials: true (to send session cookies)
const API = axios.create({
  baseURL: "http://localhost:8000/api/alumni",
  withCredentials: true,
});

// Register
export const registerAlumni = (data) => API.post("/register", data);

// Login
export const loginAlumni = (data) => API.post("/login", data);

// Check logged-in alumni
export const getLoggedInAlumni = () => API.get("/me");

// Logout
export const logoutAlumni = () => API.post("/logout");

// UPDATE PROFILE  ✅ FIXED ✔️
export const updateAlumniProfile = (data) =>
  API.put("/update-profile", data);
