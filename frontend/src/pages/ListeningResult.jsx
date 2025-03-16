import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/ListeningResult.css"; // Import CSS for animations

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ListeningResult = () => {
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const [isResultContainerVisible, setIsResultContainerVisible] = useState(false);
  const [activeResult, setActiveResult] = useState(null); // Track which result is active

  useEffect(() => {
    setBackgroundImageNumber(getRandomImageNumber(1, 6));
    setIsResultContainerVisible(true); // Show the result container on component mount
  }, []);

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
        {/* Result Container 1 */}
        <div
          className={`result-container-correct ${isResultContainerVisible ? 'slide-up' : ''}`}
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '20px',
            position: 'relative',
          }}
          onClick={() => handleResultContainerClick(1)}
        >
          <p className="result-text">Click to reveal the result</p>
          <img
            src="/icons/correct.png"
            alt="Result Mark"
            style={{
              width: '60px',
              height: '60px',
              position: 'absolute',
              right: '15px',
            }}
          />
        </div>

        {/* Result Content 1 */}
        {activeResult === 1 && (
          <CSSTransition in={activeResult === 1} timeout={500} classNames="slide" unmountOnExit>
            <div className="result-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
              {/* Result Icon */}
              <img
                src="/icons/result.png"
                alt="Result Icon"
                style={{
                  width: '70px', // Increased from 40px to 50px
                  height: '70px', // Increased from 40px to 50px
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  opacity: 0.4
                }}
              />
              <p className="result-text">Your score for this section is 8/10.</p>
            </div>
          </CSSTransition>
        )}

        {/* Result Container 2 */}
        <div
          className={`result-container-wrong ${isResultContainerVisible ? 'slide-up' : ''}`}
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '20px',
            position: 'relative',
          }}
          onClick={() => handleResultContainerClick(2)}
        >
          <p className="result-text">Click to reveal the second result</p>
          <img
            src="/icons/wrong.png"
            alt="Result Mark"
            style={{
              width: '60px',
              height: '60px',
              position: 'absolute',
              right: '15px',
            }}
          />
        </div>

        {/* Result Content 2 */}
        {activeResult === 2 && (
          <CSSTransition in={activeResult === 2} timeout={500} classNames="slide" unmountOnExit>
            <div className="result-content" style={{ padding: '20px', background: '#f1f1f1', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
              {/* Result Icon */}
              <img
                src="/icons/result.png"
                alt="Result Icon"
                style={{
                  width: '70px', // Increased from 40px to 50px
                  height: '70px', // Increased from 40px to 50px
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  opacity: 0.4
                }}
              />
              <p className="result-text">You answered 2 out of 3 questions correctly.</p>
            </div>
          </CSSTransition>
        )}

        {/* Add more result containers and content as needed */}
      </div>
    </div>
  );
};

export default ListeningResult;