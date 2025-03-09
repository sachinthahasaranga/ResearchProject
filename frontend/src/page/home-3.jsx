import { Component, Fragment } from "react";
import FooterTwo from "../component/layout/footer-2";
import HeaderThree from "../component/layout/header-3";
import AchievementThree from "../component/section/achievement-3";
import BannerThree from "../component/section/banner-3";
import BlogTwo from "../component/section/blog-2";
import Clients from "../component/section/clients";
import CourseThree from "../component/section/course-3";
import Event from "../component/section/event";
import Feature from "../component/section/feature";
import NewsLetter from "../component/section/newsletter";
import Workshop from "../component/section/workshop";
import WorkshopTwo from "../component/section/workshop-2";


const HomeThree = () => {
    return (
        <Fragment>
            <HeaderThree />
            <BannerThree />
            <Feature />
            <CourseThree />
            <AchievementThree />
            <Event />
            <Workshop />
            <WorkshopTwo />
            <BlogTwo />
            <Clients />
            <NewsLetter />
            <FooterTwo />
        </Fragment>
    );
}
 
export default HomeThree;