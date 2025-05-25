import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";
import '../styles/SelectListeningsPractise.css';

// Utility functions
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

// Threshold configuration
const thresholds = {
  easy: 0.5,
  medium: 0.7,
  hard: 0.8
};

const getThreshold = (difficultyWeight = 1) => {
  switch (difficultyWeight) {
    case 1: return thresholds.easy;
    case 1.2: return thresholds.medium;
    case 1.5: return thresholds.hard;
    default: return thresholds.easy;
  }
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
  const [randomBackgroundImageNumber] = useState(getRandomImageNumber(1, 6));

  // Fetch data on component mount
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

    const fetchData = async () => {
      try {
        // Fetch listenings
        const listeningsResponse = await apiClient.get(`/api/lstn/category/${categoryId}`);
        // Fetch difficulty levels
        const difficultyResponse = await apiClient.get('/api/difficulty-levels');

        if (isMounted) {
          setListenings(listeningsResponse.data);
          setFilteredListenings(listeningsResponse.data);
          setDifficultyLevels(difficultyResponse.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setError(error.response?.data?.message || 'Failed to fetch data. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Filter listenings when difficulty changes
  useEffect(() => {
    if (!selectedDifficulty) {
      setFilteredListenings(listenings);
      return;
    }

    const filtered = listenings.filter(
      (listening) => listening.difficultyLevel?._id === selectedDifficulty._id
    );
    setFilteredListenings(filtered);
  }, [selectedDifficulty, listenings]);

  // Loading state
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <Header />
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Main render
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PageHeader title="Select Listening Practice" />
        
        <div
          className="listening-container"
          style={{
            backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`,
          }}
        >
          <h1>Select a Listening</h1>

          {/* Difficulty Levels Section */}
          <div className="difficulty-levels-section">
            <div className="difficulty-levels-list">
              {difficultyLevels.map((level) => {
                const starsCount = {
                  easy: 1,
                  medium: 2,
                  hard: 4
                }[level.difficultyName.toLowerCase()] || 0;

                return (
                  <div
                    key={level._id}
                    className={`difficulty-level-card ${level.difficultyName.toLowerCase()} ${
                      selectedDifficulty?._id === level._id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    <h3>{level.difficultyName}</h3>
                    <div className="difficulty-stars">
                      {Array(starsCount).fill().map((_, i) => (
                        <img key={i} src="/icons/star.png" alt="star" className="star-icon" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Listenings Section */}
          <div className="listening-cards-wrapper">
            {filteredListenings.map((listening, index) => {
              const randomCardImageNumber = getRandomImageNumber(1, 10);
              const threshold = getThreshold(listening.difficultyLevel?.difficultyWeight);

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
                        src={`/images/listeningCard/${randomCardImageNumber}.png`}
                        alt={`Listening ${randomCardImageNumber}`}
                        onError={(e) => {
                          e.target.src = '/images/default-listening.png';
                        }}
                      />
                    </div>
                  </div>
                
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectListeningsPractise;