import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import DynamicImage from './DynamicImage';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Select the first size as default
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || 32);
  const { addToCart } = useCart();

  // Format currency (INR)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, selectedSize);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
        <DynamicImage 
          primaryUrl={product.primaryImage} 
          secondaryUrl={product.secondaryImage} 
          altText={product.name} 
        />
        
        {/* Wishlist Toggle */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Size Selector & Add to Cart (Hover state) */}
        <div className={`quick-actions ${isHovered ? 'visible' : 'hidden'}`}>
          <div className="quick-sizes">
            {product.availableSizes?.map(size => (
              <button 
                key={size} 
                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
