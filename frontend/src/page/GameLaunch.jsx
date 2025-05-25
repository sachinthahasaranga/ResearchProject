import { useState } from "react";
import "../assets/sass/app.scss";
import CardFlipGame from "../games/cardflip/CardFlipGame";
import WordGuess from "../games/wordguess/WordGuess";
import StoryViewer from "../games/storytelling/Story";

export default function GameLaunch() {
  const [selectedGame, setSelectedGame] = useState("story");

  const renderGame = () => {
    switch (selectedGame) {
      case "card":
        return <CardFlipGame />;
      case "word":
        return <WordGuess />;
      case "story":
      default:
        return <StoryViewer />;
    }
  };

  return (
    <div className="app-container">
      <div className="game-selector">
        <button
          className={selectedGame === "card" ? "active" : ""}
          onClick={() => setSelectedGame("card")}
        >
          Card Flip Game
        </button>
        <button
          className={selectedGame === "word" ? "active" : ""}
          onClick={() => setSelectedGame("word")}
        >
          Word Guess
        </button>
        <button
          className={selectedGame === "story" ? "active" : ""}
          onClick={() => setSelectedGame("story")}
        >
          Story Viewer
        </button>
      </div>

      <div className="game-view">{renderGame()}</div>
    </div>
  );
}
