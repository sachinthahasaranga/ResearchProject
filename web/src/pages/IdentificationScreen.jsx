import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import './form.css';
import Footer from '../components/footer/Footer';

const IdentificationScreen = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleFaceIdentification = async () => {
    if (!username) {
      Notiflix.Report.failure(
        'Identification Failed',
        'Username is required',
        'Okay'
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/face-identification/recognize', {
        username,
      });

      const { detected } = response.data;

      if (detected) {
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'Admin');
      localStorage.setItem('id', 'admmin123');
      localStorage.setItem('avatar', 'https://cdn-icons-png.flaticon.com/512/1533/1533506.png');
        Notiflix.Report.success(
          'Success',
          'Face Identification Successful',
          'Okay',
          () => navigate('/')
        );
      } else {
        Notiflix.Report.failure(
          'Identification Failed',
          'Face not detected. Please try again.',
          'Okay'
        );
      }
    } catch (error) {
      console.error('Error during face identification:', error);
      Notiflix.Report.failure(
        'Identification Failed',
        error.response?.data?.detail || 'An error occurred. Please try again.',
        'Okay'
      );
    }
  };

  return (
    <>
      <div className="form-body">
        <div className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md container form-container">
          <div className="image-container text-center">
            <img
              src={process.env.PUBLIC_URL + '/images/logo-em.png'}
              height={60}
              alt="background"
            />
            <span className="custom-title">E-Learning</span>
          </div>
          <br />
          <br />
          <h1 className="text-3xl font-semibold mb-6">Face Identification</h1>
          <form>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your Username
              </label>
              <br />
              <br />
              <div className="mt-1">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleFaceIdentification}
                className="custom-button"
              >
                Face Identification
              </button>
              <p className="mt-4 text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/sign-up" className="custom-link">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IdentificationScreen;
