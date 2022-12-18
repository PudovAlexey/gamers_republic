import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    onInit: (store, action) => {
      store.user = action.payload;
    },
    onExit: (store) => {
      store.user = null;
    },
  },
});

export const { onInit, onExit } = authSlice.actions;

export default authSlice.reducer;
