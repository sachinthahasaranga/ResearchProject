import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../sidebar/rating";
import apiClient from "../../api"; 

const subTitle = "World-class Instructors";
const title = "Classes Taught By Real Creators";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await apiClient.get("/api/users/");
        console.log(response.data)
        const filteredInstructors = response.data.filter(
          (user) => user.role && user.role.name.toLowerCase() === "instructor"
        );
        setInstructors(filteredInstructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="instructor-section padding-tb section-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            {instructors.length > 0 ? (
              instructors.map((instructor, i) => (
                <div className="col" key={instructor._id}>
                  <div className="instructor-item">
                    <div className="instructor-inner">
                      <div className="instructor-thumb">
                        <img
                          src={instructor.imgUrl || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"} // Use default image if none is provided
                          alt={`${instructor.firstName} ${instructor.lastName}`}
                        />
                      </div>
                      <div className="instructor-content">
                        <Link to="/team-single">
                          <h4>{`${instructor.firstName} ${instructor.lastName}`}</h4>
                        </Link>
                        <p>Expert in {instructor.difficultyLevel?.difficultyName || "Unknown"}</p>
                        <Rating />
                      </div>
                    </div>
                    {/* <div className="instructor-footer">
                      <ul className="lab-ul d-flex flex-wrap justify-content-between align-items-center">
                        <li>
                          <i className="icofont-book-alt"></i> {Math.floor(Math.random() * 10) + 1} courses
                        </li>
                        <li>
                          <i className="icofont-users-alt-3"></i> {Math.floor(Math.random() * 100) + 10} students
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No instructors available.</p>
            )}
          </div>
          <div className="text-center footer-btn">
            <p>
              Want to help people learn, grow and achieve more in life?
              {/* <Link to="/team"> Become an instructor</Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
