import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import api from '../../../../../api/api';
import { ADD_MESSAGE, SENDMESSAGE, SET_IMAGES } from './actionCreators';
import { fetchMessages } from './messagesSlice';

const initialState = {
  scrollService: null,
  roomId: null,
  users: {},
  chatInfo: {},
  showCaptureModal: false,
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
  adds: {},
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
    onCliseCaptureModal: (state) => {
      state.adds = {}
      state.showCaptureModal = false
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
    builder.addCase(SET_IMAGES, (state, action) => {
      const files = action.payload;
      Array.from(files).forEach((file) => {
        const { type } = file;
        const currentAdds = JSON.parse(JSON.stringify(current(state.adds)));
        console.log(currentAdds);
        if (/image/.test(type)) {
          if (!currentAdds.img) currentAdds.img = [];
          currentAdds.img.push(file.base64);
          state.adds = { ...currentAdds };
        } else if (/video/.test(type)) {
          if (!currentAdds.video) currentAdds.video = [];
          currentAdds.video.push(file.base64);
          state.adds = { ...currentAdds };
        } else if (/audio/.test(type)) {
          if (!currentAdds.audio) currentAdds.audio = [];
          currentAdds.audio.push(file.base64);
          state.adds = { ...currentAdds };
        } else if (/application/.test(type)) {
          if (!currentAdds.file) currentAdds.file = [];
          currentAdds.file.push(file.base64);
          state.adds = { ...currentAdds };
        }
        state.showCaptureModal = true
      });
    });
  },
});

export const { onInit, onExit, onShowReply, inputMessage, onCloseReply, onCliseCaptureModal } =
  chatSlice.actions;

export default chatSlice.reducer;
