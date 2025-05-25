import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';

const socket = io("http://localhost:5000");

function AutoCapture() {

  const location = useLocation();
  const isGamePage = location.pathname === "/game-launch";

  const emotionArrayRef = useRef([]);
  const MAX_SIZE = 50;

  const [mostFrequent, setMostFrequent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [popupInterval, setPopupInterval] = useState(localStorage.getItem("popupInterval") || "10");

  // Util: Check if it's time to show modal
  const shouldShowModal = () => {
    const nextPopupTime = localStorage.getItem("nextPopupTime");
    const now = Date.now();

    if (!nextPopupTime) return true;
    if (nextPopupTime === "never") return false;
    return now >= parseInt(nextPopupTime);
  };

  // Listen for emotion detection
  useEffect(() => {
    socket.on("emotion_result", (data) => {
      const emotion = data.emotion;
      const arr = emotionArrayRef.current;
      arr.push(emotion);
      if (arr.length > MAX_SIZE) arr.shift();

      const counts = {};
      arr.forEach((em) => {
        counts[em] = (counts[em] || 0) + 1;
      });

      const most = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      setMostFrequent(most);
      localStorage.setItem("emotion", most);

      // Check if should show modal
      if (!isGamePage && most !== "Happy" && most !== "No Face Detected" && shouldShowModal()) {
          setShowModal(true);
      }
    });

    return () => {
      socket.off("emotion_result");
    };
  }, []);

  // Camera logic (unchanged)
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
            console.log("Image captured and sent to server");
          }, 10000);
        };
      })
      .catch((err) => {
        console.error("Camera access failed:", err);
      });

    return () => {
      if (captureInterval) clearInterval(captureInterval);
      if (stream) stream.getTracks().forEach((track) => track.stop());
      document.body.removeChild(video);
    };
  }, []);

  // Handle dismiss and set next time
  const handleDismiss = () => {
    let delay;
    switch (popupInterval) {
      case "5": delay = 5 * 60 * 1000; break;
      case "10": delay = 10 * 60 * 1000; break;
      case "30": delay = 30 * 60 * 1000; break;
      case "60": delay = 60 * 60 * 1000; break;
      case "never": delay = "never"; break;
      default: delay = 10 * 60 * 1000;
    }

    const nextTime = delay === "never" ? "never" : Date.now() + delay;
    localStorage.setItem("popupInterval", popupInterval);
    localStorage.setItem("nextPopupTime", nextTime);
    setShowModal(false);
  };

  return (
    <>
      {(showModal && mostFrequent !== "No Face Detected") && (
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
          <p>We detected your mood as <strong>{mostFrequent}</strong>.</p>
          <p>Shall we play a game?</p>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="remind">Remind me again in: </label>
            <select
              id="remind"
              value={popupInterval}
              onChange={(e) => setPopupInterval(e.target.value)}
            >
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="never">Never</option>
            </select>
          </div>

          <button style={{ marginRight: '10px' }} onClick={handleDismiss}>Dismiss</button>
          <button style={{ backgroundColor: 'lightgreen' }} onClick={() => {setShowModal(false)
            window.location.href = "http://localhost:3000/game-launch";
          }}>
            Play game
          </button>
        </div>
      )}
    </>
  );
}

export default AutoCapture;
