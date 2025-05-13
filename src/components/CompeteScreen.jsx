import React, { useState, useEffect } from 'react';
import './competeScreen.css';
import { useFirebase } from '../context/FirebaseContext';
import { useAuthContext } from '../context/AuthContext';

const CompeteScreen = ({handleStartAndCloseCompeteMode,onStartCompetition}) => {
  const [username, setUsername] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // const [showUsernamePage, setShowUsernamePage] = useState(true);
  const [error, setError] = useState('');
 
  
  const {authUser}=useAuthContext()

    const {storeUsersToOnlineLobby,usersInLobby,deleteUserFromOnlineLobby,sendChallengeToPlayer}=useFirebase()

    console.log(usersInLobby)

    useEffect(()=>{
      const setPlayerOnline=async()=>{
          const res= await storeUsersToOnlineLobby(authUser.username);
          console.log(res)
      }
      setPlayerOnline()
      
    },[])

  useEffect(() => {
    
    setOnlinePlayers(Object.values(usersInLobby))
    console.log(onlinePlayers)
    
  }, [usersInLobby]);

  

  const handleSelectPlayer = (player) => {
    if (player.status === 'busy') {
      console.log("player is already matching with others")
      return
    }
    console.log(player)
    setSelectedPlayer(player);  
  };

  


  const handleStartCompetition = async() => {
    if (selectedPlayer) {
      //when one user selects other for match that user will get challenge to accept or decline
      const res=await sendChallengeToPlayer(selectedPlayer.username,authUser.username)
      
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
                onClick={handleStartAndCloseCompeteMode}
                className="back-button"
              >
                Back
              </button>
              <button
                onClick={handleStartCompetition}
                disabled={!selectedPlayer}
                className={`start-competition-button ${selectedPlayer ? 'active' : 'disabled'}`}
              >
                Start Competition
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CompeteScreen;