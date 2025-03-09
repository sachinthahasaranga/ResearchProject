import { Component, Fragment } from "react";
import FooterThree from "../component/layout/footer-3";
import HeaderSix from "../component/layout/header-6";
import BannerSix from "../component/section/banner-6";
import Choose from "../component/section/choose";
import ClientsThree from "../component/section/clients-3";
import ContactInfo from "../component/section/contact-info";
import EventTwo from "../component/section/event-2";
import FeatureThree from "../component/section/feature-3";
import Video from "../component/section/video";


const HomeSix = () => {
    return (
        <Fragment>
            <HeaderSix />
            <BannerSix />
            <FeatureThree />
            <Choose />
            <EventTwo />
            <Video />
            <ClientsThree />
            <ContactInfo />
            <FooterThree />
        </Fragment>
    );
}
 
export default HomeSix;