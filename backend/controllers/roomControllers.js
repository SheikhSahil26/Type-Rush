const express = require('express');
const database = require('../utils/firebaseConfig');
const router = express.Router();

//means the user has entered the compete mode !!!!
const storeUsersToOnlineLobby = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const userRef = database.ref(`myDB/online-users/${username}`);

  try {
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Store new user
    await userRef.set({
      username: username,
      online: true,
      status: 'free',
      notification: {
        challenger: "",
        message: ""
      },
      roomJoined: 0
    });

    console.log("User stored successfully.");

    // Now fetch all users in 'compete' mode
    const usersRef = database.ref("myDB/online-users");
    const allUsersSnapshot = await usersRef.once("value");

    const usersInLobby = [];

    if (allUsersSnapshot.exists()) {
      const allUsers = allUsersSnapshot.val();

      console.log(allUsers)

      for (const uname in allUsers) {
        const user = allUsers[uname];
        usersInLobby.push(user)
      }
    }
    console.log(usersInLobby)

    return res.status(200).json({ 
      message: "User stored successfully", 
      usersInLobby: usersInLobby 
    });

  } catch (error) {
    console.error("Error storing user or fetching compete users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const sendChallengeToPlayer = async (req,res)=>{
  const { selectedPlayerUsername, challengerUsername } = req.body;

  if (!selectedPlayerUsername || !challengerUsername) {
    return res.status(400).json({ message: "Both usernames are required" });
  }

  if (selectedPlayerUsername === challengerUsername) {
    return res.status(400).json({ message: "You can't challenge yourself" });
  }

  try {
    const userRef = database.ref(`myDB/online-users/${selectedPlayerUsername}/notification`);

    await userRef.update({
      challenger: challengerUsername,
      message: "Wanna type together",
    });

    res.status(200).json({ message: "Challenge sent successfully" });
  } catch (error) {
    console.error("Error sending challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


const acceptChallenge = async (req,res)=>{
  
}

const declineChallenge = async (req,res)=>{
  
}

module.exports = {
  storeUsersToOnlineLobby,
  sendChallengeToPlayer
}