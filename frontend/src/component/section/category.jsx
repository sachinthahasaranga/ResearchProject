import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api";

const subTitle = "Popular Category";
const title = "Popular Category For Learning";
const btnText = "Browse All Categories";

const Category = () => {
    const [videoLectureCount, setVideoLectureCount] = useState(0);
    const [paperCount, setPaperCount] = useState(0);
    const [listeningCount, setListeningCount] = useState(0);
    const [readingCount, setReadingCount] = useState(0);

    useEffect(() => {
        fetchListeningActivities();
        fetchVideoLectures();
        fetchPapers();
        fetchReadingActivities();
    }, []);

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

    const fetchListeningActivities = async () => {
        try {
            const response = await apiClient.get("/api/lstn/");
            setListeningCount(response.data.length);
        } catch (error) {
            console.error("Error fetching listening activities:", error);
        }
    };  
    
    const fetchReadingActivities = async () => {
        try {
            const response = await apiClient.get("/api/readings/");
            setReadingCount(response.data.length);
        } catch (error) {
            console.error("Error fetching readings activities:", error);
        }
    };  

    const categoryList = [
        {
            imgUrl: 'assets/images/category/icon/01.jpg',
            imgAlt: 'category',
            title: 'English Videos',
            count: `${videoLectureCount} Videos`,
            url: '/course',
        },
        {
            imgUrl: 'assets/images/category/icon/02.jpg',
            imgAlt: 'category',
            title: 'Listening Activities',
            count: `${listeningCount} Activities`,
            url: '/ListeningHomePage',
        },
        {
            imgUrl: 'assets/images/category/icon/03.jpg',
            imgAlt: 'category',
            title: 'English Papers',
            count: `${paperCount} Papers`,
            url: '/paperlist',
        },
        {
            imgUrl: 'assets/images/category/icon/16.jpg',
            imgAlt: 'category',
            title: 'Reading Activities',
            count: `${readingCount} Activities`,
            url: '/reading',
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
                                            <Link to={val.url}>
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
