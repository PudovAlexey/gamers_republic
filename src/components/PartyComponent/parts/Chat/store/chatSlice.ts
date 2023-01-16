import { createSlice, current } from '@reduxjs/toolkit';
import { EMessageAdd, TMessageAdds, TMessage } from '../../../../../api/types';
import { generateAddsId } from '../services/helpers';
import { TScrollService } from '../services/scrollService/types';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  SELECTION_ENDING,
  SENDMESSAGE,
  SET_IMAGES,
  SHOW_LOADER,
  START_NAVIGATION,
} from './actionCreators';

const initialState: {
  roomId: null | number
  adds: null | TMessageAdds
  replyAdds: null | TMessageAdds
  messageContainer: null | HTMLElement
  replyMessage: null | TMessage 
  showReply: boolean
  chatHeight: number
  showCaptureModal: boolean
  loadingTop: boolean
  loadingBottom: boolean 
  messageInput: string
  replyHeight: number
  loadMessageIds: number[],
  replyIds: number[]
  scrollService: null | TScrollService
} = {
  roomId: null,
  messageContainer: null,
  showCaptureModal: false,
  loadingBottom: false,
  loadingTop: false,
  messageInput: '',
  replyHeight: 70,
  chatHeight: 500,
  showReply: false,
  replyMessage: null,
  replyAdds: null,
  adds: null,
  loadMessageIds: [],
  replyIds: [],
  scrollService: null,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    onInit: (state, action) => {
      const { scrollService, roomId, messageContainer } = action.payload;
      const init = scrollService();
      init.update(messageContainer)
      state.scrollService = init;
      state.roomId = roomId;
      state.messageContainer = messageContainer;
    },
    inputMessage: (state, action) => {
      const { target } = action.payload;
      state.messageInput = target.value;
    },
    onShowReply: (state, action) => {
      state.showReply = true;
      const { adds } = action.payload;
      state.replyMessage = action.payload;
      state.replyIds = [action.payload.messageId];
      if (adds) {
        state.replyAdds = adds;
      }
    },
    updateAddByTypeAndId: (state, action) => {
      // state.adds
    },
    removeAddByTypeAndId: (state, action) => {
      const { type, id } = action.payload;
      const currentAdds = { ...current(state.adds) };
      const updateAddsByType = currentAdds[type].filter(
        (file) => file.id !== id
      );
      currentAdds[type] = updateAddsByType;
      state.adds = currentAdds;
    },
    onAddReplyId: (state, action) => {
      const replyIndex = state.replyIds.indexOf(action.payload);
      if (replyIndex < 0) {
        state.replyIds.push(action.payload);
      } else {
        state.replyIds.splice(replyIndex, 1);
      }
    },
    onMoveChatToBottom: (state) => {
      const scrollService = current(state.scrollService);
      const firstMessage = scrollService.getFirstMessage();
      if (firstMessage) {
        firstMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    },
    onCloseReply: (state) => {
      state.showReply = false;
      state.replyMessage = null;
      state.replyAdds = null;
    },
    onCliseCaptureModal: (state) => {
      state.adds = null;
      state.showCaptureModal = false;
    },
    onExit: (state) => {
      Object.keys(initialState).forEach((field) => {
        state[field] = initialState[field];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SHOW_LOADER, (state, action) => {
      switch (action.payload) {
        case 'up':
          state.loadingTop = true;
          break;
        case 'down':
          state.loadingBottom = true;
          break;
      }
    });
    builder.addCase(SENDMESSAGE, (state, action) => {
      const { lastMessageId } = action.payload;
      const countNextMessage = lastMessageId + 1;
      state.showCaptureModal = false;
      state.showReply = false;
      state.loadMessageIds.push(countNextMessage);
    });
    builder.addCase(ADD_MESSAGE, (state, action) => {
      let loaderIds = current(state.loadMessageIds);
      loaderIds = [...loaderIds];
      const { frontId } = action.payload;
      const loaderIndex = loaderIds.indexOf(frontId);
      state.messageInput = '';
      state.adds = null;
      state.replyIds = [];
      state.replyMessage = null;
      if (loaderIndex >= 0) {
        loaderIds.splice(loaderIndex, 1);
        state.loadMessageIds = [...loaderIds];
      }
    });
    builder.addCase(SET_IMAGES, (state, action) => {
      const { files } = action.payload;
      Array.from(files).forEach((file) => {
        const { type } = file;
        const currentAdds = (state.adds || {});
        if (/image/.test(type)) {
          if (!currentAdds[EMessageAdd.Img]) currentAdds[EMessageAdd.Img]= [];
          const nextId = generateAddsId(currentAdds[EMessageAdd.Img]);
          currentAdds[EMessageAdd.Img].push({
            ...file,
            id: nextId,
          });
          state.adds = { ...currentAdds };
        } else if (/video/.test(type)) {
          if (!currentAdds[EMessageAdd.Video]) currentAdds[EMessageAdd.Video] = [];
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
    builder.addCase(CHANGE_FILES, (state, action) => {
      const { files, id, type } = action.payload;
      const fileIndex = state.adds[type].findIndex((file) => file.id === id);
      if (fileIndex >= 0) state.adds[type].splice(fileIndex, 1, files[0]);
    });
    builder.addCase(START_NAVIGATION, (state, action) => {
      const { messageId } = action.payload;
      const scrollService = current(state.scrollService);
      const scrolledMessage = scrollService.findById(messageId);
      if (scrolledMessage) {
        scrolledMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      } else {
        const firstMessage = scrollService.getLastMessage();
        firstMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    });
    builder.addCase(ADD_MESSAGES, (state) => {
      state.loadingBottom = false;
      state.loadingTop = false;
    });
    builder.addCase(SELECTION_ENDING, (state, action) => {
      const array: number[] = action.payload;
      array.forEach((id) => {
        const replyIndex = state.replyIds.indexOf(id);
        if (replyIndex < 0) {
          state.replyIds.push(id);
        } else {
          state.replyIds.splice(replyIndex, 1)
        }
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
  onMoveChatToBottom,
  removeAddByTypeAndId,
  updateAddByTypeAndId,
  onAddReplyId,
  onCliseCaptureModal,
} = chatSlice.actions;

export default chatSlice.reducer;
