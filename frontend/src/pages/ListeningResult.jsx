import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { CSSTransition } from "react-transition-group";
import axios from "axios"; // Import axios for API calls
import "../styles/ListeningResult.css"; // Import CSS for animations

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ListeningResult = () => {
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const [isResultContainerVisible, setIsResultContainerVisible] = useState(false);
  const [activeResult, setActiveResult] = useState(null); // Track which result is active
  const location = useLocation(); // Use the useLocation hook
  const { responses: initialResponses } = location.state || {}; // Access the passed state
  const [responses, setResponses] = useState([]); // State to store responses with scores

  useEffect(() => {
    setBackgroundImageNumber(getRandomImageNumber(1, 6));
    setIsResultContainerVisible(true); // Show the result container on component mount

    // Calculate cosine similarity for each response
    if (initialResponses) {
      const updatedResponses = initialResponses.map(async (response) => {
        try {
          const apiResponse = await axios.post("http://localhost:5000/cosine-similarity", {
            word1: [response.answer],
            word2: [response.studentsAnswer],
          });

          // Add the score to the response
          return {
            ...response,
            score: apiResponse.data[0].score, // Extract the score from the API response
          };
        } catch (error) {
          console.error("Error calculating cosine similarity:", error);
          return {
            ...response,
            score: 0, // Default score if API call fails
          };
        }
      });

      // Wait for all API calls to complete and update the responses state
      Promise.all(updatedResponses).then((updatedResponsesWithScores) => {
        setResponses(updatedResponsesWithScores);
      });
    }
  }, [initialResponses]);

  const handleResultContainerClick = (resultNumber) => {
    setActiveResult((prev) => (prev === resultNumber ? null : resultNumber)); // Toggle active result
  };

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
        style={{ zIndex: 1, position: "relative", top: "10px" }}
      >
        Listening Results
      </h1>

      <div
        className="results-scrollable-container"
        style={{
          width: "100%",
          maxHeight: "60vh", // Adjust height as needed
          overflowY: "auto", // Enable vertical scrolling
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
        }}
      >
        {/* Map through responses and render them */}
        {responses.map((response, index) => (
          <div key={index}>
            {/* Result Container */}
            <div
              className={`result-container-${response.isCorrect ? "correct" : "wrong"} ${
                isResultContainerVisible ? "slide-up" : ""
              }`}
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "20px",
                position: "relative",
              }}
              onClick={() => handleResultContainerClick(index + 1)}
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
            {activeResult === index + 1 && (
              <CSSTransition in={activeResult === index + 1} timeout={500} classNames="slide" unmountOnExit>
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
                  {/* Result Icon */}
                  <img
                    src="/icons/result.png"
                    alt="Result Icon"
                    style={{
                      width: "70px",
                      height: "70px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      opacity: 0.4,
                    }}
                  />
                  <p className="result-text">
                    <strong>Question:</strong> {response.question}
                  </p>
                  <p className="result-text">
                    <strong>Your Answer:</strong> {response.studentsAnswer}
                  </p>
                  <p className="result-text">
                    <strong>Correct Answer:</strong> {response.answer}
                  </p>
                  {/* <p className="result-text">
                    <strong>Score:</strong> {response.score.toFixed(2)}
                  </p> */}
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