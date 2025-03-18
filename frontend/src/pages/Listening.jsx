import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { CSSTransition } from "react-transition-group";
import "../styles/Listening.css"; // Import CSS for animations

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Listening = () => {
  const location = useLocation();
  const { listeningId } = location.state || {};
  const [listening, setListening] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdownImage, setCountdownImage] = useState(null);
  const [isQuestionContainerVisible, setIsQuestionContainerVisible] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentAnswers, setStudentAnswers] = useState({}); // State for student answers
  const [responses, setResponses] = useState([]); // State to store responses

  const audioRef = React.useRef(null);

  // Fetch the full listening data when the component mounts
  useEffect(() => {
    if (!listeningId) return;
    setBackgroundImageNumber(getRandomImageNumber(1, 6));

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    axios
      .get(`http://localhost:3000/api/lstn/${listeningId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setListening(response.data); // Store the fetched listening data
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching the listening:', error);
        alert('Failed to fetch listening. Please try again.');
        setIsLoading(false); // Set loading to false even if there's an error
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
      }));
      setResponses(updatedResponses); // Update the responses state
    }
  }, [listening, studentAnswers]);

  // Handle student answer input changes
  const handleAnswerChange = (questionNumber, answer) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  // Handle "Okay" button click to save responses
  const handleOkayButtonClick = async () => {
    if (!responses.length) {
      alert("No responses to save!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/quiz-responses',
        { responses },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Responses saved successfully!");
      } else {
        alert("Failed to save responses.");
      }
    } catch (error) {
      console.error("Error saving responses:", error);
      alert("An error occurred while saving responses.");
    }
  };

  // Rest of the component code remains the same...
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

  const handleQuestionContainerClick = (questionNumber) => {
    setActiveQuestion((prev) => (prev === questionNumber ? null : questionNumber));
  };

  const progress = (currentTime / duration) * 100;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center"
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
        style={{ opacity: 0.5 }}
      ></div>

      {/* Page title */}
      <h1
        className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50 ${isQuestionContainerVisible ? 'slide-up' : ''}`}
        style={{ zIndex: 1, position: "relative", top: "10px" }}
      >
        Listening Page
      </h1>

      {/* Audio controls and progress */}
      <div className="text-center text-white" style={{ zIndex: 1, marginTop: '20px' }}>
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
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFC107")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFD700")}
          >
            <i className="fas fa-flag waving-flag" style={{ marginRight: "10px" }}></i>
            Start
          </button>
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
        <div style={{ width: "90%", marginTop: "20px" }}>
          <progress value={progress} max="100" style={{ width: "100%", height: "20px" }} />
        </div>
      )}

      {/* Countdown overlay */}
      {showOverlay && countdownImage && (
        <div className="overlay">
          <CSSTransition key={countdown} in={showOverlay} timeout={500} classNames="slide" unmountOnExit>
            <img src={countdownImage} alt={`Countdown ${countdown}`} className="countdown-image" />
          </CSSTransition>
        </div>
      )}

      {/* Questions container */}
      {isAudioFinished && (
        <div
          className="questions-scrollable-container"
          style={{
            width: "100%",
            maxHeight: "90vh", // Adjust height as needed
            overflowY: "auto", // Enable vertical scrolling
            padding: "0 20px",
          }}
        >
          {/* Map through questions and render them */}
          {listening.QnA.map((qna, index) => (
            <div key={index}>
              {/* Question Container */}
              <div
                className={`question-container ${isQuestionContainerVisible ? 'slide-up' : ''}`}
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: '20px',
                  position: 'relative',
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

              {/* Question Content */}
              {activeQuestion === index + 1 && (
                <CSSTransition in={activeQuestion === index + 1} timeout={500} classNames="slide" unmountOnExit>
                  <div className="question-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
                    {/* Answer Icon */}
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
                </CSSTransition>
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
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0000FF";
            e.target.style.color = "#FFFFFF";
            e.target.style.borderColor = "#FFFFFF";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
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

      {/* Audio element */}
      {listening && <audio ref={audioRef} src={listening.audio} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onEnded={handleAudioEnd} />}
    </div>
  );
};

export default Listening;