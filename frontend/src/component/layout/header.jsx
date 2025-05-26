import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo/logo.png';
import '../../assets/css/header/header.css';

const phoneNumber = "+94 712 - 758 - 785";
const address = "Negombo, Sri Lanka";

const socialList = [
    { iconName: 'icofont-facebook-messenger', siteLink: '#' },
    { iconName: 'icofont-twitter', siteLink: '#' },
    { iconName: 'icofont-vimeo', siteLink: '#' },
    { iconName: 'icofont-skype', siteLink: '#' },
    { iconName: 'icofont-rss-feed', siteLink: '#' },
];

const Header = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/login");
    };

    // Add scroll event for fixed header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setHeaderFixed(true);
            } else {
                setHeaderFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header-section ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
            <div className={`header-top ${socialToggle ? "open" : ""}`}>
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
            <div className="header-bottom">
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
                                            <li><NavLink to="/game-launch">Play Games</NavLink></li>
                                        </ul>
                                    </li>
                                    {/* <li className="menu-item-has-children">
                                        <a href="#">Pages</a>
                                        <ul className="lab-ul dropdown-menu">
                                            <li><NavLink to="/about">About</NavLink></li>
                                            <li><NavLink to="/team">Team</NavLink></li>
                                            <li><NavLink to="/instructor">Instructor</NavLink></li>
                                            <li><NavLink to="/shop">Shop Page</NavLink></li>
                                            <li><NavLink to="/shop-single">Shop Details Page</NavLink></li>
                                            <li><NavLink to="/cart-page">Shop Cart Page</NavLink></li>
                                            <li><NavLink to="/search-page">Search Page</NavLink></li>
                                            <li><NavLink to="/search-none">Search None</NavLink></li>
                                            <li><NavLink to="/404">404</NavLink></li>
                                        </ul>
                                    </li> */}
                                    <li className="menu-item-has-children"><NavLink to="/studentprofile">Profile</NavLink></li>
                                    <li className="menu-item-has-children"><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </div>

                            {/* Show Login & Signup if NOT logged in */}
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="login"><i className="icofont-user"></i> <span>LOG IN</span></Link>
                                    <Link to="/signup" className="signup"><i className="icofont-users"></i> <span>SIGN UP</span></Link>
                                </>
                            ) : (
                                /* Show Logout button when logged in */
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

export default Header;
