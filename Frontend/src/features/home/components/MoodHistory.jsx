import React from "react";
import { useSong } from "../hooks/useSong";
import { ClockCountdown, Sparkle } from "@phosphor-icons/react";

export default function MoodHistory() {
  const { moodHistory } = useSong();

  if (!moodHistory || moodHistory.length === 0) return null;

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "sad":
        return "🌧️";
      case "surprised":
        return "⚡";
      default:
        return "✨";
    }
  };

  return (
    <section className="mood-history-section" aria-label="Mood History Journey">
      <div className="section-title-row">
        <div>
          <h2>
            <ClockCountdown size={20} weight="fill" color="var(--accent-current)" />
            Emotional Journey Log
          </h2>
          <p>Recent micro-expression detections and recommended tracks</p>
        </div>
      </div>

      <div className="history-timeline">
        {moodHistory.map((item, idx) => (
          <div key={item.id || idx} className="history-item">
            <span className="history-emoji">{getMoodEmoji(item.mood)}</span>
            <div className="history-content">
              <div className="history-header">
                <span className="history-mood capitalize">{item.mood}</span>
                <span className="history-time tabular-nums">{item.timestamp}</span>
              </div>
              <p className="history-track">{item.title}</p>
            </div>
            {item.posterUrl && (
              <img
                src={item.posterUrl}
                alt=""
                className="history-thumb"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
