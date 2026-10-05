import React from "react";
import BrandLogo from "../../shared/components/BrandLogo";
import { useAuth } from "../../auth/hooks/useAuth";
import { SignOut, User, Sparkle } from "@phosphor-icons/react";
import "../style/navbar.scss";

export default function Navbar({ currentMood = "happy" }) {
  const { user, handleLogout } = useAuth();

  const getMoodBadge = (mood) => {
    switch (mood) {
      case "happy":
        return { label: "Happy Mood", emoji: "😊", color: "var(--mood-happy)" };
      case "sad":
        return { label: "Sad Mood", emoji: "🌧️", color: "var(--mood-sad)" };
      case "surprised":
        return { label: "Surprised Mood", emoji: "⚡", color: "var(--mood-surprised)" };
      default:
        return { label: "Active", emoji: "✨", color: "var(--accent-current)" };
    }
  };

  const badge = getMoodBadge(currentMood);

  return (
    <header className="moodify-navbar">
      <div className="moodify-navbar__inner">
        <div className="moodify-navbar__left">
          <BrandLogo size="md" />
        </div>

        <div className="moodify-navbar__center">
          <div className="mood-indicator-pill">
            <span className="mood-indicator-dot" style={{ backgroundColor: badge.color }} />
            <span className="mood-emoji">{badge.emoji}</span>
            <span className="mood-text">{badge.label} Soundscape</span>
          </div>
        </div>

        <div className="moodify-navbar__right">
          <div className="user-profile-badge">
            <div className="user-avatar">
              <User size={16} weight="bold" />
            </div>
            <span className="username">{user?.username || "Audience"}</span>
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
