import React from 'react'
import { createContext,useState,useContext } from 'react'

export const AuthContext=createContext(null);

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem('player'))||null)
    const [loading,setLoading]=useState(true)

    return <AuthContext.Provider value={{authUser,setAuthUser,loading,setLoading}}>{children}</AuthContext.Provider>
}