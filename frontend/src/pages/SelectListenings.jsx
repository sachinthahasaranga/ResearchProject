import React from 'react';
import '../styles/SelectListenings.css'; // Import the CSS file for styling

const SelectListenings = () => {
  // Array of listening categories
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
        {listenings.map((listening) => (
          <div key={listening.id} className="listening-card">
            <img 
              src={`/images/listeningCard/${listening.id}.png`} 
              alt={listening.title} 
              className="listening-card-image"
            />
            <h2>{listening.title}</h2>
            <p>{listening.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectListenings;
