import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import GoogleMap from "../component/sidebar/googlemap";


const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle = "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";


const contactList = [
    {
        imgUrl: 'assets/images/icon/01.png',
        imgAlt: 'contact icon',
        title: 'Office Address',
        desc: '1201 park street, Fifth Avenue',
    },
    {
        imgUrl: 'assets/images/icon/02.png',
        imgAlt: 'contact icon',
        title: 'Phone number',
        desc: '+22698 745 632,02 982 745',
    },
    {
        imgUrl: 'assets/images/icon/03.png',
        imgAlt: 'contact icon',
        title: 'Send email',
        desc: 'adminedukon@gmil.com',
    },
    {
        imgUrl: 'assets/images/icon/04.png',
        imgAlt: 'contact icon',
        title: 'Our website',
        desc: 'www.edukon.com',
    },
]


const ContactPage = () => {
    return ( 
        <Fragment>
            <Header />
            <PageHeader title={'Get In Touch With Us'} curPage={'Contact Us'} />
            <div className="map-address-section padding-tb section-bg">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">{subTitle}</span>
                        <h2 className="title">{title}</h2>
                    </div>
                    <div className="section-wrapper">
                        <div className="row flex-row-reverse">
                            <div className="col-xl-4 col-lg-5 col-12">
                                <div className="contact-wrapper">
                                    {contactList.map((val, i) => (
                                        <div className="contact-item" key={i}>
                                            <div className="contact-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="contact-content">
                                                <h6 className="title">{val.title}</h6>
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 col-12">
                                <GoogleMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section padding-tb">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">{conSubTitle}</span>
                        <h2 className="title">{conTitle}</h2>
                    </div>
                    <div className="section-wrapper">
                        <form className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Your Email *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Mobile Number *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Your Subject *"
                                />
                            </div>
                            <div className="form-group w-100">
                                <textarea 
                                    rows="8" 
                                    type="text"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <div className="form-group w-100 text-center">
                                <button className="lab-btn"><span>{btnText}</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}



export default ContactPage;