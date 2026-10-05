const express = require("express");
const upload = require("../middlewares/upload.middleware.js");
const router = express.Router();
const songController = require("../controllers/song.controller.js");

/**
 * Post /api/songs/
 */

router.post("/", upload.single("song"), songController.uploadSong);
router.get("/playlists", songController.getMoodPlaylists);
router.get("/", songController.getSong);

module.exports = router;
