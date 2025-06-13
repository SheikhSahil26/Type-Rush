import React, { useState } from 'react';
import './login.css';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const {signup}=useSignUp()
  const handleSubmit =async (e) => {
    e.preventDefault();

    console.log(username,password)
    
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if(username.length<3)setError("username length must be greater than 3")


    setError("");

    await signup({username,password});

    
    


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
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            SignUp
          </button>

          <div className="auth-switch">
            <p>Don't have an account? 
              <button 
                type="button" 
                className="switch-button"
                
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="forgot-password">
            <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;