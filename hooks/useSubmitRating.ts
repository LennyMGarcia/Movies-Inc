import ServerLinks from "@/api/serverLinks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSubmitRating() {
    const submitRating = async (movieId: number, userRating: number) => {
      const sessionId = await AsyncStorage.getItem("guestSession");
  
      if (!sessionId) {
        throw new Error("No guest session available");
      }
  
      const response = await fetch(ServerLinks.rateMovie(movieId, sessionId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...ServerLinks.getHeaders(),
        },
        body: JSON.stringify({ value: userRating }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }
  
      return "Rating submitted successfully!";
    };
  
    return { submitRating };
  }
  