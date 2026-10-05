import axios from "axios";

export const songApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
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
