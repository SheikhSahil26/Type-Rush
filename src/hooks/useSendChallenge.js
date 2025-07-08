// import React, { useContext } from 'react'
// import { useAuthContext } from '../context/AuthContext';

// const useSendChallenge = () => {


//     const {authUser}=useAuthContext();
    
//     const sendChallengeToPlayer=async(selectedPlayerUsername,challengerUsername)=>{
//       const userRef=ref(database,`myDB/online-users/${selectedPlayerUsername}/notification`);
  
//       if(selectedPlayerUsername===challengerUsername){
//         return "you cant challenge yourself";
//       }
  
//       try {
//         const snapshot = await get(userRef);
  
//         console.log(snapshot.val());
  
//       await update(userRef,{
//         challenger:challengerUsername,
//         message:"wanna a type together"
//       })
  
//       setSelectedPlayer(selectedPlayerUsername)
  
//       toast.success("challenge send successfully")
      
//     } catch (error) {
//       toast.error("error sending challenge notification")
//       console.error("Error sending challenge notification:", error);
//     }
//   }
//   return {sendChallengeToPlayer};
  
// }

// export default useSendChallenge



import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useSendChallenge = () => {
  const { authUser } = useAuthContext();

  const sendChallengeToPlayer = async (selectedPlayerUsername, challengerUsername) => {
    if (selectedPlayerUsername === challengerUsername) {
      toast.error("You can't challenge yourself");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/room/send-challenge`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedPlayerUsername,
          challengerUsername,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return null;
      }

      return data.message;
    } catch (error) {
      toast.error("Error sending challenge");
      console.error("API error:", error);
      return null;
    }
  };

  return { sendChallengeToPlayer };
};

export default useSendChallenge;
