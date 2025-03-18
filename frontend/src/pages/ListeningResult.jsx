import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "../styles/ListeningResult.css";

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const THRESHOLD = 0.7; // Set the threshold for correct answers

const ListeningResult = () => {
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const [isResultContainerVisible, setIsResultContainerVisible] = useState(false);
  const [activeResult, setActiveResult] = useState(null);
  const location = useLocation();
  const { responses: initialResponses } = location.state || {};
  const [responses, setResponses] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setBackgroundImageNumber(getRandomImageNumber(1, 6));
    setIsResultContainerVisible(true);

    if (initialResponses) {
      const updatedResponses = initialResponses.map(async (response) => {
        try {
          const apiResponse = await axios.post("http://localhost:5000/cosine-similarity", {
            word1: [response.answer],
            word2: [response.studentsAnswer],
          });

          const score = apiResponse.data[0].score || 0; // Ensure score is valid
          const isCorrect = score >= THRESHOLD; // Compare with threshold

          return { ...response, score, isCorrect }; // Assign score & correctness
        } catch (error) {
          console.error("Error calculating cosine similarity:", error);
          return { ...response, score: 0, isCorrect: false };
        }
      });

      Promise.all(updatedResponses).then((updatedResponsesWithScores) => {
        setResponses(updatedResponsesWithScores);
      });
    }
  }, [initialResponses]);

  const handleResultContainerClick = (index) => {
    setActiveResult((prev) => (prev === index ? null : index));

    setTimeout(() => {
      if (containerRef.current) {
        const selectedElement = containerRef.current.children[index];
        if (selectedElement) {
          selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 100);
  };

  // Calculate the number of correct answers
  const correctAnswersCount = responses.filter((response) => response.isCorrect).length;

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
        className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50 ${isResultContainerVisible ? 'slide-up' : ''}`}
        style={{ zIndex: 1, position: "relative", marginBottom: "10px" }}
      >
        Listening Results
      </h1>

      {/* Display correct answers count */}
      <h2
        className="text-white text-center w-100 p-3 bg-dark bg-opacity-50"
        style={{ zIndex: 1, position: "relative", marginBottom: "20px" }}
      >
        You got {correctAnswersCount} out of 5 correct answers!
      </h2>

      <div
        className="results-scrollable-container"
        ref={containerRef}
        style={{
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {responses.map((response, index) => (
          <div key={index}>
            {/* Result Container */}
            <div
              className={`result-container-${response.isCorrect ? "correct" : "wrong"} ${isResultContainerVisible ? "slide-up" : ""}`}
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "630px",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => handleResultContainerClick(index)}
            >
              <p className="result-text">Question {index + 1}</p>
              <img
                src={`/icons/${response.isCorrect ? "correct" : "wrong"}.png`}
                alt="Result Mark"
                style={{
                  width: "60px",
                  height: "60px",
                  position: "absolute",
                  right: "15px",
                }}
              />
            </div>

            {/* Result Content */}
            {activeResult === index && (
              <CSSTransition in={activeResult === index} timeout={500} classNames="slide" unmountOnExit>
                <div
                  className="result-content"
                  style={{
                    padding: "20px",
                    background: "#f1f1f1",
                    borderRadius: "10px",
                    marginTop: "10px",
                    position: "relative",
                  }}
                >
                  <img
                    src={`/icons/${response.isCorrect ? "correct_result" : "wrong_result"}.png`}
                    alt="Result Icon"
                    style={{
                      width: response.isCorrect ? "250px" : "170px",
                      height: "170px",
                      position: "absolute",
                      top: "10px",
                      right: "-10px",
                      opacity: 0.8,
                    }}
                  />

                  <p style={{ fontSize: "24px" }}><strong>Question:</strong> {response.question}</p>
                  <p style={{ fontSize: "24px" }}><strong>Your Answer:</strong> {response.studentsAnswer}</p>
                  <p style={{ fontSize: "24px" }}><strong>Correct Answer:</strong> {response.answer}</p>
                </div>
              </CSSTransition>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeningResult;
