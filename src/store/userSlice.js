import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
  },
  reducers: {
    login: (state, action) => {
        state.uid = action.payload.uid;
    },
    logout: (state) => {
        state.uid = null;
    },
  }
});

export const { setUserUid } = userSlice.actions;

export const selectUserUid = (state) => state.user.uid;

export default userSlice.reducer;