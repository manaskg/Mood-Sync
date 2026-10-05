import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongContextProvider");
  }

  const {
    currentMood,
    playlist,
    song,
    currentIndex,
    isPlaying,
    setIsPlaying,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    loading,
    allPlaylists,
    moodHistory,
    loadMoodPlaylist,
    playSong,
    togglePlay,
    playNext,
    playPrev,
    recordMoodDetection,
    audioRef,
  } = context;

  async function handleGetSong({ mood, autoPlay = true }) {
    await loadMoodPlaylist(mood, autoPlay);
  }

  return {
    currentMood,
    playlist,
    song,
    currentIndex,
    isPlaying,
    setIsPlaying,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    loading,
    allPlaylists,
    moodHistory,
    loadMoodPlaylist,
    playSong,
    togglePlay,
    playNext,
    playPrev,
    recordMoodDetection,
    handleGetSong,
    audioRef,
  };
};
