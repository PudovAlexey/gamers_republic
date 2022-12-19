import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  messageInput: "",
  adds: {},
  replyMessage: "",
  replyAdds: {},
  lastMessageId: null,
  loadMessageIds: []
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
    inputMessage: (state, action) => {
      const {target} = action.payload
      state.messageInput = target.value
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
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chatInfo = action.payload
    })
    builder.addCase(fetchMessages.fulfilled, (store, action) => {
      if (action.payload && action.payload.length) {
        store.lastMessageId = Math.max(...action.payload.map(({messageId}) => messageId))
      }
    })
    builder.addCase(SENDMESSAGE, (state, action) => {
      state.loadMessageIds.push(state.lastMessageId + 1)
    })
    builder.addCase(ADD_MESSAGE, (state, action) => {
      const sendedMessage = action.payload
    })
  },
});

export const { 
  onInit, 
  onExit,
  inputMessage
 } = chatSlice.actions;

export default chatSlice.reducer;
