import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './card.css'

const ServiceCard = ({ title, description, buttonText, image }) => {
  return (
    <Card className="service-card shadow">
      <Card.Body className='text-center'>
        <img src={process.env.PUBLIC_URL + '/images' + image}  height={100} alt='service'/>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {/* <Button variant="primary">{buttonText}</Button> */}
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;