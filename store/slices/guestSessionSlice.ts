import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuestSessionState {
  sessionId: string | null;
}

const initialState: GuestSessionState = {
  sessionId: null,
};

const guestSessionSlice = createSlice({
  name: 'guestSession',
  initialState,
  reducers: {
    setGuestSession: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  },
});

export const { setGuestSession } = guestSessionSlice.actions;
export default guestSessionSlice.reducer;
