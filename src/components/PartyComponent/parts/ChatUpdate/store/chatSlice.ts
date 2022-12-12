import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../../api/api';
import { fetchMessages } from './messagesSlice';

const initialState = {
  scrollService: null,
  roomId: null,
  users: {},
  chatInfo: {},
  loadingBottom: false,
  loadingTop: false,
  messagesData: {},
  newMessages: [],
};

export const fetchChat = createAsyncThunk('fetchChat', async(roomId: number, _) => {
  return await api.getRoomById(roomId)
})


const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    onInit: (state, action) => {
      const { scrollService, roomId } = action.payload;
      const init = scrollService();
      state.scrollService = init;
      state.roomId = roomId;
    },
    onExit: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state, action) => {
      const { where } = action.meta.arg;
      if (where === 'up') {
        state.loadingTop = true;
      } else if (where === 'down') {
        state.loadingBottom = true;
      }
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        
      }
    });

    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chatInfo = action.payload
    })
  },
});

export const { onInit, onExit } = chatSlice.actions;

export default chatSlice.reducer;
