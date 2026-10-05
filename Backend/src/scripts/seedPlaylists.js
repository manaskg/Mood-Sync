require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const songModel = require("../models/songs.model.js");

const additionalSongs = [
  // Happy Playlist Songs
  {
    title: "Sunny Days & Golden Hour",
    artist: "SoundHelix Ensemble",
    duration: "6:12",
    album: "Radiant Vibes Vol. 1",
    mood: "happy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Electric Groove Odyssey",
    artist: "Synth Collective",
    duration: "7:05",
    album: "Summer Highs",
    mood: "happy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Neon Horizon Radiance",
    artist: "Velvet Echo",
    duration: "5:45",
    album: "Euphoria Club",
    mood: "happy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Solaris Carnival Beat",
    artist: "Solaris Trio",
    duration: "4:32",
    album: "Golden Tropic",
    mood: "happy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
  },

  // Sad Playlist Songs
  {
    title: "Echoes in the Twilight",
    artist: "Autumn Strings",
    duration: "5:02",
    album: "Rainy Reverie",
    mood: "sad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    posterUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Nocturne for Lost Dreams",
    artist: "Cello & Twilight Keys",
    duration: "5:53",
    album: "Solitude Chronicles",
    mood: "sad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Distant Whispers in the Wind",
    artist: "Ethereal Mist",
    duration: "4:20",
    album: "Silent Room Sessions",
    mood: "sad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    posterUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Shadows After Midnight",
    artist: "Deep Reverie",
    duration: "6:15",
    album: "Midnight Tears",
    mood: "sad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    posterUrl: "https://images.unsplash.com/photo-1483825366482-1265f6ea9bc9?w=600&auto=format&fit=crop&q=80",
  },

  // Surprised Playlist Songs
  {
    title: "Cosmic Discovery Burst",
    artist: "Quantum Waveform",
    duration: "5:28",
    album: "Awe & Wonder",
    mood: "surprised",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Sudden Revelation Pulse",
    artist: "Pulse Protocol",
    duration: "4:56",
    album: "Hyper Shock",
    mood: "surprised",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    posterUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Aurora Velocity Shock",
    artist: "Nebula Apex",
    duration: "6:12",
    album: "Celestial Surge",
    mood: "surprised",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    posterUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Dimensional Rift Strobe",
    artist: "Electro Pulse Lab",
    duration: "5:45",
    album: "Electric Astonishment",
    mood: "surprised",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    posterUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for playlist seeding...");

    // Update existing songs with metadata
    await songModel.updateOne(
      { title: { $regex: "Kolaveri", $options: "i" } },
      { $set: { artist: "Anirudh Ravichander & Dhanush", duration: "4:05", album: "3 (Original Soundtrack)" } }
    );
    await songModel.updateOne(
      { title: { $regex: "Phir Bhi", $options: "i" } },
      { $set: { artist: "Arijit Singh & Mithoon", duration: "5:52", album: "Half Girlfriend" } }
    );
    await songModel.updateOne(
      { title: { $regex: "Farebi", $options: "i" } },
      { $set: { artist: "Amit Trivedi", duration: "3:47", album: "Queen" } }
    );

    // Insert additional songs if they don't exist yet
    for (const song of additionalSongs) {
      const exists = await songModel.findOne({ title: song.title });
      if (!exists) {
        await songModel.create(song);
        console.log(`+ Added song: [${song.mood.toUpperCase()}] ${song.title}`);
      } else {
        console.log(`= Already exists: ${song.title}`);
      }
    }

    const total = await songModel.countDocuments();
    const happy = await songModel.countDocuments({ mood: "happy" });
    const sad = await songModel.countDocuments({ mood: "sad" });
    const surprised = await songModel.countDocuments({ mood: "surprised" });

    console.log(`\nSeeding completed! Total songs in DB: ${total}`);
    console.log(`Happy: ${happy} | Sad: ${sad} | Surprised: ${surprised}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
