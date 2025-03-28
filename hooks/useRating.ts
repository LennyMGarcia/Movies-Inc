import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerLinks from '@/api/serverLinks';

const useRating = (movieId: number, initialRating: number) => {
  const [rating, setRating] = useState(initialRating);

  const submitRating = async (userRating: number) => {
    const sessionId = await AsyncStorage.getItem('guestSession');
    if (!sessionId) return console.error('No guest session available');

    try {
      const response = await fetch(ServerLinks.rateMovie(movieId, sessionId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          ...ServerLinks.getHeaders(),
        },
        body: JSON.stringify({ value: userRating }),
      });

      if (response.ok) {
        console.log('Rating submitted successfully');
        setRating(userRating);
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return { rating, submitRating };
};

export default useRating;
