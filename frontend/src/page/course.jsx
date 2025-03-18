import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Pagination from "../component/sidebar/pagination";
import Rating from "../component/sidebar/rating";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const CoursePage = () => {
    const [videoLectures, setVideoLectures] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [difficultyLevels, setDifficultyLevels] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTime, setSelectedTime] = useState("all");
    const lecturesPerPage = 6;

    const timeFilters = [
        { value: "all", label: "All Durations" },
        { value: "less10", label: "Less than 10 min" },
        { value: "less20", label: "Less than 20 min" },
        { value: "less40", label: "Less than 40 min" },
        { value: "more40", label: "More than 40 min" },
    ];

    useEffect(() => {
        fetchVideoLectures();
        fetchDifficultyLevels();
        fetchCategory();
    }, []);

    useEffect(() => {
        filterLectures();
    }, [selectedDifficulty, selectedCategory, selectedTime, videoLectures]);

    const fetchVideoLectures = async () => {
        try {
            const response = await apiClient.get("/api/video-lectures");
            setVideoLectures(response.data);
            setFilteredLectures(response.data);
            console.log("Video Lectures:", response.data);
        } catch (error) {
            console.error("Error fetching video lectures:", error);
        }
    };

    const fetchDifficultyLevels = async () => {
        try {
            const response = await apiClient.get("/api/difficulty-levels");
            setDifficultyLevels(response.data);
            console.log("Difficulty Levels:", response.data);
        } catch (error) {
            console.error("Error fetching difficulty levels:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await apiClient.get("/api/ctgry");
            setCategory(response.data);
            console.log("category:", response.data);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const filterLectures = () => {
        let filtered = videoLectures;

        if (selectedDifficulty !== "all") {
            filtered = filtered.filter(
                (lecture) => lecture.difficultyLevel?.difficultyName === selectedDifficulty
            );
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (lecture) => lecture.categoryId?.categoryName === selectedCategory
            );
        }

        if (selectedTime !== "all") {
            filtered = filtered.filter((lecture) => {
                const time = lecture.totalTime;
                if (selectedTime === "less10") return time < 10;
                if (selectedTime === "less20") return time < 20;
                if (selectedTime === "less40") return time < 40;
                if (selectedTime === "more40") return time >= 40;
                return true;
            });
        }

        setFilteredLectures(filtered);
    };

    const indexOfLastLecture = currentPage * lecturesPerPage;
    const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
    const currentLectures = filteredLectures.slice(indexOfFirstLecture, indexOfLastLecture);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <PageHeader title={"All Courses"} curPage={"Course Page"} />
            <div className="group-select-section">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="row align-items-center g-4">
                            <div className="col-md-1">
                                <div className="group-select-left">
                                    <i className="icofont-abacus-alt"></i>
                                    <span>Filters</span>
                                </div>
                            </div>
                            <div className="col-md-11">
                                <div className="group-select-right">
                                    <div className="row g-2 row-cols-lg-4 row-cols-sm-2 row-cols-1">
                                    <div className="col">
                                            <div className="select-item">
                                                <select
                                                    className="form-select"
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                >
                                                    <option value="all">All Category</option>
                                                    {category.map((level) => (
                                                        <option key={level._id} value={level.categoryName}>
                                                            {level.categoryName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="select-item">
                                                {/* Difficulty Level Filter */}
                                                <select
                                                    className="form-select"
                                                    value={selectedDifficulty}
                                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                                >
                                                    <option value="all">All Difficulties</option>
                                                    {difficultyLevels.map((level) => (
                                                        <option key={level._id} value={level.difficultyName}>
                                                            {level.difficultyName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="select-item">
                                                <select
                                                    className="form-select"
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                >
                                                    {timeFilters.map((time) => (
                                                        <option key={time.value} value={time.value}>
                                                            {time.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="course-section padding-tb section-bg">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="course-showing-part">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="course-showing-part-left">
                                    <p>Showing {indexOfFirstLecture + 1} - {Math.min(indexOfLastLecture, filteredLectures.length)} of {filteredLectures.length} results</p>
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
                                                        <i className="icofont-signal"></i> {lecture.difficultyLevel?.difficultyName}
                                                    </div>
                                                </div>
                                                <div className="course-footer">
                                                    <div className="course-author">
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
                            totalLectures={filteredLectures.length}
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
