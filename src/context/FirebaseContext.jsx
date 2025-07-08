// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createContext ,useContext} from 'react';
import { useState,useEffect } from "react";
import toast from "react-hot-toast";

import { getDatabase ,get, set , ref,onValue,remove,update } from 'firebase/database';
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";



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



export const useFirebase=()=>useContext(FirebaseContext)

export { database as db }; // 🔥 ADD THIS


export const FirebaseContextProvider=(props)=>{

  const navigate=useNavigate()

//means the user has entered the compete mode !!!!
// const storeUsersToOnlineLobby = async (username) => {
//   const userRef = ref(database, `myDB/online-users/${username}`);

//   try {
//     const snapshot = await get(userRef);

//     if (snapshot.exists()) {
      
//       return "username already exist";
//     }

//     // Username doesn't exist, safe to store
//     await set(userRef, {
//       username: username,
//       online: true,
//       status:'free',
//       notification:{
//         challenger:"",
//         message:""
//       },
//       roomJoined:0
//     });

//     console.log("User stored successfully.");

//   } catch (error) {
//     console.error("Error checking username:", error);
//   }
// };

// //delete user or in game terms remove players from realtime db  !!! user exited compete mode!!!
// const deleteUserFromOnlineLobby = async (username) => {
//   const userRef = ref(database, `myDB/online-users/${username}`);

//   try {
//     await remove(userRef);
//     console.log(`User '${username}' deleted successfully.`);
//   } catch (error) {
//     console.error("Error deleting user:", error);
//   }
// };

//      const {authUser}=useAuthContext()

//     const [incomingChallenge, setIncomingChallenge] = useState(null);

//     const [selectedPlayer,setSelectedPlayer]=useState(null)

// const selectedUserListens=(selectedPlayerUsername)=>{ 
//     const userNotificationRef = ref(database, `myDB/online-users/${selectedPlayerUsername}/notification`);
    
//     const unsubscribe = onValue(userNotificationRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data && data.challenger!=='' && data.message!=='') {
//         setIncomingChallenge(data);
//       } else {
//         setIncomingChallenge(null); // Reset if no challenge
//       }
//     });
  
//     return () => unsubscribe();

// }



// useEffect(() => {
//   const unsubscribe = selectedUserListens(authUser?.username);
//   return () => unsubscribe(); // Clean up when component unmounts
// }, [authUser?.username]);



//  //when one user selects other for match that user will get challenge to accept or decline
// const sendChallengeToPlayer=async(selectedPlayerUsername,challengerUsername)=>{
//     const userRef=ref(database,`myDB/online-users/${selectedPlayerUsername}/notification`);

//     if(selectedPlayerUsername===challengerUsername){
//       return "you cant challenge yourself";
//     }

//     try {
//       const snapshot = await get(userRef);

//       console.log(snapshot.val());

//     await update(userRef,{
//       challenger:challengerUsername,
//       message:"wanna a type together"
//     })

//     setSelectedPlayer(selectedPlayerUsername)

//     toast.success("challenge send successfully")
    
//   } catch (error) {
//     toast.error("error sending challenge notification")
//     console.error("Error sending challenge notification:", error);
//   }
// }




//whenever the compete page loads this useEffect runs and the current online players in db is listed!!!!
     const [usersInLobby, setUsersInLobby] = useState({});
     const [loadingUsers, setLoadingUsers] = useState(true);

  // useEffect(() => {
  //   const usersInLobbyRef = ref(database, 'myDB/online-users/');

  //   const unsubscribe = onValue(usersInLobbyRef, (snapshot) => {
  //     const data = snapshot.val(); 
  //     setUsersInLobby(data || {});
  //     console.log(data)
  //      setLoadingUsers(false);  
  //   });

  //   return () => {
  //     unsubscribe();
  //     setLoadingUsers(false);
  //   }
  // }, []);



   

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



//   const makeRoomWhenChallengeAccepted=async(player1,player2,roomId)=>{
//     const roomRef=ref(database,`myDB/challengeRoom/${roomId}`);

//     const player1Ref=ref(database,`myDB/online-users/${player1}`);//challengedUser
//     const player2Ref=ref(database,`myDB/online-users/${player2}`);//challenger

//      try {
//     const snapshot = await get(roomRef);

//     console.log(player1,player2)
//     await set(roomRef, {
//       player1:player1,
//       player2:player2,
//     });

//     console.log("room created successfully");

//     //challenged user ke notification ko clear kardiya
//     await update(player1Ref,{
//       notification:{
//         challenger:"",
//         message:"",
//       },
//       status:"busy",
//       roomJoined:roomId,
//     })

//     //challenger ke status ko busy and roomJoined mai roomId
//     await update(player2Ref,{
//       status:"busy",
//       roomJoined:roomId,
//     })

//   } catch (error) {
//     console.error("Error creating room for the match", error);
//   }
// }

// this is for the challenger bcoz when challenge is accepted then the challenger should also listen to the room joined of his/her db so if there is roomId then challenger must go to that room

//   useEffect(() => {
    
//   const challengerRoomRef = ref(database, `myDB/online-users/${authUser?.username}/roomJoined`);

//   const unsubscribe = onValue(challengerRoomRef, (snapshot) => {
//     const roomId = snapshot.val();
//     console.log(roomId)
//     if (roomId) {
//       navigate(`/compete/${roomId}`);
//     }
//   });

//   return () => unsubscribe();
// }, [authUser?.username]);


// useEffect(() => {
//   const userRef = ref(database, `myDB/online-users/${authUser.username}`);

//   const clearRoomOnLeave = async () => {
//     // Clear roomJoined when user leaves or reloads
//     await update(userRef, {
//       roomJoined: 0,
//       status: "online" // Set status back to online
//     });
//   };

//   // On component unmount or back navigation
//   return () => {
//     clearRoomOnLeave();
//   };
// }, []);


//when challenged user denies the challenge this notification will go to challenger
// const sendNotificationForDenial=async(challengerUsername)=>{
    // const challengerNotificationRef=ref(database,`myDB/online-users/${challengerUsername}/notification`);
    // const clearSelectedPlayerNotifyRef=ref(database,`myDB/online-users/`)

    // try{
    //   await update(challengerNotificationRef,{
    //     message:"i cant play right now",
    //   })

      

    // }
    // catch(error){
    //   console.log(error);
    //   toast.error("something unusual happened during denial")
    // }





// }



    return(
        <FirebaseContext.Provider value={{ }}>
            {props.children}    
        </FirebaseContext.Provider>
    )
}