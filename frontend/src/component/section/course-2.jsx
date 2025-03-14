
import { Link } from "react-router-dom";
import Rating from "../sidebar/rating";


const subTitle = "Featured Courses";
const title = "Pick A Course To Get Started";



const courseList = [
    {
        imgUrl: 'assets/images/course/07.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Fundamentals of Adobe XD Theory Learn New',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/01.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'William Smith',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/08.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Certified Graphic Design with Free Project Course',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/02.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'Umme Nishat',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/09.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Theory Learn New Student And Fundamentals',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/03.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'Robot Smith',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/10.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Computer Fundamentals Basic Startup Ultricies Vitae',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/04.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'Zinat Zaara',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/11.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Boozy Halloween Drinks for the Grown Eleifend Kuismod',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/05.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'Billy Rivera',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/course/12.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        price: '$30',
        cate: 'Adobe XD',
        reviewCount: '03 reviews',
        title: 'Student Want to Learn About Science And Arts',
        totalLeson: '18x Lesson',
        schdule: 'Online Class',
        authorImgUrl: 'assets/images/course/author/06.jpg',
        authorImgAlt: 'course author rajibraj91 rajibraj',
        authorName: 'Subrina Kabir',
        btnText: 'Read More',
    },
]


const CourseTwo = () => {
    return (
        <div className="course-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-lg-2 row-cols-1">
                        {courseList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="course-item style-2">
                                    <div className="course-inner">
                                        <div className="course-thumb">
                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            <div className="course-price">{val.price}</div>
                                        </div>
                                        <div className="course-content">
                                            <div className="course-category">
                                                <div className="course-cate">
                                                    <a href="#">{val.cate}</a>
                                                </div>
                                                <div className="course-reiew">
                                                    <Rating />
                                                    <span className="ratting-count">{val.reviewCount}</span>
                                                </div>
                                            </div>
                                            <a href="/course-single"><h4>{val.title}</h4></a>
                                            <div className="course-details">
                                                <div className="couse-count"><i className="icofont-video-alt"></i> {val.totalLeson}</div>
                                                <div className="couse-topic"><i className="icofont-signal"></i> {val.schdule}</div>
                                            </div>
                                            <div className="course-footer">
                                                <div className="course-author">
                                                    <img src={`${val.authorImgUrl}`} alt={`${val.authorImgAlt}`} />
                                                    <Link to="/team-single" className="ca-name">{val.authorName}</Link>
                                                </div>
                                                <div className="course-btn">
                                                    <Link to="/course-single" className="lab-btn-text">{val.btnText} <i className="icofont-external-link"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CourseTwo;