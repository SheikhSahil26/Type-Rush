// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createContext ,useContext} from 'react'
import { useState,useEffect } from "react";

import { getDatabase ,get, set , ref,onValue,remove,update } from 'firebase/database';
import { useAuthContext } from "./AuthContext";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const database=getDatabase(firebaseApp)

const FirebaseContext=createContext(null);



export const useFirebase= ()=>useContext(FirebaseContext)


export const FirebaseContextProvider=(props)=>{

//means the user has entered the compete mode !!!!
const storeUsersToOnlineLobby = async (username) => {
  const userRef = ref(database, `myDB/online-users/${username}`);

  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      
      return "username already exist";
    }

    // Username doesn't exist, safe to store
    await set(userRef, {
      username: username,
      online: true,
      status:'free',
      notification:{
        challenger:"",
        message:""
      },
      roomJoined:0
    });

    console.log("User stored successfully.");

  } catch (error) {
    console.error("Error checking username:", error);
  }
};
//delete user or in game terms remove players from realtime db  !!! user exited compete mode!!!
const deleteUserFromOnlineLobby = async (username) => {
  const userRef = ref(database, `myDB/online-users/${username}`);

  try {
    await remove(userRef);
    console.log(`User '${username}' deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

     const {authUser}=useAuthContext()

    const [incomingChallenge, setIncomingChallenge] = useState(null);

    const [selectedPlayer,setSelectedPlayer]=useState(null)

const selectedUserListens=(selectedPlayerUsername)=>{
    const userNotificationRef = ref(database, `myDB/online-users/${selectedPlayerUsername}/notification`);
    
    const unsubscribe = onValue(userNotificationRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.challenger!=='' && data.message!=='') {
        setIncomingChallenge(data);
      } else {
        setIncomingChallenge(null); // Reset if no challenge
      }
    });
  
    return () => unsubscribe();

}



useEffect(() => {
  const unsubscribe = selectedUserListens(authUser.username);
  return () => unsubscribe(); // Clean up when component unmounts
}, [selectedPlayer]);



 //when one user selects other for match that user will get challenge to accept or decline
const sendChallengeToPlayer=async(selectedPlayerUsername,challengerUsername)=>{
    const userRef=ref(database,`myDB/online-users/${selectedPlayerUsername}/notification`);

    try {
      const snapshot = await get(userRef);

      console.log(snapshot.val());

    await update(userRef,{
      challenger:challengerUsername,
      message:"wanna a type together"
    })

    setSelectedPlayer(selectedPlayerUsername)
  } catch (error) {
    console.error("Error sending challenge notification:", error);
  }
}


     const [usersInLobby, setusersInLobby] = useState({});

  useEffect(() => {
    const usersInLobbyRef = ref(database, 'myDB/online-users/');

    const unsubscribe = onValue(usersInLobbyRef, (snapshot) => {
      const data = snapshot.val();
      setusersInLobby(data || {});
      console.log(data)
    });

    return () => unsubscribe();
  }, []);



   

  // useEffect(() => {
  //   const userNotificationRef = ref(database, `myDB/online-users/${authUser.username}/notification`);
    
  //   const unsubscribe = onValue(userNotificationRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data && data.challenger && data.message) {
  //       setIncomingChallenge(data);
  //     } else {
  //       setIncomingChallenge(null); // Reset if no challenge
  //     }
  //   });
  
  //   return () => unsubscribe();
  // }, [incomingChallenge]);



  const makeRoomWhenChallengeAccepted=async(player1,player2,roomId)=>{
    const roomRef=ref(database,`myDB/challengeRoom/${roomId}`);

    const player1Ref=ref(database,`myDB/online-users/${player1}`);//challengedUser
    const player2Ref=ref(database,`myDB/online-users/${player2}`);//challenger

     try {
    const snapshot = await get(roomRef);

    console.log(player1,player2)
    await set(roomRef, {
      player1:player1,
      player2:player2,
    });

    console.log("room created successfully");

    //challenged user ke notification ko clear kardiya
    await update(player1Ref,{
      notification:{
        challenger:"",
        message:""
      },
      status:"busy",
      roomJoined:roomId,
    })

    await update(player2Ref,{
      status:"busy",
      roomJoined:roomId,
    })

  } catch (error) {
    console.error("Error creating room for the match", error);
  }
}


//when challenged user denies the challenge this notification will go to challenger
const sendNotificationForDenial=async()=>{
    
}



    return(
        <FirebaseContext.Provider value={{ storeUsersToOnlineLobby,usersInLobby,deleteUserFromOnlineLobby,sendChallengeToPlayer,incomingChallenge,makeRoomWhenChallengeAccepted }}>
            {props.children}    
        </FirebaseContext.Provider>
    )
}