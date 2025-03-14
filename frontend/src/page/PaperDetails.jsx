import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";

const PaperDetails = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [questionTitles, setQuestionTitles] = useState([]);
  const [questions, setQuestions] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [studentAnswers, setStudentAnswers] = useState({});
  const [evaluationResults, setEvaluationResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaperDetails();
  }, [paperId]);

  const fetchPaperDetails = async () => {
    try {
      // Fetch Paper Details
      const paperResponse = await apiClient.get(`/api/papers/${paperId}`);
      setPaper(paperResponse.data);

      // Fetch Question Titles for the Paper
      const questionTitleResponse = await apiClient.get(
        `/api/question-titles/paper/${paperId}`
      );
      setQuestionTitles(questionTitleResponse.data);

      // Fetch Questions for each Question Title and store correct answers
      let questionsData = {};
      let correctAnswersData = {};

      await Promise.all(
        questionTitleResponse.data.map(async (title) => {
          const questionResponse = await apiClient.get(
            `/api/questions/question-title/${title._id}`
          );
          questionsData[title._id] = questionResponse.data;

          // Store correct answers mapped by question ID
          questionResponse.data.forEach((question) => {
            correctAnswersData[question._id] = question.answer.trim().toLowerCase();
          });
        })
      );

      setQuestions(questionsData);
      setCorrectAnswers(correctAnswersData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch paper details.");
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const submitAnswers = () => {
    let results = {};

    Object.keys(studentAnswers).forEach((questionId) => {
      const studentAnswer = studentAnswers[questionId]?.trim().toLowerCase();
      const correctAnswer = correctAnswers[questionId];

      results[questionId] = studentAnswer === correctAnswer;
    });

    setEvaluationResults(results);
  };

  return (
    <Fragment>
      <Header />
      <PageHeader title="Question Paper" curPage={"Paper Details"} />
      <div className="paper-section padding-tb section-bg">
        <div className="container">
          {loading ? (
            <p>Loading paper details...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="paper-content">
              {/* Paper Title & Details */}
              <div className="paper-header text-center">
                <h2>{paper.paperTitle}</h2>
                <p>
                  <strong>Recommended Age:</strong> {paper.recommendedAge} yrs |{" "}
                  <strong>Difficulty:</strong> {paper.difficultyLevel.difficultyName} |{" "}
                  <strong>Total Time:</strong> {paper.totalTime} mins
                </p>
              </div>

              {/* Questions Section */}
              <div className="question-section">
                {questionTitles.map((title, index) => (
                  <div key={title._id} className="question-title">
                    <h4 className="mt-4">
                      <strong>{index + 1}. {title.title} </strong> ({title.assignMarks} marks)
                    </h4>
                    <ul className="question-list">
                      {questions[title._id] && questions[title._id].length > 0 ? (
                        questions[title._id].map((question, qIndex) => (
                          <li key={question._id} className="mb-3">
                            <p>
                              <strong>Q{qIndex + 1}:</strong> {question.questionTitle}
                            </p>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your answer..."
                              value={studentAnswers[question._id] || ""}
                              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            />
                            {evaluationResults[question._id] !== undefined && (
                              <p className={evaluationResults[question._id] ? "text-success" : "text-danger"}>
                                {evaluationResults[question._id] ? "Correct ✅" : "Incorrect ❌"}
                              </p>
                            )}
                          </li>
                        ))
                      ) : (
                        <p>No questions available.</p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={submitAnswers}>
                  Submit Answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PaperDetails;
