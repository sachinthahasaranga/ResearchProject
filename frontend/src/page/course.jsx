import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import GroupSelect from "../component/sidebar/group-select";
import Pagination from "../component/sidebar/pagination";
import Rating from "../component/sidebar/rating";
import SkillSelect from "../component/sidebar/skill-select";
import apiClient from "../api"; // Import API client
import "../assets/css/LatestCourse.css"; // Import custom styles

const CoursePage = () => {
    const [videoLectures, setVideoLectures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const lecturesPerPage = 6;

    // Fetch all video lectures
    useEffect(() => {
        const fetchVideoLectures = async () => {
            try {
                const response = await apiClient.get("/api/video-lectures");
                setVideoLectures(response.data);
            } catch (error) {
                console.error("Error fetching video lectures:", error);
            }
        };

        fetchVideoLectures();
    }, []);

    // Pagination logic
    const indexOfLastLecture = currentPage * lecturesPerPage;
    const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
    const currentLectures = videoLectures.slice(indexOfFirstLecture, indexOfLastLecture);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <PageHeader title={"All Courses"} curPage={"Course Page"} />
            <GroupSelect />
            <div className="course-section padding-tb section-bg">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="course-showing-part">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="course-showing-part-left">
                                    <p>Showing {indexOfFirstLecture + 1} - {Math.min(indexOfLastLecture, videoLectures.length)} of {videoLectures.length} results</p>
                                </div>
                                <div className="course-showing-part-right d-flex flex-wrap align-items-center">
                                    <span>Sort by :</span>
                                    <div className="select-item">
                                        <SkillSelect select={'all'} />
                                        <div className="select-icon">
                                            <i className="icofont-rounded-down"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
                            {currentLectures.map((lecture) => (
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
                                                <Link to={`/course-single/${lecture._id}`}>
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
                                                        {/* <img
                                                            src="assets/images/course/author/default.png" // Default author image
                                                            alt={lecture.createdBy?.username || "Unknown Author"}
                                                        /> */}
                                                        <Link to="/team-single" className="ca-name">
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
                        <Pagination
                            lecturesPerPage={lecturesPerPage}
                            totalLectures={videoLectures.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CoursePage;
