import React from "react";
import { Link } from "react-router";
import BrandLogo from "../../shared/components/BrandLogo";
import { Play, ArrowRight, MusicNotes, Camera, Sliders } from "@phosphor-icons/react";
import "../style/landing.scss";

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Precision Background SVG Harmonic Contour Lines */}
      <svg
        className="landing-bg-graphic"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 240 C320 180, 480 320, 720 220 C960 120, 1120 280, 1440 200"
          stroke="rgba(245, 158, 11, 0.18)"
          strokeWidth="1.5"
        />
        <path
          d="M0 320 C360 260, 520 400, 760 300 C1000 200, 1180 360, 1440 280"
          stroke="rgba(192, 132, 252, 0.15)"
          strokeWidth="1.5"
        />
        <path
          d="M0 400 C300 340, 560 460, 800 380 C1040 300, 1220 440, 1440 360"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Navigation */}
      <header className="landing-nav">
        <div className="landing-nav__inner">
          <Link to="/" style={{ textDecoration: "none" }}>
            <BrandLogo size="md" />
          </Link>

          <nav className="landing-nav__links">
            <a href="#moods">Playlists</a>
            <a href="#how-it-works">How It Works</a>
            <a href="https://github.com/manaskg/Moodify" target="_blank" rel="noreferrer">
              Source Code
            </a>
          </nav>

          <div className="landing-nav__actions">
            <Link to="/login" className="btn btn--secondary btn--sm btn--pill">
              Sign In
            </Link>
            <Link to="/detect" className="btn btn--primary btn--sm btn--pill">
              <Play size={14} weight="fill" />
              Open Studio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero__badge">
          <span>Acoustic Emotion Intelligence</span>
        </div>

        <h1 className="landing-hero__title">
          Music curated by the way <span>you feel.</span>
        </h1>

        <p className="landing-hero__subtext">
          MoodSync reads your facial expressions in real time, queueing curated
          soundscapes tailored directly to your emotional state.
        </p>

        <div className="landing-hero__cta-group">
          <Link to="/detect" className="btn btn--primary btn--lg btn--pill">
            <Play size={18} weight="fill" />
            Launch Studio
          </Link>
          <Link to="/login" className="btn btn--secondary btn--lg btn--pill">
            <span>Explore Demo</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Waveform Frequency Strip */}
      <section className="landing-wave-strip">
        <div className="wave-container">
          <div className="wave-header">
            <span>Harmonic Valence Monitor</span>
            <span>Real-time Audio Engine</span>
          </div>
          <svg className="svg-waveform" viewBox="0 0 800 64" fill="none">
            <path
              d="M0 32 Q 50 10, 100 32 T 200 32 T 300 32 T 400 32 T 500 32 T 600 32 T 700 32 T 800 32"
              stroke="var(--accent-current)"
              strokeWidth="2"
            />
            <path
              d="M0 32 Q 60 54, 120 32 T 240 32 T 360 32 T 480 32 T 600 32 T 720 32 T 800 32"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </section>

      {/* Curated Moods Section */}
      <section id="moods" className="landing-moods">
        <div className="section-header">
          <h2>Three Distinct Sonic States</h2>
          <p>Carefully balanced tempos, keys, and arrangements tuned to human emotion.</p>
        </div>

        <div className="moods-cards-grid">
          <div className="mood-card mood-card--happy">
            <div className="mood-card__top">
              <span className="mood-title">Radiant Euphoria</span>
              <span className="mood-badge">Happy</span>
            </div>
            <p className="mood-card__desc">
              High energy rhythms, warm chords, and buoyant tempos designed to amplify positive energy and joy.
            </p>
            <div className="mood-card__tracklist">
              <div className="track-sample">
                <strong>Why This Kolaveri Di</strong>
                <span>Anirudh R.</span>
              </div>
              <div className="track-sample">
                <strong>Sunny Days & Golden Hour</strong>
                <span>SoundHelix</span>
              </div>
            </div>
          </div>

          <div className="mood-card mood-card--sad">
            <div className="mood-card__top">
              <span className="mood-title">Midnight Echoes</span>
              <span className="mood-badge">Sad</span>
            </div>
            <p className="mood-card__desc">
              Gentle acoustic layers, somber keys, and slow tempos crafted for quiet reflection and emotional release.
            </p>
            <div className="mood-card__tracklist">
              <div className="track-sample">
                <strong>Phir Bhi Tumko Chaahunga</strong>
                <span>Arijit Singh</span>
              </div>
              <div className="track-sample">
                <strong>Echoes in the Twilight</strong>
                <span>Autumn Strings</span>
              </div>
            </div>
          </div>

          <div className="mood-card mood-card--surprised">
            <div className="mood-card__top">
              <span className="mood-title">Cosmic Wonder</span>
              <span className="mood-badge">Surprised</span>
            </div>
            <p className="mood-card__desc">
              Unexpected synthesizer passages, kinetic shockwaves, and dynamic builds for moments of astonishment.
            </p>
            <div className="mood-card__tracklist">
              <div className="track-sample">
                <strong>Farebi</strong>
                <span>Amit Trivedi</span>
              </div>
              <div className="track-sample">
                <strong>Cosmic Discovery Burst</strong>
                <span>Quantum Waves</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="landing-steps">
        <div className="section-header">
          <h2>How MoodSync Operates</h2>
          <p>Zero video leaves your machine. Everything runs securely on-device.</p>
        </div>

        <div className="steps-grid">
          <div className="step-box">
            <span className="step-index">01</span>
            <h3>On-Device Vision</h3>
            <p>
              MediaPipe processes facial landmarks locally inside WebAssembly. Your camera feed is never sent to any server.
            </p>
          </div>

          <div className="step-box">
            <span className="step-index">02</span>
            <h3>Emotion Classification</h3>
            <p>
              Geometric blendshapes calculate smile valence, jaw positions, and brow elevation to categorize your active mood.
            </p>
          </div>

          <div className="step-box">
            <span className="step-index">03</span>
            <h3>Playlist Synchronization</h3>
            <p>
              A tailored soundscape starts playing instantly with full queue, shuffle, loop, and timeline scrub controls.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="landing-banner">
        <div className="banner-inner">
          <h2>Ready to experience emotion-driven sound?</h2>
          <p>Launch the studio directly in your browser. No hardware or setup required.</p>
          <Link to="/detect" className="btn btn--primary btn--lg btn--pill">
            <Play size={18} weight="fill" />
            Enter Sound Studio
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <BrandLogo size="md" />
          <p>MoodSync - Built for portfolio presentation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
