import { ref, set } from 'firebase/database';
import { db } from '../context/FirebaseContext';

const useDenyChallenge = (authUsername) => {
  const denialMessage = async (challengerUsername) => {
    if (!challengerUsername) return;

    try {
      const challengerNotificationRef = ref(
        db,
        `myDB/online-users/${challengerUsername}/notification`
      );

      // Send denial message to challenger
      await set(challengerNotificationRef, {
        message: `${authUsername} declined your challenge.`,
        status: 'declined',
        declinedBy: authUsername,
      });

      // Optionally, clear notification from current user
      const currentUserNotificationRef = ref(
        db,
        `myDB/online-users/${authUsername}/notification`
      );
      await set(currentUserNotificationRef, null);
    } catch (err) {
      console.error("Error sending denial message:", err.message);
    }
  };

  return { denialMessage };
};

export default useDenyChallenge;
