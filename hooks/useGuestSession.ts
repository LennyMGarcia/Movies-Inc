import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerLinks from '@/api/serverLinks';
import { setGuestSession } from '@/store/slices/guestSessionSlice';

/**
 * Custom hook that manages the guest session for the app.
 * 
 * - It checks if a valid guest session exists in AsyncStorage and if not, creates a new session.
 * - The session is stored in AsyncStorage along with its expiration time to ensure the session remains valid.
 * - The hook runs on component mount and will automatically create a new guest session if needed.
 * - Uses the Redux dispatch function to set the guest session in the global state.
 * 
 * @function useGuestSession
 * @returns {void} This hook doesn't return any value.
 */

const useGuestSession = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAndCreateGuestSession = async () => {
      const storedSession = await AsyncStorage.getItem('guestSession');
      const expiresAt = await AsyncStorage.getItem('guestSessionExpiry'); 

      if (storedSession && expiresAt) {
        const currentDate = new Date();
        const expirationDate = new Date(expiresAt);

        if (currentDate >= expirationDate) {
          await AsyncStorage.removeItem('guestSession');
          await AsyncStorage.removeItem('guestSessionExpiry');
          createNewSession();
          
        } else {
          dispatch(setGuestSession(storedSession)); 
        }
      } else {
        createNewSession();
      }
    };

    const createNewSession = async () => {
      try {
        const response = await fetch(ServerLinks.createGuestSession(), {
          method: 'POST',
          headers: ServerLinks.getHeaders(),
        });

        const data = await response.json();
        const sessionId = data.guest_session_id;
        const expirationTime = new Date(data.expires_at); 

        dispatch(setGuestSession(sessionId));
        await AsyncStorage.setItem('guestSession', sessionId);
        await AsyncStorage.setItem('guestSessionExpiry', expirationTime.toString()); 
      } catch (error) {
        console.error('Error creating guest session:', error);
      }
    };

    checkAndCreateGuestSession();
  }, [dispatch]);
};

export default useGuestSession;
