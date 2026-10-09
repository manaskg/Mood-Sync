import React, { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { Camera, CameraSlash, Scan, Smiley, SmileySad, Lightning } from "@phosphor-icons/react";
import "../style/expression.scss";

export default function FaceExpression({ activeMood = "happy", onMoodDetected = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState(activeMood);
  const [cameraActive, setCameraActive] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

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
        setMetrics: () => {},
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

  const cameraOnline = cameraActive && !cameraError;

  return (
    <section className="expression-studio" aria-label="AI Face Emotion Scanner">
      {/* Camera Viewport */}
      <div className="expression-studio__viewport">
        {cameraOnline ? (
          <>
            <video ref={videoRef} playsInline muted autoPlay />
            <div className="viewport__scan-frame">
              <span className="corner corner--tl" />
              <span className="corner corner--tr" />
              <span className="corner corner--bl" />
              <span className="corner corner--br" />
            </div>
            {isScanning && <div className="viewport__laser" />}
          </>
        ) : (
          <div className="viewport__offline">
            <CameraSlash size={32} weight="light" />
            <p>
              {cameraError
                ? "Camera unavailable — select your mood below"
                : "Camera paused"}
            </p>
          </div>
        )}

        {/* Camera toggle overlaid on viewport */}
        <button
          type="button"
          className="viewport__cam-toggle"
          onClick={toggleCamera}
          aria-label={cameraActive ? "Turn off camera" : "Turn on camera"}
        >
          {cameraActive ? <CameraSlash size={16} /> : <Camera size={16} />}
        </button>
      </div>

      {/* Primary Action */}
      <button
        type="button"
        className="btn btn--primary btn--lg expression-studio__scan-btn"
        onClick={handleScan}
        disabled={isScanning}
      >
        <Scan size={18} weight="bold" />
        {isScanning ? "Scanning…" : "Detect Mood"}
      </button>

      {/* Quick Mood Selector */}
      <div className="expression-studio__moods">
        <span className="moods__label">or pick manually</span>
        <div className="moods__chips">
          <button
            type="button"
            className={`mood-chip${expression === "happy" ? " mood-chip--active" : ""}`}
            onClick={() => handleManualMoodSelect("happy")}
          >
            <Smiley size={16} weight={expression === "happy" ? "fill" : "regular"} />
            Happy
          </button>
          <button
            type="button"
            className={`mood-chip${expression === "sad" ? " mood-chip--active" : ""}`}
            onClick={() => handleManualMoodSelect("sad")}
          >
            <SmileySad size={16} weight={expression === "sad" ? "fill" : "regular"} />
            Sad
          </button>
          <button
            type="button"
            className={`mood-chip${expression === "surprised" ? " mood-chip--active" : ""}`}
            onClick={() => handleManualMoodSelect("surprised")}
          >
            <Lightning size={16} weight={expression === "surprised" ? "fill" : "regular"} />
            Surprised
          </button>
        </div>
      </div>
    </section>
  );
}
