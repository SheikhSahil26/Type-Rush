import React, { useState } from 'react';
import './login.css';
import useSignUp from '../hooks/useSignUp';
import { Link } from 'react-router-dom';
import './signup.css'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signup, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(username, password);
    
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (username.length < 3) {
      setError("Username length must be greater than 3");
      return;
    }
    
    setError("");
    await signup({ username, password });
  };

  return (
    <div className="auth-screen-overlay">
      <div className="auth-screen-container">
        <div className="auth-screen-header">
          <h2>Sign-Up to Type-Rush</h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className={`submit-button signup-button ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner signup-spinner">
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                </div>
                <span className="loading-text signup-text">Creating Profile...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          <div className="auth-switch">
            <p>Already have an account?
              <Link to={'/login'}>
                <button
                  type="button"
                  className="switch-button"
                  disabled={loading}
                >
                  Login
                </button>
              </Link>
            </p>
          </div>

          <div className="forgot-password">
            <a href="#" className={`forgot-password-link ${loading ? 'disabled' : ''}`}>
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Gaming-style signup loading overlay */}
        {loading && (
          <div className="gaming-loading-overlay signup-overlay">
            <div className="loading-container">
              <div className="pixel-loading signup-loading">
                <div className="signup-avatar-creation">
                  <div className="avatar-placeholder">
                    <div className="avatar-building">
                      <div className="pixel-head"></div>
                      <div className="pixel-body"></div>
                      <div className="pixel-legs"></div>
                    </div>
                  </div>
                </div>
                
                <div className="pixel-bar signup-bar">
                  <div className="pixel-progress signup-progress"></div>
                </div>
                
                <div className="loading-dots signup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                
                <p className="loading-message signup-message">Initializing New Player...</p>
                <p className="loading-submessage">Setting up your gaming profile</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;