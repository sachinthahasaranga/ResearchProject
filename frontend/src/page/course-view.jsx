import React, { Fragment, useState } from 'react';

import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";


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
    const [viewFull, setViewFull] = useState(false);
    const [icon, setIcon] = useState(false);

    return (
        <Fragment>
            <Header />
            <PageHeader title={'Themeforest Standard'} curPage={'Course View'} />
            <div className="course-view-section padding-tb section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="course-view">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-12">
                                        <div className="video-part mb-4 mb-lg-0">
                                            <div className="vp-title mb-4">
                                                <h3>Themeforest Standard Website Design</h3>
                                            </div>
                                            <div className="vp-video mb-4">
                                                <video controls>
                                                    <source src="http://demos.codexcoder.com/anthem/wp-content/uploads/2017/07/Ghum-by-Habib-Wahid-Ft.-Mithila.mp4" type="video/mp4" />
                                                </video>
                                            </div>
                                            <div className={`content-wrapper ${icon ? "open" : ""}`} >
                                                <div className="content-icon d-lg-none" onClick={() => setIcon(!icon)}>
                                                    <i className="icofont-caret-down"></i>
                                                </div>
                                                <div className="vp-content mb-5">
                                                    <h4>Introduction</h4>
                                                    <p>This is an excellent course. The content seems very thorough and comprehensive. I like the way all the concepts and configurations are clearly demonstrated in GNS3. There are also a lot of troubleshooting examples and real world applications. I especially enjoyed the practical simlets. </p>
                                                </div>
                                                <div className="vp-author">
                                                    <div className="vpa-item">
                                                        <div className="vpa-inner d-flex flex-wrap justify-content-between">
                                                            <div className="vpa-thumb">
                                                                <img src="assets/images/author/01.jpg" alt="instructor" className="rounded-circle" />
                                                            </div>
                                                            <div className="vpa-contnet">
                                                                <h6 className='mb-2'>Rajib Raj</h6>
                                                                <p className='mb-4'>This is an excellent course. The content seems very thorough and comprehensive. I like the way all the concepts and configurations are clearly demonstrated in GNS3. </p>
                                                                <ul className="lab-ul social-icons">
                                                                    {socialList.map((val, i) => (
                                                                        <li key={i}>
                                                                            <a href={val.link} className={val.className}><i className={val.iconName}></i></a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-8 col-12">
                                        <div className="video-list-area">
                                            <div className="video-head"></div>
                                            <div className="video-body">
                                                <div className="course-select-area border-radius-12">
                                                    <div className="csa-title mb-4">
                                                        <h5>Course Requirements</h5>
                                                    </div>
                                                    <div className="csa-body">
                                                        <ul className="lab-ul">
                                                            <li>
                                                                <div id="accordion">
                                                                    <div className="card active bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-1">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-1" aria-expanded="true" aria-controls="acc-1">
                                                                                    Seation 1: Introduction
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-1" className="collapse show" aria-labelledby="acc-list-1" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-checked complite"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-checked complite"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-2">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-2" aria-expanded="true" aria-controls="acc-2">
                                                                                    Seation 2: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-2" className="collapse" aria-labelledby="acc-list-2" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-3">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-3" aria-expanded="true" aria-controls="acc-3">
                                                                                    Seation 3: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-3" className="collapse" aria-labelledby="acc-list-3" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-4">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-4" aria-expanded="true" aria-controls="acc-4">
                                                                                    Seation 4: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-4" className="collapse" aria-labelledby="acc-list-4" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-5">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-5" aria-expanded="true" aria-controls="acc-5">
                                                                                    Seation 5: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-5" className="collapse" aria-labelledby="acc-list-5" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-6">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-6" aria-expanded="true" aria-controls="acc-6">
                                                                                    Seation 7: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-6" className="collapse" aria-labelledby="acc-list-6" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-ash mb-1">
                                                                        <div className="card-header bg-transparent border-bottom-0" id="acc-list-7">
                                                                            <h5 className="mb-0">
                                                                                <button className="w-100 border-0 bg-transparent outline-none text-left" data-bs-toggle="collapse" data-bs-target="#acc-7" aria-expanded="true" aria-controls="acc-7">
                                                                                    Seation 8: How to Start?
                                                                                    <span className="d-block font-weight-normal">Videos: 13  |  26:00 Min</span>
                                                                                    <div className="icon">
                                                                                        <i className="icofont-thin-down"></i>
                                                                                    </div>
                                                                                </button>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="acc-7" className="collapse" aria-labelledby="acc-list-7" data-bs-parent="#accordion">
                                                                            <div className="card-body py-0">
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.1 Introduction</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>8:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="course-lists d-flex flex-wrap justify-content-between">
                                                                                    <div className="csa-left">
                                                                                        <i className="icofont-square"></i>
                                                                                        <h6>1.2 What is Website Design</h6>
                                                                                        <p><i className="icofont-play-alt-2"></i>6:00 Min</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                </div>
            </div>

            <div className="overview-announce-section padding-tb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="course-view-bottom">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="overview-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="announcement-tab" data-bs-toggle="tab" href="#announcement" role="tab" aria-controls="announcement" aria-selected="false">Announcement</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                        <div className="overview-area">
                                            <div className="overview-head mb-4">
                                                <h6 className="mb-0">About this course</h6>
                                                <p>You too can make cartoons!</p>
                                            </div>
                                            <div className="overview-body">
                                                <ul className="lab-ul">
                                                    <li className="d-flex flex-wrap">
                                                        <div className="overview-left">
                                                            <p className="mb-0">By the numbers</p>
                                                        </div>
                                                        <div className="overview-right">
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Skill level</div>
                                                                <div className="or-right">Beginner Leve</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Students</div>
                                                                <div className="or-right">17118</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Languages</div>
                                                                <div className="or-right">English</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Captions</div>
                                                                <div className="or-right">Yes</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Lectures</div>
                                                                <div className="or-right">31</div>
                                                            </div>
                                                            <div className="or-items d-flex flex-wrap">
                                                                <div className="or-left mr-3">Video</div>
                                                                <div className="or-right">1 total hour</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex flex-wrap">
                                                        <div className="overview-left">
                                                            <p className="mb-0">Features</p>
                                                        </div>
                                                        <div className="overview-right">
                                                            <p className="catagory mb-0">Standard Website Design</p>
                                                        </div>
                                                    </li>
                                                    <li className={`d-flex flex-wrap rajib ${viewFull ? "fullview" : ""}`} >
                                                        <div className="overview-left">
                                                            <p className="mb-0">Description</p>
                                                        </div>
                                                        <div className="overview-right overview-description">
                                                            <p className="description mb-3">I want to clarify some details right away: This course was created for the training unit of the General-Animation studio. Every new candidate who wants to become a member of our studio, we send to this course so that he can quickly and efficiently become familiar with our methods of work.</p>
                                                            <p className="description mb-3">Many members of our community live in developing countries and have access only to the simplest computers. Taking into account the needs of such students, during training we use the Adobe After Effects of 7.0 version, which does not require high-performance hardware, but at the same time allows to master the basic principles of working with the program.
                                                            </p>
                                                            <p className="description mb-3">The main advantage of our animation technique is that we always try to work as efficiently as possible, to get the maximum result at the lowest possible cost.</p>
                                                            <h6>What you’ll learn</h6>
                                                            <p className="description mb-3">The main advantage of our animation technique is that we always try to work as efficiently as possible, to get the maximum result at the lowest possible cost.</p>
                                                            <ul>
                                                                <li>Make little cartoons with funny cartoon characters.</li>
                                                                <li>Many members of our community live in developing countries</li>
                                                                <li>The main advantage of our animation aking into account the needs of such students, during training we use the Adobe After Effects of 7.0 version, which does not require high-performance hardware</li>
                                                                <li>the maximum result at the lowest possible</li>
                                                                <li>The main advantage of our animation</li>
                                                                <li>the maximum result at the lowest possible cost</li>
                                                            </ul>
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
                                    <div className="tab-pane" id="announcement" role="tabpanel" aria-labelledby="announcement-tab">
                                        <div className="announcement-area">
                                            <div className="announcement-lists">
                                                <ul className="lab-ul">
                                                    <li>
                                                        <div className="administer-post d-flex flex-wrap">
                                                            <div className="ap-top mb-2">
                                                                <div className="ap-items d-flex flex-wrap">
                                                                    <div className="ap-thumb">
                                                                        <img src="assets/images/author/01.jpg" alt="administer" />
                                                                    </div>
                                                                    <div className="ap-content">
                                                                        <h5>Rajib Raj</h5>
                                                                        <p>Posted an Announcement <span>24 days ago</span></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-bottom">
                                                                <h4>The best way to study animation is practice!</h4>
                                                                <p>I want to clarify some details right away: This course was created for the training unit of the General-Animation studio. Every new candidate who wants to become a member of our studio, we send to this course so that he can quickly and efficiently become familiar with our methods of work.</p>
                                                                <p>Many members of our community live in developing countries and have access only to the simplest computers. Taking into account the needs of such students, during training we use the Adobe After Effects of 7.0 version, which does not require high-performance hardware, but at the same time allows to master the basic principles of working with the program</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="student-reviwe d-flex flex-wrap">
                                                            <div className="student-thumb">
                                                                <img src="assets/images/author/03.jpg" alt="annaunce" />
                                                            </div>
                                                            <div className="student-content">
                                                                <form action="" method="post">
                                                                    <textarea name="meassage" id="meassage" cols="30" rows="1" placeholder="Enter Your Comment"></textarea>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="student-reviwe d-flex flex-wrap">
                                                            <div className="student-thumb">
                                                                <img src="assets/images/author/02.jpg" alt="annaunce" />
                                                            </div>
                                                            <div className="student-content">
                                                                <h6>Bin Tania <span>24 days ago</span></h6>
                                                                <p>Many members of our progressively formulate fully researched niche markets vis-a-vis an expanded array of convergence. Uniquely supply orthogonal niches.</p>
                                                            </div>
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