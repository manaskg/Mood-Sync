import React from "react";

export default function BrandLogo({ size = "md" }) {
  const isLarge = size === "lg";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: isLarge ? "0.85rem" : "0.6rem" }}>
      <div
        style={{
          width: isLarge ? "44px" : "34px",
          height: isLarge ? "44px" : "34px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            width: "3px",
            height: isLarge ? "18px" : "14px",
            backgroundColor: "var(--accent-current, #f59e0b)",
            borderRadius: "2px",
            animation: "waveBar 1.2s infinite ease-in-out",
          }}
        />
        <span
          style={{
            width: "3px",
            height: isLarge ? "26px" : "20px",
            backgroundColor: "var(--mood-surprised, #c084fc)",
            borderRadius: "2px",
            animation: "waveBar 0.9s infinite ease-in-out 0.2s",
          }}
        />
        <span
          style={{
            width: "3px",
            height: isLarge ? "22px" : "16px",
            backgroundColor: "var(--mood-sad, #38bdf8)",
            borderRadius: "2px",
            animation: "waveBar 1.1s infinite ease-in-out 0.4s",
          }}
        />
      </div>
      <div>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isLarge ? "1.6rem" : "1.25rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            display: "block",
            lineHeight: 1.1,
          }}
        >
          Moodify
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isLarge ? "0.72rem" : "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            display: "block",
          }}
        >
          Emotion Audio AI
        </span>
      </div>
    </div>
  );
}
