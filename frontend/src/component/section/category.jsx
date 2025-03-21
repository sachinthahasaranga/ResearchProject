import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api";

const subTitle = "Popular Category";
const title = "Popular Category For Learning";
const btnText = "Browse All Categories";

const Category = () => {
    const [videoLectureCount, setVideoLectureCount] = useState(0);
    const [paperCount, setPaperCount] = useState(0);

    useEffect(() => {
        const fetchVideoLectures = async () => {
            try {
                const response = await apiClient.get("/api/video-lectures");
                setVideoLectureCount(response.data.length);
            } catch (error) {
                console.error("Error fetching video lectures:", error);
            }
        };

        const fetchPapers = async () => {
            try {
              const response = await apiClient.get("/api/papers");
              setPaperCount(response.data.length);
            } catch (error) {
                console.error("Error fetching paper count:", error);
            }
        };

        fetchVideoLectures();
        fetchPapers();
    }, []);

    const categoryList = [
        {
            imgUrl: 'assets/images/category/icon/01.jpg',
            imgAlt: 'category',
            title: 'English Videos',
            count: `${videoLectureCount} Videos`, // Dynamic count from API
        },
        {
            imgUrl: 'assets/images/category/icon/02.jpg',
            imgAlt: 'category',
            title: 'Listening Activities',
            count: '04 Course',
        },
        {
            imgUrl: 'assets/images/category/icon/03.jpg',
            imgAlt: 'category',
            title: 'English Papers',
            count: `${paperCount} Papers`,
        },
    ];

    return (
        <div className="category-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-2 justify-content-center row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1">
                        {categoryList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="category-item text-center">
                                    <div className="category-inner" style={{ minHeight: "280px" }}>
                                        <div className="category-thumb">
                                            <img src={`${val.imgUrl}`} alt={val.imgAlt} />
                                        </div>
                                        <div className="category-content">
                                            <Link to="/course">
                                                <h6>{val.title}</h6>
                                            </Link>
                                            <span>{val.count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/course" className="lab-btn">
                            <span>{btnText}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
