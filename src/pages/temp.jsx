import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../context/FirebaseContext';
import { ref, onValue } from 'firebase/database';

const RoomPage = () => {
  const { roomId } = useParams();
  const [paragraph, setParagraph] = useState('');
  const [players, setPlayers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch room data
useEffect(() => {
  if (!roomId) return;

  const roomRef = ref(db, `myDB/challengeRoom/${roomId}`);

  const unsubscribe = onValue(
    roomRef,
    (snapshot) => {
      try {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Defensive checks in case any fields are objects
          setParagraph(typeof data.paragraph === 'object' ? JSON.stringify(data.paragraph) : data.paragraph || '');
          setProgress(typeof data.progress === 'number' ? data.progress : 0);
          setStatus(typeof data.status === 'string' ? data.status : '');
          setTimer(typeof data.timer === 'number' ? data.timer : 0);

          // Safely handle player objects
          const safePlayers = [data.player1, data.player2]
            .filter(Boolean)
            .map(p => typeof p === 'object' ? p.username || JSON.stringify(p) : p);
          setPlayers(safePlayers);
        } else {
          console.warn('No room found');
        }
      } catch (err) {
        console.error('Data processing error:', err);
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      console.error('Error fetching room:', error);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, [roomId]);


  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'waiting': return '⏳';
      case 'active': return '🔥';
      case 'finished': return '🏆';
      default: return '🎮';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'waiting': return '#f59e0b';
      case 'active': return '#10b981';
      case 'finished': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(245, 158, 11, 0.3)',
            borderTop: '4px solid #f59e0b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ margin: 0, color: '#f59e0b' }}>Loading Battle Arena...</h2>
          <p style={{ margin: '10px 0 0', color: 'rgba(255, 255, 255, 0.7)' }}>Preparing your typing challenge</p>
          <style>
            {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)',
          backgroundSize: '200% 100%',
          animation: 'gradient 2s ease infinite'
        }}></div>
        
        <h1 style={{
          margin: '0 0 10px',
          fontSize: '2.5rem',
          background: 'linear-gradient(to right, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(245, 158, 11, 0.3)'
        }}>
          🏟️ Battle Arena
        </h1>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(245, 158, 11, 0.1)',
          padding: '8px 16px',
          borderRadius: '25px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#f59e0b',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          🔑 Room: {roomId}
        </div>

        <style>
          {`@keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}
        </style>
      </div>

      {/* Status and Timer Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Status Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '10px'
          }}>
            {getStatusIcon(status)}
          </div>
          <h3 style={{
            margin: '0 0 5px',
            color: getStatusColor(status),
            fontSize: '1.3rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '700'
          }}>
            {status || 'Unknown'}
          </h3>
          <p style={{
            margin: 0,
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem'
          }}>
            Battle Status
          </p>
        </div>

        {/* Timer Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '2.5rem',
            color: timer <= 10 ? '#ef4444' : '#10b981',
            fontWeight: 'bold',
            marginBottom: '5px',
            textShadow: `0 0 20px ${timer <= 10 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)'}`
          }}>
            {timer}s
          </div>
          <p style={{
            margin: 0,
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem'
          }}>
            ⏱️ Time Remaining
          </p>
        </div>
      </div>

      {/* Players Section */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h2 style={{
          margin: '0 0 20px',
          color: 'white',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ⚔️ Warriors in Battle
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: players.length > 1 ? '1fr 1fr' : '1fr',
          gap: '15px'
        }}>
          {players.length > 0 ? players.map((player, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${idx === 0 ? '#f59e0b' : '#10b981'}, ${idx === 0 ? '#d97706' : '#059669'})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {idx === 0 ? '👑' : '⚡'}
              </div>
              <div>
                <h4 style={{
                  margin: '0 0 5px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  {player}
                </h4>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.85rem'
                }}>
                  {idx === 0 ? 'Player 1' : 'Player 2'}
                </p>
              </div>
            </div>
          )) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👻</div>
              <p>No warriors have joined the battle yet...</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h2 style={{
          margin: '0 0 20px',
          color: 'white',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📊 Battle Progress
        </h2>
        
        <div style={{
          background: 'rgba(51, 65, 85, 0.5)',
          borderRadius: '25px',
          padding: '4px',
          marginBottom: '15px'
        }}>
          <div style={{
            background: `linear-gradient(90deg, #f59e0b, ${progress > 50 ? '#10b981' : '#d97706'})`,
            height: '20px',
            borderRadius: '20px',
            width: `${progress}%`,
            transition: 'all 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: progress > 10 ? '10px' : '0',
            minWidth: progress > 0 ? '20px' : '0'
          }}>
            {progress > 10 && (
              <span style={{
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {progress}%
              </span>
            )}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem'
        }}>
          <span>0%</span>
          <span style={{ color: progress > 50 ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
            {progress}% Complete
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Paragraph Section */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px'
      }}>
        <h2 style={{
          margin: '0 0 20px',
          color: 'white',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📝 Challenge Text
        </h2>
        
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(245, 158, 11, 0.2)',
          borderRadius: '16px',
          padding: '25px',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: 'monospace',
          position: 'relative',
          minHeight: '120px'
        }}>
          {paragraph ? (
            <div>
              {paragraph}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                CHALLENGE
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontStyle: 'italic'
            }}>
              <span>⏳ Waiting for challenge text to load...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;