import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const useRoomData = () => {
  const {authUser}=useAuthContext()

  const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getRoomData=async(roomId)=>{
      const res=await fetch(`${backendUrl}/api/room/room-data/${roomId}`,{
        method:"GET",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        
      })
      console.log(res)
    }
    return {getRoomData}

}

export default useRoomData;
