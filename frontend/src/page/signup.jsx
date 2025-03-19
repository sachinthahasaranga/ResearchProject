import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api"; // Import API client
import Swal from "sweetalert2"; // Import SweetAlert for notifications

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        difficultyLevel: "67c7de3332e1c2050d8aa152", // Default difficultyLevel ID
        role: "67c7e58e2770ea591aec8bd6",
        status: 1, // Active user
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch!",
                text: "Passwords do not match. Please try again.",
            });
            setLoading(false);
            return;
        }

        try {
            await apiClient.post("/api/auth/register", formData);

            // Show success message
            Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "You can now log in with your credentials.",
                showConfirmButton: false,
                timer: 2000,
            });

            // Redirect to login page
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Registration Error:", error);

            Swal.fire({
                icon: "error",
                title: "Registration Failed!",
                text: error.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <PageHeader title={"Register Now"} curPage={"Sign Up"} />
            <div className="login-section padding-tb section-bg">
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className="title">Register Now</h3>
                        <form className="account-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button className="lab-btn" type="submit" disabled={loading}>
                                    <span>{loading ? "Registering..." : "Get Started Now"}</span>
                                </button>
                            </div>
                        </form>
                        <div className="account-bottom">
                            <span className="d-block cate pt-10">Already have an account? <Link to="/login">Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignupPage;
