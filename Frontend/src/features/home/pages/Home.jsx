import React from "react";
import Navbar from "../components/Navbar";
import FaceExpression from "../../Expression/components/FaceExpression";
import PlaylistView from "../components/PlaylistView";
import AllPlaylistsSection from "../components/AllPlaylistsSection";
import MoodHistory from "../components/MoodHistory";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import { Sparkle } from "@phosphor-icons/react";
import "../style/home.scss";

const Home = () => {
  const { currentMood, loadMoodPlaylist, recordMoodDetection, playlist } = useSong();

  const handleMoodDetected = (detectedMood) => {
    if (!detectedMood) return;
    loadMoodPlaylist(detectedMood, true);
    const targetSong = playlist?.find((s) => s.mood === detectedMood) || playlist?.[0];
    recordMoodDetection(detectedMood, targetSong);
  };

  return (
    <div className="home-container" data-mood={currentMood}>
      <Navbar currentMood={currentMood} />

      <main className="home-main">
        {/* Intro Header */}
        <section className="home-hero-strip">
          <div className="hero-badge">
            <Sparkle size={14} weight="fill" />
            <span>Biometric Emotional Acoustics</span>
          </div>
          <h1>Emotion-Aware Soundscapes</h1>
          <p>
            Scan your facial expression with on-device computer vision to dynamically
            generate and play curated playlists tailored to how you feel.
          </p>
        </section>

        {/* 2-Column Split: Vision Studio & Playlist View */}
        <div className="home-studio-grid">
          <FaceExpression
            activeMood={currentMood}
            onMoodDetected={handleMoodDetected}
          />
          <PlaylistView />
        </div>

        {/* Browse All Playlists */}
        <AllPlaylistsSection />

        {/* Emotional Journey Log */}
        <MoodHistory />
      </main>

      {/* Floating Audio Player Dock */}
      <Player />
    </div>
  );
};

export default Home;
