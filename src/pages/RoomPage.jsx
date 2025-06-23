import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flag, Crown, Eye, Users, Clock, Zap, Target, Trophy } from 'lucide-react';

const RoomPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);

  // Mock data for demonstration
  const [roomData] = useState({
    roomId: "ROOM-ABC123",
    paragraph: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. It has been used for decades to test typewriters, keyboards, and fonts. The sentence is short, memorable, and perfect for typing practice. Many typists use this phrase to warm up their fingers before longer typing sessions.",
    players: [
      {
        id: 1,
        username: "SpeedDemon",
        avatar: "🏆",
        progress: 45, // percentage
        wpm: 78,
        accuracy: 96.5,
        position: 1,
        isFinished: false,
        currentWord: 23
      },
      {
        id: 2,
        username: "TypoMaster",
        avatar: "⚡",
        progress: 38,
        wpm: 65,
        accuracy: 98.2,
        position: 2,
        isFinished: false,
        currentWord: 19
      }
    ],
    spectators: [
      { id: 1, username: "WatcherOne", avatar: "👀" },
      { id: 2, username: "TypingFan", avatar: "🎯" },
      { id: 3, username: "KeyboardLover", avatar: "⌨️" },
      { id: 4, username: "SpeedWatcher", avatar: "🚀" },
      { id: 5, username: "RaceObserver", avatar: "🏁" }
    ]
  });

  const [players, setPlayers] = useState(roomData.players);

  // Simulate race progress
  useEffect(() => {
    if (!isRaceStarted) return;

    const interval = setInterval(() => {
      setPlayers(prev => prev.map(player => ({
        ...player,
        progress: Math.min(100, player.progress + Math.random() * 2),
        wpm: Math.max(0, player.wpm + (Math.random() - 0.5) * 3),
        currentWord: Math.floor((player.progress / 100) * 50)
      })));

      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRaceStarted]);

  // Handle countdown
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      setIsRaceStarted(true);
    }
  }, [showCountdown, countdown]);

  const startRace = () => {
    setShowCountdown(true);
    setCountdown(3);
  };

  const leaveRoom = () => {
    // Handle room exit logic here
    console.log("Leaving room...");
  };

  const renderHeader = () => (
    <div style={{
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
      gap: window.innerWidth < 768 ? '16px' : '0',
      marginBottom: '24px',
      padding: window.innerWidth < 768 ? '16px' : '20px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
      borderRadius: '16px',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={leaveRoom}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            color: '#fca5a5',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            minWidth: 'fit-content'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          <ArrowLeft size={16} />
          Leave Room
        </button>
        
        <div>
          <h1 style={{
            margin: 0,
            fontSize: window.innerWidth < 768 ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            color: '#e2e8f0',
            wordBreak: 'break-all'
          }}>
            Room: {roomData.roomId}
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            {players.length} players • {roomData.spectators.length} spectators
          </p>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'rgba(245, 158, 11, 0.2)',
          borderRadius: '10px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <Clock size={18} style={{ color: '#f59e0b' }} />
          <span style={{
            color: '#fbbf24',
            fontWeight: '700',
            fontSize: '16px'
          }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        {!isRaceStarted && !showCountdown && (
          <button
            onClick={startRace}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '10px',
              color: '#000',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Start Race
          </button>
        )}
      </div>
    </div>
  );

  const renderCountdown = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        fontSize: window.innerWidth < 768 ? '5rem' : '8rem',
        fontWeight: '900',
        color: '#f59e0b',
        animation: 'pulse 1s ease-in-out',
        textShadow: '0 0 30px rgba(245, 158, 11, 0.5)'
      }}>
        {countdown}
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );

  const renderRaceTrack = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
      borderRadius: '16px',
      padding: window.innerWidth < 768 ? '16px' : '24px',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      marginBottom: '24px'
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        color: '#e2e8f0',
        fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
        fontWeight: '600'
      }}>
        Race Progress
      </h3>

      {players.map((player, index) => (
        <div key={player.id} style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 480 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: window.innerWidth < 480 ? 'flex-start' : 'center',
            marginBottom: '8px',
            gap: window.innerWidth < 480 ? '8px' : '0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '20px' }}>{player.avatar}</span>
              <span style={{
                color: '#e2e8f0',
                fontWeight: '600',
                fontSize: window.innerWidth < 480 ? '14px' : '16px'
              }}>
                {player.username}
              </span>
              <span style={{
                color: '#94a3b8',
                fontSize: window.innerWidth < 480 ? '12px' : '14px'
              }}>
                {player.wpm.toFixed(0)} WPM • {player.accuracy}% accuracy
              </span>
            </div>
            <span style={{
              color: '#f59e0b',
              fontWeight: '700',
              fontSize: window.innerWidth < 480 ? '14px' : '16px'
            }}>
              {player.progress.toFixed(0)}%
            </span>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            height: '12px',
            background: 'rgba(51, 65, 85, 0.6)',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${player.progress}%`,
              height: '100%',
              background: index === 0 
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              transition: 'width 0.3s ease',
              borderRadius: '6px'
            }} />
            
            {/* Improved flag design */}
            <div style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              background: 'rgba(245, 158, 11, 0.9)',
              borderRadius: '50%',
              border: '2px solid rgba(245, 158, 11, 1)',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
            }}>
              <Flag size={12} style={{ color: '#000' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTypingArea = () => {
    const words = roomData.paragraph.split(' ');
    const maxProgress = Math.max(...players.map(p => p.currentWord));

    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
        borderRadius: '16px',
        padding: window.innerWidth < 768 ? '16px' : '32px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#e2e8f0',
          fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
          fontWeight: '600'
        }}>
          Typing Text
        </h3>

        <div style={{
          fontSize: window.innerWidth < 768 ? '18px' : '24px',
          lineHeight: '1.8',
          fontFamily: 'monospace',
          padding: window.innerWidth < 768 ? '16px' : '20px',
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '12px',
          border: '2px solid rgba(148, 163, 184, 0.1)',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {words.map((word, index) => {
            let color = '#64748b'; // default gray
            
            // Color based on players' progress
            if (index < Math.min(...players.map(p => p.currentWord))) {
              color = '#10b981'; // completed by all
            } else if (index < maxProgress) {
              color = '#f59e0b'; // in progress
            }

            return (
              <span
                key={index}
                style={{
                  color,
                  marginRight: '8px',
                  transition: 'color 0.3s ease',
                  display: 'inline'
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLeaderboard = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
      borderRadius: '16px',
      padding: window.innerWidth < 768 ? '16px' : '24px',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Trophy size={20} style={{ color: '#f59e0b' }} />
        <h3 style={{
          margin: 0,
          color: '#e2e8f0',
          fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
          fontWeight: '600'
        }}>
          Live Leaderboard
        </h3>
      </div>

      {players
        .sort((a, b) => b.progress - a.progress)
        .map((player, index) => (
          <div
            key={player.id}
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 480 ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: window.innerWidth < 480 ? 'flex-start' : 'center',
              padding: window.innerWidth < 768 ? '12px' : '16px',
              background: index === 0 
                ? 'rgba(245, 158, 11, 0.1)' 
                : 'rgba(30, 41, 59, 0.5)',
              borderRadius: '10px',
              marginBottom: index < players.length - 1 ? '12px' : '0',
              border: index === 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(148, 163, 184, 0.1)',
              gap: window.innerWidth < 480 ? '12px' : '0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: index === 0 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'rgba(51, 65, 85, 0.6)',
                color: index === 0 ? '#000' : '#e2e8f0',
                fontWeight: '700'
              }}>
                {index === 0 ? <Crown size={16} /> : index + 1}
              </div>
              <span style={{ fontSize: '18px' }}>{player.avatar}</span>
              <span style={{
                color: '#e2e8f0',
                fontWeight: '600',
                fontSize: window.innerWidth < 480 ? '14px' : '16px'
              }}>
                {player.username}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: '#94a3b8',
              fontSize: window.innerWidth < 480 ? '12px' : '14px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={14} style={{ color: '#f59e0b' }} />
                {player.wpm.toFixed(0)} WPM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Target size={14} style={{ color: '#10b981' }} />
                {player.accuracy}%
              </div>
              <div style={{
                color: '#f59e0b',
                fontWeight: '700'
              }}>
                {player.progress.toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  const renderSpectators = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
      borderRadius: '16px',
      padding: window.innerWidth < 768 ? '16px' : '24px',
      border: '1px solid rgba(148, 163, 184, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Eye size={20} style={{ color: '#f59e0b' }} />
        <h3 style={{
          margin: 0,
          color: '#e2e8f0',
          fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
          fontWeight: '600'
        }}>
          Spectators ({roomData.spectators.length})
        </h3>
      </div>

      {roomData.spectators.length === 0 ? (
        <p style={{
          color: '#94a3b8',
          margin: 0,
          textAlign: 'center',
          padding: '20px'
        }}>
          No spectators watching
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 
            ? '1fr' 
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {roomData.spectators.map((spectator) => (
            <div
              key={spectator.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '10px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}
            >
              <span style={{ fontSize: '16px' }}>{spectator.avatar}</span>
              <span style={{
                color: '#e2e8f0',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {spectator.username}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: window.innerWidth < 768 ? '12px' : '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {renderHeader()}
        {renderRaceTrack()}
        {renderTypingArea()}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
          gap: '24px'
        }}>
          {renderLeaderboard()}
          {renderSpectators()}
        </div>
      </div>

      {showCountdown && renderCountdown()}
    </div>
  );
};

export default RoomPage;