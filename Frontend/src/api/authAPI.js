import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/alumni"
});

export const registerAlumni = (data) => API.post("/register", data);
