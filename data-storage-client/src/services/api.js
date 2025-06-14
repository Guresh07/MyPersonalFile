import axios from "axios";

const API = axios.create({
  baseURL: "https://mypersonalfile.onrender.com",
  withCredentials: true  // if you're sending cookies/token etc.
});

// Automatically attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// File APIs
export const uploadFile = (formData) =>
  API.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchFiles = () => API.get("/files/list");

export const deleteFile = (fileId) => API.delete(`/files/delete/${fileId}`);

export const downloadFile = (fileId) => API.get(`/files/download/${fileId}`);
