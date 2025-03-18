import { Fragment, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import axios from "axios";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [studentPerformance, setStudentPerformance] = useState(null);
  const [studentPerScore, setStudentPerScore] = useState(null);
  const [studentPerformanceHistory, setStudentPerformanceHistory] = useState([]);
  const [forecastedPerformance, setForecastedPerformance] = useState([]); // Store predictions
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchStudentProfile();
    fetchStudentPerformance();
    fetchStudentPerformanceHistory();
  }, []);

  useEffect(() => {
    if (studentPerformance) {
      fetchStudentCurrentLevel();
    }
  }, [studentPerformance]);

  useEffect(() => {
    if (studentPerformanceHistory.length > 0) {
      fetchForecastedPerformance();
    }
  }, [studentPerformanceHistory]);

  const fetchStudentProfile = async () => {
    try {
      const response = await apiClient.get(`/api/users/${userId}`);
      if (response.data) {
        setStudent(response.data);
        console.log("Student Profile:", response.data);
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await apiClient.get(`/api/student-performance/user/${userId}`);
      if (response.data) {
        setStudentPerformance(response.data);
        console.log("Student Performance:", response.data);
      }
    } catch (error) {
      console.error("Error fetching student performance:", error);
    }
  };

  const fetchStudentPerformanceHistory = async () => {
    try {
      const response = await apiClient.get(`/api/student-performance-history/user/${userId}`);
      if (response.data) {
        setStudentPerformanceHistory(response.data);
        console.log("Student Performance History:", response.data);
      }
    } catch (error) {
      console.error("Error fetching student performance history:", error);
    }
  };

  const fetchStudentCurrentLevel = async () => {
    if (!studentPerformance) {
      console.warn("Skipping fetchStudentCurrentLevel: studentPerformance is null");
      return;
    }

    try {
      const requestBody = {
        resources_score: studentPerformance.resourceScore,
        minutes_spent: studentPerformance.totalStudyTime,
        quiz_score: (studentPerformance.averageScore/ 100),
      };

      const response = await axios.post(`http://127.0.0.1:5000/predict`, requestBody);

      if (response.data) {
        setStudentPerScore(response.data);
        console.log("Predicted Performance:", response.data);
      }
    } catch (error) {
      console.error("Error fetching student performance prediction:", error);
    }
  };

  const fetchForecastedPerformance = async () => {
    try {
      const scores = studentPerformanceHistory.map((entry) => entry.averageScore); // Extract average scores

      const requestBody = {
        scores: scores,
        time_frame: 7, // Fixed time frame as per requirement
      };

      console.log("Sending Forecast Request:", requestBody);

      const response = await axios.post(`http://127.0.0.1:5000/predict-forecast`, requestBody);

      if (response.data) {
        setForecastedPerformance(response.data.performance_score); // Store predictions
        console.log("Forecasted Performance:", response.data.performance_score);
      }
    } catch (error) {
      console.error("Error fetching forecasted performance:", error);
    }
  };

  const getDifficultyLevel = (score) => {
    if (score === null || score === undefined) return "N/A"; // Handle null case
  
    if ( score < 393.06) {
      return "Easy";
    } else if (score >= 393.06 && score < 769.32) {
      return "Medium";
    } else if (score >= 769.32 && score <= 1145.59) {
      return "Hard";
    } else {
      return "Not Enough Data...";
    }
  };

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Student Profile"} curPage={"Profile"} />
      <section className="student-profile-section padding-tb section-bg">
        <div className="container">
          <div className="profile-wrapper">
            {student ? (
              <div className="profile-content text-center">
                <h2 className="text-center">
                  Welcome, {student.firstName} {student.lastName}
                </h2>

                <div className="d-flex align-items-center flex-wrap mb-4" style={{ gap: "40px" }}>
                  <div className="profile-image text-center">
                    <img
                      src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                      alt="Profile"
                      className="rounded"
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                        border: "3px solid #007bff",
                        maxWidth: "100%",
                      }}
                    />
                  </div>

                  <div className="profile-info" style={{ flex: "1", minWidth: "250px" }}>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>First Name:</strong> {student.firstName}</p>
                    <p><strong>Last Name:</strong> {student.lastName}</p>
                    <p><strong>Age:</strong> {student.age || "N/A"}</p>
                    <p><strong>Phone Number:</strong> {student.phoneNumber || "N/A"}</p>
                    <p><strong>Current Difficulty Level:</strong> {student.difficultyLevel.difficultyName || "N/A"}</p>
                    <p><strong>Suggested Difficulty:</strong> {studentPerScore ? getDifficultyLevel(studentPerScore.performance_score) : "N/A"}</p>
                  </div>
                </div>
                <br></br>
                {/* Prediction Chart */}
                <div className="chart-container">
                  <h3 className="text-center">Student's Average Score Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentPerformanceHistory.map((entry, index) => ({
                      index, 
                      averageScore: entry.averageScore
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="averageScore" stroke="#28a745" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3 className="text-center">Future Progress Prediction</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={forecastedPerformance.map((value, index) => ({ index, progress: value }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#007bff" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p className="text-center">Loading student profile...</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default StudentProfile;
