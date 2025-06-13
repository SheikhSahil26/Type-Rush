import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx'


const useSubmitTest = () => {
  const {setAuthUser}=useAuthContext();
  

  const backendUrl=import.meta.env.VITE_BACKEND_URL

  const submitTestResult=async({actualWpm,totalKeyStrokes,accuracy,duration,formattedDate})=>{

    try{
        const res=await fetch(`${backendUrl}/api/user/submit-test`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({actualWpm,totalKeyStrokes,accuracy,duration,formattedDate}),
            credentials: "include",
        })
        console.log(res);
        const data=await res.json()

        console.log(data)
    
        if(data.error){
            throw new Error(data.error)
        }


       

    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
   
    
  }
  return {submitTestResult}
}

export default useSubmitTest;
