import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import About from "../component/section/about";
import Achievement from "../component/section/achievement";
import Banner from "../component/section/banner";
import Blog from "../component/section/blog";
import Category from "../component/section/category";
import Instructor from "../component/section/instructor";
import Sponsor from "../component/section/sponsor";
import Student from "../component/section/student";
import LatestCourse from "../component/section/latest-courses";


const Home = () => {
    return (
        <Fragment>
            <Header />
            <Banner />
            {/* <Sponsor /> */}
            <Category />
            <LatestCourse/>
            <About />
            <Instructor />
            <Student />
            <Blog />
            <Achievement />
            <Footer />
        </Fragment>
    );
}
 
export default Home;