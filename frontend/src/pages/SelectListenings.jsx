import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectListeningsPractise.css';
import config from '../config'

const getRandomGradient = () => {
  const colors = [
    'linear-gradient(to right, #ff9a9e, white)',
    'linear-gradient(to right, #fad0c4, white)',
    'linear-gradient(to right, #ffdde1, white)',
    'linear-gradient(to right, #c2e9fb, white)',
    'linear-gradient(to right, #fbc2eb, white)',
    'linear-gradient(to right, #a1c4fd, white)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to calculate threshold based on difficultyWeight
const getThreshold = (difficultyWeight) => {
  if (difficultyWeight === 1) return config.thresholds.easy;
  if (difficultyWeight === 1.2) return config.thresholds.medium;
  if (difficultyWeight === 1.5) return config.thresholds.hard;
  return config.thresholds.easy; // Default threshold
};
const SelectListeningsPractise = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const navigate = useNavigate();
  const [listenings, setListenings] = useState([]); // All listenings
  const [filteredListenings, setFilteredListenings] = useState([]); // Filtered listenings
  const [difficultyLevels, setDifficultyLevels] = useState([]); // Difficulty levels
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Selected difficulty level
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomBackgroundImageNumber, setRandomBackgroundImageNumber] = useState(1); // Store random background image number

  // Generate random background image number once when the component mounts
  useEffect(() => {
    setRandomBackgroundImageNumber(getRandomImageNumber(1, 6));
  }, []);

  // Fetch listenings and difficulty levels when the component mounts
  useEffect(() => {
    if (!categoryId) {
      setError('No category selected.');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Fetch listenings
    axios
      .get(`${config.BASE_URL}api/lstn/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (isMounted) {
          setListenings(response.data); // Store all listenings
          setFilteredListenings(response.data); // Initially, show all listenings
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching listenings:', error);
          setError('Failed to fetch listenings. Please try again.');
          setLoading(false);
        }
      });

    // Fetch difficulty levels
    axios
      .get(config.BASE_URL+'api/difficulty-levels')
      .then((response) => {
        if (isMounted) {
          setDifficultyLevels(response.data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching difficulty levels:', error);
          setError('Failed to fetch difficulty levels. Please try again.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Filter listenings based on selected difficulty level
  useEffect(() => {
    if (selectedDifficulty) {
      const filtered = listenings.filter(
        (listening) => listening.difficultyLevel._id === selectedDifficulty._id
      );
      setFilteredListenings(filtered);
    } else {
      setFilteredListenings(listenings); // Show all listenings if no difficulty is selected
    }
  }, [selectedDifficulty, listenings]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div
      className="listening-container"
      style={{
        backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`,
      }}
    >
      <h1>Select a Listening</h1>

      {/* Difficulty Levels Section */}
      {/* <div className="difficulty-levels-section">
        <div className="difficulty-levels-list">
          {difficultyLevels.map((level) => {
            let className = "difficulty-level-card";
            let stars = "";
            if (level.difficultyName.toLowerCase() === "easy") {
              className += " easy";
              stars = "/icons/star.png";
            } else if (level.difficultyName.toLowerCase() === "medium") {
              className += " medium";
              stars = "/icons/star.png /icons/star.png";
            } else if (level.difficultyName.toLowerCase() === "hard") {
              className += " hard";
              stars = "/icons/star.png /icons/star.png /icons/star.png /icons/star.png";
            }

            return (
              <div
                key={level._id}
                className={`${className} ${selectedDifficulty?._id === level._id ? 'selected' : ''}`}
                onClick={() => setSelectedDifficulty(level)} // Set selected difficulty
              >
                <h3>{level.difficultyName}</h3>
                <div className="difficulty-stars">
                  {stars.split(" ").map((src, index) => (
                    <img key={index} src={src} alt="star" className="star-icon" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Listenings Section */}
      <div className="listening-cards-wrapper">
        {filteredListenings.map((listening, index) => {
          const randomCardImageNumber = getRandomImageNumber(1, 10);

          // Calculate threshold based on difficultyWeight
          const threshold = getThreshold(listening.difficultyLevel.difficultyWeight);

          console.log(threshold)

          return (
            <div
              key={listening._id}
              className="listening-card"
              style={{ background: getRandomGradient() }}
              onClick={() =>
                navigate('/listening', {
                  state: { 
                    listeningId: listening._id,
                    threshold: threshold, // Pass the threshold value
                    isPractise: false
                  },
                })
              }
            >
              <div className="card-content">
                <div className="text-section">
                  <h2 className="card-number">{index + 1}.</h2>
                  <h2>{listening.name}</h2>
                </div>
                <div className="image-section">
                  <img
                    src={`/images/listeningCard/${randomCardImageNumber}.png`}
                    alt={`Listening ${randomCardImageNumber}`}
                  />
                </div>
              </div>
              <audio controls>
                <source src={listening.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectListeningsPractise;