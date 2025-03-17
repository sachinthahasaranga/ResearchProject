class DifficultyLevel {
    constructor(_id, difficultyName, difficultyWeight, status, createdAt, updatedAt) {
        this._id = _id;
        this.difficultyName = difficultyName;
        this.difficultyWeight = difficultyWeight;
        this.status = status;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }

    isActive() {
        return this.status === 1;
    }
}

export default DifficultyLevel;
