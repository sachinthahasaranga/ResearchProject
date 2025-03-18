import React, { Fragment, useEffect, useState, useRef  } from 'react';
import { useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";


const socialList = [
    {
        link: '#',
        iconName: 'icofont-facebook',
        className: 'facebook',
    },
    {
        link: '#',
        iconName: 'icofont-twitter',
        className: 'twitter',
    },
    {
        link: '#',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
    },
    {
        link: '#',
        iconName: 'icofont-instagram',
        className: 'instagram',
    },
    {
        link: '#',
        iconName: 'icofont-pinterest',
        className: 'pinterest',
    },
]

const CourseView = () => {
    const { id } = useParams();
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewFull, setViewFull] = useState(false);
    const userId = localStorage.getItem("userId");
    const intervalRef = useRef(null);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        
        fetchLecture();
        checkAndUpdateStudentPerformance();

    }, []);

    useEffect(() => {
        if (!userId) {
            console.error("Waiting for userId...");
            return;
        }

        if (!lecture || !lecture.totalTime || !lecture.difficultyLevel.difficultyWeight ) {
            console.error("Lecture total time is not available.");
            return;
        }
        console.log(`Starting study time update interval... Max duration: ${lecture.totalTime} minutes`);
        console.log(lecture.difficultyLevel.difficultyWeight)
        let elapsedTime = 0;

        intervalRef.current = setInterval(async () => {
            elapsedTime += 1;
            console.log(`Running study time update... Elapsed time: ${elapsedTime} minutes`);
    
            try {
                if (elapsedTime <= lecture.totalTime) { 
                    const response = await apiClient.get(`/api/student-performance/user/${userId}`);
                    if (response.data) {
                        const studentPerformance = response.data;
    
                        await apiClient.put(`/api/student-performance/user/${userId}`, {
                            totalStudyTime: studentPerformance.totalStudyTime + 1,
                            resourceScore: studentPerformance.resourceScore + (1*lecture.difficultyLevel.difficultyWeight),
                            totalScore: studentPerformance.totalScore,
                            paperCount: studentPerformance.paperCount,
                        });
    
                        console.log(`Updated Study Time: ${studentPerformance.totalStudyTime + 1}`);
                    }
                } else {
                    console.log("Maximum study time reached. Stopping interval...");
                    clearInterval(intervalRef.current);
                }
            } catch (error) {
                console.error("Error updating study time:", error);
            }
        }, 60000);

        return () => {
            console.log("Clearing interval...");
            clearInterval(intervalRef.current);
        };
    }, [lecture, userId]);
    
    const fetchLecture = async () => {
        try {
            const response = await apiClient.get(`/api/video-lectures/${id}`);
            setLecture(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching video lecture:", error);
            setLoading(false);
        }
    };

    const checkAndUpdateStudentPerformance = async () => {
        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        try {
            const response = await apiClient.get(`/api/student-performance/user/${userId}`);
            if (!response.data) {
                console.log("Creating new student performance record...");
                await apiClient.post("/api/student-performance", {
                    userId,
                    totalStudyTime: 0,
                    resourceScore: 0,
                    totalScore: 0,
                    paperCount: 0,
                });
            }
        } catch (error) {
            console.error("Error checking/updating student performance:", error);
        }
    };


    if (loading) {
        return <div className="text-center p-5">Loading...</div>;
    }
    if (!lecture) {
        return <div className="text-center p-5">Lecture Not Found</div>;
    }



    return (
        <Fragment>
            <Header />
            <PageHeader title={lecture.lectureTitle} curPage={'Course View'} />
            <div className="course-view-section padding-tb section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="course-view">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 col-12">
                                        <div className="video-part mb-4 mb-lg-0">
                                            <div className="vp-title mb-4">
                                                <h3>{lecture.lectureTitle}</h3>
                                            </div>
                                            <div className="vp-video mb-4">
                                                <video controls>
                                                    <source src={lecture.videoUrl} type="video/mp4" />
                                                </video>
                                            </div>
                                            {/* <div className={`content-wrapper ${icon ? "open" : ""}`} >
                                                <div className="content-icon d-lg-none" onClick={() => setIcon(!icon)}>
                                                    <i className="icofont-caret-down"></i>
                                                </div>
                                                <div className="vp-content mb-5">
                                                    <h4>Introduction</h4>
                                                    <p>{lecture.lectureDescription}</p>
                                                </div>
                                                
                                            </div> */}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overview-announce-section padding-tb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="course-view-bottom">
                                
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                        <div className="overview-area">
                                            <div className="overview-head mb-4">
                                                <h6 className="mb-0">About this Lecture</h6>
                                                {/* <p>You too can make cartoons!</p> */}
                                            </div>
                                            <div className="overview-body">
                                                <ul className="lab-ul">
                                                    <li className="d-flex flex-wrap">
                                                        <div className="overview-left">
                                                            <p className="mb-0">More Details</p>
                                                        </div>
                                                        <div className="overview-right">
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Skill level</div>
                                                                <div className="or-right"> {lecture.difficultyLevel.difficultyName} Leve</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Category</div>
                                                                <div className="or-right">{lecture.categoryId.categoryName}</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Languages</div>
                                                                <div className="or-right">English</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Max Time</div>
                                                                <div className="or-right">{lecture.totalTime} minute</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Created By</div>
                                                                <div className="or-right">{lecture.createdBy.username}</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Video</div>
                                                                <div className="or-right">1 total hour</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    
                                                    <li className={`d-flex flex-wrap rajib ${viewFull ? "fullview" : ""}`} >
                                                        <div className="overview-left">
                                                            <p className="mb-0">Description</p>
                                                        </div>
                                                        <div className="overview-right overview-description">
                                                            <p className="description mb-3">{lecture.lectureDescription}</p>
                                                            
                                                        </div>
                                                        <div className="view-details">
                                                            <span className="more" onClick={() => setViewFull(!viewFull)}>+ See More</span>
                                                            <span className="less" onClick={() => setViewFull(!viewFull)}>- See Less</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CourseView;