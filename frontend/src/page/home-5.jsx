import { Component, Fragment } from "react";
import FooterThree from "../component/layout/footer-3";
import HeaderFive from "../component/layout/header-5";
import AboutThree from "../component/section/about-3";
import BannerFive from "../component/section/banner-5";
import ClientsThree from "../component/section/clients-3";
import CourseFive from "../component/section/course-5";
import CourseSix from "../component/section/course-6";
import FeatureTwo from "../component/section/feature-2";
import Register from "../component/section/register";


const HomeFive = () => {
    return (
        <Fragment>
            <HeaderFive />
            <BannerFive />
            <AboutThree />
            <CourseFive />
            <Register />
            <FeatureTwo />
            <ClientsThree />
            <CourseSix />
            <FooterThree />
        </Fragment>
    );
}
 
export default HomeFive;