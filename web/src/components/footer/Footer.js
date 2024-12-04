import React from 'react';
import './footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mfooter text-center">
      <div className='footer-container text-center col'>
        <p>Designed and Developed By |Kavishi Sirisena|</p>
        
        <div className='links'>
          <Link className='custom-link' to={''}>@Company</Link>
          <Link className='custom-link' to={''}>Privacy</Link>
          <Link className='custom-link' to={''}>Teams</Link>
          <Link className='custom-link' to={''}>Security</Link>
        </div>
      </div>
      

      
      
    </footer>
  );
};

export default Footer;
