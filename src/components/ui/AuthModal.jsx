import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'otp'
  const [otpType, setOtpType] = useState('email'); // 'signup' or 'email'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setOtpType('signup');
      setView('otp');
      setMessage('A verification code has been sent to your email.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    
    // Send OTP for login as requested by the workflow
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setOtpType('email');
      setView('otp');
      setMessage('A login verification code has been sent to your email.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: otpType,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Success! Close modal and reset state
      onClose();
      setView('login');
      setEmail('');
      setPassword('');
      setOtp('');
      setMessage(null);
    }
  };

  const switchView = (newView) => {
    setView(newView);
    setError(null);
    setMessage(null);
    setOtp('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="brand-logo">WALTER</h2>
          <p>
            {view === 'login' && 'Welcome back.'}
            {view === 'signup' && 'Create an account.'}
            {view === 'otp' && 'Verify your email.'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-message">{message}</div>}

        {view === 'otp' ? (
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">Enter 6-digit OTP</label>
              <input 
                type="text" 
                id="otp" 
                placeholder="123456" 
                maxLength="6"
                required 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="otp-helper">Sent to {email}</p>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Log In'}
            </button>

            <div className="modal-footer">
              <button 
                type="button"
                className="toggle-auth-btn"
                onClick={() => switchView(otpType === 'signup' ? 'signup' : 'login')}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={view === 'login' ? handleLogin : handleSignUp}>
            {view === 'signup' && (
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Jane Doe" 
                  required 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="jane@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {view === 'signup' && (
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {view === 'login' && (
              <div className="form-options">
                <p className="login-helper">We will send a one-time password to your email.</p>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Processing...' : (view === 'login' ? 'Send Login OTP' : 'Sign Up')}
            </button>

            <div className="modal-footer">
              <button 
                type="button"
                className="toggle-auth-btn"
                onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
              >
                {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
