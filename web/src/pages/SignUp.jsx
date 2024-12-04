import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import EventEmitter from '../utils/EventEmitter';
import Footer from '../components/footer/Footer';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Notiflix.Report.failure(
        'Registration Failed',
        'All fields are required',
        'Okay'
      );
      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Report.failure(
        'Registration Failed',
        'Passwords do not match',
        'Okay'
      );
      return;
    }

    try {
      // Step 1: Upload Avatar with Renamed File
      let avatarUrl = null;
      if (avatar) {
        const fileExtension = avatar.name.split('.').pop(); // Get the file extension
        const renamedFile = new File(
          [avatar],
          `${username}.${fileExtension}`,
          { type: avatar.type }
        );

        const formData = new FormData();
        formData.append('file', renamedFile);

        const uploadResponse = await axios.post(
          'http://localhost:8000/face-identification/upload',
          formData
        );

        avatarUrl = uploadResponse.data.file_path;
      }

      // Step 2: Create User
      const userPayload = {
        username,
        email,
        password,
        role: 'Student',
        avatar: avatarUrl || 'default_avatar_url_here',
      };

      await axios.post('http://localhost:8000/users', userPayload);

      Notiflix.Report.success(
        'Success',
        'Registration Successful',
        'Okay',
        () => {
          localStorage.setItem('username', username);
          localStorage.setItem('role', 'Student');
          EventEmitter.emit('loginCompleted', { logged: true });
          navigate('/sign-in');
        }
      );
    } catch (error) {
      console.error('Registration Error:', error);
      Notiflix.Report.failure(
        'Registration Failed',
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
          <h1 className="text-3xl font-semibold mb-6">Sign Up</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Create Your Free Account
          </label>

          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              placeholder="Retype Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <button className="custom-button" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="custom-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
