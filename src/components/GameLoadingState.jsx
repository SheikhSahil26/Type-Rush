import React, { useState, useEffect } from 'react';
import { Search, Zap, Users, Gamepad2, Target, Trophy, Sword, Shield } from 'lucide-react';
import './competeScreen.css'; // Make sure this includes the styles I gave earlier

const GamingLoadingState = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState('');
  const [pulseScale, setPulseScale] = useState(1);

  const loadingMessages = [
    { text: "Scanning the battlefield", icon: <Search size={20} /> },
    { text: "Finding worthy opponents", icon: <Sword size={20} /> },
    { text: "Checking player rankings", icon: <Trophy size={20} /> },
    { text: "Connecting to online warriors", icon: <Users size={20} /> },
    { text: "Preparing for epic battles", icon: <Shield size={20} /> },
    { text: "Loading typing arena", icon: <Target size={20} /> }
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev === '...') ? '' : prev + '.');
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.1 : 1);
    }, 1000);

    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className="gaming-loading-container">
      {/* Background bubbles */}
      <div className="gaming-float-bubble" style={{
        top: '20px', left: '20px', width: '40px', height: '40px',
        background: 'linear-gradient(45deg, #f59e0b, #d97706)'
      }} />

      <div className="gaming-float-bubble" style={{
        top: '60px', right: '30px', width: '25px', height: '25px',
        background: 'linear-gradient(45deg, #10b981, #059669)', opacity: 0.3,
        animation: 'float 2.5s ease-in-out infinite reverse'
      }} />

      <div className="gaming-float-bubble" style={{
        bottom: '40px', left: '50px', width: '30px', height: '30px',
        background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)', opacity: 0.25,
        animation: 'float 3.5s ease-in-out infinite'
      }} />

      {/* Animated Gamepad */}
      <div
        className="gaming-ring"
        style={{ transform: `scale(${pulseScale})` }}
      >
        <div className="gaming-ring-spinner" />
        <Gamepad2 size={40} style={{ color: '#000', zIndex: 2 }} />
      </div>

      {/* Message */}
      <div className="gaming-loading-message">
        <div style={{
          color: '#f59e0b',
          transform: currentMessage % 2 === 0 ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {loadingMessages[currentMessage].icon}
        </div>
        <span>
          {loadingMessages[currentMessage].text}{dots}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="gaming-progress-bar-container">
        <div className="gaming-progress-bar-fill" />
      </div>

      {/* Status */}
      <div className="gaming-status-bar">
        <div className="gaming-status-pill">
          <div className="gaming-status-dot" />
          <span>Online</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
          <Zap size={16} style={{ color: '#f59e0b' }} />
          <span>Matchmaking Active</span>
        </div>
      </div>

      {/* Tip */}
      <div className="gaming-tip-box">
        💡 Tip: Higher WPM players make for more challenging opponents!
      </div>
    </div>
  );
};

export default GamingLoadingState;
