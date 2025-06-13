import React, { useContext } from 'react'
import { useAuthContext } from '../context/AuthContext';

const useSendChallenge = () => {


    const {authUser}=useAuthContext();
    
    const sendChallengeToPlayer=async(selectedPlayerUsername,challengerUsername)=>{
      const userRef=ref(database,`myDB/online-users/${selectedPlayerUsername}/notification`);
  
      if(selectedPlayerUsername===challengerUsername){
        return "you cant challenge yourself";
      }
  
      try {
        const snapshot = await get(userRef);
  
        console.log(snapshot.val());
  
      await update(userRef,{
        challenger:challengerUsername,
        message:"wanna a type together"
      })
  
      setSelectedPlayer(selectedPlayerUsername)
  
      toast.success("challenge send successfully")
      
    } catch (error) {
      toast.error("error sending challenge notification")
      console.error("Error sending challenge notification:", error);
    }
  }
  return {sendChallengeToPlayer};
  
}

export default useSendChallenge
