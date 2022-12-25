import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import api from '../../../../../api/api';
import { ADD_MESSAGE, SENDMESSAGE } from './actionCreators';
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
  messageInput: '',
  replyHeight: 70,
  chatHeight: 500,
  showReply: false,
  replyMessage: {},
  replyAdds: {},
  loadMessageIds: [],
};

export const fetchChat = createAsyncThunk(
  'fetchChat',
  async (roomId: number, _) => {
    return await api.getRoomById(roomId);
  }
);

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
    inputMessage: (state, action) => {
      const { target } = action.payload;
      state.messageInput = target.value;
    },
    onShowReply: (state, action) => {
      state.showReply = true;
      const { adds } = action.payload;
      state.replyMessage = action.payload;
      if (adds) {
        state.replyAdds = adds;
      }
    },
    onCloseReply: (state) => {
      state.showReply = false;
      state.replyMessage = {};
      state.replyAdds = {};
    },
    onExit: (state) => {
      Object.keys(initialState).forEach((field) => {
        state[field] = initialState[field];
      });
    },
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
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chatInfo = action.payload;
    });
    builder.addCase(SENDMESSAGE, (state, action) => {
      const { lastMessageId } = action.payload;
      const countNextMessage = lastMessageId + 1;
      console.log(countNextMessage, 'inLoader');
      state.loadMessageIds.push(countNextMessage);
    });
    builder.addCase(ADD_MESSAGE, (state, action) => {
      let loaderIds = current(state.loadMessageIds);
      loaderIds = [...loaderIds];
      const { frontId } = action.payload;
      const loaderIndex = loaderIds.indexOf(frontId);
      console.log(frontId, 'after send');
      if (loaderIndex >= 0) {
        loaderIds.splice(loaderIndex, 1);
        state.loadMessageIds = [...loaderIds];
      }
    });
  },
});

export const { onInit, onExit, onShowReply, inputMessage, onCloseReply } = chatSlice.actions;

export default chatSlice.reducer;
