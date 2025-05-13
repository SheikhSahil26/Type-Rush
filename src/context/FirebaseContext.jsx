// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createContext ,useContext} from 'react'
import { useState,useEffect } from "react";

import { getDatabase ,get, set , ref,onValue,remove,update } from 'firebase/database';

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
      status:'free'
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

 //when one user selects other for match that user will get challenge to accept or decline
const sendChallengeToPlayer=async(selectedPlayerUsername,challengerUsername)=>{
    const userRef=ref(database,`myDB/online-users/${selectedPlayerUsername}/notification`);

    try {
      const snapshot = await get(userRef);

      console.log(snapshot.val());

    await set(userRef,{
      challenger:challengerUsername,
      message:"wanna a type together"
    })

    console.log("Challenge notification sent successfully.");
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



    return(
        <FirebaseContext.Provider value={{ storeUsersToOnlineLobby,usersInLobby,deleteUserFromOnlineLobby,sendChallengeToPlayer }}>
            {props.children}    
        </FirebaseContext.Provider>
    )
}