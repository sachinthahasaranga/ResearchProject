import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import "../styles/ListeningResult.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import apiClient from "../api";
import axios from "axios";
import Swal from "sweetalert2";

const getRandomImageNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


const ListeningResult = () => {

    const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
    const [isResultContainerVisible, setIsResultContainerVisible] = useState(false);
    const [activeResult, setActiveResult] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { responses: initialResponses, isPractise, threshold, categoryId } = location.state || {};
    const [responses, setResponses] = useState([]);
    const containerRef = useRef(null);
    const THRESHOLD = threshold;
    const userId = localStorage.getItem("userId");
    const hasFetched = useRef(false);

    useEffect(() => {
        setBackgroundImageNumber(getRandomImageNumber(1, 6));
        setIsResultContainerVisible(true);

        if (initialResponses) {
            const updatedResponses = initialResponses.map(async (response) => {
                try {
                    const apiResponse = await axios.post('http://127.0.0.1:5000/cosine-similarity', {
                        word1: [response.answer],
                        word2: [response.studentsAnswer],
                    });

                    const score = apiResponse.data[0].score || 0; // Ensure score is valid
                    const isCorrect = score >= THRESHOLD; // Compare with threshold
                    return { ...response, score, isCorrect }; // Assign score & correctness
                } catch (error) {
                    console.error("Error calculating cosine similarity:", error);
                    return { ...response, score: 0, isCorrect: false };
                }
            });

            Promise.all(updatedResponses).then((updatedResponsesWithScores) => {
                setResponses(updatedResponsesWithScores);

                // If NOT a practice session, calculate and show the final score
                if (!isPractise) {
                    const totalScore = updatedResponsesWithScores.reduce((acc, curr) => acc + curr.score, 0);
                    const finalScore = (totalScore / 5.0) * 100; //need

                    updateStudentPerformance(finalScore);
                    // alert(`Your final score: ${finalScore.toFixed(2)}%`);
                }
            });
        }
    }, [initialResponses]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        checkAndUpdateStudentPerformance();
    }, [userId]);

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
                    text: `Your score has been updated!`,
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

    const handleResultContainerClick = (index) => {
        setActiveResult((prev) => (prev === index ? null : index));

        setTimeout(() => {
            if (containerRef.current) {
                const selectedElement = containerRef.current.children[index];
                if (selectedElement) {
                    selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }, 100);
    };

    // Calculate the number of correct answers
    const correctAnswersCount = responses.filter((response) => response.isCorrect).length;

    // Handle "Try Again" button click
    const handleTryAgain = () => {
        navigate("/listening", { state: { listeningId: initialResponses[0]._id, threshold, isPractise } });
    };

    // Handle "Select Another" button click
    const handleSelectAnother = () => {
        navigate("/select-listenings", { state: { categoryId } });
    };


    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <PageHeader title="Your Results" />
                <div
                    className="d-flex flex-column justify-content-start align-items-center"
                    style={{
                        height: "100vh",
                        width: "100vw",
                        backgroundImage: `url('/images/background/bg${backgroundImageNumber}.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    <div
                        className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
                        style={{ opacity: 0.5 }}
                    ></div>

                    {/* <h1
                        className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50 ${isResultContainerVisible ? 'slide-up' : ''}`}
                        style={{ zIndex: 1, position: "relative", marginBottom: "10px" }}
                    >
                        Listening Results
                    </h1> */}

                    {/* Display correct answers count */}
                    <h2
                        className="text-white text-center w-100 p-3 bg-dark bg-opacity-50"
                        style={{ zIndex: 1, position: "relative", marginBottom: "20px" }}
                    >
                        You got {correctAnswersCount} out of 5 correct answers!
                    </h2>

                    <div
                        className="results-scrollable-container"
                        ref={containerRef}
                        style={{
                            width: "100%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            padding: "0 20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {responses.map((response, index) => (
                            <div key={index}>
                                {/* Result Container */}
                                <div
                                    className={`result-container-${response.isCorrect ? "correct" : "wrong"} ${isResultContainerVisible ? "slide-up" : ''}`}
                                    style={{
                                        marginTop: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingRight: "630px",
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleResultContainerClick(index)}
                                >
                                    <p className="result-text">Question {index + 1}</p>
                                    <img
                                        src={`/icons/${response.isCorrect ? "correct" : "wrong"}.png`}
                                        alt="Result Mark"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            position: "absolute",
                                            right: "15px",
                                        }}
                                    />
                                </div>

                                {/* Result Content */}
                                {activeResult === index && (
                                    <CSSTransition in={activeResult === index} timeout={500} classNames="slide" unmountOnExit>
                                        <div
                                            className="result-content"
                                            style={{
                                                padding: "20px",
                                                background: "#f1f1f1",
                                                borderRadius: "10px",
                                                marginTop: "10px",
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={`/icons/${response.isCorrect ? "correct_result" : "wrong_result"}.png`}
                                                alt="Result Icon"
                                                style={{
                                                    width: response.isCorrect ? "250px" : "170px",
                                                    height: "170px",
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "-10px",
                                                    opacity: 0.8,
                                                }}
                                            />

                                            <p style={{ fontSize: "24px" }}><strong>Question:</strong> {response.question}</p>
                                            <p style={{ fontSize: "24px" }}><strong>Your Answer:</strong> {response.studentsAnswer}</p>
                                            <p style={{ fontSize: "24px" }}><strong>Correct Answer:</strong> {response.answer}</p>
                                        </div>
                                    </CSSTransition>
                                )}
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            left: "20px", // Position "Try Again" button on the left
                            zIndex: 1000,
                        }}
                    >
                        <button
                            className="okay-button"
                            onClick={handleTryAgain}
                            style={{
                                backgroundColor: "#FFD700", // Gold color
                                border: "2px solid #006400", // Dark green border
                                color: "#006400", // Dark green text
                                fontWeight: "bold",
                                fontFamily: "'Spicy Rice', cursive",
                                padding: "15px 30px",
                                fontSize: "20px",
                                borderRadius: "30px",
                                transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#FFC107"; // Lighter gold on hover
                                e.target.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#FFD700"; // Restore original color
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            Try Again
                        </button>
                    </div>

                    <div
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px", // Position "Select Another" button on the right
                            zIndex: 1000,
                        }}
                    >
                        <button
                            className="okay-button"
                            onClick={handleSelectAnother}
                            style={{
                                backgroundColor: "#ADD8E6", // Light blue
                                border: "2px solid #0000FF", // Blue border
                                color: "#0000FF", // Blue text
                                fontWeight: "bold",
                                fontFamily: "'Spicy Rice', cursive",
                                padding: "15px 30px",
                                fontSize: "20px",
                                borderRadius: "30px",
                                transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0000FF"; // Blue background on hover
                                e.target.style.color = "#FFFFFF"; // White text on hover
                                e.target.style.borderColor = "#FFFFFF"; // White border on hover
                                e.target.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#ADD8E6"; // Restore original color
                                e.target.style.color = "#0000FF"; // Restore original text color
                                e.target.style.borderColor = "#0000FF"; // Restore original border color
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            Select Another
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListeningResult;
