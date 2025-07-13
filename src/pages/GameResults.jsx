import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Zap, Clock, TrendingUp, Award, Crown, Medal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './gameresults.css';
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';


const GameResults = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  const navigate=useNavigate()

  const {authUser}=useAuthContext()

  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const {roomId}=useParams();
  console.log(roomId,backendUrl)

  const [room,setRoom]=useState({})
  const [players, setPlayers] = useState([]);
  const [user,setUser]=useState({})
  const [opponent,setOpponent]=useState({})
  const [opponentUsername,setOpponentUsername]=useState("");

  useEffect(()=>{
    const fetchGameResults=async()=>{
      try{
        const res = await fetch(`${backendUrl}/api/room/results/${roomId}`,{
          method:"GET",
          credentials:"include",
           headers: {
          "Content-Type": "application/json"
        },
        })
        const data = await res.json();

        if(data.error) throw new Error(data.error)

      const roomData = data.roomData;

      const opponentUsername = Object.keys(roomData.progress).find(
      username => username !== authUser.username
      );

      if (opponentUsername) {
        setOpponent(roomData.progress[opponentUsername]);
        setOpponentUsername(opponentUsername);
      } 
      console.log(roomData.progress[authUser.username])

      

        console.log(roomData)

        setUser(roomData.progress[authUser.username])

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
    



      }
      catch(err){
        toast.error(err.message)
        console.log(err)
      }
    }
    fetchGameResults();
  },[])


console.log(players)

  
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
        avgWpm: 72,
        avgAcc: 96.5,
        finalTyped: 432,
        correctCharacters: 417,
        position: 1,
      },
      {
        id: 2,
        username: "TypoMaster", 
        avatar: "⚡",
        avgWpm: 65,
        averageWpm: 62,
        avgAcc: 98.2,
        finalTyped: 378,
        correctCharacters: 371,
        position: 2,
        // completionTime: 180
      }
    ]
  };

  // Generate mock real-time data for graphs
 const generateTimeSeriesData = (player1, player2, durationInSeconds) => {
  const data = [];

  const maxLength = Math.max(
    player1.wpm.length,
    player2.wpm.length,
    player1.accuracy.length,
    player2.accuracy.length
  );

  const interval = Math.floor(durationInSeconds / maxLength); // seconds between each data point

  for (let i = 0; i < maxLength; i++) {
    data.push({
      time: i * interval,
      [`${authUser.username}_wpm`]: player1.wpm[i] || 0,
      [`${opponentUsername}_wpm`]: player2.wpm[i] || 0,
      [`${authUser.username}_accuracy`]: player1.accuracy[i] || 0,
      [`${opponentUsername}_accuracy`]: player2.accuracy[i] || 0,
    });
  }

  return data;
};

 const [timeSeriesData, setTimeSeriesData] = useState([]);

