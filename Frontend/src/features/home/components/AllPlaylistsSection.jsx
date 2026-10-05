import React from "react";
import { useSong } from "../hooks/useSong";
import { Play, Check } from "@phosphor-icons/react";

export default function AllPlaylistsSection() {
  const { allPlaylists, currentMood, loadMoodPlaylist } = useSong();

  return (
    <section className="all-playlists-section" aria-label="Browse All Mood Playlists">
      <div className="section-title-row">
        <div>
          <h2>Explore Emotion Playlists</h2>
          <p>Switch between acoustic soundscapes curated for every state of mind</p>
        </div>
      </div>

      <div className="playlists-grid">
        {allPlaylists.map((pl) => {
          const isActive = pl.id === currentMood;
          const firstSongPoster =
            pl.songs?.[0]?.posterUrl ||
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80";

          return (
            <div
              key={pl.id}
              className={`playlist-card ${isActive ? "playlist-card--active" : ""}`}
              onClick={() => loadMoodPlaylist(pl.id, true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  loadMoodPlaylist(pl.id, true);
                }
              }}
            >
              <div className="playlist-card__cover-wrap">
                <img src={firstSongPoster} alt={pl.name} className="playlist-card__cover" />
                <span className="playlist-card__emoji">{pl.emoji}</span>
                <button
                  type="button"
                  className="playlist-card__play-btn"
                  aria-label={`Play ${pl.name}`}
                >
                  <Play size={20} weight="fill" />
                </button>
              </div>

              <div className="playlist-card__info">
                <div className="playlist-card__badge-row">
                  <span className="playlist-card__vibe">{pl.vibe}</span>
                  {isActive && (
                    <span className="playlist-card__active-tag">
                      <Check size={12} weight="bold" /> Active
                    </span>
                  )}
                </div>
                <h3 className="playlist-card__name">{pl.name}</h3>
                <p className="playlist-card__tagline">{pl.tagline}</p>
                <div className="playlist-card__meta">
                  <span>{pl.songCount || pl.songs?.length || 5} curated tracks</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
