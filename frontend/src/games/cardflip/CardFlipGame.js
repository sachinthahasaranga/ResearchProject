import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@mui/material";
import Card from "./card";
import "../../assets/sass/app.scss";
import wordListData from "../data/common.json";
import star from "../../assets/images/game-images/star_image.png";
import corn from "../../assets/images/game-images/9512682.jpg";
import chili from "../../assets/images/game-images/9512686.jpg";
import beatroot from "../../assets/images/game-images/9512694.jpg";
import ball from "../../assets/images/game-images/9512673.jpg";

const NUM_UNIQUE_WORDS = 6;

  const images = [corn, chili, beatroot, ball,star];



  function generateImage(){
    const images = [corn, chili, beatroot, ball, star];
    return images[Math.floor(Math.random() * images.length)];
  }

function getRandomWords(wordArray, count) {
  if (!Array.isArray(wordArray)) {
    console.error("Invalid word array passed:", wordArray);
    return [];
  }

  const shuffled = [...wordArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((word) => ({ word }));
}

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function CardFlipGame() {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);
   const [randomImage, setRandomImage] = useState(generateImage());



  useEffect(() => {
   if (wordListData?.commonWords?.length >= NUM_UNIQUE_WORDS) {
    const selectedWords = getRandomWords(wordListData.commonWords, NUM_UNIQUE_WORDS);
    setCards(shuffleCards(selectedWords.concat(selectedWords)));
  }
  }, []);

  const disable = () => setShouldDisableAllCards(true);
  const enable = () => setShouldDisableAllCards(false);

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === NUM_UNIQUE_WORDS) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };



  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].word === cards[second].word) {
      setClearedCards((prev) => ({ ...prev, [cards[first].word]: true }));
      setOpenCards([]);
    } else {
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    }
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 300);
    }
    return () => clearTimeout(timeout.current);
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(clearedCards[card.word]);

  const handleRestart = () => {
    const source = wordListData.commonWords || [];
    const selectedWords = getRandomWords(source, NUM_UNIQUE_WORDS);
  
    setCards(shuffleCards(selectedWords.concat(selectedWords)));
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
  };

  return (
    <div className="App">
      <header style={{marginBottom: "50px",marginTop: "50px"}}>
        <h3>Vocabulary Match Game</h3>
        <p>Select two cards with the same word to match them.</p>
      </header>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          setRandomImage(generateImage());
        }}
      >
        Change Image
      </Button>
      <div className="container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(card)}
            isFlipped={checkIsFlipped(index)}
            onClick={handleCardClick}
            image={randomImage}
          />
        ))}
      </div>
      <footer>
        <div className="score" style={{color: "grey"}}>
          <div><b>Moves:</b> {moves}</div>
          <div><b>Best Score:</b> {bestScore}</div>
        </div>
        <Button onClick={handleRestart} variant="contained" color="primary">
          Restart
        </Button>
      </footer>
      <Dialog open={showModal} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>🎉 Great Job!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You completed the game in {moves} moves. Your best score is {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
