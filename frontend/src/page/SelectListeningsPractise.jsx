import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../component/layout/header";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import apiClient from '../api';
import "../assets/css/LatestCourse.css";
import '../styles/SelectListeningsPractise.css';

const thresholds = {
  easy: 0.5,
  medium: 0.7,
  hard: 0.8
};

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

const getThreshold = (difficultyWeight) => {
  if (difficultyWeight === 1) return thresholds.easy;
  if (difficultyWeight === 1.2) return thresholds.medium;
  if (difficultyWeight === 1.5) return thresholds.hard;
  return thresholds.easy;
};

const SelectListeningsPractise = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const navigate = useNavigate();
  const [listenings, setListenings] = useState([]);
  const [filteredListenings, setFilteredListenings] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomBackgroundImageNumber, setRandomBackgroundImageNumber] = useState(1);

  useEffect(() => {
    setRandomBackgroundImageNumber(getRandomImageNumber(1, 6));
  }, []);

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

    apiClient
      .get(`/api/lstn/category/${categoryId}`)
      .then((response) => {
        if (isMounted) {
          setListenings(response.data);
          setFilteredListenings(response.data);
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

    apiClient
      .get('/api/difficulty-levels')
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

  useEffect(() => {
    if (selectedDifficulty) {
      const filtered = listenings.filter(
        (listening) => listening.difficultyLevel?._id === selectedDifficulty._id
      );
      setFilteredListenings(filtered);
    } else {
      setFilteredListenings(listenings);
    }
  }, [selectedDifficulty, listenings]);

  return (
    <>
      <Header />
      <PageHeader title="Select a Listening" />
      <div
        className="listening-container"
        style={{
          backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`,
        }}
      >
        {loading && (
          <div className="loading-spinner-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <p className="error-message">{error}</p>
        )}

        <div className="difficulty-levels-section">
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
                  onClick={() => setSelectedDifficulty(level)}
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
        </div>
        <div className="listening-cards-wrapper">
          {filteredListenings.map((listening, index) => {
            // Skip cards with missing difficultyLevel or difficultyWeight
            const difficultyWeight = listening.difficultyLevel?.difficultyWeight;
            if (difficultyWeight === undefined || difficultyWeight === null) return null;
            const threshold = getThreshold(difficultyWeight);
            return (
              <div
                key={listening._id}
                className="listening-card"
                style={{ background: getRandomGradient() }}
                onClick={() =>
                  navigate('/listening', {
                    state: {
                      listeningId: listening._id,
                      threshold: threshold,
                      isPractise: true
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
                      src={`/images/listeningCard/${getRandomImageNumber(1, 10)}.png`}
                      alt={`Listening`}
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
      <Footer />
    </>
  );
};

export default SelectListeningsPractise;
