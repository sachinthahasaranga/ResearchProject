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

const getRandomImageNumber = () => {
  return Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
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

  return (
    <div className="listening-container">
      <h1>Select a Listening</h1>
      <div className="listening-cards-wrapper">
        {listenings.map((listening) => {
          const randomImageNumber = getRandomImageNumber(); // Generate a random image number for each card

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
                    src={`/images/listeningCard/${randomImageNumber}.png`}
                    alt={`Listening ${randomImageNumber}`}
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
