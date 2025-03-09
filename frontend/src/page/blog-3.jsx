import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';


import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Archive from "../component/sidebar/archive";
import Instagram from "../component/sidebar/instagram";
import Pagination from "../component/sidebar/pagination";
import PopularPost from "../component/sidebar/popular-post";
import PostCategory from "../component/sidebar/post-category";
import Search from "../component/sidebar/search";
import Tags from "../component/sidebar/tags";


const postList = [
    {
        imgUrl: 'assets/images/blog/single/01.jpg',
        imgAlt: 'blog thumb',
        title: 'Interactively Morph High Standards Anding',
        desc: 'Complete deploy focused supply chains rather than viraling services productiva pandemc experiences via interoperable niche markets ramatica incentivize superior functionalitese Rapidiously evolve impactful core competencies without',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ],
    },
]


const postSliderList = [
    {
        imgUrlList: [
            {
                imgUrl: 'assets/images/blog/single/01.jpg',
                imgAlt: 'blog thumb',
            },
            {
                imgUrl: 'assets/images/blog/single/02.jpg',
                imgAlt: 'blog thumb',
            },
            {
                imgUrl: 'assets/images/blog/single/03.jpg',
                imgAlt: 'blog thumb',
            },
        ],
        title: 'Interactively Morph High Standards Anding',
        desc: 'Complete deploy focused supply chains rather than viraling services productiva pandemc experiences via interoperable niche markets ramatica incentivize superior functionalitese Rapidiously evolve impactful core competencies without',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ],
    },
]

const videoPostList = [
    {
        imgUrl: 'assets/images/blog/single/03.jpg',
        imgAlt: 'blog thumb',
        videoLink: 'https://www.youtube-nocookie.com/embed/jP649ZHA8Tg',
        title: 'Interactively Morph High Standards Anding',
        desc: 'Complete deploy focused supply chains rather than viraling services productiva pandemc experiences via interoperable niche markets ramatica incentivize superior functionalitese Rapidiously evolve impactful core competencies without',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ],
    },
]

const quetePostList = [
    {
        imgUrl: 'assets/images/blog/quote.png',
        imgAlt: 'blog thumb',
        queteText: 'Quickly morph empowered ideas through viral systems niquely opensource metricss whereas premium human capital creater bjectively underwhelm world-class total.',
        title: 'Interactively Morph High Standards Anding',
        desc: 'Complete deploy focused supply chains rather than viraling services productiva pandemc experiences via interoperable niche markets ramatica incentivize superior functionalitese Rapidiously evolve impactful core competencies without',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ],
    },
]


const BlogPageThree = () => {
    return ( 
        <Fragment>
            <Header />
            <PageHeader title={'Our Blog Classic Posts'} curPage={'Blog classic'} />
            <div className="blog-section padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <article>
                                <div className="section-wrapper">
                                    <div className="row row-cols-1 justify-content-center g-4">
                                        {postList.map((val, i) => (
                                            <div className="col" key={i}>
                                                <div className="post-item style-2">
                                                    <div className="post-inner">
                                                        <div className="post-thumb">
                                                            <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                        </div>
                                                        <div className="post-content">
                                                            <Link to="/blog-single"><h3>{val.title}</h3></Link>
                                                            <div className="meta-post">
                                                                <ul className="lab-ul">
                                                                    {val.metaList.map((val, i) => (
                                                                        <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <p>{val.desc}</p>
                                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText} <i className="icofont-external-link"></i></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {postSliderList.map((val, i) => (
                                            <div className="col" key={i}>
                                                <div className="post-item style-2 slider-post">
                                                    <div className="post-inner">
                                                        <div className="post-thumb post-thumb-slider">
                                                            <Swiper
                                                                loop={'true'}
                                                                autoplay={{
                                                                    delay: 5000,
                                                                    disableOnInteraction: false,
                                                                }}
                                                                navigation={{
                                                                    prevEl: '.post-thumb-slider-prev',
                                                                    nextEl: '.post-thumb-slider-next',
                                                                }}
                                                                modules={[Autoplay, Navigation]}
                                                            >
                                                                {val.imgUrlList.map((val, i) => (
                                                                    <SwiperSlide key={i}>
                                                                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                                    </SwiperSlide>
                                                                ))}  
                                                            </Swiper>
                                                            <div className="post-thumb-slider-next"><i className="icofont-double-left"></i></div>
                                                            <div className="post-thumb-slider-prev"><i className="icofont-double-right"></i></div>
                                                        </div>
                                                        <div className="post-content">
                                                            <Link to="/blog-single"><h3>{val.title}</h3></Link>
                                                            <div className="meta-post">
                                                                <ul className="lab-ul">
                                                                    {val.metaList.map((val, i) => (
                                                                        <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <p>{val.desc}</p>
                                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText} <i className="icofont-external-link"></i></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        

                                        {videoPostList.map((val, i) => (
                                            <div className="col" key={i}>
                                                <div className="post-item style-2 video-post">
                                                    <div className="post-inner">
                                                        <div className="post-thumb">
                                                            <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                            <a href={val.videoLink} className="video-button popup"><i className="icofont-ui-play"></i></a>
                                                        </div>
                                                        <div className="post-content">
                                                            <a href="blog-single.html"><h3>{val.title}</h3></a>
                                                            <div className="meta-post">
                                                                <ul className="lab-ul">
                                                                    {val.metaList.map((val, i) => (
                                                                        <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <p>{val.desc}</p>
                                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText} <i className="icofont-external-link"></i></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {quetePostList.map((val, i) => (
                                            <div className="col" key={i}>
                                                <div className="post-item style-2 qute-post">
                                                    <div className="post-inner">
                                                        <div className="post-thumb">
                                                            <div className="qute-content">
                                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                                <h4>{val.queteText}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="post-content">
                                                            <Link to="/blog-single"><h3>{val.title}</h3></Link>
                                                            <div className="meta-post">
                                                                <ul className="lab-ul">
                                                                    {val.metaList.map((val, i) => (
                                                                        <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <p>{val.desc}</p>
                                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText} <i className="icofont-external-link"></i></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Pagination />
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 col-12">
                            <aside>
                                <Search />
                                <PostCategory />
                                <PopularPost />
                                <Archive />
                                <Instagram />
                                <Tags />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default BlogPageThree;