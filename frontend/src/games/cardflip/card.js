import React from "react";
import classnames from "classnames";

import "./card.scss";



const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled,image }) => {


  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={image} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <div className="card-word">{card.word}</div>
      </div>
    </div>
  );
};

export default Card;
