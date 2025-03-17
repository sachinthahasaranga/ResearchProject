import DifficultyLevel from './difficultyLevel'; // Import the DifficultyLevel model
import QnAModel from './QnAModel'; // Import the QnAModel

class Listening {
    constructor(data) {
        this._id = data._id || null; // MongoDB ID
        this.name = data.name || ''; // Name of the listening
        this.audio = data.audio || ''; // Audio file path or URL
        this.difficultyLevel = new DifficultyLevel(
            data.difficultyLevel._id,
            data.difficultyLevel.difficultyName,
            data.difficultyLevel.difficultyWeight,
            data.difficultyLevel.status,
            data.difficultyLevel.createdAt,
            data.difficultyLevel.updatedAt
        ); // DifficultyLevel instance
        this.mainSession = data.mainSession || false; // Boolean for main session
        this.QnA = data.QnA.map(
            qna => new QnAModel(
                qna._id,
                qna.question,
                qna.answer,
                qna.createdAt,
                qna.updatedAt
            )
        ); // Array of QnAModel instances
        this.category = new Category(
            data.category._id,
            data.category.categoryName,
            data.category.callingName,
            data.category.description,
            data.category.backgroundImage,
            data.category.createdAt,
            data.category.updatedAt
        ); // Category instance
        this.createdAt = data.createdAt ? new Date(data.createdAt) : null; // Timestamp for creation
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null; // Timestamp for last update
    }

    // Optional: Add methods to validate or manipulate data
    isValid() {
        return (
            this.name &&
            this.audio &&
            this.difficultyLevel &&
            this.mainSession !== undefined &&
            this.QnA.length > 0 &&
            this.category
        );
    }
}

export default Listening; // Export the Listening class for use in other files