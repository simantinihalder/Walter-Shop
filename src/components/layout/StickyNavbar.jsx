import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { AppContext } from '../../App';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './StickyNavbar.css';

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsAuthOpen } = useContext(AppContext);
  const { setIsCartOpen, cartItems } = useCart();
  const { user, signOut } = useAuth();
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar-container">
      <nav className="navbar container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand */}
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">WALTER</Link>
          <span className="brand-subtitle hidden-mobile">Jeans for Everyone</span>
        </div>

        {/* Center Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/shop?category=men">Shop Men</Link></li>
          <li><Link to="/shop?category=women">Shop Women</Link></li>
          <li><Link to="/shop?sort=new">New Arrivals</Link></li>
        </ul>

        {/* Right Icons */}
        <div className="navbar-icons">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart size={20} />
            <span className="icon-badge">0</span>
          </Link>
          <button className="icon-btn" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            <span className="icon-badge">{totalCartItems}</span>
          </button>
          {user ? (
            <button className="icon-btn" aria-label="Sign Out" onClick={() => signOut()}>
              <User size={20} fill="currentColor" />
            </button>
          ) : (
            <button className="icon-btn" aria-label="Profile" onClick={() => setIsAuthOpen(true)}>
              <User size={20} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default StickyNavbar;
