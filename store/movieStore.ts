import { configureStore } from '@reduxjs/toolkit';
import guestSessionReducer from '@/store/slices/guestSessionSlice';
import FavouriteReducer from '@/store/slices/favouriteSlice';

export const store = configureStore({
  reducer: {
    guestSession: guestSessionReducer,
    Favourite: FavouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
