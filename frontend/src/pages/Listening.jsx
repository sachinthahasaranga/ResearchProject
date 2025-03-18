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

  const audioRef = React.useRef(null);

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
        setListening(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the listening:', error);
        alert('Failed to fetch listening. Please try again.');
        setIsLoading(false);
      });
  }, [listeningId]);

  const handleAnswerChange = (questionNumber, answer) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleOkayButtonClick = async () => {
    if (!listening || !listening.QnA) {
      alert("No questions found!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    const responses = listening.QnA.map((qna, index) => ({
      _id: qna._id,
      question: qna.question,
      answer: qna.answer,
      studentsAnswer: studentAnswers[index + 1] || "",
      isCorrect: false,
    }));

    try {
      // const response = await axios.post(
      //   'http://localhost:3000/api/quiz-responses',
      //   { responses },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // if (response.status === 200) {
      //   alert("Responses saved successfully!");
      // } else {
      //   alert("Failed to save responses.");
      // }
      console.log(responses);
    } catch (error) {
      console.error("Error saving responses:", error);
      alert("An error occurred while saving responses.");
    }
  };


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
    setActiveQuestion((prev) => (prev === questionNumber ? null : questionNumber)); // Toggle active question
  };

  // const handleOkayButtonClick = () => {
  //   alert("Okay button clicked!"); // Add your logic here
  // };

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
      <div
        className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.5 }}
      ></div>

      <h1
        className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50 ${isQuestionContainerVisible ? 'slide-up' : ''}`}
        style={{ zIndex: 1, position: "relative", top: "10px" }}
      >
        Listening Page
      </h1>

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

      {isAudioPlaying && (
        <div style={{ width: "90%", marginTop: "20px" }}>
          <progress value={progress} max="100" style={{ width: "100%", height: "20px" }} />
        </div>
      )}

      {showOverlay && countdownImage && (
        <div className="overlay">
          <CSSTransition key={countdown} in={showOverlay} timeout={500} classNames="slide" unmountOnExit>
            <img src={countdownImage} alt={`Countdown ${countdown}`} className="countdown-image" />
          </CSSTransition>
        </div>
      )}

      {isAudioFinished && (
        <div
          className="questions-scrollable-container"
          style={{
            width: "100%",
            maxHeight: "60vh", // Adjust height as needed
            overflowY: "auto", // Enable vertical scrolling
            padding: "0 20px",
          }}
        >
          {/* Question Container 1 */}
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
            onClick={() => handleQuestionContainerClick(1)}
          >
            <p className="question-text">Click to reveal the question</p>
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

          {/* Question Content 1 */}
          {activeQuestion === 1 && (
            <CSSTransition in={activeQuestion === 1} timeout={500} classNames="slide" unmountOnExit>
              <div className="question-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
                {/* Answer Icon */}
                <img
                  src="/icons/answer.png"
                  alt="Answer Icon"
                  style={{
                    width: '70px', // Increased from 40px to 50px
                    height: '70px', // Increased from 40px to 50px
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    opacity: 0.4
                  }}
                />
                <p className="question-text">What is the main topic of the audio?</p>
                <input
                  type="text"
                  placeholder="Your answer here..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '2px solid green', // Green border
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            </CSSTransition>
          )}

          {/* Question Container 2 */}
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
            onClick={() => handleQuestionContainerClick(2)}
          >
            <p className="question-text">Click to reveal the second question</p>
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

          {/* Question Content 2 */}
          {activeQuestion === 2 && (
            <CSSTransition in={activeQuestion === 2} timeout={500} classNames="slide" unmountOnExit>
              <div className="question-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
                {/* Answer Icon */}
                <img
                  src="/icons/answer.png"
                  alt="Answer Icon"
                  style={{
                    width: '70px', // Increased from 40px to 50px
                    height: '70px', // Increased from 40px to 50px
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    opacity: 0.4
                  }}
                />
                <p className="question-text">What are the key points discussed?</p>
                <input
                  type="text"
                  placeholder="Your answer here..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '2px solid green', // Green border
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            </CSSTransition>
          )}

          {/* Add more question containers and content as needed */}
        </div>
      )}

      {/* Okay Button in Bottom-Right Corner */}
      {isAudioFinished && (
        <button
          className="okay-button"
          onClick={handleOkayButtonClick}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000, // Ensure it's above other elements
            padding: "15px 30px", // Increased padding for larger size
            fontSize: "24px", // Increased font size
            borderRadius: "30px", // Adjusted border radius for larger size
            backgroundColor: "#ADD8E6", // Light blue
            border: "2px solid #0000FF", // Blue border
            color: "#0000FF", // Blue text
            fontWeight: "bold",
            fontFamily: "'Spicy Rice', cursive", // Apply Spicy Rice font
            transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease", // Added transform to transition
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0000FF"; // Blue background on hover
            e.target.style.color = "#FFFFFF"; // White text on hover
            e.target.style.borderColor = "#FFFFFF"; // White border on hover
            e.target.style.transform = "scale(1.1)"; // Scale up the button by 10%
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ADD8E6"; // Light blue
            e.target.style.color = "#0000FF"; // Blue text
            e.target.style.borderColor = "#0000FF"; // Blue border
            e.target.style.transform = "scale(1)"; // Reset scale
          }}
        >
          <i className="fas fa-thumbs-up" style={{ marginRight: "15px", transition: "color 0.3s ease" }}></i>
          Okay
        </button>
      )}

      {/* Audio */}
      {listening && <audio ref={audioRef} src={listening.audio} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onEnded={handleAudioEnd} />}
    </div>
  );
};

export default Listening;