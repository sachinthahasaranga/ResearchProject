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
    let countdownTimer = 3;
    
    const countdownSequence = [3, 2, 1];
    let index = 0;

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

  const progressBarValue = (currentTime / duration) * 100;

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
          <p className="fs-4">Content for the Listening page will go here!</p>
        )}

        {!isCountingDown && !isAudioPlaying && !isAudioFinished && (
          <button className="btn btn-primary mt-3" onClick={handleStart}>
            Start
          </button>
        )}

        {isAudioPlaying && (
          <button className="btn btn-secondary mt-3" onClick={handleAudioPlayPause}>
            {isAudioPlaying ? "Pause" : "Play"}
          </button>
        )}

        {isAudioPlaying && (
          <div className="progress mt-4" style={{ width: "80%", maxWidth: "600px", height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressBarValue}%` }}
              aria-valuenow={progressBarValue}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}

        {isAudioPlaying && (
          <div className="mt-3">
            <span>{Math.floor(currentTime)}s</span> / <span>{Math.floor(duration)}s</span>
          </div>
        )}
      </div>

      {showOverlay && (
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
