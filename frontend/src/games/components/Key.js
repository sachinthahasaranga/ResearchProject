import React, { useContext } from "react";
import { AppContext } from "../../games/wordguess/WordGuess";

function Key({ keyVal, bigKey, disabled }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      //id={bigKey ? "big" : disabled && "disabled"}
      id={bigKey ? "big" : (disabled ? "disabled" : undefined)}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
