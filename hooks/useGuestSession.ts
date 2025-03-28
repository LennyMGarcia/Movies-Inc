import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerLinks from '@/api/serverLinks';
import { setGuestSession } from '@/store/slices/guestSessionSlice';

const useGuestSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAndCreateGuestSession = async () => {
      const storedSession = await AsyncStorage.getItem('guestSession');

      if (storedSession) {
        dispatch(setGuestSession(storedSession));
      } else {
        try {
          const response = await fetch(ServerLinks.createGuestSession(), {
            method: 'POST',
            headers: ServerLinks.getHeaders(),
          });

          const data = await response.json();
          const sessionId = data.guest_session_id;

          dispatch(setGuestSession(sessionId));
          await AsyncStorage.setItem('guestSession', sessionId);
        } catch (error) {
          console.error('Error creating guest session:', error);
        }
      }
    };

    checkAndCreateGuestSession();
  }, [dispatch]);
};

export default useGuestSession;
