import React from 'react';
import '../styles/SelectCategory.css'; // Import the CSS file for styling

const SelectCategory = () => {
  // Array of categories with background images
  const categories = [
    { id: 1, title: 'Finding Location', color: '#FF6B6B', description: 'This is the first category.', backgroundImage: 'images/listeningCategories/ironmanLocation.png' },
    { id: 2, title: 'Conversation', color: '#4ECDC4', description: 'This is the second category.', backgroundImage: 'images/listeningCategories/Conversation.png' },
    { id: 3, title: 'Voice Mail', color: '#FFE66D', description: 'This is the third category.', backgroundImage: 'images/listeningCategories/voiceMail.png' },
    { id: 4, title: 'Story Telling', color: '#FF9F1C', description: 'This is the fourth category.', backgroundImage: 'images/listeningCategories/storyTelling.png' },
    { id: 5, title: 'Giving Instructions', color: '#2EC4B6', description: 'This is the fifth category.', backgroundImage: 'images/listeningCategories/GivingInstructions.png' },
  ];

  return (
    <div>
      <h1 className="category-title">Select A Category</h1>
      <div className="category-container">
        <div className="cards-wrapper">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card"
              style={{
                backgroundColor: category.color,
                backgroundImage: `url(${category.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
