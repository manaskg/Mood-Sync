import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("moodsync_token") || localStorage.getItem("moodify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function register({ username, email, password }) {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
  if (response.data?.token) {
    localStorage.setItem("moodsync_token", response.data.token);
  }
  return response.data;
}

export async function login({ email, password, username }) {
  const response = await api.post("/api/auth/login", {
    email,
    password,
    username,
  });
  if (response.data?.token) {
    localStorage.setItem("moodsync_token", response.data.token);
  }
  return response.data;
}

export async function getMe() {
  const response = await api.get("/api/auth/get-me");
  return response.data;
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    localStorage.removeItem("moodsync_token");
    localStorage.removeItem("moodify_token");
    return response.data;
  } catch (e) {
    localStorage.removeItem("moodsync_token");
    localStorage.removeItem("moodify_token");
    return { success: true };
  }
}
