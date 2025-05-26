import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";

const SearchPage = () => {
    const { name } = useParams(); 
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState(name || ""); 
    const [videoLectures, setVideoLectures] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [papers, setPapers] = useState([]);
    const [filteredPapers, setFilteredPapers] = useState([]);

    useEffect(() => {
        fetchVideoLectures();
        fetchPapers();
    }, []);

    useEffect(() => {
        filterResults();
    }, [searchQuery, videoLectures, papers]);

    const fetchVideoLectures = async () => {
        try {
            const response = await apiClient.get("/api/video-lectures");
            setVideoLectures(response.data);
            setFilteredLectures(response.data);
        } catch (error) {
            console.error("Error fetching video lectures:", error);
        }
    };

    const fetchPapers = async () => {
        try {
            const response = await apiClient.get("/api/papers");
            setPapers(response.data);
            setFilteredPapers(response.data);
        } catch (error) {
            console.error("Failed to fetch papers.");
        }
    };

    const filterResults = () => {
        if (!searchQuery) {
            setFilteredLectures(videoLectures);
            setFilteredPapers(papers);
            return;
        }

        const lowercasedQuery = searchQuery.toLowerCase();

        setFilteredLectures(
            videoLectures.filter(
                (lecture) =>
                    lecture.lectureTitle.toLowerCase().includes(lowercasedQuery) ||
                    lecture.categoryId?.categoryName.toLowerCase().includes(lowercasedQuery)
            )
        );

        setFilteredPapers(
            papers.filter(
                (paper) =>
                    paper.paperTitle.toLowerCase().includes(lowercasedQuery) ||
                    paper.categoryId?.categoryName.toLowerCase().includes(lowercasedQuery)
            )
        );
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search-page/${searchQuery}`); 
    };

    return (
        <Fragment>
            <Header />
            <PageHeader title={`Search Results for: ${searchQuery || "All"}`} curPage={"Search Result"} />
            <div className="blog-section padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <article>
                                <div className="section-wrapper">
                                    <div className="row row-cols-1 justify-content-center g-4">
                                        
                                        {/* Video Lectures Section */}
                                        {filteredLectures.length > 0 ? (
                                            filteredLectures.map((lecture) => (
                                                <div className="col" key={lecture._id}>
                                                    <div className="post-item style-2">
                                                        <div className="post-inner">
                                                            <div className="post-content">
                                                                <Link to={`/course-view/${lecture._id}`}>
                                                                    <h3>{lecture.lectureTitle}</h3>
                                                                </Link>
                                                                <div className="meta-post">
                                                                    <ul className="lab-ul">
                                                                        <li><i className="icofont-calendar"></i> {new Date(lecture.createdAt).toDateString()}</li>
                                                                        <li><i className="icofont-ui-user"></i> {lecture.createdBy?.username || "Unknown"}</li>
                                                                        <li><i className="icofont-clock-time"></i> {lecture.totalTime} min</li>
                                                                        <li><i className="icofont-signal"></i> {lecture.difficultyLevel?.difficultyName || "N/A"}</li>
                                                                    </ul>
                                                                </div>
                                                                <p>{lecture.lectureDescription}</p>
                                                                <Link to={`/course-view/${lecture._id}`} className="lab-btn">
                                                                    <span>Read More <i className="icofont-external-link"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No video lectures found.</p>
                                        )}

                                        {/* Papers Section */}
                                        {filteredPapers.length > 0 ? (
                                            filteredPapers.map((paper) => (
                                                <div className="col" key={paper._id}>
                                                    <div className="post-item style-2">
                                                        <div className="post-inner">
                                                            <div className="post-content">
                                                                <Link to={`/paper-details/${paper._id}`}>
                                                                    <h3>{paper.paperTitle}</h3>
                                                                </Link>
                                                                <div className="meta-post">
                                                                    <ul className="lab-ul">
                                                                        <li><i className="icofont-calendar"></i> {new Date(paper.createdAt).toDateString()}</li>
                                                                        <li><i className="icofont-ui-user"></i> {paper.createdBy?.username || "Unknown"}</li>
                                                                        <li><i className="icofont-clock-time"></i> {paper.totalTime} min</li>
                                                                        <li><i className="icofont-signal"></i> {paper.difficultyLevel?.difficultyName || "N/A"}</li>
                                                                        <li><i className="icofont-graduate"></i> Recommended Age: {paper.recommendedAge}+</li>
                                                                    </ul>
                                                                </div>
                                                                <Link to={`/paper-details/${paper._id}`} className="lab-btn">
                                                                    <span>Read More <i className="icofont-external-link"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No papers found.</p>
                                        )}

                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Search Sidebar */}
                        <div className="col-lg-4 col-12">
                            <aside>
                                <div className="widget widget-search">
                                    <h4>Need a new search?</h4>
                                    <p>If you didn't find what you were looking for, try a new search!</p>
                                    <form className="search-wrapper" onSubmit={handleSearchSubmit}>
                                        <input
                                            type="text"
                                            name="s"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit"><i className="icofont-search-2"></i></button>
                                    </form>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default SearchPage;
