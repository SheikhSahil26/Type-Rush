// hooks/useLobbyUsers.js
import { useEffect, useState } from "react";
import { db } from "../context/FirebaseContext";
import { ref, onValue, off } from "firebase/database";
import { useAuthContext } from "../context/AuthContext";

const useLobbyUsers = () => {
  const [usersInLobby, setUsersInLobby] = useState([]);
  const {authUser}=useAuthContext()

  useEffect(() => {
    const usersRef = ref(db, "myDB/online-users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        console.log(data);
        const competeUsers = Object.values(data)
        setUsersInLobby(competeUsers);
      } else {
        setUsersInLobby([]);
      }
    });
    
    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return {usersInLobby};
};

export default useLobbyUsers;
