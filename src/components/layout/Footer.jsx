import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content container">
        <div className="footer-brand">
          <h2 className="brand-logo">WALTER</h2>
          <p className="brand-subtitle">Jeans for Everyone.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop?category=men">Men's Denim</Link></li>
              <li><Link to="/shop?category=women">Women's Denim</Link></li>
              <li><Link to="/shop?sort=new">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><Link to="#">Fit Guide</Link></li>
              <li><Link to="#">Shipping & Returns</Link></li>
              <li><Link to="#">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Walter Jeans. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
