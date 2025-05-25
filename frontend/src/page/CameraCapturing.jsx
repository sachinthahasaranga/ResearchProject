import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';

const socket = io("http://localhost:5000");

function AutoCapture() {
  const location = useLocation();
  const isGamePage = location.pathname === "/game-launch";

  const emotionWindowRef = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [popupInterval, setPopupInterval] = useState(localStorage.getItem("popupInterval") || "10");

  const getSuppressDuration = (value) => {
    switch (value) {
      case "5": return 5 * 60 * 1000;
      case "10": return 10 * 60 * 1000;
      case "30": return 30 * 60 * 1000;
      case "60": return 60 * 60 * 1000;
      default: return 10 * 60 * 1000;
    }
  };

  const shouldShowModal = () => {
    const nextPopupTime = localStorage.getItem("nextPopupTime");
    const now = Date.now();
    if (!nextPopupTime) return true;
    if (nextPopupTime === "never") return false;
    return now >= parseInt(nextPopupTime);
  };

  useEffect(() => {
    socket.on("emotion_result", (data) => {
      emotionWindowRef.current.push(data.emotion);
    });

    return () => socket.off("emotion_result");
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      const emotions = emotionWindowRef.current;
      if (emotions.length === 0) return;

      // Count frequencies
      const counts = {};
      emotions.forEach((em) => {
        counts[em] = (counts[em] || 0) + 1;
      });

      // Get most frequent
      const mostFrequent = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      console.log("Most frequent (last 5s):", mostFrequent);

      // Trigger popup if needed
      if (!isGamePage && mostFrequent !== "Neutral" && mostFrequent !== "Happy"  && mostFrequent !== "No Face" && shouldShowModal()) {
        setShowModal(true);
      }

      // Clear the 5-second window
      emotionWindowRef.current = [];
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [popupInterval, isGamePage]);


  const handleDismiss = () => {
    const delay = popupInterval === "never" ? "never" : Date.now() + getSuppressDuration(popupInterval);
    localStorage.setItem("popupInterval", popupInterval);
    localStorage.setItem("nextPopupTime", delay);
    setShowModal(false);
  };


  useEffect(() => {
    const video = document.createElement("video");
    video.setAttribute("autoplay", true);
    video.setAttribute("playsinline", true);
    video.style.display = "none";
    document.body.appendChild(video);

    let stream;
    let captureInterval;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((_stream) => {
        stream = _stream;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          captureInterval = setInterval(() => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/jpeg");
            socket.emit("send_image", imageData);
          }, 10000); // Capture every 10s
        };
      })
      .catch((err) => console.error("Camera access failed:", err));

    return () => {
      if (captureInterval) clearInterval(captureInterval);
      if (stream) stream.getTracks().forEach((track) => track.stop());
      document.body.removeChild(video);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          zIndex: 9999
        }}>
          <h4>😟 Mood Detected</h4>
          <p>We noticed you seem frustrated. Want to play a game to relax?</p>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="remind">Remind me again in: </label>
            <select
              id="remind"
              value={popupInterval}
              onChange={(e) => {
                const value = e.target.value;
                setPopupInterval(value);
                localStorage.setItem("popupInterval", value);
              }}
            >
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="never">Never</option>
            </select>
          </div>

          <button style={{ marginRight: '10px' }} onClick={handleDismiss}>Dismiss</button>
          <button
            style={{ backgroundColor: 'lightgreen' }}
            onClick={() => {
              setShowModal(false);
              window.location.href = "http://localhost:3000/game-launch";
            }}
          >
            Play game
          </button>
        </div>
      )}
    </>
  );
}

export default AutoCapture;
