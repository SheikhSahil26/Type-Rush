// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createContext ,useContext} from 'react'
import { useState,useEffect } from "react";

import { getDatabase ,get, set , ref,onValue} from 'firebase/database';

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
      status:'busy'
    });

    console.log("User stored successfully.");

  } catch (error) {
    console.error("Error checking username:", error);
  }
};

const sendChallengeToPlayer=async(selectedPlayer)=>{
    
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
        <FirebaseContext.Provider value={{ storeUsersToOnlineLobby,usersInLobby }}>
            {props.children}    
        </FirebaseContext.Provider>
    )
}