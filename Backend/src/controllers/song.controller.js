const songModel = require("../models/songs.model.js");
const id3 = require("node-id3");
const storageService = require("../services/storage.service.js");

async function uploadSong(req, res) {
  // console.log(req.file);

  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);
  const { mood } = req.body;

  // console.log(tags);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    }),
  ]);

  // const songFile = await storageService.uploadFile({
  //   buffer: songBuffer,
  //   filename: tags.title + ".mp3",
  //   folder: "/cohort-2/moodify/songs",
  // });

  // const posterFile = await storageService.uploadFile({
  //   buffer: tags.image.imageBuffer,
  //   filename: tags.title + ".jpeg",
  //   folder: "/cohort-2/moodify/posters",
  // });

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song created successfully",
    song,
  });
}

async function getSong(req, res) {
  try {
    const { mood } = req.query;
    const query = mood ? { mood: mood.toLowerCase() } : {};

    const songs = await songModel.find(query);

    res.status(200).json({
      message: "Songs fetched successfully.",
      songs,
      song: songs[0] || null,
      total: songs.length,
      mood: mood || "all",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching songs",
      error: error.message,
    });
  }
}

async function getMoodPlaylists(req, res) {
  try {
    const allSongs = await songModel.find({});

    const moodConfigs = {
      happy: {
        id: "happy",
        name: "Radiant Euphoria",
        tagline: "High-vibration rhythms & uplifting grooves to elevate your spirits",
        emoji: "😊",
        accent: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.25)",
        banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
        vibe: "Energetic · Uplifting · Radiant",
      },
      sad: {
        id: "sad",
        name: "Midnight Echoes",
        tagline: "Gentle acoustic textures & soul-stirring melodies for quiet reflection",
        emoji: "🌧️",
        accent: "#38bdf8",
        glow: "rgba(56, 189, 248, 0.25)",
        banner: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80",
        vibe: "Melancholic · Deep · Reflective",
      },
      surprised: {
        id: "surprised",
        name: "Cosmic Wonder",
        tagline: "Unpredictable synth pulses & sonic marvels for moments of pure awe",
        emoji: "⚡",
        accent: "#c084fc",
        glow: "rgba(192, 132, 252, 0.25)",
        banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
        vibe: "Astonishing · Electro · Dynamic",
      },
    };

    const playlists = Object.keys(moodConfigs).map((moodKey) => {
      const config = moodConfigs[moodKey];
      const moodSongs = allSongs.filter((s) => s.mood === moodKey);
      return {
        ...config,
        songs: moodSongs,
        songCount: moodSongs.length,
      };
    });

    res.status(200).json({
      message: "Mood playlists fetched successfully.",
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching playlists",
      error: error.message,
    });
  }
}

module.exports = { uploadSong, getSong, getMoodPlaylists };

