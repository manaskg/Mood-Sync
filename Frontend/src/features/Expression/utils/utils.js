import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    if (navigator.mediaDevices?.getUserMedia && videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      return { success: true };
    }

    return { success: false, error: "Camera not accessible" };
  } catch (err) {
    console.warn("MediaPipe or Camera initialization warning:", err.message);
    return { success: false, error: err.message };
  }
};

export const detect = ({ landmarkerRef, videoRef, setExpression, setMetrics }) => {
  if (!landmarkerRef.current || !videoRef.current) return null;

  try {
    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now(),
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");
      const smile = Math.max(smileLeft, smileRight);

      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");
      const surprise = (jawOpen + browUp) / 2;

      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");
      const frown = Math.max(frownLeft, frownRight);

      let currentExpression = "happy"; // default fallback if neutral

      if (smileLeft > 0.35 || smileRight > 0.35) {
        currentExpression = "happy";
      } else if (jawOpen > 0.45 && browUp > 0.35) {
        currentExpression = "surprised";
      } else if (frownLeft > 0.0005 || frownRight > 0.0005) {
        currentExpression = "sad";
      }

      if (setExpression) {
        setExpression(currentExpression);
      }

      if (setMetrics) {
        setMetrics({
          smile: Math.round(smile * 100),
          surprise: Math.round(surprise * 100),
          frown: Math.round(frown * 1000) / 10,
        });
      }

      return {
        expression: currentExpression,
        metrics: {
          smile: Math.round(smile * 100),
          surprise: Math.round(surprise * 100),
          frown: Math.round(frown * 1000) / 10,
        },
      };
    }
  } catch (err) {
    console.error("Detection error:", err);
  }

  return null;
};
