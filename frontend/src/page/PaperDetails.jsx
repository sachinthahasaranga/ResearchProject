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

      // Fetch Questions for each Question Title
      let questionsData = {};
      await Promise.all(
        questionTitleResponse.data.map(async (title) => {
          const questionResponse = await apiClient.get(
            `/api/questions/question-title/${title._id}`
          );
          questionsData[title._id] = questionResponse.data;
        })
      );

      setQuestions(questionsData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch paper details.");
      setLoading(false);
    }
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
                          <li key={question._id}>
                            <p>
                              <strong>Q{qIndex + 1}:</strong> {question.questionTitle}
                            </p>
                          </li>
                        ))
                      ) : (
                        <p>No questions available.</p>
                      )}
                    </ul>
                  </div>
                ))}
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
