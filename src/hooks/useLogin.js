import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = async ({ username, password }) => {
    setLoading(true);
    
    try {
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      
      console.log(res);
      const data = await res.json();
      console.log(data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      data.success = "";
      localStorage.setItem('player', JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully!");
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;