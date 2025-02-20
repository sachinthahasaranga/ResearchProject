import React from 'react';
import '../styles/SelectCategory.css'; // Import the CSS file for styling
import location from "../assets/listeningCategories/ironmanLocation.png"

const SelectCategory = () => {
  // Array of 10 categories with the same background image
  const categories = [
    { id: 1, title: 'Finding Location', color: '#FF6B6B', description: 'This is the first category.', backgroundImage: 'images/listeningCategories/ironmanLocation.png' },
    { id: 2, title: 'Category 2', color: '#4ECDC4', description: 'This is the second category.', backgroundImage: 'images/listeningCategories/ironmanLocation.png' },
    { id: 3, title: 'Category 3', color: '#FFE66D', description: 'This is the third category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 4, title: 'Category 4', color: '#FF9F1C', description: 'This is the fourth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 5, title: 'Category 5', color: '#2EC4B6', description: 'This is the fifth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 6, title: 'Category 6', color: '#E71D36', description: 'This is the sixth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 7, title: 'Category 7', color: '#662E9B', description: 'This is the seventh category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 8, title: 'Category 8', color: '#F4A261', description: 'This is the eighth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 9, title: 'Category 9', color: '#2A9D8F', description: 'This is the ninth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
    { id: 10, title: 'Category 10', color: '#E76F51', description: 'This is the tenth category.', backgroundImage: '../assets/listeningCategories/ironmanLocation.png' },
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