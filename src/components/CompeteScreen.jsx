import React, { useState, useEffect } from 'react';
import './competeScreen.css';
import { useFirebase } from '../context/FirebaseContext';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CompeteScreen = ({ handleStartAndCloseCompeteMode, onStartCompetition }) => {
  const [username, setUsername] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  // const [showUsernamePage, setShowUsernamePage] = useState(true);
  const [error, setError] = useState('');
  const [challenger, setChallenger] = useState('');
  const [notifyMess, setNotifyMess] = useState('');

  const navigate = useNavigate();

  const { authUser } = useAuthContext()

  const { storeUsersToOnlineLobby, usersInLobby, deleteUserFromOnlineLobby, sendChallengeToPlayer, incomingChallenge, makeRoomWhenChallengeAccepted, sendNotificationForDenial, loadingUsers } = useFirebase()

  console.log(incomingChallenge)

  console.log(usersInLobby)

  //this useEffect is for setting the authUser --> current user online!!
  useEffect(() => {
    const setPlayerOnline = async () => {
      const res = await storeUsersToOnlineLobby(authUser.username);
      console.log(res)
    }
    setPlayerOnline()

  }, [])


  useEffect(() => {

    const filteredUsers = Object.values(usersInLobby).filter(
      user => user.username !== authUser.username
    );
    setOnlinePlayers(filteredUsers);
  }, [usersInLobby]);



  const handleSelectPlayer = (player) => {
    if (player.status === 'busy') {
      console.log("player is already in match!!!")
      return
    }
    console.log(player)
    setSelectedPlayer(player);
  };

  const handleSendChallenge = async () => {
    if (selectedPlayer) {
      //when one user selects other for match that user will get challenge to accept or decline
      try {
        const res = await sendChallengeToPlayer(selectedPlayer.username, authUser.username)
        if (res) {
          toast.success(res);
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
  };




  //this is for the selected player when he accepts the challenge then he is sent to that roomId page
  const handleAcceptChallenge = async () => {
    const roomId = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    await makeRoomWhenChallengeAccepted(authUser.username, incomingChallenge.challenger, roomId)

    //go to the same room page or compete page where there is same paragraph
    navigate(`/compete/${roomId}`)


  }

  const handleDeclineChallenge = async () => {
    await sendNotificationForDenial(incomingChallenge.challenger);
  }




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
            {loadingUsers ? (
              <p className="loading-text">🔍 Searching for online users...</p>
            ) : onlinePlayers.length === 0 ? (
              <p className="no-users-text">No online users available.</p>
            ) : (
              onlinePlayers.map(player => (
                <div key={player.username}>
                  <div
                    onClick={() => handleSelectPlayer(player)}
                    className={`player-item ${selectedPlayer?.username === player.username
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

                  {incomingChallenge &&
                    player.username === incomingChallenge.challenger &&
                    incomingChallenge.challenger !== authUser.username && (
                      <div className="challenge-buttons">
                        <p>{incomingChallenge.challenger} says: {incomingChallenge.message}</p>
                        <button
                          className="accept-button"
                          onClick={() => handleAcceptChallenge(incomingChallenge.challenger)}
                        >
                          Accept
                        </button>
                        <button
                          className="decline-button"
                          onClick={() => handleDeclineChallenge(incomingChallenge.challenger)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                </div>
              ))
            )}
          </div>


          <div className="action-buttons">
            <button
              onClick={handleStartAndCloseCompeteMode}
              className="back-button"
            >
              Back
            </button>
            <button
              onClick={handleSendChallenge}
              disabled={!selectedPlayer}
              className={`start-competition-button ${selectedPlayer ? 'active' : 'disabled'}`}
            >
              Send Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompeteScreen;