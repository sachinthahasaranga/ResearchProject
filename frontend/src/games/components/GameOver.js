import React, { useContext } from "react";
import { AppContext } from "../../games/wordguess/WordGuess";

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3
        style={{
          color: gameOver.guessedWord ? "green" : "red",
          fontFamily: "Poppins",
        }}
      >
        {gameOver.guessedWord
          ? "You Correctly Guessed the Word"
          : "You Failed to Guess the Word"}
      </h3>
      <h1 style={{ fontFamily: "Poppins" }}>
        Correct Word: {correctWord.toUpperCase()}
      </h1>
      {gameOver.guessedWord && (
        <h3 style={{ fontFamily: "Poppins" }}>
          You guessed in {currAttempt.attempt} attempts
        </h3>
      )}
      
      {/* New Game Button */}
      <button
        style={{
          fontFamily: "Poppins",
          marginTop: "20px",
          padding: "15px 30px",
          backgroundColor: "#b49f39",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "24px",
          borderRadius: "8px", 
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", 
        }}
        onClick={() => window.location.reload()}
      >
        New Game
      </button>
    </div>
  );
}

export default GameOver;
