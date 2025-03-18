import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectListeningsPractise.css';

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

const SelectListeningsPractise = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const navigate = useNavigate();
  const [listenings, setListenings] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const randomBackgroundImageNumber = getRandomImageNumber(1, 6);

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

    axios
      .get(`http://localhost:3000/api/lstn/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (isMounted) {
          setListenings(response.data);
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

    axios
      .get('http://localhost:3000/api/difficulty-levels')
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

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

      <div className="difficulty-levels-section">
        <div className="difficulty-levels-list">
          {difficultyLevels.map((level) => {
            let className = "difficulty-level-card";
            if (level.difficultyName.toLowerCase() === "easy") {
              className += " easy";
            } else if (level.difficultyName.toLowerCase() === "medium") {
              className += " medium";
            } else if (level.difficultyName.toLowerCase() === "hard") {
              className += " hard";
            }

            return (
              <div key={level._id} className={className}>
                <h3>{level.difficultyName}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <div className="listening-cards-wrapper">
        {listenings.map((listening, index) => {
          const randomCardImageNumber = getRandomImageNumber(1, 10);

          return (
            <div
              key={listening._id}
              className="listening-card"
              style={{ background: getRandomGradient() }}
              onClick={() =>
                navigate('/listening', {
                  state: { listeningId: listening._id },
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
