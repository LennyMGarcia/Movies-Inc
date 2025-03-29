import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import guestSessionReducer from '@/store/slices/guestSessionSlice';
import favouriteReducer from '@/store/slices/favouriteSlice';
import { combineReducers } from 'redux';

const favouritePersistConfig = {
  key: 'favourites',
  storage: AsyncStorage,
};

const persistedFavouriteReducer = persistReducer(favouritePersistConfig, favouriteReducer);

const rootReducer = combineReducers({
  guestSession: guestSessionReducer,
  favourites: persistedFavouriteReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
