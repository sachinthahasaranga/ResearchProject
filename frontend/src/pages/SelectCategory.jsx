import React from 'react';
import '../styles/SelectCategory.css'; // Import the CSS file for styling
import location from "../assets/listeningCategories/ironmanLocation.png"

const SelectCategory = () => {
  // Array of 10 categories with the same background image
  const categories = [
    { id: 1, title: 'Finding Location', color: '#FF6B6B', description: 'This is the first category.', backgroundImage: 'images/listeningCategories/ironmanLocation.png' },
    { id: 2, title: 'Conversation', color: '#4ECDC4', description: 'This is the second category.', backgroundImage: 'images/listeningCategories/Conversation.png' },
    { id: 3, title: 'Voice Mail', color: '#FFE66D', description: 'This is the third category.', backgroundImage: 'images/listeningCategories/voiceMail.png' },
    { id: 4, title: 'Story telling', color: '#FF9F1C', description: 'This is the fourth category.', backgroundImage: 'images/listeningCategories/storyTelling.png' },
    { id: 5, title: 'Giving Instructions', color: '#2EC4B6', description: 'This is the fifth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
   
  ];

  return (
    <div className="category-container">
      <div className="cards-wrapper">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card"
            style={{
              backgroundColor: category.color,
              backgroundImage: `url(${category.backgroundImage})`, // Add background image
              backgroundSize: 'cover', // Ensure the image covers the card
              backgroundPosition: 'center', // Center the image
            }}
          >
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;