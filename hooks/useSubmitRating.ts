import ServerLinks from "@/api/serverLinks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sentry from "@sentry/react-native"

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
        let errorMessage: string = "Failed to submit rating"
        Sentry.captureMessage(errorMessage, {
            level: 'error',  
        });

        throw new Error(errorMessage);
      }
  
      return "Rating submitted successfully!";
    };
  
    return { submitRating };
  }

export function mockReturnValue(arg0: { submitRating: jest.Mock<any, any, any>; }) {
    throw new Error('Function not implemented.');
}
  