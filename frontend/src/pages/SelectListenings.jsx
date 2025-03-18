import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectListenings.css';

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

const SelectListenings = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const navigate = useNavigate();
  const [listenings, setListenings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const randomBackgroundImageNumber = getRandomImageNumber(1, 6);

  // Fetch the list of listenings when the component mounts
  useEffect(() => {
    if (!categoryId) {
      setError('No category selected.');
      setLoading(false); // Stop loading if no categoryId
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false); // Stop loading if no token
      return;
    }

    let isMounted = true; // Add a flag to track if the component is mounted

    axios
      .get(`http://localhost:3000/api/lstn/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (isMounted) {
          setListenings(response.data); // Store the fetched data in the state
          setLoading(false); // Stop loading after data is fetched
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching listenings:', error);
          setError('Failed to fetch listenings. Please try again.');
          setLoading(false); // Stop loading on error
        }
      });

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [categoryId]);

  // Show nothing until data is fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="listening-container"
      style={{
        backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`,
      }}
    >
      <h1>Select a Listening</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
                  state: { listeningId: listening._id }, // Pass only the listening ID
                })
              }
            >
              <div className="card-content">
                <div className="text-section">
                  {/* Display the number in front of the name */}
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

export default SelectListenings;