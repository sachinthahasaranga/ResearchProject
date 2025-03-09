
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

const subTitle = "Why Choose Us";
const title = "Get Everything for Learning";


const instructorTopList = [
    {
        imgUrl: 'assets/images/instructor/09.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Emilee Logan',
        degi: 'Lead Instructor',
        infoList: [
            {
                iconName: 'icofont-envelope',
                text: 'info@prof.mail.com',
            },
            {
                iconName: 'icofont-youtube-play',
                text: 'www.youtube.com/prof.ls',
            },
        ],
        socialList: [
            {
                iconName: 'icofont-facebook',
                className: 'facebook',
                siteLink: '#',
            },
            {
                iconName: 'icofont-twitter',
                className: 'twitter',
                siteLink: '#',
            },
            {
                iconName: 'icofont-linkedin',
                className: 'linkedin',
                siteLink: '#',
            },
        ],
    },
    {
        imgUrl: 'assets/images/instructor/10.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Angel Mili',
        degi: 'Lead Instructor',
        infoList: [
            {
                iconName: 'icofont-envelope',
                text: 'info@prof.mail.com',
            },
            {
                iconName: 'icofont-youtube-play',
                text: 'www.youtube.com/prof.ls',
            },
        ],
        socialList: [
            {
                iconName: 'icofont-facebook',
                className: 'facebook',
                siteLink: '#',
            },
            {
                iconName: 'icofont-twitter',
                className: 'twitter',
                siteLink: '#',
            },
            {
                iconName: 'icofont-linkedin',
                className: 'linkedin',
                siteLink: '#',
            },
        ],
    },
]

const instructorBottomList = [
    {
        imgUrl: 'assets/images/instructor/11.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Mim Jaqno',
        degi: 'Lead Instructor',
    },
    {
        imgUrl: 'assets/images/instructor/12.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Henri',
        degi: 'Lead Instructor',
    },
    {
        imgUrl: 'assets/images/instructor/13.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Bin Tonso',
        degi: 'Lead Instructor',
    },
    {
        imgUrl: 'assets/images/instructor/14.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Selina Gomez',
        degi: 'Lead Instructor',
    },
    {
        imgUrl: 'assets/images/instructor/15.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Baluni Chobo',
        degi: 'Lead Instructor',
    },
    {
        imgUrl: 'assets/images/instructor/10.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Angel Mili',
        degi: 'Lead Instructor',
    },
]

const InstructorThree = () => {
    return (
        <div className="instructor-section style-3 padding-tb section-bg-ash">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="instructor-top">
                        <div className="row g-4 justify-content-center row-cols-1 row-cols-lg-2">
                            {instructorTopList.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="instructor-item style-2">
                                        <div className="instructor-inner">
                                            <div className="instructor-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="instructor-content">
                                                <Link to="/team-single"><h4>{val.name}</h4></Link>
                                                <span className="d-block">{val.degi}</span>
                                                <ul className="lab-ul ins-info">
                                                    {val.infoList.map((val, i) => (
                                                        <li key={i}><i className={val.iconName}></i> {val.text}</li>
                                                    ))}
                                                </ul>
                                                <ul className="lab-ul social-icons">
                                                    {val.socialList.map((val, i) => (
                                                        <li key={i}>
                                                            <a href={val.siteLink} className={val.className}><i className={val.iconName}></i></a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="instructor-bottom">
                        <div className="instructor-slider overflow-hidden">
                            <div className="instructor-navi instructor-slider-next"><i className="icofont-rounded-double-right"></i></div>
                            <div className="instructor-navi instructor-slider-prev"><i className="icofont-rounded-double-left"></i></div>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={2}
                                loop={'true'}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    prevEl: '.instructor-slider-prev',
                                    nextEl: '.instructor-slider-next',
                                }}
                                modules={[Autoplay, Navigation]}
                                breakpoints={{
                                    0: {
                                        width: 0,
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 3,
                                    },
                                    1200: {
                                        width: 1200,
                                        slidesPerView: 5.7,
                                    },
                                }}
                            >
                                {instructorBottomList.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="instructor-item">
                                            <div className="instructor-inner">
                                                <div className="instructor-thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                                <div className="instructor-content">
                                                    <Link to="/team-single"><h5>{val.name}</h5></Link>
                                                    <span className="d-block">{val.degi}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default InstructorThree;