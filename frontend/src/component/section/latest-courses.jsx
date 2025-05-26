import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../sidebar/rating";
import apiClient from "../../api";
import "../../assets/css/LatestCourse.css";

const subTitle = "Featured Video Lectures";
const title = "Latest Video Lectures";

const LatestCourse = () => {
    const [videoLectures, setVideoLectures] = useState([]);

    // Fetch latest 6 video lectures
    useEffect(() => {
        const fetchVideoLectures = async () => {
            try {
                const response = await apiClient.get("/api/video-lectures");
                const latestVideos = response.data.slice(-6).reverse();
                setVideoLectures(latestVideos);
            } catch (error) {
                console.error("Error fetching video lectures:", error);
            }
        };

        fetchVideoLectures();
    }, []);

    return (
        <div className="course-section padding-tb section-bg">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
                        {videoLectures.map((lecture) => (
                            <div className="col" key={lecture._id}>
                                <div className="course-item">
                                    <div className="course-inner">
                                        <div className="course-thumb">
                                            <img src={lecture.imgUrl} alt={lecture.lectureTitle} />
                                        </div>
                                        <div className="course-content">
                                            <div className="course-category">
                                                <div className="course-cate">
                                                    <span>{lecture.categoryId?.categoryName || "Uncategorized"}</span>
                                                </div>
                                                <div className="course-reiew">
                                                    <Rating />
                                                    <span className="ratting-count"> 0 reviews</span>
                                                </div>
                                            </div>
                                            <Link to={`/course-view/${lecture._id}`}>
                                                <h4>{lecture.lectureTitle}</h4>
                                            </Link>
                                            <div className="course-details">
                                                <div className="couse-count">
                                                    <i className="icofont-video-alt"></i> {lecture.totalTime} mins
                                                </div>
                                                <div className="couse-topic">
                                                    <i className="icofont-signal"></i> {lecture.categoryId.categoryName}
                                                </div>
                                            </div>
                                            <div className="course-footer">
                                                <div className="course-author">
                                                    
                                                    <Link to="#" className="ca-name">
                                                        {lecture.createdBy?.username || "Unknown"}
                                                    </Link>
                                                </div>
                                                <div className="course-btn">
                                                    <Link to={`/course-view/${lecture._id}`} className="lab-btn-text">
                                                        Read More <i className="icofont-external-link"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-5">
                    <Link to="/course" className="lab-btn"><span>Browse All Lectures</span></Link>
                </div>
            </div>
        </div>
    );
};

export default LatestCourse;
