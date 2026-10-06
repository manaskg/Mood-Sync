import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { getSongsByMood, getMoodPlaylists } from "./service/song.api";

export const SongContext = createContext();

const DEFAULT_PLAYLISTS = [
  {
    id: "happy",
    name: "Radiant Euphoria",
    tagline: "High-vibration rhythms & uplifting grooves to elevate your spirits",
    emoji: "😊",
    vibe: "Energetic · Uplifting · Radiant",
    songCount: 4,
    songs: [
      {
        _id: "default-happy-1",
        title: "Why This Kolaveri Di - The Soup Of Love",
        artist: "Anirudh Ravichander & Dhanush",
        duration: "4:05",
        album: "3 (Original Soundtrack)",
        mood: "happy",
        url: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/songs/Why_This_Kolaveri_Di_-_The_Soup_Of_Love_gUvG-zB-l.mp3",
        posterUrl: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/posters/Why_This_Kolaveri_Di_-_The_Soup_Of_Love_EWxwIWVyg.jpeg",
      },
      {
        _id: "default-happy-2",
        title: "Sunny Days & Golden Hour",
        artist: "SoundHelix Ensemble",
        duration: "6:12",
        album: "Radiant Vibes Vol. 1",
        mood: "happy",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-happy-3",
        title: "Electric Groove Odyssey",
        artist: "Synth Collective",
        duration: "7:05",
        album: "Summer Highs",
        mood: "happy",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-happy-4",
        title: "Neon Horizon Radiance",
        artist: "Velvet Echo",
        duration: "5:45",
        album: "Euphoria Club",
        mood: "happy",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "sad",
    name: "Midnight Echoes",
    tagline: "Gentle acoustic textures & soul-stirring melodies for quiet reflection",
    emoji: "🌧️",
    vibe: "Melancholic · Deep · Reflective",
    songCount: 4,
    songs: [
      {
        _id: "default-sad-1",
        title: "Phir Bhi Tumko Chahunga",
        artist: "Arijit Singh & Mithoon",
        duration: "5:52",
        album: "Half Girlfriend",
        mood: "sad",
        url: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/songs/Phir_Bhi_Tumko_Chaahunga_-_Half_Girlfriend_128_Kbps_hK0Gg8p7I.mp3",
        posterUrl: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/posters/Phir_Bhi_Tumko_Chaahunga_-_Half_Girlfriend_128_Kbps_K4Nn8T9r_.jpeg",
      },
      {
        _id: "default-sad-2",
        title: "Echoes in the Twilight",
        artist: "Autumn Strings",
        duration: "5:02",
        album: "Rainy Reverie",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        posterUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-sad-3",
        title: "Nocturne for Lost Dreams",
        artist: "Cello & Twilight Keys",
        duration: "5:53",
        album: "Solitude Chronicles",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-sad-4",
        title: "Shadows After Midnight",
        artist: "Deep Reverie",
        duration: "6:15",
        album: "Midnight Tears",
        mood: "sad",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        posterUrl: "https://images.unsplash.com/photo-1483825366482-1265f6ea9bc9?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "surprised",
    name: "Cosmic Wonder",
    tagline: "Unpredictable synth pulses & sonic marvels for moments of pure awe",
    emoji: "⚡",
    vibe: "Astonishing · Electro · Dynamic",
    songCount: 4,
    songs: [
      {
        _id: "default-surprised-1",
        title: "Farebi - Queen",
        artist: "Amit Trivedi",
        duration: "3:47",
        album: "Queen",
        mood: "surprised",
        url: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/songs/Farebi_G1r_Nf3P9.mp3",
        posterUrl: "https://ik.imagekit.io/hidemkg/cohort-2/moodify/posters/Farebi_K1r_Nf3P9.jpeg",
      },
      {
        _id: "default-surprised-2",
        title: "Cosmic Discovery Burst",
        artist: "Quantum Waveform",
        duration: "5:28",
        album: "Awe & Wonder",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-surprised-3",
        title: "Sudden Revelation Pulse",
        artist: "Pulse Protocol",
        duration: "4:56",
        album: "Hyper Shock",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        posterUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80",
      },
      {
        _id: "default-surprised-4",
        title: "Aurora Velocity Shock",
        artist: "Nebula Apex",
        duration: "6:12",
        album: "Celestial Surge",
        mood: "surprised",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        posterUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export const SongContextProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState("happy");
  const [playlist, setPlaylist] = useState(DEFAULT_PLAYLISTS[0].songs);
  const [song, setSong] = useState(DEFAULT_PLAYLISTS[0].songs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allPlaylists, setAllPlaylists] = useState(DEFAULT_PLAYLISTS);
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
        if (data?.playlists && data.playlists.length > 0) {
          setAllPlaylists(data.playlists);
        }
      } catch (err) {
        console.warn("Using default mood playlists:", err.message);
      }
    }
    initPlaylists();
  }, []);

  // Fetch playlist for a mood
  const loadMoodPlaylist = useCallback(async (mood, autoPlay = false) => {
    const targetMood = (mood || "happy").toLowerCase();
    setLoading(true);
    setCurrentMood(targetMood);

    // Fallback playlist from defaults
    const fallback = DEFAULT_PLAYLISTS.find((p) => p.id === targetMood)?.songs || [];

    try {
      const data = await getSongsByMood({ mood: targetMood });
      const songs = (data?.songs && data.songs.length > 0) ? data.songs : fallback;
      setPlaylist(songs);

      if (songs.length > 0) {
        setSong(songs[0]);
        setCurrentIndex(0);
        if (autoPlay) {
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.warn("Using fallback songs for mood:", targetMood);
      setPlaylist(fallback);
      if (fallback.length > 0) {
        setSong(fallback[0]);
        setCurrentIndex(0);
        if (autoPlay) {
          setIsPlaying(true);
        }
      }
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
