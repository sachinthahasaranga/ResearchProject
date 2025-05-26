import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../component/layout/header";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import apiClient from '../api';
import "../assets/css/LatestCourse.css";
import '../styles/SelectListeningsPractise.css';

// Enable this flag to filter by difficulty level (using numeric value)
const FILTER_BY_DIFFICULTY = true;

// Map numeric difficultyLevel to readable name and "stars"
const DIFFICULTY_LIST = [
  { value: 1, label: "Easy", stars: 1 },
  { value: 1.2, label: "Medium", stars: 2 },
  { value: 1.5, label: "Hard", stars: 4 },
];

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
  const [filteredListenings, setFilteredListenings] = useState([]);
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
      .catch(() => {
        if (isMounted) {
          setError('Failed to fetch listenings. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  useEffect(() => {
    if (FILTER_BY_DIFFICULTY && selectedDifficulty !== null) {
      // Use == instead of === for easier comparison of numbers/strings
      const filtered = listenings.filter(
        (listening) => listening.difficultyLevel == selectedDifficulty
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
        <div className="listening-main-content">
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

          {/* Show difficulty filter bar */}
          {FILTER_BY_DIFFICULTY && (
            <div className="difficulty-levels-section">
              <div className="difficulty-levels-list">
                {DIFFICULTY_LIST.map((level) => (
                  <div
                    key={level.value}
                    className={
                      "difficulty-level-card" +
                      (selectedDifficulty === level.value ? " selected" : "") +
                      (level.label === "Easy"
                        ? " easy"
                        : level.label === "Medium"
                        ? " medium"
                        : level.label === "Hard"
                        ? " hard"
                        : "")
                    }
                    onClick={() => setSelectedDifficulty(level.value)}
                  >
                    <h3>{level.label}</h3>
                    <div className="difficulty-stars">
                      {[...Array(level.stars)].map((_, i) => (
                        <img
                          key={i}
                          src="/icons/star.png"
                          alt="star"
                          className="star-icon"
                        />
                      ))}
                    </div>
                  </div>
                ))}
                {/* All difficulties button */}
                <div
                  className={
                    "difficulty-level-card" +
                    (selectedDifficulty === null ? " selected" : "")
                  }
                  style={{ minWidth: 50, opacity: 0.75 }}
                  onClick={() => setSelectedDifficulty(null)}
                >
                  <h3>All</h3>
                </div>
              </div>
            </div>
          )}

          <div className="listening-cards-wrapper">
            {filteredListenings.length === 0 && !loading ? (
              <div style={{ textAlign: 'center', width: '100%', color: '#666', padding: '40px' }}>
                No listenings found in this category.
              </div>
            ) : (
              filteredListenings.map((listening, index) => (
                <div
                  key={listening._id}
                  className="listening-card"
                  style={{ background: getRandomGradient() }}
                  onClick={() =>
                    navigate('/listening', {
                      state: {
                        listeningId: listening._id,
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
                  {/* <audio controls>
                    <source src={listening.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio> */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectListeningsPractise;
