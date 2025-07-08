import React from 'react'
import { useAuthContext } from '../context/AuthContext';

// hooks/useDeleteUserFromLobby.js

const useDeleteUserFromLobby = () => {
 
  const deleteUserFromOnlineLobby = async (username) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/room/delete-user/${username}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return { deleteUserFromOnlineLobby };
};




export default useDeleteUserFromLobby
