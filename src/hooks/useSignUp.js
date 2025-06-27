import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  const signup = async ({ username, password }) => {
    setLoading(true);
    
    try {
      const res = await fetch(`${backendUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      console.log(data);
      localStorage.setItem('player', JSON.stringify(data));
      setAuthUser(data);
      
      // Gaming-style success message
      toast.success("🎮 Welcome to Type-Rush! Profile created successfully!");
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;