const env = {
    SERVER_URL: 'http://localhost:5000',
    ML_URL: 'http://localhost:8000',
    SUBJECTS:  [
        "English", "Mathematics", "Science", "History", "Geography", "Physical Education", 
        "Computer Science", "Biology", "Chemistry", "Physics", "Literature", "Art", 
        "Music", "Economics", "Foreign Language", "Psychology", "Sociology", 
        "Political Science", "Philosophy", "Engineering", "Business", "Health Education", 
        "Religious Studies", "Environmental Science", "Statistics"
    ],
    METHODS: [
        { type: "Study", color: "#6997c7" },
        { type: "Memorizing", color: "#69cf7c" },
        { type: "Reading", color: "#FF5733" },
        { type: "Highlighting", color: "#FFC300" },
        { type: "Taking Notes", color: "#db0f4a" },
        { type: "Mind Mapping", color: "#FFC3E2" },
        { type: "Summarizing", color: "#F7DC6F" },
        { type: "Group Study", color: "#82E0AA" },
        { type: "Flashcards", color: "#85C1E9" },
        { type: "Problem Solving", color: "#82E0AA" },
        { type: "Teaching Others", color: "#D7BDE2" },
        { type: "Online Courses", color: "#C39BD3" },
        { type: "Watching Videos", color: "#AED6F1" },
        { type: "Practice Tests", color: "#FAD7A0" },
        { type: "Discussion Forums", color: "#D7DBDD" },
        { type: "Experimentation", color: "#D6EAF8" },
        { type: "Audio Learning", color: "#D5DBDB" },
        { type: "Visualization", color: "#BB8FCE" },
        { type: "Drawing Diagrams", color: "#F9E79F" },
        { type: "Coding", color: "#F5B7B1" },
        { type: "Collaborative Tools", color: "#F0E68C" },
        { type: "Outdoor Learning", color: "#D2B4DE" },
        { type: "Peer Review", color: "#ABEBC6" },
        { type: "Reflective Journaling", color: "#D7DBDD" },
        { type: "Gamification", color: "#FAD7A0" },
        { type: "Simulations", color: "#F9E79F" }
    ]
}

export default env