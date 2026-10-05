import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-app)",
          color: "var(--text-secondary)",
          gap: "1.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            height: "40px",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "24px",
              backgroundColor: "var(--mood-happy)",
              borderRadius: "4px",
              animation: "waveBar 1s infinite ease-in-out",
            }}
          />
          <span
            style={{
              width: "4px",
              height: "36px",
              backgroundColor: "var(--mood-surprised)",
              borderRadius: "4px",
              animation: "waveBar 0.8s infinite ease-in-out 0.2s",
            }}
          />
          <span
            style={{
              width: "4px",
              height: "28px",
              backgroundColor: "var(--mood-sad)",
              borderRadius: "4px",
              animation: "waveBar 1.2s infinite ease-in-out 0.4s",
            }}
          />
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
          INITIALIZING MOODIFY SESSION...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
