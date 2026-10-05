import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { getSongsByMood, getMoodPlaylists } from "./service/song.api";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState("happy");
  const [playlist, setPlaylist] = useState([]);
  const [song, setSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [moodHistory, setMoodHistory] = useState([
    {
      id: "seed-1",
      mood: "happy",
      timestamp: "Just now",
      title: "Why This Kolaveri Di - The Soup Of Love",
      posterUrl: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/posters/Why_This_Kolaveri_Di_-_The_Soup_Of_Love_EWxwIWVyg.jpeg",
    },
  ]);

  // Audio Ref shared across playback
  const audioRef = useRef(null);

  // Sync dataset mood attribute on root element for dynamic ambient CSS glow
  useEffect(() => {
    document.documentElement.setAttribute("data-mood", currentMood);
  }, [currentMood]);

  // Fetch all playlists metadata on mount
  useEffect(() => {
    async function initPlaylists() {
      try {
        const data = await getMoodPlaylists();
        if (data?.playlists) {
          setAllPlaylists(data.playlists);
        }
      } catch (err) {
        console.error("Error loading mood playlists:", err);
      }
    }
    initPlaylists();
  }, []);

  // Fetch playlist for a mood
  const loadMoodPlaylist = useCallback(async (mood, autoPlay = false) => {
    const targetMood = (mood || "happy").toLowerCase();
    setLoading(true);
    setCurrentMood(targetMood);

    try {
      const data = await getSongsByMood({ mood: targetMood });
      const songs = data.songs || [];
      setPlaylist(songs);

      if (songs.length > 0) {
        setSong(songs[0]);
        setCurrentIndex(0);
        if (autoPlay) {
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error("Failed to load mood playlist:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadMoodPlaylist("happy", false);
  }, [loadMoodPlaylist]);

  const playSong = useCallback((targetSong, index = -1) => {
    setSong(targetSong);
    if (index >= 0) {
      setCurrentIndex(index);
    } else {
      const idx = playlist.findIndex((s) => s._id === targetSong._id);
      if (idx >= 0) setCurrentIndex(idx);
    }
    setIsPlaying(true);
  }, [playlist]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(randomIndex);
      setSong(playlist[randomIndex]);
      setIsPlaying(true);
      return;
    }

    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setSong(playlist[nextIndex]);
    setIsPlaying(true);
  }, [playlist, currentIndex, isShuffle]);

  const playPrev = useCallback(() => {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    setSong(playlist[prevIndex]);
    setIsPlaying(true);
  }, [playlist, currentIndex]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const recordMoodDetection = useCallback((detectedMood, matchedSong) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newEntry = {
      id: Date.now().toString(),
      mood: detectedMood,
      timestamp: timeStr,
      title: matchedSong?.title || "Recommended Track",
      posterUrl: matchedSong?.posterUrl || "",
    };
    setMoodHistory((prev) => [newEntry, ...prev.slice(0, 7)]);
  }, []);

  return (
    <SongContext.Provider
      value={{
        currentMood,
        setCurrentMood,
        playlist,
        setPlaylist,
        song,
        setSong,
        currentIndex,
        isPlaying,
        setIsPlaying,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
        loading,
        setLoading,
        allPlaylists,
        moodHistory,
        loadMoodPlaylist,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        recordMoodDetection,
        audioRef,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
