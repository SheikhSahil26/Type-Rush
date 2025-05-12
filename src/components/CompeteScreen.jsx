import React, { useState, useEffect } from 'react';
import './competeScreen.css';
import { useFirebase } from '../context/FirebaseContext';

const CompeteScreen = ({handleStartAndCloseCompeteMode,onStartCompetition}) => {
  const [username, setUsername] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showUsernamePage, setShowUsernamePage] = useState(true);
  const [error, setError] = useState('');


    const {storeUsersToOnlineLobby,usersInLobby}=useFirebase()

    console.log(usersInLobby)





  
  useEffect(() => {
    
    setOnlinePlayers(Object.values(usersInLobby))
    console.log(onlinePlayers)
    
  }, [usersInLobby]);

  const handleSubmitUsername = async() => {
    if (username.trim().length >= 3) {

        const res= await storeUsersToOnlineLobby(username);
        console.log(res)

        if(res==="username already exist"){
            setError('username already exist');
        }
        else{
            setShowUsernamePage(false);
            setError('');
        }


      
    } else {
      setError('Username must be at least 3 characters');
    }
  };

  const handleSelectPlayer = (player) => {
    if (player.status === 'busy') {
      return;
    }
    setSelectedPlayer(player);  
  };

  const handleStartCompetition = () => {
    if (selectedPlayer) {
      onStartCompetition(username, selectedPlayer);
    }
  };

  return (
    <div className="compete-screen-overlay">
      <div className="compete-screen-container">
        <div className="compete-screen-header">
          <h2>Compete with Others</h2>
          <button 
            onClick={handleStartAndCloseCompeteMode} 
            className="close-button"
          >
            &times;
          </button>
        </div>

        {showUsernamePage ? (
          <div className="username-page">
            <div className="username-input-group">
              <label>Choose a username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button
              onClick={handleSubmitUsername}
              className="continue-button"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="player-selection-page">
            <h3>Select a player to challenge:</h3>
            <div className="online-players-list">
              {onlinePlayers.map(player => (
                <div
                  key={player.username}
                  onClick={() => handleSelectPlayer(player)}
                  className={`player-item ${
                    selectedPlayer?.username === player.username 
                      ? 'selected' 
                      : player.status === 'busy' 
                        ? 'busy' 
                        : ''
                  }`}
                >
                  <div className="player-info">
                    <div className="player-username">{player.username}</div>
                    <div className="player-wpm">WPM: {player.wpm}</div>
                  </div>
                  <div className="player-status">
                    <span className={`status-indicator ${player.status}`}></span>
                    <span className="status-text">{player.status}</span>
                  </div>                                                
                </div>
              ))}
            </div>
            <div className="action-buttons">
              <button
                onClick={() => setShowUsernamePage(true)}
                className="back-button"
              >
                Back
              </button>
              <button
                // onClick={handleStartCompetition}
                disabled={!selectedPlayer}
                className={`start-competition-button ${selectedPlayer ? 'active' : 'disabled'}`}
              >
                Start Competition
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompeteScreen;