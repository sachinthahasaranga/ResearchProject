// MoodPopup.js
import React from "react";

const MoodPopup = ({ emotion, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      padding: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      zIndex: 1000
    }}>
      <h4>😟 Mood Detected</h4>
      <p>We detected: <strong>{emotion}</strong></p>
      <button onClick={onClose}>Dismiss</button>
    </div>
  );
};

export default MoodPopup;
