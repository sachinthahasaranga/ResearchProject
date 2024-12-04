import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './hero.css';
import { Link, useNavigate } from 'react-router-dom';

const HeroContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-container">
      <Container fluid>
        <Row className="align-items-center"> {/* Vertically center content */}
          <Col className="text-center custom-frame">
            <h1>Empower Your Learning Regardless the <br></br>Differences</h1>
            <p>
              Discover a smarter way to learn. Our AI-powered platform personalizes your educational experience, helping you reach your goals faster. From curated study plans to interactive content, transform the way you acquire knowledge and skills. Join our community of learners and unlock your full potential today.
            </p>
            <div className="button-group">
              <button className="custom-button light mr-3" onClick={() => {
                navigate('/features');
                window.location.reload();
              }}>Explore Features</button>
              <Link to={'/sign-up'}><button className="custom-button primary">Get Started for Free</button></Link>
            </div>
            <br />
           
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroContainer;
