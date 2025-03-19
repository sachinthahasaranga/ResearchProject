import { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import Swal from "sweetalert2";

const PaperDetails = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [questionTitles, setQuestionTitles] = useState([]);
  const [questions, setQuestions] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [studentAnswers, setStudentAnswers] = useState({});
  const [evaluationResults, setEvaluationResults] = useState({});
  const [totalCorrectMarks, setTotalCorrectMarks] = useState(0);
  const [convertedMarks, setConvertedMarks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const hasFetched = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchPaperDetails();
  }, [paperId]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true; 
    checkAndUpdateStudentPerformance();
  }, [userId]);

  useEffect(() => {
    if (paper && paper.totalTime && !isSubmitted) {
      setTimeLeft(paper.totalTime * 60); 
    }
  }, [paper]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitted) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          submitAnswers();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isSubmitted]);

  const checkAndUpdateStudentPerformance = async () => {
    if (!userId) {
        console.error("User ID is missing");
        return;
    }

    try {
        const response = await apiClient.get(`/api/student-performance/user/${userId}`);
        if (!response.data) {
            console.log("Creating new student performance record...");
            await apiClient.post("/api/student-performance", {
                userId,
                totalStudyTime: 0,
                resourceScore: 0,
                totalScore: 0,
                paperCount: 0,
            });
        }
    } catch (error) {
        console.error("Error checking/updating student performance:", error);
    }
  };

  const fetchPaperDetails = async () => {
    try {
      const paperResponse = await apiClient.get(`/api/papers/${paperId}`);
      setPaper(paperResponse.data);

      const questionTitleResponse = await apiClient.get(
        `/api/question-titles/paper/${paperId}`
      );
      setQuestionTitles(questionTitleResponse.data);

      let questionsData = {};
      let correctAnswersData = {};

      await Promise.all(
        questionTitleResponse.data.map(async (title) => {
          const questionResponse = await apiClient.get(
            `/api/questions/question-title/${title._id}`
          );
          questionsData[title._id] = questionResponse.data;

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
    if (isSubmitted) return;
    clearInterval(timerRef.current);

    let results = {};
    let totalCorrectMarks = 0;
    let totalQuestions = 0;

    questionTitles.forEach((title) => {
        const titleId = title._id;
        const totalTitleQuestions = questions[titleId] ? questions[titleId].length : 0;
        const maxMarks = title.assignMarks;

        if (totalTitleQuestions > 0) {
            const marksPerQuestion = maxMarks / totalTitleQuestions;
            let titleCorrectMarks = 0;

            questions[titleId].forEach((question) => {
                const questionId = question._id;
                const studentAnswer = studentAnswers[questionId]?.trim().toLowerCase();
                const correctAnswer = correctAnswers[questionId];

                if (studentAnswer === correctAnswer) {
                    results[questionId] = true;
                    titleCorrectMarks += marksPerQuestion;
                } else {
                    results[questionId] = false;
                }
            });

            totalCorrectMarks += titleCorrectMarks;
            totalQuestions += totalTitleQuestions;
        }
    });

    // Convert correct marks to percentage and apply difficulty weight
    //const correctScorePercentage = totalQuestions > 0 ? totalCorrectMarks / 100 : 0;
    const correctScorePercentage = totalQuestions > 0 ? totalCorrectMarks : 0;
    const finalConvertedMarks = correctScorePercentage * paper.difficultyLevel.difficultyWeight;

    setEvaluationResults(results);
    setTotalCorrectMarks(totalCorrectMarks.toFixed(2));
    setConvertedMarks(finalConvertedMarks.toFixed(2));

    updateStudentPerformance(finalConvertedMarks);
    setIsSubmitted(true);
};

const updateStudentPerformance = async (convertedMarks) => {
    if (!userId) {
        console.error("User ID is missing");
        return;
    }

    try {
        const response = await apiClient.get(`/api/student-performance/user/${userId}`);

        if (response.data) {
            const studentPerformance = response.data;

            await apiClient.put(`/api/student-performance/user/${userId}`, {
                totalStudyTime: studentPerformance.totalStudyTime,
                resourceScore: studentPerformance.resourceScore,
                totalScore: studentPerformance.totalScore + parseFloat(convertedMarks),
                paperCount: studentPerformance.paperCount + 1,
            });

            Swal.fire({
                title: "Success!",
                text: `Your score has been updated! Total Score: ${(studentPerformance.totalScore + parseFloat(convertedMarks)).toFixed(2)}`,
                icon: "success",
                confirmButtonText: "OK",
            });

            console.log(`Updated Study score: ${studentPerformance.totalScore + parseFloat(convertedMarks)}`);
        } else {
            console.log("No existing record found. Creating new student performance record...");
            await apiClient.post("/api/student-performance", {
                userId,
                totalStudyTime: 0,
                resourceScore: 0,
                totalScore: parseFloat(convertedMarks),
                paperCount: 1,
            });

            Swal.fire({
                title: "Success!",
                text: `New record created. Your initial score is: ${convertedMarks}`,
                icon: "success",
                confirmButtonText: "OK",
            });

            console.log(`Created new record with study score: ${convertedMarks}`);
        }
    } catch (error) {
        console.error("Error updating student performance:", error);

        Swal.fire({
            title: "Error!",
            text: "There was an issue updating your score. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
}

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
              <div className="text-center">
                <h4>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h4>
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

              {/* Submit Button & Score Details */}
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={submitAnswers} disabled={isSubmitted}>
                  {isSubmitted ? "Submitted" : "Submit Answers"}
                </button>
                {totalCorrectMarks > 0 && (
                  <div className="mt-3">
                    <h4 className="text-success">
                      Total Correct Marks: {totalCorrectMarks}
                    </h4>
                    <h4 className="text-primary">
                      Converted Marks (Difficulty Adjusted): {convertedMarks}
                    </h4>
                  </div>
                )}
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
