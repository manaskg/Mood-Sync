import React from "react";
import BrandLogo from "../../shared/components/BrandLogo";
import { useAuth } from "../../auth/hooks/useAuth";
import { Link } from "react-router";
import { SignOut, User } from "@phosphor-icons/react";
import "../style/navbar.scss";

export default function Navbar({ currentMood = "happy" }) {
  const { user, handleLogout } = useAuth();

  const getMoodBadge = (mood) => {
    switch (mood) {
      case "happy":
        return { label: "Happy", emoji: "😊" };
      case "sad":
        return { label: "Sad", emoji: "🌧️" };
      case "surprised":
        return { label: "Surprised", emoji: "⚡" };
      default:
        return { label: "Active", emoji: "✨" };
    }
  };

  const badge = getMoodBadge(currentMood);

  return (
    <header className="moodify-navbar">
      <div className="moodify-navbar__inner">
        <div className="moodify-navbar__left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <BrandLogo size="md" />
          </Link>
        </div>

        <nav className="moodify-navbar__nav-links">
          <Link to="/" className="nav-link">
            Overview
          </Link>
          <Link to="/detect" className="nav-link nav-link--active">
            Studio
          </Link>
        </nav>

        <div className="moodify-navbar__center">
          <div className="mood-indicator-pill">
            <span className="mood-emoji">{badge.emoji}</span>
            <span className="mood-text">{badge.label} Vibe</span>
          </div>
        </div>

        <div className="moodify-navbar__right">
          <div className="user-profile-badge">
            <div className="user-avatar">
              <User size={16} weight="bold" />
            </div>
            <span className="username">{user?.username || "Guest"}</span>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--sm btn--icon"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
          >
            <SignOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
