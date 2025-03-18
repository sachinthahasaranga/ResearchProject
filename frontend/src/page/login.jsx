import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient, { setAuthToken } from "../api";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Login API Request
      const response = await apiClient.post("/api/auth/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

      setAuthToken(token);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.username}!`,
        showConfirmButton: false,
        timer: 2000,
      });

      // Fetch Student Performance Data
      await fetchStudentPerformance(user.id);

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentPerformance = async (userId) => {
    try {
      const response = await apiClient.get(`/api/student-performance/user/${userId}`);

      if (response.data) {
        const { totalStudyTime,resourceScore, totalScore, paperCount } = response.data;

        // Check if a history record exists for today
        const recordExists = await checkIfHistoryExistsForToday(userId);

        if (!recordExists) {
          // Send Performance Data to History API
          await sendStudentPerformanceHistory(userId, totalStudyTime,resourceScore, totalScore, paperCount);
        } else {
          console.log("Performance history for today already exists. Skipping update.");
        }
      }
    } catch (error) {
      console.error("Error fetching student performance:", error);
    }
  };

  const checkIfHistoryExistsForToday = async (userId) => {
    try {
      const response = await apiClient.get(`/api/student-performance-history/user/${userId}`);

      if (response.data.length > 0) {
        const today = new Date().toISOString().split("T")[0];

        return response.data.some((record) => record.createdAt.split("T")[0] === today);
      }

      return false;
    } catch (error) {
      console.error("Error checking performance history:", error);
      return false;
    }
  };

  const sendStudentPerformanceHistory = async (userId, totalStudyTime,resourceScore, totalScore, paperCount) => {
    try {
      const requestBody = {
        userId: userId,
        totalStudyTime: totalStudyTime,
        resourceScore: resourceScore,
        totalScore: totalScore,
        paperCount: paperCount,
      };

      await apiClient.post("/api/student-performance-history/", requestBody);

      console.log("Student performance history updated successfully.");
    } catch (error) {
      console.error("Error sending student performance history:", error);
    }
  };

  return (
    <>
      <Header />
      <PageHeader title={"Login Page"} curPage={"Login"} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">Login</h3>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <Link to="/forgetpass">Forget Password?</Link>
                </div>
              </div>
              <div className="form-group text-center">
                <button className="d-block lab-btn" type="submit" disabled={loading}>
                  <span>{loading ? "Logging in..." : "Submit Now"}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Don’t Have an Account? <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
