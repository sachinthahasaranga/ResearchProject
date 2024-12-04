import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin, AiFillProfile } from "react-icons/ai";
import "./nav.css";
import { navItems } from "../../data/navbarItems";
import EventEmitter from "../../utils/EventEmitter";
import { Button } from "react-bootstrap";

function Navigation() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [dropdown, setDropdown] = useState(false)

  const onLOginComplete = () => {
    setUsername(localStorage.getItem("username"));
  };

  const onLogOut = () => {
    setUsername(null);
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    let listenr = EventEmitter.addListener("logged", onLOginComplete);
    if (localStorage.getItem("username") !== null) {
      setUsername(localStorage.getItem("username"));
    }
    return () => {
      listenr.remove();
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={process.env.PUBLIC_URL +"/images/logo-em.png"} height={40}/> E-Learning
        </Link>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-items">
              {navItems.map((item) => (
                <li key={item.id} className={item.cName}>
                  <Link className="nav-mb-link" to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    {item.icon} <span>{item.title}</span>
                  </Link>
                </li>
              ))}
              {localStorage.getItem('username')&&<li key={8} className={'nav-item'}>
                  <Link className="nav-mb-link" to={'/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <AiFillProfile /> <span>My Profile</span>
                  </Link>
              </li>}
            </ul>
          </div>
        )}
        {/* Desktop menu */}
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Services") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        {/* User button or sign in button */}
        {username ? (
          <>
            
            <Link className="profile-link" to={"/dashboard"}>
            <div className="custom-profile">
              <img src={avatar} className='rounded' alt=""/>
              
            </div>
            <span>{username}</span>
            </Link>
            <Button className="btn-signout" onClick={() => onLogOut()}>
              <AiOutlineLogout />
            </Button>
          </>
        ) : (
          <Button className="btn-signin" onClick={() => { navigate('/sign-in') }}>
            <AiOutlineLogin />
          </Button>
        )}
        <div
          className="btn-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AiOutlineMenu />
        </div>
      </nav>
    </>
  );
}

export default Navigation;
