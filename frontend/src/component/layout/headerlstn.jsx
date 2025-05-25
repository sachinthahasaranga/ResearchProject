import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo/logo.png';
import bgImg from '../../assets/images/pageheader/bg/01.jpg';
import '../../assets/css/header/header2.css';

const phoneNumber = "+94 712 - 758 - 785";
const address = "Negombo, Sri Lanka";

const socialList = [
    { iconName: 'icofont-facebook-messenger', siteLink: '#' },
    { iconName: 'icofont-twitter', siteLink: '#' },
    { iconName: 'icofont-vimeo', siteLink: '#' },
    { iconName: 'icofont-skype', siteLink: '#' },
    { iconName: 'icofont-rss-feed', siteLink: '#' },
];

const HeaderLstn = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            setHeaderFixed(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header 
            className={`header-section ${headerFixed ? "header-fixed fadeInUp" : ""}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                width: '100%',
                backgroundImage: `url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.3s ease'
            }}
        >
            <div className={`header-top ${socialToggle ? "open" : ""}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className="container">
                    <div className="header-top-area">
                        <ul className="lab-ul left">
                            <li><i className="icofont-ui-call"></i> <span>{phoneNumber}</span></li>
                            <li><i className="icofont-location-pin"></i> {address}</li>
                        </ul>
                        <ul className="lab-ul social-icons d-flex align-items-center">
                            <li><p>Find us on : </p></li>
                            {socialList.map((val, i) => (
                                <li key={i}><a href={val.siteLink}><i className={val.iconName}></i></a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header-bottom" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <Link to="/"><img src={logo} alt="logo" className="headerlogo1" /></Link>
                        </div>
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li className="menu-item-has-children"><NavLink to="/">Home</NavLink></li>
                                    <li className="menu-item-has-children">
                                        <a href="#">Content</a>
                                        <ul className="lab-ul dropdown-menu">
                                            <li><NavLink to="/course">Course</NavLink></li>
                                            <li><NavLink to="/paperlist">Papers</NavLink></li>
                                            <li><NavLink to="/lisning">Listening Activities</NavLink></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children"><NavLink to="/studentprofile">Profile</NavLink></li>
                                    <li className="menu-item-has-children"><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </div>

                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="login"><i className="icofont-user"></i> <span>LOG IN</span></Link>
                                    <Link to="/signup" className="signup"><i className="icofont-users"></i> <span>SIGN UP</span></Link>
                                </>
                            ) : (
                                <button onClick={handleLogout} className="logout-btn">
                                    <i className="icofont-logout"></i> <span>LOG OUT</span>
                                </button>
                            )}

                            <div className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`} onClick={() => setMenuToggle(!menuToggle)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="ellepsis-bar d-lg-none" onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderLstn;