import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const useStoreUsersInLobby = () => {
  const {authUser}=useAuthContext()

    const storeUsersInLobby=async(req,res)=>{
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
    }
    return {storeUsersInLobby}

}

export default useStoreUsersInLobby
