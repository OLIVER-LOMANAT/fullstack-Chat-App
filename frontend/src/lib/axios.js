import axios from "axios";

// Use environment variable or fallback to Render URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://chat-app-backend-so88.onrender.com";

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});