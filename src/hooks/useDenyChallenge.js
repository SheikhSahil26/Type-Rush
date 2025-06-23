// hooks/useChallengeNotificationListener.js

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from "../context/FirebaseContext";

const useDenyChallenge = (username) => {
  const [denialMessage, setDenialMessage] = useState(null);

  useEffect(() => {
    if (!username) return;

    const notificationRef = ref(db, `myDB/online-users/${username}/notification`);

    const unsubscribe = onValue(notificationRef, (snapshot) => {
      const data = snapshot.val();

      if (data?.message === "I can't play right now") {
        setDenialMessage(data.message);
        toast.info("⚠️ Your challenge was declined.");
      }
    });

    return () => unsubscribe();
  }, [username]);

  return { denialMessage };
};

export default useDenyChallenge;
