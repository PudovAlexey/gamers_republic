import { createSlice } from '@reduxjs/toolkit';
import { CHANGE_USER_ONLINE } from './actionCreators';

const initialState = {
  user: null,
  usersOnline: []
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
  extraReducers: (builder) => {
    
    builder.addCase(CHANGE_USER_ONLINE, (state, action) => {
      const {isOnline, userId} = action.payload
      const userIndexList = state.usersOnline.indexOf(userId)
      const isUserInIndex = userIndexList >= 0
      if (isOnline && !isUserInIndex) {
        state.usersOnline.push(userId)
      } else if (!isOnline && isUserInIndex) {
        state.usersOnline.splice(userIndexList, 1)
      }
    })
  }
});

export const { onInit, onExit } = authSlice.actions;

export default authSlice.reducer;
