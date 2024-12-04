import React from 'react';
import ServiceCard from './ServiceCard';
import './card.css';
import { Row, Col } from 'react-bootstrap';

const Services = () => {
  const servicesData = [
    {
      title: "Study Time Management",
      description: "Efficiently manage your study time with personalized schedules.",
      buttonText: "Learn More",
      image: "/bg.png"
    },
    {
      title: "Goal Setting",
      description: "Set and track your academic goals to stay focused and motivated.",
      buttonText: "Learn More",
      image: "/bg.png"
    },
    {
      title: "Resource Organization",
      description: "Organize study materials, notes, and resources for easy access.",
      buttonText: "Learn More",
      image: "/bg.png"
    },
    {
      title: "Progress Tracking",
      description: "Track your progress and analyze study habits for improvement.",
      buttonText: "Learn More",
      image: "/bg.png"
    },
    {
      title: "Collaborative Learning",
      description: "Engage in group discussions, share resources, and collaborate with peers.",
      buttonText: "Learn More",
      image: "/bg.png"
    },
    {
      title: "Customized Study Plans",
      description: "Create personalized study plans tailored to your learning style and goals.",
      buttonText: "Learn More",
      image: "/bg.png"
    }
  ];

  return (
    <div className="services-container">
      <Row className="text-center">
        <Col>
          <h1>Services We Provide</h1>
          <p>Explore the features and services available for your study planning journey.</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {servicesData.map((service, index) => (
          <Col lg={2} md={4} sm={6} key={index} className="d-flex align-items-stretch">
            <ServiceCard title={service.title} description={service.description} buttonText={service.buttonText} image={service.image}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
