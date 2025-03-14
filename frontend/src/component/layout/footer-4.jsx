
import { Link } from "react-router-dom";

const desc = "Eduaid theme number one world class university in the world There are student are studing always in this university for all time.";
const courseTitle = "Courses";
const quickTitle = "Quick Links";
const tweetTitle = "Recent Tweets";

const addressList = [
    {
        iconName: 'icofont-google-map',
        text: 'New Elefent Road, Dhaka.',
    },
    {
        iconName: 'icofont-phone',
        text: '+880 123 456 789',
    },
    {
        iconName: 'icofont-envelope',
        text: 'info@Edukon.com',
    },
]

const socialList = [
    {
        iconName: 'icofont-facebook',
        siteLink: '#',
        className: 'facebook',
    },
    {
        iconName: 'icofont-twitter',
        siteLink: '#',
        className: 'twitter',
    },
    {
        iconName: 'icofont-linkedin',
        siteLink: '#',
        className: 'linkedin',
    },
    {
        iconName: 'icofont-instagram',
        siteLink: '#',
        className: 'instagram',
    },
    {
        iconName: 'icofont-pinterest',
        siteLink: '#',
        className: 'pinterest',
    },
]

const courseList = [
    {
        text: 'All Courses',
        link: '#',
    },
    {
        text: 'Forms and Admision materials',
        link: '#',
    },
    {
        text: 'Professional Courses',
        link: '#',
    },
    {
        text: 'Course Outline',
        link: '#',
    },
    {
        text: 'Policy',
        link: '#',
    },
    {
        text: 'FAQs',
        link: '#',
    },
    {
        text: 'Online Course',
        link: '#',
    },
]

const quickList = [
    {
        text: 'Summer Sessions',
        link: '#',
    },
    {
        text: 'Events',
        link: '#',
    },
    {
        text: 'Gallery',
        link: '#',
    },
    {
        text: 'Forums',
        link: '#',
    },
    {
        text: 'Privacy Policy',
        link: '#',
    },
    {
        text: 'Terms of Use',
        link: '#',
    },
]


const tweetList = [
    {
        iconName: 'icofont-twitter',
        desc: <p>Aminur islam <a href="#">@CodexCoder Edukon #HTML_Template</a> Grab your item, 50% Big Sale Offer !!</p>,
    },
    {
        iconName: 'icofont-twitter',
        desc: <p>Somrat islam <a href="#">@CodexCoder Edukon #HTML_Template</a> Grab your item, 50% Big Sale Offer !!</p>,
    },
]

const footerbottomList = [
    {
        text: 'Faculty',
        link: '#',
    },
    {
        text: 'Staff',
        link: '#',
    },
    {
        text: 'Students',
        link: '#',
    },
    {
        text: 'Alumni',
        link: '#',
    },
]

const FooterFour = () => {
    return (
        <footer className="style-2 yellow-color-section">
            <div className="footer-top padding-tb">
                <div className="container">
                    <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
                        <div className="col">
                            <div className="footer-item our-address">
                                <div className="footer-inner">
                                    <div className="footer-content">
                                        <div className="title">
                                            <img src="assets/images/logo/01.png" alt="education" />
                                        </div>
                                        <div className="content">
                                            <p>{desc}</p>
                                            <ul className="lab-ul office-address">
                                                {addressList.map((val, i) => (
                                                    <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                ))}
                                            </ul>
                                            <ul className="lab-ul social-icons">
                                                {socialList.map((val, i) => (
                                                    <li key={i}>
                                                        <a href={val.siteLink} className={val.className}><i className={val.iconName}></i></a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-item">
                                <div className="footer-inner">
                                    <div className="footer-content">
                                        <div className="title">
                                            <h4>{courseTitle}</h4>
                                        </div>
                                        <div className="content">
                                            <ul className="lab-ul">
                                                {courseList.map((val, i) => (
                                                    <li key={i}><a href={val.link}>{val.text}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-item">
                                <div className="footer-inner">
                                    <div className="footer-content">
                                        <div className="title">
                                            <h4>{quickTitle}</h4>
                                        </div>
                                        <div className="content">
                                            <ul className="lab-ul">
                                                {quickList.map((val, i) => (
                                                    <li key={i}><a href={val.link}>{val.text}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-item twitter-post">
                                <div className="footer-inner">
                                    <div className="footer-content">
                                        <div className="title">
                                            <h4>{tweetTitle}</h4>
                                        </div>
                                        <div className="content">
                                            <ul className="lab-ul">
                                                {tweetList.map((val, i) => (
                                                    <li key={i}>
                                                        <i className={val.iconName}></i>
                                                        {val.desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="section-wrapper">
                        <p>&copy; 2021 <Link to="/">Edukon</Link> Designed by <a href="https://themeforest.net/user/CodexCoder" target="_blank">CodexCoder</a> </p>
                        <div className="footer-bottom-list">
                            {footerbottomList.map((val, i) => (
                                <a href={val.link} key={i}>{val.text}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default FooterFour;