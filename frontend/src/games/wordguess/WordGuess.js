import "./WordGuess.css";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import { getboardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "../components/GameOver";
import hints from "../data/word_hints.json"

export const AppContext = createContext();

function WordGuess() {
  const [board, setBoard] = useState(getboardDefault());
    const [showModal, setShowModal] = useState(false);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [wordHints,setWordHints] = useState([])

  useEffect(() => {

    setBoard(getboardDefault())
    
    generateWordSet().then((words) => {

      const filtered = hints.filter(item => words.wordSet.has(item.word.toLowerCase()));
      setWordHints(filtered);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      
    });
    
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }


    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <header style={{marginBottom: "30px",marginTop: "30px"}}>
        <h2 style={{color:'grey'}}>Word Guess</h2>
      </header>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
    {showModal ? (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#fff",
      padding: "16px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      zIndex: 9999,
    }}
  >
    <p>
      <strong>Helpful Hint for Today’s Word:</strong>
    </p>

    <ul style={{ paddingLeft: "20px", marginTop: 0 }}>
      {wordHints
        .filter(
          (hint) => hint.word.toLowerCase() === correctWord.toLowerCase()
        )
        .map((hint, index) => (
          <li key={index}>
            {hint.hints}
          </li>
        ))}
    </ul>

    <button
      style={{ marginTop: "10px", marginRight: "10px" }}
      onClick={() => setShowModal(false)}
    >
      Dismiss
    </button>
  </div>
):( <button
      style={{position:"absolute",top:"20px",left:"20px",padding:"10px 20px",borderRadius:"5px",backgroundColor:"#007bff",color:"#fff",border:"none",cursor:"pointer"}}
      onClick={() => setShowModal(true)}
    >
      show hints
    </button>)}
      </AppContext.Provider>
    </div>
  );
}

export default WordGuess;
