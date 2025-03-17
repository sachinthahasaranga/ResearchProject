class QnAModel {
    constructor(_id, question, answer, createdAt, updatedAt) {
        this._id = _id;
        this.question = question;
        this.answer = answer;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}

export default QnAModel;
