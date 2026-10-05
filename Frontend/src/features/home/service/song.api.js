import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const songApi = axios.create({
  baseURL,
  withCredentials: true,
});

songApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("moodify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getSong({ mood }) {
  const response = await songApi.get("/api/songs?mood=" + (mood || "happy"));
  return response.data;
}

export async function getSongsByMood({ mood }) {
  const response = await songApi.get("/api/songs?mood=" + (mood || "happy"));
  return response.data;
}

export async function getMoodPlaylists() {
  const response = await songApi.get("/api/songs/playlists");
  return response.data;
}

export async function uploadSong(formData) {
  const response = await songApi.post("/api/songs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
