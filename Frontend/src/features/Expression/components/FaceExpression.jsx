import React, { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { Camera, CameraSlash, Sparkle, Scan, Smiley, SmileySad, Lightning } from "@phosphor-icons/react";
import "../style/expression.scss";

export default function FaceExpression({ activeMood = "happy", onMoodDetected = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState(activeMood);
  const [cameraActive, setCameraActive] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [telemetry, setTelemetry] = useState({
    smile: activeMood === "happy" ? 85 : 12,
    surprise: activeMood === "surprised" ? 92 : 8,
    frown: activeMood === "sad" ? 78 : 5,
  });

  // Initialize camera and MediaPipe
  useEffect(() => {
    let mounted = true;

    async function startVision() {
      if (!cameraActive) return;
      const res = await init({ landmarkerRef, videoRef, streamRef });
      if (mounted) {
        if (!res.success) {
          setCameraError(res.error || "Webcam unavailable");
        } else {
          setCameraError(null);
        }
      }
    }

    startVision();

    return () => {
      mounted = false;
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close();
        } catch (e) {}
      }
      if (videoRef.current?.srcObject) {
        try {
          videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        } catch (e) {}
      }
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((track) => track.stop());
        } catch (e) {}
      }
    };
  }, [cameraActive]);

  // Sync external mood changes
  useEffect(() => {
    if (activeMood) {
      setExpression(activeMood);
    }
  }, [activeMood]);

  // Trigger face scan
  const handleScan = () => {
    setIsScanning(true);

    if (cameraError || !videoRef.current?.srcObject) {
      // If camera is offline, simulate a scan with active mood or cycle
      setTimeout(() => {
        setIsScanning(false);
        onMoodDetected(expression);
      }, 500);
      return;
    }

    // Run real face detection
    setTimeout(() => {
      const result = detect({
        landmarkerRef,
        videoRef,
        setExpression: (exp) => {
          setExpression(exp);
        },
        setMetrics: (metrics) => {
          setTelemetry(metrics);
        },
      });

      setIsScanning(false);

      if (result?.expression) {
        setExpression(result.expression);
        onMoodDetected(result.expression);
      } else {
        // Fallback to current
        onMoodDetected(expression);
      }
    }, 400);
  };

  const handleManualMoodSelect = (mood) => {
    setExpression(mood);
    if (mood === "happy") setTelemetry({ smile: 92, surprise: 15, frown: 4 });
    if (mood === "sad") setTelemetry({ smile: 6, surprise: 10, frown: 84 });
    if (mood === "surprised") setTelemetry({ smile: 25, surprise: 94, frown: 8 });
    onMoodDetected(mood);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      setCameraActive(false);
    } else {
      setCameraActive(true);
    }
  };

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

  const getMoodVibe = (mood) => {
    switch (mood) {
      case "happy":
        return "High Energy · Euphoric Vibes";
      case "sad":
        return "Deep Reflection · Solitude Melody";
      case "surprised":
        return "Astounding · Electric Shockwaves";
      default:
        return "Harmonic Resonance";
    }
  };

  return (
    <section className="expression-studio" aria-label="AI Face Emotion Scanner">
      <header className="expression-studio__header">
        <div className="expression-studio__title-wrap">
          <h2>
            <Sparkle size={20} weight="fill" color="var(--accent-current)" />
            AI Facial Emotion Scanner
          </h2>
          <p>Analyzing facial micro-gestures to curate your soundtrack</p>
        </div>
        <div className="expression-studio__status-badge">
          <span className="status-dot"></span>
          <span>{cameraActive && !cameraError ? "Vision Sensor Active" : "Manual Mode"}</span>
        </div>
      </header>

      {/* Camera Viewport with HUD reticle */}
      <div className="expression-studio__viewport-wrapper">
        {cameraActive && !cameraError ? (
          <>
            <video ref={videoRef} playsInline muted autoPlay />
            <div className="scanner-overlay">
              <span className="reticle-corner reticle-corner--tl" />
              <span className="reticle-corner reticle-corner--tr" />
              <span className="reticle-corner reticle-corner--bl" />
              <span className="reticle-corner reticle-corner--br" />
              <div className="laser-line" />
            </div>
          </>
        ) : (
          <div className="camera-offline-msg">
            <CameraSlash size={40} weight="light" color="var(--text-muted)" />
            <h3>Camera Sensor Offline</h3>
            <p>
              {cameraError
                ? "Camera permission blocked or unavailable. You can use the instant mood selector below."
                : "Camera is currently paused. Toggle on to re-enable live AI facial tracking."}
            </p>
          </div>
        )}

        {/* Emotion Banner over camera */}
        <div className="expression-banner">
          <div className="expression-tag">
            <span className="emoji-circle">{getMoodEmoji(expression)}</span>
            <div>
              <span className="mood-name">{expression} Emotion</span>
              <p className="vibe-tag">{getMoodVibe(expression)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time telemetry metrics */}
      <div className="telemetry-row">
        <div className="metric-pill">
          <div className="metric-pill__label">
            <span>Smile Valence</span>
            <span className="tabular-nums">{telemetry.smile}%</span>
          </div>
          <div className="metric-pill__bar">
            <div
              className="bar-fill"
              style={{ width: `${telemetry.smile}%`, backgroundColor: "var(--mood-happy)" }}
            />
          </div>
        </div>

        <div className="metric-pill">
          <div className="metric-pill__label">
            <span>Awe / Surprise</span>
            <span className="tabular-nums">{telemetry.surprise}%</span>
          </div>
          <div className="metric-pill__bar">
            <div
              className="bar-fill"
              style={{ width: `${telemetry.surprise}%`, backgroundColor: "var(--mood-surprised)" }}
            />
          </div>
        </div>

        <div className="metric-pill">
          <div className="metric-pill__label">
            <span>Melancholy</span>
            <span className="tabular-nums">{telemetry.frown}%</span>
          </div>
          <div className="metric-pill__bar">
            <div
              className="bar-fill"
              style={{ width: `${telemetry.frown}%`, backgroundColor: "var(--mood-sad)" }}
            />
          </div>
        </div>
      </div>

      {/* Studio Controls */}
      <div className="studio-controls">
        <div className="actions-row">
          <button
            type="button"
            className="btn btn--primary btn--lg btn-scan"
            onClick={handleScan}
            disabled={isScanning}
          >
            <Scan size={20} weight="bold" />
            {isScanning ? "Analyzing Face..." : "Capture & Match Mood"}
          </button>

          <button
            type="button"
            className="btn btn--secondary btn--lg"
            onClick={toggleCamera}
            aria-label={cameraActive ? "Turn off camera" : "Turn on camera"}
          >
            {cameraActive ? <CameraSlash size={20} /> : <Camera size={20} />}
            <span>{cameraActive ? "Pause Cam" : "Enable Cam"}</span>
          </button>
        </div>

        {/* Quick Mood Override Selector */}
        <div className="quick-mood-strip">
          <span className="quick-mood-label">Instant Mood Selector (One-Click)</span>
          <div className="mood-chips-row">
            <button
              type="button"
              className={`mood-chip ${expression === "happy" ? "mood-chip--active" : ""}`}
              onClick={() => handleManualMoodSelect("happy")}
            >
              <Smiley size={18} weight={expression === "happy" ? "fill" : "regular"} />
              <span>Happy</span>
            </button>
            <button
              type="button"
              className={`mood-chip ${expression === "sad" ? "mood-chip--active" : ""}`}
              onClick={() => handleManualMoodSelect("sad")}
            >
              <SmileySad size={18} weight={expression === "sad" ? "fill" : "regular"} />
              <span>Sad</span>
            </button>
            <button
              type="button"
              className={`mood-chip ${expression === "surprised" ? "mood-chip--active" : ""}`}
              onClick={() => handleManualMoodSelect("surprised")}
            >
              <Lightning size={18} weight={expression === "surprised" ? "fill" : "regular"} />
              <span>Surprised</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
