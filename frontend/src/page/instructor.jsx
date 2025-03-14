import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Achievement from "../component/section/achievement";
import Student from "../component/section/student";

const subTitle = "Teach on edulon";
const title = "Discover Your Potential. Make A Global Impact.";
const btnText = "Browse All Categories";

let categoryItemList = [
    {
        imgUrl: 'assets/images/category/icon/15.jpg',
        imgAlt: 'category',
        title: 'Build Your Brand',
        desc: 'Like graphic design, business anaytics coding and much more',
    },
    {
        imgUrl: 'assets/images/category/icon/16.jpg',
        imgAlt: 'category',
        title: 'Plan Your Course',
        desc: 'Like graphic design, business anaytics coding and much more',
    },
    {
        imgUrl: 'assets/images/category/icon/17.jpg',
        imgAlt: 'category',
        title: 'Help Shape Future',
        desc: 'Like graphic design, business anaytics coding and much more',
    },
]



const InstructorPage = () => {
    return (
        <Fragment>
            <Header />
            <PageHeader title={'All Best Instructors'} curPage={'instructor'} />
            <div className="category-section padding-tb section-bg style-3">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">{subTitle}</span>
                        <h2 className="title">{title}</h2>
                    </div>
                    <div className="section-wrapper">
                        <div className="row g-4 justify-content-center row-cols-lg-3 row-cols-sm-2 row-cols-1">
                            {categoryItemList.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="category-item text-center">
                                        <div className="category-inner">
                                            <div className="category-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="category-content">
                                                <Link to="/signup"><h4>{val.title}</h4></Link>
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <Link to="/course" className="lab-btn"><span>{btnText}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Student />
            <Achievement />
            <Footer />
        </Fragment>
    );
}
 
export default InstructorPage;