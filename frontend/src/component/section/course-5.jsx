
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from "../sidebar/rating";

const subTitle = "Don’t Miss";
const title = "Lincon’s Courses";

const courseList = [
    {
        imgUrl: 'assets/images/course/13.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        courseName: 'Web Design',
        coursePrice: '$199.00',
        courseTitle: 'Learn Basic Web Design with HTML & CSS',
        user: '200',
        commentCount: '23',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/14.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        courseName: 'PHP',
        coursePrice: 'Free',
        courseTitle: 'Learn Basic Web Design with HTML & CSS',
        user: '200',
        commentCount: '23',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/15.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        courseName: 'English',
        coursePrice: '$199.00',
        courseTitle: 'Learn Basic Web Design with HTML & CSS',
        user: '200',
        commentCount: '23',
        btnText: 'Read More',
    },
]


const CourseFive = () => {
    return (
        <div className="course-section style-2 padding-tb section-bg-ash yellow-color-section">
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                    <div className="course-navigations">
                        <div className="course-navi course-navi-next"><i className="icofont-double-left"></i></div>
                        <div className="course-navi course-navi-prev"><i className="icofont-double-right"></i></div>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="course-slider p-2">
                        <div className="swiper-wrapper">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={2}
                                loop={'true'}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    prevEl: '.course-navi-prev',
                                    nextEl: '.course-navi-next',
                                }}
                                modules={[Autoplay, Navigation]}
                                breakpoints={{
                                    0: {
                                        width: 0,
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        width: 1200,
                                        slidesPerView: 2.85,
                                    },
                                }}
                            >
                                {courseList.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="course-item style-3">
                                            <div className="course-inner text-center">
                                                <div className="course-thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    <ul className="course-info lab-ul">
                                                        <li><span className="course-name">{val.courseName}</span></li>
                                                        <li><span className="price">{val.coursePrice}</span></li>
                                                        <li>
                                                            <Rating />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="course-content">
                                                    <a href="course-single.html"><h4>{val.courseTitle}</h4></a>
                                                    <div className="course-details">
                                                        <div className="couse-count"><i className="icofont-users-alt-3"></i> {val.user}</div>
                                                        <div className="couse-topic"><i className="icofont-speech-comments"></i> {val.commentCount}</div>
                                                    </div>
                                                    <a href="course-single.html" className="lab-btn"><span>{val.btnText}</span></a>
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
 
export default CourseFive;