import { Component, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../sidebar/rating";

const title = "Our Courses";


const CourseData = [
    {
        imgUrl: 'assets/images/course/16.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'English',
        title: 'Basic English Spoken and Writing',
        author: 'assets/images/course/author/01.jpg',
        authorName: 'William Smith',
        price: '$199.00',
        id: 1,
    },
    {
        imgUrl: 'assets/images/course/17.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Software',
        title: 'Learn Advance with PHP Language',
        author: 'assets/images/course/author/02.jpg',
        authorName: 'Angel Mili',
        price: '$199.00',
        id: 2,
    },
    {
        imgUrl: 'assets/images/course/18.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Design',
        title: 'Logo Design in Adobe Illustrator',
        author: 'assets/images/course/author/03.jpg',
        authorName: 'Sajahan Sagor',
        price: '$199.00',
        id: 3,
    },
    {
        imgUrl: 'assets/images/course/19.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Photography',
        title: 'Digital Photography for Beginner',
        author: 'assets/images/course/author/04.jpg',
        authorName: 'Ummi Nishat',
        price: '$199.00',
        id: 4,
    },
    {
        imgUrl: 'assets/images/course/20.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Marketing',
        title: 'Advance Social Media Marketing',
        author: 'assets/images/course/author/05.jpg',
        authorName: 'Rassel Hossin',
        price: '$199.00',
        id: 5,
    },
    {
        imgUrl: 'assets/images/course/21.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Music',
        title: 'A Guidelines Complete Guitar System',
        author: 'assets/images/course/author/06.jpg',
        authorName: 'Zinat Zaara',
        price: '$199.00',
        id: 6,
    },
    {
        imgUrl: 'assets/images/course/22.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Design',
        title: 'Learn Piano Guidelines System A to Z',
        author: 'assets/images/course/author/01.jpg',
        authorName: 'William Smith',
        price: '$199.00',
        id: 7,
    },
    {
        imgUrl: 'assets/images/course/23.jpg',
        imgAlt: 'course rajibraj91 rajibraj',
        cate: 'Software',
        title: 'Advance Professional Graphic Design',
        author: 'assets/images/course/author/02.jpg',
        authorName: 'Angel Mili',
        price: '$199.00',
        id: 8,
    },
]


const CourseFour = () => {

    const [items, setItems] = useState(CourseData);
    const filterItem = (categItem) => {
        const updateItems = CourseData.filter((curElem) => {
            return curElem.cate === categItem;
        });
        setItems(updateItems);
    }

    return (
        <div className="course-section style-3 padding-tb">
            <div className="course-shape one"><img src="assets/images/shape-img/icon/01.png" alt="education" /></div>
            <div className="course-shape two"><img src="assets/images/shape-img/icon/02.png" alt="education" /></div>
            <div className="container">
                <div className="section-header">
                    <h2 className="title">{title}</h2>
                    <div className="course-filter-group">
                        <ul className="lab-ul">
                            <li onClick={() => setItems(CourseData) }>All</li>
                            <li onClick={() => filterItem('English') }>English</li>
                            <li onClick={() => filterItem('Software') }>Software</li>
                            <li onClick={() => filterItem('Design') }>Design</li>
                            <li onClick={() => filterItem('Photography') }>Photography</li>
                            <li onClick={() => filterItem('Music') }>Music</li>
                            <li onClick={() => filterItem('Marketing') }>Marketing</li>
                        </ul>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
                        { items.map((elem) => {
                            const { id, imgUrl, imgAlt, cate, title, author, authorName, price } = elem;
                            return (
                                <div className="col" key={id}>
                                    <div className="course-item style-4">
                                        <div className="course-inner">
                                            <div className="course-thumb">
                                                <img src={imgUrl} alt={imgAlt} />
                                                <div className="course-category">
                                                    <div className="course-cate">
                                                        <a href="#">{cate}</a>
                                                    </div>
                                                    <div className="course-reiew">
                                                        <Rating />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="course-content">
                                                <Link to="/course-single"><h5>{title}</h5></Link>
                                                <div className="course-footer">
                                                    <div className="course-author">
                                                        <img src={author} alt={imgAlt} />
                                                        <Link to="/team-single" className="ca-name">{authorName}</Link>
                                                    </div>
                                                    <div className="course-price">{price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CourseFour;

