import { configureStore } from '@reduxjs/toolkit';
import guestSessionReducer from '@/store/slices/guestSessionSlice';

export const store = configureStore({
  reducer: {
    guestSession: guestSessionReducer,
  },
});
