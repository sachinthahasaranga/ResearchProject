import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/Listening.css"; // Import CSS for animations

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Listening = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdownImage, setCountdownImage] = useState(null);

  const audioRef = React.useRef(null);

  useEffect(() => {
    setBackgroundImageNumber(getRandomImageNumber(1, 6));
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioPlayPause = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const handleStart = () => {
    setIsCountingDown(true);
    setShowOverlay(true);

    const countdownSequence = [3, 2, 1];
    let index = 0;

    setCountdownImage(`/images/countdown/${countdownSequence[index]}.png`);
    setCountdown(countdownSequence[index]);
    index++;

    const countdownInterval = setInterval(() => {
      if (index < countdownSequence.length) {
        setCountdownImage(`/images/countdown/${countdownSequence[index]}.png`);
        setCountdown(countdownSequence[index]);
        index++;
      } else {
        clearInterval(countdownInterval);
        setIsCountingDown(false);
        setShowOverlay(false);
        setIsAudioPlaying(true);
        audioRef.current.play();
      }
    }, 1000);
  };

  const handleAudioEnd = () => {
    setIsAudioPlaying(false);
    setIsAudioFinished(true);
  };

  // Calculate the progress as a percentage
  const progress = (currentTime / duration) * 100;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url('/images/background/bg${backgroundImageNumber}.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.5 }}
      ></div>

      <h1
        className="text-white text-center position-sticky top-0 w-100 p-3 bg-dark bg-opacity-50"
        style={{ zIndex: 1 }}
      >
        Listening Page
      </h1>

      <div className="text-center text-white mt-5" style={{ zIndex: 1 }}>
        {isAudioFinished ? (
          <p className="fs-4">You can now answer the questions!</p>
        ) : (
          <p className="fs-4"></p>
        )}

        {!isCountingDown && !isAudioPlaying && !isAudioFinished && (
          <button
            className="btn mt-3"
            onClick={handleStart}
            style={{
              backgroundColor: "#FFD700", // Warm yellow (gold)
              border: "2px solid #006400", // Dark green border
              color: "#006400", // Dark green text
              fontWeight: "bold",
              fontFamily: "'Spicy Rice', cursive", // Apply Spicy Rice font
              padding: "15px 30px", // Increased padding for larger button
              fontSize: "20px", // Increased font size
              borderRadius: "25px", // Slightly larger border radius for a more rounded button
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center", // Align icon and text
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFC107")} // Slightly lighter yellow on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFD700")}
          >
            <i className="fas fa-flag waving-flag" style={{ marginRight: "10px" }}></i> {/* Flag icon with waving animation */}
            Start
          </button>
        )}

        {isAudioPlaying && (
          <button className="btn btn-secondary mt-3" onClick={handleAudioPlayPause}>
            {isAudioPlaying ? "Pause" : "Play"}
          </button>
        )}

        {isAudioPlaying && (
          <div className="mt-3">
            <span>{Math.floor(currentTime)}s</span> / <span>{Math.floor(duration)}s</span>
          </div>
        )}

        
      </div>

      {/* Progress bar for audio playback */}
      {isAudioPlaying && (
          <div style={{ width: "90%", marginTop: "20px" }}> {/* Increased width of progress bar to 90% */}
            <progress
              value={progress}
              max="100"
              style={{
                width: "100%",  // This ensures the progress bar fills the parent div width
                height: "20px", /* Height remains the same */
                backgroundColor: "#e0e0e0",
                borderRadius: "20px", // Border radius of 20px
                border: "none",
              }}
            >
              <span>{Math.floor(progress)}%</span>
            </progress>
          </div>
        )}

      {showOverlay && countdownImage && (
        <div className="overlay">
          <CSSTransition
            key={countdown}
            in={showOverlay}
            timeout={500}
            classNames="slide"
            unmountOnExit
          >
            <img src={countdownImage} alt={`Countdown ${countdown}`} className="countdown-image" />
          </CSSTransition>
        </div>
      )}

      <audio
        ref={audioRef}
        src="/audio/Legal Consultation Appointment Update.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleAudioEnd}
      />
    </div>
  );
};

export default Listening;
