import { Component, Fragment } from "react";
import FooterFour from "../component/layout/footer-4";
import HeaderSeven from "../component/layout/header-7";
import BannerSeven from "../component/section/banner-7";
import BlogThree from "../component/section/blog-3";
import CourseFour from "../component/section/course-4";
import FeatureFour from "../component/section/feature-4";
import InstructorThree from "../component/section/instructor-3";
import NewsletterTwo from "../component/section/newsletter-2";
import Offer from "../component/section/offer";




const HomeSeven = () => {
    return (
        <Fragment>
            <HeaderSeven />
            <BannerSeven />
            <CourseFour />
            <FeatureFour />
            <Offer />
            <InstructorThree />
            <BlogThree />
            <NewsletterTwo />
            <FooterFour />
        </Fragment>
    );
}
 
export default HomeSeven;