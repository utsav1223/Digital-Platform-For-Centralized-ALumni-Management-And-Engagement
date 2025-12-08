import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/alumni"
});

export const registerAlumni = (data) => API.post("/register", data);
export const loginAlumni = (data) => API.post("/login", data);