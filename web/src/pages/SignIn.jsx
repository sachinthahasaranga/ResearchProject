import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usersService from '../services/Users.service';
import EventEmitter from '../utils/EventEmitter';
import Notiflix from 'notiflix';
import './form.css'
import Footer from '../components/footer/Footer';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if(username==='admin'&&password==='admin123'){
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'Admin');
      localStorage.setItem('id', 'admmin123');
      localStorage.setItem('avatar', 'https://cdn-icons-png.flaticon.com/512/1533/1533506.png');
      EventEmitter.emit("loginCompleted", {logged: true});
      navigate('/')
      window.location.reload();
    } else {
      await usersService.getUserByUsername(username, password).then((data) => {
        if(data===true){
          Notiflix.Report.success(
            'Success',
            'Login Successful',
            'Okay',
          );
          navigate('/')
          window.location.reload();
        } else {
          Notiflix.Report.failure(
            'Login Failed',
            'Credentials are wrong or account is temporary blocked try again.',
            'Okay',
          );
          return;
        }
        
      })
    }
    
    
  };

  return (
    <>
    <div className='form-body'>
    <div className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md container form-container">
      <div className='image-container text-center'>
              <img src={process.env.PUBLIC_URL+'/images/logo-em.png'} height={60} alt='background' />
              <span className='custom-title'>E-Learning</span>
      </div>
      <br/><br/>
      <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
      <form>
        <div className="mb-6">
          
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Sign In to your created Account
          </label>
          <br /><br/>
          <div className="mt-1">
            <div className="flex rounded-md shadow-sm">
              
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="your username eg: hashmax321"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="mt-1">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div>
            <Link to="/forgot-password" className="custom-link">
              Forgot your password?
            </Link>
          </div>
        </div>
        <br/>
        <div className='text-center'>
          <button
            type="button"
            onClick={handleSignIn}
            className="custom-button"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/sign-up" className="custom-link">
          Sign Up
        </Link>
      </p>
    </div>
    
    </div>
    <Footer />
    </>
  );
};

export default SignIn;
