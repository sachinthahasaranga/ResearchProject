import React from 'react';
import '../styles/SelectListenings.css'; // Import the CSS file for styling

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
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generates a random number between min and max
};

const SelectListenings = () => {
  const listenings = [
    { id: 1, title: 'Listening 1', description: 'Description for listening 1' },
    { id: 2, title: 'Listening 2', description: 'Description for listening 2' },
    { id: 3, title: 'Listening 3', description: 'Description for listening 3' },
    { id: 4, title: 'Listening 4', description: 'Description for listening 4' },
    { id: 5, title: 'Listening 5', description: 'Description for listening 5' },
    { id: 6, title: 'Listening 6', description: 'Description for listening 6' },
  ];

  const randomBackgroundImageNumber = getRandomImageNumber(1, 6); // Get a random background image number between 1 and 6

  return (
    <div
      className="listening-container"
      style={{
        backgroundImage: `url('/images/background/bg${randomBackgroundImageNumber}.png')`, // Dynamically set background image
      }}
    >
      <h1>Select a Listening</h1>
      <div className="listening-cards-wrapper">
        {listenings.map((listening) => {
          const randomCardImageNumber = getRandomImageNumber(1, 10); // Generate a random number for each card image between 1 and 10

          return (
            <div
              key={listening.id}
              className="listening-card"
              style={{ background: getRandomGradient() }}
            >
              <div className="card-content">
                <div className="text-section">
                  <h2>{listening.title}</h2>
                  <p>{listening.description}</p>
                </div>
                <div className="image-section">
                  <img
                    src={`/images/listeningCard/${randomCardImageNumber}.png`}
                    alt={`Listening ${randomCardImageNumber}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectListenings;
