import React from 'react'
import { useAuthContext } from '../context/AuthContext';

const useDeleteUserFromLobby = () => {

    const {authUser}=useAuthContext()
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
}

export default useDeleteUserFromLobby
