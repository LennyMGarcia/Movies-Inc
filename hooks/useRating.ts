import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerLinks from '@/api/serverLinks';
import * as Sentry from '@sentry/react-native';

const useRating = (movieId: number, initialRating: number) => {
  const [rating, setRating] = useState(initialRating);

  const submitRating = async (userRating: number) => {
    const sessionId = await AsyncStorage.getItem('guestSession');
    if (!sessionId) {
      Sentry.captureMessage('No guest session available', { level: 'warning' });
      return;
    }

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
        setRating(userRating);
      } else {
        Sentry.captureMessage('Failed to submit rating', { level: 'error' });
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return { rating, submitRating };
};

export default useRating;

