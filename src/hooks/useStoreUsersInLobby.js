import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const useStoreUsersInLobby = () => {
  const {authUser}=useAuthContext()

  const backendUrl=import.meta.env.VITE_BACKEND_URL

    const storeUsersInLobby=async(username)=>{
      const res=await fetch(`${backendUrl}/api/room/store-users-in-lobby`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({username:username})
      })
      console.log(res)
    }
    return {storeUsersInLobby}

}

export default useStoreUsersInLobby
