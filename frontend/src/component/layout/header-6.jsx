import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";


const HeaderSix = () => {
    const [menuToggle, setMenuToggle] = useState(false);
	const [headerFiexd, setHeaderFiexd] = useState(false);
	const [searchTrigger, setSearchTrigger] = useState(false);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 200) {
			setHeaderFiexd(true);
		} else {
			setHeaderFiexd(false);
		}
	});

    return (
        <Fragment>
            <header className={`header-section style-4 style-6 ${headerFiexd ? "header-fixed fadeInUp" : ""}`}>
                <div className="header-top">
                    <div className="container">
                        <div className="header-top-area">
                            <div className="header-top-contact">
                                <a href="tel:+880123456789"><i className="icofont-phone"></i> +880 123 456 789</a>
                                <a href="mailto:contact@yourmail.com"><i className="icofont-envelope"></i> contact@yourmail.com</a>
                            </div>
                            <div className="header-top-reglog">
                                <a href="#" className="lab-btn"><span>For Your Question</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper">
                            <div className="logo-search-acte">
                                <div className="logo">
                                    <Link to="/"><img src="assets/images/logo/01.png" alt="logo" /></Link>
                                </div>
                            </div>
                            <div className="menu-area">
                                <div className="menu">
                                    <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                        <li className="menu-item-has-children">
                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">Home</a>
                                            <ul className="lab-ul dropdown-menu">
                                                <li><NavLink to="/">Home One</NavLink></li>
                                                <li><NavLink to="/index-2">Home Two</NavLink></li>
                                                <li><NavLink to="/index-3">Home Three</NavLink></li>
                                                <li><NavLink to="/index-4">Home Four</NavLink></li>
                                                <li><NavLink to="/index-5">Home Five</NavLink></li>
                                                <li><NavLink to="/index-6">Home Six</NavLink></li>
                                                <li><NavLink to="/index-7">Home Seven</NavLink></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">Courses</a>
                                            <ul className="lab-ul dropdown-menu">
                                                <li><NavLink to="/course">Course</NavLink></li>
                                                <li><NavLink to="/course-single">Course Details</NavLink></li>
                                                <li><NavLink to="/course-view">Course View</NavLink></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">Blog</a>
                                            <ul className="lab-ul dropdown-menu">
                                                <li><NavLink to="/blog">Blog Grid</NavLink></li>
                                                <li><NavLink to="/blog-2">Blog Style 2</NavLink></li>
                                                <li><NavLink to="/blog-3">Blog Style 3</NavLink></li>
                                                <li><NavLink to="/blog-single">Blog Single</NavLink></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">Pages</a>
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
                                        </li>
                                        <li><NavLink to="/contact">Contact</NavLink></li>
                                    </ul>
                                </div>

                                <div className="search-icon" onClick={() => setSearchTrigger(!searchTrigger)}>
                                    <i className="icofont-search"></i>
                                </div>

                                <div className={`header-bar d-lg-none ${menuToggle ? "active" : "" }`} onClick={() => setMenuToggle(!menuToggle)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`menu-search-form ${searchTrigger ? "open" : ""}`}>
                <div className="search-close" onClick={() => setSearchTrigger(!searchTrigger)}></div>
                <form>
                    <input type="text" name="search" placeholder="Search here..." />
                    <button type="submit"><i className="icofont-search"></i></button>
                </form>
            </div>
        </Fragment>
    );
}
 
export default HeaderSix;