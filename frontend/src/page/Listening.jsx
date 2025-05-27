import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

import "../styles/Listening.css";

// Helper
const getRandomImageNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Listening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { listeningId, threshold, isPractise } = location.state || {};
  const [listening, setListening] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(getRandomImageNumber(1, 6));
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdownImage, setCountdownImage] = useState(null);
  const [isQuestionContainerVisible, setIsQuestionContainerVisible] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [responses, setResponses] = useState([]);

  const audioRef = useRef(null);

  // Fetch listening data with apiClient
  useEffect(() => {
    if (!listeningId) return;
    setBackgroundImageNumber(getRandomImageNumber(1, 6));
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    apiClient
      .get(`/api/lstn/${listeningId}`)
      .then((response) => {
        setListening(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the listening:', error);
        alert('Failed to fetch listening. Please try again.');
        setIsLoading(false);
      });
  }, [listeningId]);

  // Update responses when listening data or studentAnswers change
  useEffect(() => {
    if (listening && listening.QnA) {
      const updatedResponses = listening.QnA.map((qna, index) => ({
        _id: qna._id,
        question: qna.question,
        answer: qna.answer,
        studentsAnswer: studentAnswers[index + 1] || "",
        isCorrect: false,
        score: 0.0
      }));
      setResponses(updatedResponses);
    }
  }, [listening, studentAnswers]);

  // Handle student answer input changes
  const handleAnswerChange = (questionNumber, answer) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  // Handle "Okay" button click to save responses and navigate to the result page
  const handleOkayButtonClick = () => {
    if (!responses.length) {
      alert("No responses to save!");
      return;
    }
    navigate("/listeningResult", {
      state: {
        responses,
        isPractise,
        threshold,
        categoryId: listening?.category?._id,
      },
    });
  };

  // Audio controls
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
    setIsQuestionContainerVisible(true);
  };

  const progress = (duration > 0) ? (currentTime / duration) * 100 : 0;

  // 1. LOADING SPINNER
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 2. MAIN LAYOUT
  return (
    <>
      <Header />

      {/* Place PageHeader here to appear under Header but above the background/overlay */}
      <PageHeader title={listening ? listening.name : "Listening Page"} />

      <div
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
        {/* Dark overlay */}
        <div
          className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 0 }}
        ></div>


        {/* Content wrapper with higher zIndex */}
        <div style={{ position: "relative", zIndex: 2, paddingBottom: "60px" }}>
          {/* Start Button */}
          {!isCountingDown && !isAudioPlaying && !isAudioFinished && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '32px 0 8px 0',
              }}
            >
              <button
                className="btn mt-3"
                onClick={handleStart}
                style={{
                  backgroundColor: "#FFD700",
                  border: "2px solid #006400",
                  color: "#006400",
                  fontWeight: "bold",
                  fontFamily: "'Spicy Rice', cursive",
                  padding: "15px 30px",
                  fontSize: "20px",
                  borderRadius: "25px",
                  transition: "background-color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.13)",
                  minWidth: "180px",
                  textAlign: "center",
                  zIndex: 2,
                }}
                onMouseEnter={e => e.target.style.backgroundColor = "#FFC107"}
                onMouseLeave={e => e.target.style.backgroundColor = "#FFD700"}
              >
                <i className="fas fa-flag waving-flag" style={{ marginRight: "10px" }}></i>
                Start
              </button>
            </div>
          )}

          {/* Audio controls and progress */}
          <div className="text-center text-white" style={{ marginTop: '30px', position: 'relative', zIndex: 2 }}>
            {isAudioFinished ? (
              <p className="fs-4">You can now answer the questions!</p>
            ) : (
              <p className="fs-4"></p>
            )}

            {isAudioPlaying && (
              <>
                <button className="btn btn-secondary mt-3" onClick={handleAudioPlayPause}>
                  {isAudioPlaying ? "Pause" : "Play"}
                </button>

                <div className="mt-3">
                  <span>{Math.floor(currentTime)}s</span> / <span>{Math.floor(duration)}s</span>
                </div>
              </>
            )}
          </div>

          {/* Progress bar */}
          {isAudioPlaying && (
            <div style={{ width: "90%", marginTop: "20px", position: 'relative', zIndex: 2 }}>
              <progress value={progress} max="100" style={{ width: "100%", height: "20px" }} />
            </div>
          )}

          {/* Countdown overlay */}
          {showOverlay && countdownImage && (
            <div className="overlay" style={{ zIndex: 9999, position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={countdownImage} alt={`Countdown ${countdown}`} className="countdown-image" />
            </div>
          )}

          {/* Questions container */}
          {isAudioFinished && (
            <div
              className="questions-scrollable-container"
              style={{
                width: "100%",
                maxHeight: "65vh",
                overflowY: "auto",
                padding: "0 20px",
                position: 'relative',
                zIndex: 2
              }}
            >
              {listening.QnA.map((qna, index) => (
                <div key={index}>
                  <div
                    className={`question-container ${isQuestionContainerVisible ? 'slide-up' : ''}`}
                    style={{
                      marginTop: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingRight: '20px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActiveQuestion(activeQuestion === index + 1 ? null : index + 1)}
                  >
                    <p className="question-text">Question {index + 1}</p>
                    <img
                      src="/icons/q_mark.png"
                      alt="Question Mark"
                      style={{
                        width: '40px',
                        height: '40px',
                        position: 'absolute',
                        right: '15px',
                      }}
                    />
                  </div>

                  {activeQuestion === index + 1 && (
                    <div className="question-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
                      <img
                        src="/icons/answer.png"
                        alt="Answer Icon"
                        style={{
                          width: '70px',
                          height: '70px',
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          opacity: 0.4,
                        }}
                      />
                      <p className="question-text">{qna.question}</p>
                      <input
                        type="text"
                        placeholder="Your answer here..."
                        value={studentAnswers[index + 1] || ""}
                        onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '5px',
                          border: '2px solid green',
                          fontSize: '16px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Okay Button */}
          {isAudioFinished && (
            <button
              className="okay-button"
              onClick={handleOkayButtonClick}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 1000,
                padding: "15px 30px",
                fontSize: "24px",
                borderRadius: "30px",
                backgroundColor: "#ADD8E6",
                border: "2px solid #0000FF",
                color: "#0000FF",
                fontWeight: "bold",
                fontFamily: "'Spicy Rice', cursive",
                transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = "#0000FF";
                e.target.style.color = "#FFFFFF";
                e.target.style.borderColor = "#FFFFFF";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = "#ADD8E6";
                e.target.style.color = "#0000FF";
                e.target.style.borderColor = "#0000FF";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="fas fa-thumbs-up" style={{ marginRight: "15px", transition: "color 0.3s ease" }}></i>
              Okay
            </button>
          )}

          {/* Audio element (hidden) */}
          {listening && (
            <audio
              ref={audioRef}
              src={listening.audio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={handleAudioEnd}
              style={{ display: "none" }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listening;
