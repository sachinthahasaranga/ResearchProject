import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../component/layout/header";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import apiClient from '../api';
import "../assets/css/LatestCourse.css";
import '../styles/SelectListeningsPractise.css';

// No filtering!
const FILTER_BY_DIFFICULTY = false;

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

          {/* Filter bar is removed entirely */}

          <div className="listening-cards-wrapper">
            {listenings.length === 0 && !loading ? (
              <div style={{ textAlign: 'center', width: '100%', color: '#666', padding: '40px' }}>
                No listenings found in this category.
              </div>
            ) : (
              listenings.map((listening, index) => (
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

export default SelectListenings;
