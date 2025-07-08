const express = require('express');
const database = require('../utils/firebaseConfig');
const router = express.Router();
const { get, ref, set, update,remove } = require("firebase-admin/database");
const paragraphs = require('../utils/paragraphs.json');

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

const makeRoomWhenChallengeAccepted = async (req, res) => {
  const { player1, player2, roomId } = req.body;

  const roomRef = ref(database, `myDB/challengeRoom/${roomId}`);
  const player1Ref = ref(database, `myDB/online-users/${player1}`);
  const player2Ref = ref(database, `myDB/online-users/${player2}`);

  try {
    const snapshot = await get(roomRef);
    if (snapshot.exists()) {
      return res.status(400).json({ message: "Room already exists." });
    }

    const randomParagaph=paragraphs[Math.floor(Math.random() * paragraphs.length)];

    await set(roomRef, {
  paragraph: randomParagaph, // You can fetch this from DB or use paragraphId
  timer: {
    startTime: null,     // You'll set this when the game starts
    currentTime: 60      // Starting value in seconds
  },
  player: player1,
  host: player2,
  isStarted:false,
  spectators: ['sahil'], 
  progress: {
    [player1]: {
      typedLength: 0,
      accuracy: 100,
      isFinished: false,
      wpm: 0
    },
    [player2]: {
      typedLength: 0,
      accuracy: 100,
      isFinished: false,
      wpm: 0
    }
  },
  result: null,
  status: "waiting" // can be "waiting" | "started" | "finished"
});


    await update(player1Ref, {
      notification: {
        challenger: "",
        message: "",
      },
      status: "busy",
      roomJoined: roomId,
    });

    await update(player2Ref, {
      status: "busy",
      roomJoined: roomId,
    });

    res.status(200).json({ message: "Room created successfully", roomId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room" });
  }
};

const declineChallenge = async (req,res)=>{
  
}


const roomData=async(req,res)=>{
    const {roomId}=req.params;

    if (!req.params.roomId) { 
  console.log("error no roomId")
} 

    console.log(roomId);



     const roomRef = database.ref(`myDB/challengeRoom/${roomId}`);

     try{
       
            const snapshot = await get(roomRef);
       
            console.log(snapshot.val());
       
            return res.status(200).json({
             roomData:snapshot.val()
            })

     }catch(error){
      return res.status(400).json({
        error:"some error occured while loading room!!"
      })
     }
 }

const deleteUserFromLobby=async(req,res)=>{
   const username = req.params.username;
  const userRef = ref(database, `myDB/online-users/${username}`);

  try {
    await remove(userRef);
    res.status(200).json({ message: `User ${username} removed.` });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  storeUsersToOnlineLobby,
  sendChallengeToPlayer,
  makeRoomWhenChallengeAccepted,
  roomData,
  deleteUserFromLobby
}