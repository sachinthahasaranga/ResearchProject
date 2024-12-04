import React, { useState } from 'react';
import { Navbar, Nav, Badge, Image, Button } from 'react-bootstrap';
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function DashboardNavigation() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

  const onLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };


  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="#home">
        <AiOutlineBell size={24} />
      </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'flex-end'}}>
        
        <Nav>
          {/* <Nav.Link href="#notifications">
            <AiOutlineBell size={20} />
            <Badge variant="danger">4</Badge>
          </Nav.Link> */}
          <Nav.Link href="#profile">
            <Image src={avatar||"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} roundedCircle style={{ width: '30px', height: '30px' }} />
          </Nav.Link>
          <Nav.Link href="#logout">
            <Button variant="outline-dark" onClick={() => onLogOut()}>Logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DashboardNavigation;