useEffect(() => {
  if (players.length === 2 && room?.timer?.currentTime) {
    try {
      const tsData = generateTimeSeriesData(user, opponent, room.timer.currentTime);
      setTimeSeriesData(tsData);
    } catch (err) {
      console.error("Failed to generate time series:", err);
    }
  }
}, [players, room]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const leaveRoom=async()=>{
    try{
      const res=await fetch(`${backendUrl}/api/room/delete-user/${authUser.username}`,{
      credentials:"include",
      method:"POST",
      headers: {
          "Content-Type": "application/json"
        },
    })

      navigate(`/`);

    }catch(err){
      
      toast.error("error leaving room")
    }
    

    
  }

  const renderHeader = () => (
    <div className="header">
      <div className="header-content">
        <button
          onClick={leaveRoom}
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
            Room: {roomId} • Duration: {Math.floor(room?.timer?.currentTime)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderWinnerCard = () => {
    const winner = room.winner;

    const player=(authUser.username===winner?user:opponent);
    console.log(player)
    
    return (
      <div className="winner-card">
        <div className="winner-bg-animation" />
        
        <div className="winner-content">
          <div className="winner-avatar">
            {player?.avatar}
          </div>
          
          <h2 className="winner-title">
            🎉 {(winner===authUser.username)?authUser.username:opponentUsername} Wins! 🎉
          </h2>
          
          <div className="winner-stats">
            <div className="winner-stat">
              <div className="stat-value wpm-color">
                {player?.avgWPM?.toFixed(0)}
              </div>
              <div className="stat-label">WPM</div>
            </div>
            
            <div className="winner-stat">
              <div className="stat-value accuracy-color">
                {player?.avgAcc?.toFixed(0)}%
              </div>
              <div className="stat-label">Accuracy</div>
            </div>
            
            <div className="winner-stat">
              <div className="stat-value time-color">
                {room?.timer?.currentTime}s
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
       <div
         
          className={`player-card ${opponent?.position === 1 ? 'winner-border' : ''}`}
        >
          {opponent?.position === 1 && (
            <div className="crown-badge">
              <Crown size={16} />
            </div>
          )}
          
          <div className="player-header">
            <div className="player-avatar">
              {opponent?.avatar}
            </div>
            
            <div className="player-info">
              <h3 className="player-name">
                {opponent?.username}
              </h3>
              <div className="player-position">
                <Medal size={16} className="medal-icon" />
                <span className="position-text">
                  {opponent?.position === 1 ? 'Winner' : `${opponent?.position}nd Place`}
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
                {opponent.avgWPM?.toFixed(0)}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Target size={16} className="stat-icon accuracy-color" />
                <span className="stat-title">Accuracy</span>
              </div>
              <div className="stat-number accuracy-color">
                {opponent.avgAcc?.toFixed(0)}%
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <TrendingUp size={16} className="stat-icon avg-color" />
                <span className="stat-title">Avg WPM</span>
              </div>
              <div className="stat-number avg-color">
                {opponent.avgWPM?.toFixed(0)}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Clock size={16} className="stat-icon time-color" />
                <span className="stat-title">Time</span>
              </div>
              <div className="stat-number time-color">
                {room?.timer?.currentTime}s
              </div>
            </div>
          </div>

          <div className="character-progress">
            <div className="progress-info">
              <span>Characters Typed</span>
              <span className="progress-numbers">
                {/* {player.correctCharacters}/{player.totalCharacters} */}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                // style={{ width: `${(player.correctCharacters / player.totalCharacters) * 100}%` }}
              />
            </div>
          </div>
        </div>
        


         <div
          
          className={`player-card ${user?.position === 1 ? 'winner-border' : ''}`}
        >
          {user?.position === 1 && (
            <div className="crown-badge">
              <Crown size={16} />
            </div>
          )}
          
          <div className="player-header">
            <div className="player-avatar">
              {user?.avatar}
            </div>
            
            <div className="player-info">
              <h3 className="player-name">
                {authUser.username}
              </h3>
              <div className="player-position">
                <Medal size={16} className="medal-icon" />
                <span className="position-text">
                  {user?.position === 1 ? 'Winner' : `${user?.position}nd Place`}
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
                {user.avgWPM?.toFixed(0)}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Target size={16} className="stat-icon accuracy-color" />
                <span className="stat-title">Accuracy</span>
              </div>
              <div className="stat-number accuracy-color">
                {user.avgAcc?.toFixed(0)}%
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <TrendingUp size={16} className="stat-icon avg-color" />
                <span className="stat-title">Avg WPM</span>
              </div>
              <div className="stat-number avg-color">
                {user.avgWPM?.toFixed(0)}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-header">
                <Clock size={16} className="stat-icon time-color" />
                <span className="stat-title">Time</span>
              </div>
              <div className="stat-number time-color">
                 {room?.timer?.currentTime}s
              </div>
            </div>
          </div>

          <div className="character-progress">
            <div className="progress-info">
              <span>Characters Typed</span>
              <span className="progress-numbers">
                {/* {player.correctCharacters}/{player.totalCharacters} */}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                // style={{ width: `${(player.correctCharacters / player.totalCharacters) * 100}%` }}
              />
            </div>
          </div>
        </div>
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
                 dataKey={`${authUser.username}_wpm`} 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={false}
                name="SpeedDemon"
              />
              <Line 
                type="monotone" 
                dataKey={`${opponentUsername}_wpm`} 
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
                 dataKey={`${authUser.username}_wpm`} 
                stroke="#10b981" 
                strokeWidth={3}
                dot={false}
                name="SpeedDemon"
              />
              <Line 
                type="monotone" 
                dataKey={`${opponentUsername}_wpm`} 
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
    { metric: 'Final WPM', [authUser.username]: user.avgWPM, [opponentUsername]: opponent.avgWPM },
    { metric: 'Accuracy', [authUser.username]: user.avgAcc, [opponentUsername]: opponent.avgAcc },
    { metric: 'Avg WPM', [authUser.username]: user.avgWPM, [opponentUsername]: opponent.avgWPM }
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
    <Bar dataKey={authUser.username} fill="#f59e0b" radius={[4, 4, 0, 0]} />
    <Bar dataKey={opponentUsername} fill="#3b82f6" radius={[4, 4, 0, 0]} />
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