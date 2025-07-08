import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Target, Zap, Clock, TrendingUp, Award, Crown, Medal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './gameresults.css';

const GameResults = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Mock data - replace with actual data from your backend
  const gameResults = {
    roomId: "ROOM-ABC123",
    duration: 180, // 3 minutes
    winner: "SpeedDemon",
    players: [
      {
        id: 1,
        username: "SpeedDemon",
        avatar: "🏆",
        finalWpm: 78,
        averageWpm: 72,
        accuracy: 96.5,
        totalCharacters: 432,
        correctCharacters: 417,
        position: 1,
        completionTime: 165
      },
      {
        id: 2,
        username: "TypoMaster", 
        avatar: "⚡",
        finalWpm: 65,
        averageWpm: 62,
        accuracy: 98.2,
        totalCharacters: 378,
        correctCharacters: 371,
        position: 2,
        completionTime: 180
      }
    ]
  };

  // Generate mock real-time data for graphs
  const generateTimeSeriesData = () => {
    const data = [];
    for (let i = 0; i <= 180; i += 5) {
      data.push({
        time: i,
        SpeedDemon_wpm: Math.max(0, 72 + Math.sin(i / 30) * 8 + (Math.random() - 0.5) * 6),
        TypoMaster_wpm: Math.max(0, 62 + Math.sin(i / 25) * 7 + (Math.random() - 0.5) * 5),
        SpeedDemon_accuracy: Math.max(85, Math.min(100, 96.5 + Math.sin(i / 40) * 3 + (Math.random() - 0.5) * 2)),
        TypoMaster_accuracy: Math.max(85, Math.min(100, 98.2 + Math.sin(i / 35) * 2 + (Math.random() - 0.5) * 1.5))
      });
    }
    return data;
  };

  const [timeSeriesData] = useState(generateTimeSeriesData());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderHeader = () => (
    <div className="header">
      <div className="header-content">
        <button
          onClick={() => window.history.back()}
          className="back-button"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div className="header-info">
          <h1 className="main-title">
            <Trophy className="trophy-icon" size={32} />
            Match Results
          </h1>
          <p className="subtitle">
            Room: {gameResults.roomId} • Duration: {Math.floor(gameResults.duration / 60)}:{(gameResults.duration % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderWinnerCard = () => {
    const winner = gameResults.players.find(p => p.username === gameResults.winner);
    
    return (
      <div className="winner-card">
        <div className="winner-bg-animation" />
        
        <div className="winner-content">
          <div className="winner-avatar">
            {winner?.avatar}
          </div>
          
          <h2 className="winner-title">
            🎉 {winner?.username} Wins! 🎉
          </h2>
          
          <div className="winner-stats">
            <div className="winner-stat">
              <div className="stat-value wpm-color">
                {winner?.finalWpm}
              </div>
              <div className="stat-label">WPM</div>
            </div>
            
            <div className="winner-stat">
              <div className="stat-value accuracy-color">
                {winner?.accuracy}%
              </div>
              <div className="stat-label">Accuracy</div>
            </div>
            
            <div className="winner-stat">
              <div className="stat-value time-color">
                {winner?.completionTime}s
              </div>
              <div className="stat-label">Time</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlayerStats = () => (
    <div className="players-grid">
      {gameResults.players.map((player, index) => (
        <div
          key={player.id}
          className={`player-card ${player.position === 1 ? 'winner-border' : ''}`}
        >
          {player.position === 1 && (
            <div className="crown-badge">
              <Crown size={16} />
            </div>
          )}
          
          <div className="player-header">
            <div className="player-avatar">
              {player.avatar}
            </div>
            
            <div className="player-info">
              <h3 className="player-name">
                {player.username}
              </h3>
              <div className="player-position">
                <Medal size={16} className="medal-icon" />
                <span className="position-text">
                  {player.position === 1 ? 'Winner' : `${player.position}nd Place`}
                </span>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-header">
                <Zap size={16} className="stat-icon wpm-color" />
                <span className="stat-title">Final WPM</span>
              </div>
              <div className="stat-number wpm-color">
                {player.finalWpm}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Target size={16} className="stat-icon accuracy-color" />
                <span className="stat-title">Accuracy</span>
              </div>
              <div className="stat-number accuracy-color">
                {player.accuracy}%
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <TrendingUp size={16} className="stat-icon avg-color" />
                <span className="stat-title">Avg WPM</span>
              </div>
              <div className="stat-number avg-color">
                {player.averageWpm}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Clock size={16} className="stat-icon time-color" />
                <span className="stat-title">Time</span>
              </div>
              <div className="stat-number time-color">
                {player.completionTime}s
              </div>
            </div>
          </div>

          <div className="character-progress">
            <div className="progress-info">
              <span>Characters Typed</span>
              <span className="progress-numbers">
                {player.correctCharacters}/{player.totalCharacters}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(player.correctCharacters / player.totalCharacters) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformanceGraphs = () => (
    <div className="graphs-grid">
      {/* WPM Over Time */}
      <div className="graph-card">
        <h3 className="graph-title">
          <Zap size={20} className="graph-icon wpm-color" />
          WPM Over Time
        </h3>
        
        <div className="graph-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                fontSize={12}
                tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
              />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="SpeedDemon_wpm" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={false}
                name="SpeedDemon"
              />
              <Line 
                type="monotone" 
                dataKey="TypoMaster_wpm" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                name="TypoMaster"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Accuracy Over Time */}
      <div className="graph-card">
        <h3 className="graph-title">
          <Target size={20} className="graph-icon accuracy-color" />
          Accuracy Over Time
        </h3>
        
        <div className="graph-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                fontSize={12}
                tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
              />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[80, 100]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="SpeedDemon_accuracy" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={false}
                name="SpeedDemon"
              />
              <Line 
                type="monotone" 
                dataKey="TypoMaster_accuracy" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={false}
                name="TypoMaster"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSummaryStats = () => (
    <div className="summary-card">
      <h3 className="summary-title">
        <Award size={20} className="summary-icon" />
        Performance Comparison
      </h3>

      <div className="summary-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[
            { metric: 'Final WPM', SpeedDemon: 78, TypoMaster: 65 },
            { metric: 'Accuracy', SpeedDemon: 96.5, TypoMaster: 98.2 },
            { metric: 'Avg WPM', SpeedDemon: 72, TypoMaster: 62 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            />
            <Bar dataKey="SpeedDemon" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="TypoMaster" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="game-results">
      <div className="container">
        {renderHeader()}
        {renderWinnerCard()}
        {renderPlayerStats()}
        {renderPerformanceGraphs()}
        {renderSummaryStats()}
      </div>
    </div>
  );
};

export default GameResults;