import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import api from '../../../../../api/api';
import { generateAddsId } from '../services/helpers';
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
    updateAddByTypeAndId: (state, action) => {
      // state.adds
    },
    removeAddByTypeAndId: (state, action) => {
      const {type, id} = action.payload
      const currentAdds = {...current(state.adds)}
      const updateAddsByType = currentAdds[type].filter((file) => file.id !== id)
      currentAdds[type] = updateAddsByType
      state.adds = currentAdds
    },
    onCloseReply: (state) => {
      state.showReply = false;
      state.replyMessage = {};
      state.replyAdds = {};
    },
    onCliseCaptureModal: (state) => {
      state.adds = {};
      state.showCaptureModal = false;
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
      state.messageInput = '';
      state.showCaptureModal = false;
      state.loadMessageIds.push(countNextMessage);
    });
    builder.addCase(ADD_MESSAGE, (state, action) => {
      let loaderIds = current(state.loadMessageIds);
      loaderIds = [...loaderIds];
      const { frontId } = action.payload;
      const loaderIndex = loaderIds.indexOf(frontId);
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
        if (/image/.test(type)) {
          if (!currentAdds.img) currentAdds.img = [];
          const nextId = generateAddsId(currentAdds.img);
          currentAdds.img.push({
            ...file,
            id: nextId,
          });
          state.adds = { ...currentAdds };
        } else if (/video/.test(type)) {
          if (!currentAdds.video) currentAdds.video = [];
          const nextId = generateAddsId(currentAdds.video);
          currentAdds.video.push({
            ...file,
            id: nextId,
          });
          state.adds = { ...currentAdds };
        } else if (/audio/.test(type)) {
          if (!currentAdds.audio) currentAdds.audio = [];
          const nextId = generateAddsId(currentAdds.audio);
          currentAdds.audio.push({
            ...file,
            id: nextId,
          });
          state.adds = { ...currentAdds };
        } else if (/application/.test(type)) {
          if (!currentAdds.file) currentAdds.file = [];
          const nextId = generateAddsId(currentAdds.file);
          currentAdds.file.push({
            ...file,
            id: nextId,
          });
          state.adds = { ...currentAdds };
        }
        state.showCaptureModal = true;
      });
    });
  },
});

export const {
  onInit,
  onExit,
  onShowReply,
  inputMessage,
  onCloseReply,
  onCliseCaptureModal,
} = chatSlice.actions;

export default chatSlice.reducer;
