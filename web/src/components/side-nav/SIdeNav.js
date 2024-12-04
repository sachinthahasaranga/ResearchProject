// SideNavBar.js
import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { AiOutlineUser, AiOutlineUserSwitch, AiOutlineAlert, AiOutlineHome, AiOutlineNotification, AiFillHome, AiOutlineBarChart, AiFillBackward, AiOutlineFastBackward, AiOutlineStepBackward, AiOutlineDotChart, AiOutlineCalendar, AiOutlineEdit } from 'react-icons/ai'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";

const SideNavBar = ({onToggle}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle(newVisibility); // Call the callback function to notify Dashboard
  };

  return (
    <SideNav expanded={isVisible} style={{ background: 'var(--primary-bg)', position: 'fixed' }}>
      <SideNav.Toggle
        onClick={() => {
          handleToggle();
        }}
      />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <Link to={'/dashboard'}><AiOutlineHome style={{ fontSize: "1.75em" }} /></Link>
          </NavIcon>
          <NavText><Link to={'/dashboard'}>Home</Link></NavText>
        </NavItem>
        <NavItem eventKey="study-entry">
          <NavIcon>
            <Link to={'/dashboard/questions'}><AiOutlineEdit style={{ fontSize: "1.75em" }} /></Link>
          </NavIcon>
          <NavText><Link to={'/dashboard/questions'}>Questions</Link></NavText>
        </NavItem>
        
        
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavBar;
