import React, { useState } from "react";
import storiesData from "../data/standardized_stories.json";
import "./Story.css"; 



const StoryViewer = () => {
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const story = storiesData.stories.find(s => s.id === selectedStoryId);
  const currentNode = story?.nodes.find(n => n.id === currentNodeId);

  const handleSelectStory = (id) => {
    const story = storiesData.stories.find(s => s.id === id);
    setSelectedStoryId(id);
    setCurrentNodeId(story.startNodeId);
  };

  const handleChoiceClick = (nextId) => {
    setCurrentNodeId(nextId);
  };

  return (
    <div className="story-page">
    <div className="story-container">
      {!selectedStoryId ? (
        <>
          <h2 className="story-title">Select a Story</h2>
           
          {storiesData.stories.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectStory(s.id)}
              className="story-button"
              style={{marginRight:'20px'}}
            >
              {s.title}
            </button>
          ))}
        </>
      ) : (
        <>
          <h2 className="story-title">{story.title}</h2>
            {currentNode?.image && (
                <img src={currentNode.image} style={{height:'400px',width:'auto'}} alt="" className="story-image" />
            )}
          <p className="story-text">{currentNode.text}</p>
          {currentNode.choices ? (
            currentNode.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceClick(choice.nextId)}
                className="story-button"
                style={{marginRight:'20px'}}
              >
                {choice.text}
              </button>
            ))
          ) : (
            <>
              <p className="the-end">THE END</p>
              <button
                className="story-button"
                onClick={() => setSelectedStoryId(null)}
              >
                Back to Story List
              </button>
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default StoryViewer;
