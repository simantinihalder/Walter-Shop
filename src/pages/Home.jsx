import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-image" style={{ backgroundImage: "url('/hero-bg.png')" }}></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Jeans for Everyone</h1>
          <p className="hero-subtitle">Premium denim designed to fit your life. Ethically made, effortlessly stylish.</p>
          
          <div className="hero-ctas">
            <Link to="/shop?category=men" className="btn btn-primary">Shop Men</Link>
            <Link to="/shop?category=women" className="btn btn-secondary">Shop Women</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
