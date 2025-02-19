import React from 'react';
import '../styles/SelectCategory.css'; // Import the CSS file for styling

const SelectCategory = () => {
  // Array of 10 categories with unique background colors
  const categories = [
    { id: 1, title: 'Category 1', color: '#FF6B6B', description: 'This is the first category.' },
    { id: 2, title: 'Category 2', color: '#4ECDC4', description: 'This is the second category.' },
    { id: 3, title: 'Category 3', color: '#FFE66D', description: 'This is the third category.' },
    { id: 4, title: 'Category 4', color: '#FF9F1C', description: 'This is the fourth category.' },
    { id: 5, title: 'Category 5', color: '#2EC4B6', description: 'This is the fifth category.' },
    { id: 6, title: 'Category 6', color: '#E71D36', description: 'This is the sixth category.' },
    { id: 7, title: 'Category 7', color: '#662E9B', description: 'This is the seventh category.' },
    { id: 8, title: 'Category 8', color: '#F4A261', description: 'This is the eighth category.' },
    { id: 9, title: 'Category 9', color: '#2A9D8F', description: 'This is the ninth category.' },
    { id: 10, title: 'Category 10', color: '#E76F51', description: 'This is the tenth category.' },
  ];

  return (
    <div className="category-container">
      <div className="cards-wrapper">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card"
            style={{ backgroundColor: category.color }}
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