import React, { useState } from 'react';
import './login.css';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading } = useLogin();

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
    await login({ username, password });
  };

  return (
    <div className="auth-screen-overlay">
      <div className="auth-screen-container">
        <div className="auth-screen-header">
          <h2>Login to Type-Rush</h2>
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

          <button type="submit" className={`submit-button ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner">
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                </div>
                <span className="loading-text">Connecting...</span>
              </>
            ) : (
              'Login'
            )}
          </button>

          <div className="auth-switch">
            <p>Don't have an account?
              <Link to={'/signup'}>
                <button
                  type="button"
                  className="switch-button"
                  disabled={loading}
                >
                  Sign Up
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

        {/* Gaming-style loading overlay */}
        {loading && (
          <div className="gaming-loading-overlay">
            <div className="loading-container">
              <div className="pixel-loading">
                <div className="pixel-bar">
                  <div className="pixel-progress"></div>
                </div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="loading-message">Authenticating Player...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;