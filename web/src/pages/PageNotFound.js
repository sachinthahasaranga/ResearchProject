import React from 'react';
import Navigation from '../components/nav/Navigation';
import Footer from '../components/footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';

function PageNotFound() {
  return (
    <>
      <Navigation />
      <div className='main-container'>
        <Container fluid>
          <Row>
            <Col>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
