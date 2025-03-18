import { Fragment, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await apiClient.get(`/api/users/${userId}`);
      if (response.data) {
        setStudent(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const predictionData = [
    { month: "Jan", progress: 20 },
    { month: "Feb", progress: 35 },
    { month: "Mar", progress: 50 },
    { month: "Apr", progress: 60 },
    { month: "May", progress: 70 },
    { month: "Jun", progress: 75 },
    { month: "Jul", progress: 80 },
    { month: "Aug", progress: 85 },
    { month: "Sep", progress: 90 },
    { month: "Oct", progress: 95 },
  ];

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Student Profile"} curPage={"Profile"} />
      <section className="student-profile-section padding-tb section-bg">
        <div className="container">
          <div className="profile-wrapper">
            {student ? (
              <div className="profile-content">
                <h2 className="text-center">Welcome, {student.firstName} {student.lastName}</h2>
                <div className="profile-info">
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>First Name:</strong> {student.firstName}</p>
                  <p><strong>Last Name:</strong> {student.lastName}</p>
                  <p><strong>Age:</strong> {student.age || "N/A"}</p>
                  <p><strong>Phone Number:</strong> {student.phoneNumber || "N/A"}</p>
                  <p><strong>Current Difficulty Level:</strong> {student.difficultyLevel.difficultyName || "N/A"}</p>
                  <p><strong>Suggested Difficulty:</strong> {student.suggestedDifficulty || "N/A"}</p>
                </div>
                
                {/* Prediction Chart */}
                <div className="chart-container">
                  <h3 className="text-center">Future Progress Prediction</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
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
