import { useState } from "react";

const useAcceptChallenge = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const acceptChallenge = async (player1, player2, roomId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/room/accept-challenge`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player1, player2, roomId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error accepting challenge");
      }

      return data;
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return { acceptChallenge, loading, error };
};

export default useAcceptChallenge;
