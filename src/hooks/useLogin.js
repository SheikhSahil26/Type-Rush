import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx'


const useLogin = () => {
  const {setAuthUser}=useAuthContext();
  

  const backendUrl=import.meta.env.VITE_BACKEND_URL

  const login=async({username,password})=>{

    

    try{
      
        const res=await fetch(`${backendUrl}/api/auth/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
            credentials: "include",
        })
        console.log(res);
        const data=await res.json()
    
        if(data.error){
            throw new Error(data.error)
        }

        data.success="";
        
        localStorage.setItem('player',JSON.stringify(data))

        setAuthUser(data);


       

    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
   
    
  }
  return {login}
}

export default useLogin
