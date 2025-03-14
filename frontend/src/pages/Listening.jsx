import React from 'react';

// Helper function to get a random number between min and max
const getRandomImageNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generates a random number between min and max
};

const Listening = () => {
  // Randomly select background image number between 1 and 6
  const randomBackgroundImageNumber = getRandomImageNumber(1, 6);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh', // Ensure full viewport height
        width: '100vw',  // Ensure full viewport width
        backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`,
        backgroundSize: 'cover', // Ensures the background covers the entire container
        backgroundPosition: 'center center', // Centers the background image
        backgroundRepeat: 'no-repeat', // Prevents repetition of the background
        backgroundAttachment: 'fixed', // Keeps the background fixed while scrolling
        position: 'absolute', // To cover the entire viewport
        top: 0,
        left: 0,
      }}
    >
      {/* Dark overlay */}
      <div
        className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.5 }}
      ></div>

      {/* Title */}
      <h1 className="text-white text-center position-sticky top-0 w-100 p-3 bg-dark bg-opacity-50" style={{ zIndex: 1 }}>
        Listening Page
      </h1>

      {/* Content */}
      <div className="text-center text-white mt-5" style={{ zIndex: 1 }}>
        <p className="fs-4">Content for the Listening page will go here!</p>
      </div>
    </div>
  );
};

export default Listening;
