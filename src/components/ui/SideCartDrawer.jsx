import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard, Landmark, Banknote, Wallet } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './SideCartDrawer.css';

const SideCartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard size={18} /> },
    { id: 'upi', label: 'UPI / Net Banking', icon: <Landmark size={18} /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={18} /> },
    { id: 'wallet', label: 'Digital Wallets', icon: <Wallet size={18} /> },
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div 
        className={`drawer-backdrop ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your cart is empty.</p>
              <button className="btn-continue-shopping" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.primaryImage} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-title-row">
                      <h4>{item.name}</h4>
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="item-meta">{item.brand} | Size: {item.size}</p>
                    <div className="item-price-row">
                      <span className="item-price">{formatPrice(item.price)}</span>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.size, -1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span className="subtotal-price">{formatPrice(subtotal)}</span>
            </div>
            <p className="shipping-note">Shipping & taxes calculated at checkout.</p>
            
            <div className="payment-section">
              <h4 className="payment-title">Select Payment Method</h4>
              <div className="payment-options">
                {paymentMethods.map(method => (
                  <button 
                    key={method.id} 
                    className={`payment-option ${selectedPayment === method.id ? 'active' : ''}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    {method.icon}
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideCartDrawer;
