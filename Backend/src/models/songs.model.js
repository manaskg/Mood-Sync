const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "surprised"],
      message: "Enum this is",
    },
  },
  artist: {
    type: String,
    default: "Featured Artist",
  },
  duration: {
    type: String,
    default: "3:30",
  },
  album: {
    type: String,
    default: "Moodify Studio",
  },
}, { timestamps: true });

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;
