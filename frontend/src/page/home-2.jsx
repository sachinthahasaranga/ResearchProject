import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import HeaderTwo from "../component/layout/header-2";
import AboutTwo from "../component/section/about-2";
import AchievementTwo from "../component/section/achievement-2";
import BannerTwo from "../component/section/banner-2";
import Blog from "../component/section/blog";
import CategoryTwo from "../component/section/category-2";
import CourseTwo from "../component/section/course-2";
import Instructor from "../component/section/instructor";
import Skill from "../component/section/skill";
import Student from "../component/section/student";


const HomeTwo = () => {
    return (
        <Fragment>
            <HeaderTwo />
            <BannerTwo />
            <AboutTwo />
            <CourseTwo />
            <CategoryTwo />
            <Student />
            <Instructor />
            <Skill />
            <AchievementTwo />
            <Blog />
            <Footer />
        </Fragment>
    );
}
 
export default HomeTwo;