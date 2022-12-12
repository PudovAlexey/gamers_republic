import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from './messagesSlice';

const initialState = {
  scrollService: null,
  roomId: null,
  loadingBottom: false,
  loadingTop: false,
  messagesData: {},
  newMessages: [],
};

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
        state.loadingBottom = false;
        state.loadingTop = false;
        state.newMessages = action.payload.map(({ messageId }) => messageId);
      }
    });
  },
});

export const { onInit, onExit } = chatSlice.actions;

export default chatSlice.reducer;
