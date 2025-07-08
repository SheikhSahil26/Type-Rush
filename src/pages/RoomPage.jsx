import React, { useState, useEffect,useRef } from 'react';
import { ArrowLeft, Flag, Crown, Eye, Users, Clock, Zap, Target, Trophy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { db } from '../context/FirebaseContext';
import { ref, onValue,remove,onDisconnect,set, get,update } from 'firebase/database';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './room.css'
// import useRoomData from '../hooks/useRoomData'; 

  
const RoomPage = () => {

  const {authUser}=useAuthContext()
  
  // const [timeLeft, setTimeLeft] = useState(60);
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [paragraph, setParagraph] = useState('');
    // const [players, setPlayers] = useState([]);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalLength,setTotalLength]=useState(0);

    const inputRef = useRef(null);

  const {roomId}=useParams()
 

  // const {getRoomData}=useRoomData()
  const backendUrl=import.meta.env.VITE_BACKEND_URL

  const [room,setRoom]=useState({})

  const [players, setPlayers] = useState([]);

 useEffect(() => {
  if (!roomId) return;

  const getRoomData = async (roomId) => {
    try {
      const res = await fetch(`${backendUrl}/api/room/room-data/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      const roomData = data.roomData;

      setTotalLength(roomData.paragraph.length);

      

      setRoom(roomData);

      // Dynamically build players array from progress + usernames
      const tempPlayers = [];
      if (roomData.player && roomData.progress?.[roomData.player]) {
        tempPlayers.push({
          id: 1,
          username: roomData.player,
          avatar: "🥷",
          progress: 0,
          wpm: roomData.progress[roomData.player].wpm,
          accuracy: roomData.progress[roomData.player].accuracy,
          position: 1,
          isFinished: roomData.progress[roomData.player].isFinished,
          currentWord: 0
        });
      }
      if (roomData.host && roomData.progress?.[roomData.host]) {
        tempPlayers.push({
          id: 2,
          username: roomData.host,
          avatar: "🧙",
          progress: 0,
          wpm: roomData.progress[roomData.host].wpm,
          accuracy: roomData.progress[roomData.host].accuracy,
          position: 2,
          isFinished: roomData.progress[roomData.host].isFinished,
          currentWord: 0
        });
      }

      setPlayers(tempPlayers);
    
    } catch (err) {
      console.error("Failed to fetch room:", err);
    }
  };

  getRoomData(roomId);
}, [roomId]);

  const [timeLeft, setTimeLeft] = useState(room?.timer?.currentTime || 60);
useEffect(() => {
  if (room?.timer?.currentTime) {
    setTimeLeft(room.timer.currentTime);
  }
}, [room]);


useEffect(() => {
  const progressRef = ref(db, `myDB/challengeRoom/${roomId}/progress`);
  const unsubscribe = onValue(progressRef, (snapshot) => {
    const progressData = snapshot.val();
    if (!progressData) return;

    const updatedPlayers = Object.entries(progressData).map(([username, stats], i) => ({
      id: i + 1,
      username,
      typed: stats.typed || 0,
      wpm: stats.wpm || 0,
      accuracy: stats.accuracy || 100,
    }));
    
    setPlayers(updatedPlayers); // ← This triggers UI update in real-time
  });

  return () => unsubscribe(); // Cleanup
}, [roomId]);



  
//   useEffect(() => {

//   if (!roomId) return;

//   const roomRef = ref(db, `myDB/challengeRoom/${roomId}`);

//   const unsubscribe = onValue(
//     roomRef,
//     (snapshot) => {
//       try {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           console.log(data)
//           // Defensive checks in case any fields are objects
//           setParagraph(typeof data.paragraph === 'object' ? JSON.stringify(data.paragraph) : data.paragraph || '');
//           setProgress(typeof data.progress === 'number' ? data.progress : 0);
//           setStatus(typeof data.status === 'string' ? data.status : '');
//           setTimer(typeof data.timer === 'number' ? data.timer : 0);

//           // Safely handle player objects
//           const safePlayers = [data.player1, data.player2]
//             .filter(Boolean)
//             .map(p => typeof p === 'object' ? p.username || JSON.stringify(p) : p);
//           setPlayers(safePlayers);
//         } else {
//           console.warn('No room found');
//           toast.error("no room found")
//         }
//       } catch (err) {
//         console.error('Data processing error:', err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     (error) => {
//       console.error('Error fetching room:', error);
//       setLoading(false);
//     }
//   );

//   return () => unsubscribe();
// }, [roomId]);


  // Mock data for demonstration
  // const [roomData] = useState({
  //   roomId: "ROOM-ABC123",
  //   paragraph: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. It has been used for decades to test typewriters, keyboards, and fonts. The sentence is short, memorable, and perfect for typing practice. Many typists use this phrase to warm up their fingers before longer typing sessions.",
  //   players: [
  //     {
  //       id: 1,
  //       username: "SpeedDemon",
  //       avatar: "🏆",
  //       progress: 45, // percentage
  //       wpm: 78,
  //       accuracy: 96.5,
  //       position: 1,
  //       isFinished: false,
  //       currentWord: 23
  //     },
  //     {
  //       id: 2,
  //       username: "TypoMaster",
  //       avatar: "⚡",
  //       progress: 38,
  //       wpm: 65,
  //       accuracy: 98.2,
  //       position: 2,
  //       isFinished: false,
  //       currentWord: 19
  //     }
  //   ],
  //   spectators: [
  //     { id: 1, username: "WatcherOne", avatar: "👀" },
  //     { id: 2, username: "TypingFan", avatar: "🎯" },
  //     { id: 3, username: "KeyboardLover", avatar: "⌨️" },
  //     { id: 4, username: "SpeedWatcher", avatar: "🚀" },
  //     { id: 5, username: "RaceObserver", avatar: "🏁" }
  //   ]
  // });

  // const [players, setPlayers] = useState(roomData.players);

  // Simulate race progress
  useEffect(() => {
    if (!isRaceStarted) return;

    inputRef.current?.focus();

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

const navigate = useNavigate();
const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);

useEffect(() => {
  if (!roomId || !authUser?.username) return;

  const statusRef = ref(db, `myDB/challengeRoom/${roomId}/status`);
  const winnerRef = ref(db, `myDB/challengeRoom/${roomId}/winner`);

  const unsubscribeStatus = onValue(statusRef, (statusSnap) => {
    const statusVal = statusSnap.val();
    if (!statusVal) return;

    onValue(winnerRef, (winnerSnap) => {
      const winnerVal = winnerSnap.val();
      if (winnerVal === authUser.username) {
        // 🎉 Trigger animation
        setShowWinnerAnimation(true);

        // After delay (e.g. 5 seconds), go to analysis page
        setTimeout(() => {
          navigate(`/room/${roomId}/results`);
        }, 5000);
      }
    }, { onlyOnce: true });
  });

  return () => {
    unsubscribeStatus();
  };
}, [roomId, authUser?.username, navigate]);



 



// Inside your component


const leaveRoom = async () => {
  if (!authUser?.username || !roomId || !room) return;

  console.log("Leaving room...");

  const updates = {};
  const isHost = authUser.username === room.host;
  const isPlayer = authUser.username === room.player;

  // updates[`myDB/challengeRoom/${roomId}/progress/${authUser.username}`] = null;
  updates[`myDB/challengeRoom/${roomId}/spectators/${authUser.username}`] = null;
  updates[`myDB/online-users/${authUser.username}/roomJoined`]=0;
  updates[`myDB/online-users/${authUser.username}/status`]="free";

  if (isHost) {
    updates[`myDB/challengeRoom/${roomId}/host`] = null;
    updates[`myDB/challengeRoom/${roomId}/status`] = "player-won";
    updates[`myDB/challengeRoom/${roomId}/winner`] = room.player;
  } else if (isPlayer) {
    updates[`myDB/challengeRoom/${roomId}/player`] = null;
    updates[`myDB/challengeRoom/${roomId}/status`] = "host-won";
    updates[`myDB/challengeRoom/${roomId}/winner`] = room.host;
  }

  await update(ref(db), updates);

  // ✅ Redirect to homepage after leaving
  navigate("/");
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
            <h1>Room: {roomId}</h1>
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            {players.length} players • {room?.spectators?.length} spectators
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

        {!isRaceStarted && !showCountdown && authUser.username===room.host && (
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
                {player.wpm?.toFixed(0)} WPM • {player.accuracy}% accuracy
              </span>
            </div>
            <span style={{
              color: '#f59e0b',
              fontWeight: '700',
              fontSize: window.innerWidth < 480 ? '14px' : '16px'
            }}>
              {player?.progress?.toFixed(0)}%
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

  const [typedText, setTypedText] = useState("");


const handleTyping = (e) => {
  const input = e.target.value;
  console.log(input)
  setTypedText(input);

  const words = (room?.paragraph || "").split(" ");
  const currentWordIndex = players.find(p => p.username === authUser)?.currentWord || 0;
  const currentWord = words[currentWordIndex] || "";

  // Move to next word on space and update Firebase
  if (input.endsWith(" ")) {
    const cleanedInput = input.trim();
    const isCorrect = cleanedInput === currentWord;

    const progressRef = ref(db, `myDB/challengeRoom/${roomId}/progress/${authUser}`);
    update(progressRef, {
      currentWord: currentWordIndex + 1,
      typed: (players.find(p => p.username === authUser)?.typed || 0) + 1,
      accuracy: isCorrect ? 100 : 90 // dummy logic, refine as needed
    });

    setTypedText(""); // clear for next word
  }
};


 const renderTypingArea = () => {
  const words = (room?.paragraph || "").split(" ");
  const currentPlayer = players.find(p => p.username === authUser);
  const currentWordIndex = currentPlayer?.currentWord || 0;

  return (
    <div style={{ 
      padding: "20px", 
      borderRadius: "12px", 
      background: "#1e293b",
      marginBottom: "24px" 
    }}>
      <h3 style={{ color: "#f8fafc", marginBottom: "12px" }}>Typing Text</h3>

      <div style={{
        fontFamily: "monospace",
        fontSize: "18px",
        lineHeight: "1.6",
        background: "#0f172a",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #334155",
        minHeight: "120px",
        maxHeight: "200px",
        overflow: "auto",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap"
      }}>
        {words.map((word, i) => {
          let style = { 
            color: "#64748b", 
            marginRight: "8px",
            display: "inline-block"
          };

          if (i < currentWordIndex) style.color = "#10b981"; // completed
          if (i === currentWordIndex) {
            // Color current word with per-letter accuracy
            const letters = word.split("").map((char, index) => {
              let color = "#94a3b8"; // neutral
              if (typedText[index] === char) color = "#10b981"; // correct
              else if (typedText[index] !== undefined) color = "#ef4444"; // incorrect

              return <span key={index} style={{ color }}>{char}</span>;
            });

            return (
              <span key={i} style={style}>
                {letters}
              </span>
            );
          }

          return <span key={i} style={style}>{word}</span>;
        })}
      </div>

      {/* Hidden input to capture typing */}
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleTyping}
        style={{
          opacity: 0,
          position: "absolute",
          pointerEvents: "none"
        }}
      />

      <button
        onClick={() => inputRef.current?.focus()}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#10b981",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Focus & Start Typing
      </button>
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
                {/* {player.wpm.toFixed(0)} WPM */}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Target size={14} style={{ color: '#10b981' }} />
                {player.accuracy}%
              </div>
              <div style={{
                color: '#f59e0b',
                fontWeight: '700'
              }}>
                {/* {player.progress.toFixed(0)}% */}
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
          Spectators ({room?.spectators?.length})
        </h3>
      </div>

      {room?.spectators?.length === 0 ? (
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
          {room?.spectators?.map((spectator) => (
            <div
              key={spectator}
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
              {/* <span style={{ fontSize: '16px' }}>{spectator.avatar}</span> */}
              <span style={{
                color: '#e2e8f0',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {spectator}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
    
    {showWinnerAnimation && (
  <div className="winner-animation">
    <h1 className="winner-text">🎉 You Won!</h1>
    <p className="subtext">Redirecting to performance analysis...</p>
    <div className="trophy-animation">🏆</div>
  </div>
)}


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
    </>
  );
};

export default RoomPage;