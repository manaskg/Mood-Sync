import React from "react";
import { useSong } from "../hooks/useSong";
import { Play, Pause, Shuffle, MusicNotes, Clock } from "@phosphor-icons/react";
import "../style/playlist.scss";

export default function PlaylistView() {
  const {
    playlist,
    currentMood,
    song,
    isPlaying,
    playSong,
    togglePlay,
    playNext,
    isShuffle,
    toggleShuffle,
    allPlaylists,
  } = useSong();

  // Find metadata for current playlist
  const currentMeta = allPlaylists.find((p) => p.id === currentMood) || {
    name:
      currentMood === "happy"
        ? "Radiant Euphoria"
        : currentMood === "sad"
        ? "Midnight Echoes"
        : "Cosmic Wonder",
    tagline:
      currentMood === "happy"
        ? "High-vibration rhythms & uplifting grooves to elevate your spirits"
        : currentMood === "sad"
        ? "Gentle acoustic textures & soul-stirring melodies for quiet reflection"
        : "Unpredictable synth pulses & sonic marvels for moments of pure awe",
    emoji: currentMood === "happy" ? "😊" : currentMood === "sad" ? "🌧️" : "⚡",
    vibe:
      currentMood === "happy"
        ? "Energetic · Uplifting · Radiant"
        : currentMood === "sad"
        ? "Melancholic · Deep · Reflective"
        : "Astonishing · Electro · Dynamic",
  };

  const handlePlayAll = () => {
    if (playlist.length > 0) {
      if (song && song._id === playlist[0]._id) {
        togglePlay();
      } else {
        playSong(playlist[0], 0);
      }
    }
  };

  const isCurrentPlaylistPlaying =
    isPlaying && playlist.some((s) => s._id === song?._id);

  return (
    <section className="playlist-view" aria-label="Mood Playlist">
      {/* Playlist Hero Banner */}
      <div className="playlist-hero">
        <div className="playlist-hero__cover-wrap">
          {playlist[0]?.posterUrl ? (
            <img
              src={playlist[0].posterUrl}
              alt={currentMeta.name}
              className="playlist-hero__cover"
            />
          ) : (
            <div className="playlist-hero__cover-placeholder">
              <MusicNotes size={48} />
            </div>
          )}
          <span className="playlist-hero__mood-tag">{currentMeta.emoji}</span>
        </div>

        <div className="playlist-hero__info">
          <div className="playlist-hero__eyebrow">
            <MusicNotes size={14} weight="bold" color="var(--accent-current)" />
            <span>Curated Mood Playlist: {currentMeta.vibe}</span>
          </div>

          <h1 className="playlist-hero__title">{currentMeta.name}</h1>
          <p className="playlist-hero__tagline">{currentMeta.tagline}</p>

          <div className="playlist-hero__meta">
            <span className="meta-item">
              <strong>{playlist.length}</strong> songs
            </span>
            <span className="meta-dot">·</span>
            <span className="meta-item">Adaptive Soundscape</span>
            <span className="meta-dot">·</span>
            <span className="meta-item capitalize">{currentMood} Resonance</span>
          </div>

          <div className="playlist-hero__actions">
            <button
              type="button"
              className="btn btn--primary btn--pill"
              onClick={handlePlayAll}
            >
              {isCurrentPlaylistPlaying ? (
                <>
                  <Pause size={18} weight="fill" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={18} weight="fill" />
                  <span>Play All</span>
                </>
              )}
            </button>

            <button
              type="button"
              className={`btn ${isShuffle ? "btn--primary" : "btn--secondary"} btn--pill`}
              onClick={toggleShuffle}
            >
              <Shuffle size={18} weight="bold" />
              <span>{isShuffle ? "Shuffle On" : "Shuffle"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Tracks Table */}
      <div className="tracks-container">
        <div className="tracks-header">
          <span className="col-num">#</span>
          <span className="col-title">Title</span>
          <span className="col-album">Album</span>
          <span className="col-time">
            <Clock size={16} />
          </span>
        </div>

        <div className="tracks-list">
          {playlist.map((track, idx) => {
            const isThisTrackActive = song?._id === track._id;
            const isThisTrackPlaying = isThisTrackActive && isPlaying;

            return (
              <div
                key={track._id || idx}
                className={`track-row ${isThisTrackActive ? "track-row--active" : ""}`}
                onClick={() => {
                  if (isThisTrackActive) {
                    togglePlay();
                  } else {
                    playSong(track, idx);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    playSong(track, idx);
                  }
                }}
              >
                <div className="track-row__num">
                  {isThisTrackPlaying ? (
                    <div className="equalizer-bars">
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                    </div>
                  ) : (
                    <span className="num-text">{idx + 1}</span>
                  )}
                  <button
                    type="button"
                    className="track-play-btn"
                    aria-label={isThisTrackPlaying ? "Pause" : "Play"}
                  >
                    {isThisTrackPlaying ? (
                      <Pause size={14} weight="fill" />
                    ) : (
                      <Play size={14} weight="fill" />
                    )}
                  </button>
                </div>

                <div className="track-row__main">
                  <img
                    src={track.posterUrl}
                    alt={track.title}
                    className="track-artwork"
                    loading="lazy"
                  />
                  <div className="track-meta">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist">
                      {track.artist || "MoodSync Curated"}
                    </span>
                  </div>
                </div>

                <div className="track-row__album">
                  <span>{track.album || "MoodSync Studio"}</span>
                </div>

                <div className="track-row__time tabular-nums">
                  <span>{track.duration || "3:30"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
