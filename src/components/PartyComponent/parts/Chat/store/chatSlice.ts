import { createSlice, current } from '@reduxjs/toolkit';
import { TMessageAdds, TMessage } from '../../../../../api/types';
import { parseFileByType } from '../../../../../utils/formatters/formatters';
import { generateAddsId } from '../services/helpers';
import { TScrollService } from '../services/scrollService/types';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  INPUT_PRESS,
  INPUT_UNPRESS,
  MARKDOWN_MESSAGES,
  SELECTION_ENDING,
  SENDMESSAGE,
  SET_IMAGES,
  SET_INPUT_ROW,
  SHOW_LOADER,
  START_NAVIGATION,
} from './actionCreators';
import { maxInputRows } from './constants';

const initialState: {
  roomId: null | number;
  adds: null | TMessageAdds;
  replyAdds: null | TMessageAdds;
  messageContainer: null | HTMLElement;
  replyMessage: null | TMessage;
  showReply: boolean;
  chatHeight: number;
  showCaptureModal: boolean;
  loadingTop: boolean;
  loadingBottom: boolean;
  messageInput: string;
  replyHeight: number;
  loadMessageIds: number[];
  replyIds: number[];
  scrollService: null | TScrollService;
  pressButtons: string[];
  inputRows: number;
  previousSelectionId: number | null
} = {
  previousSelectionId: null,
  inputRows: 1,
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
  pressButtons: [],
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    onInit: (state, action) => {
      const { scrollService, roomId, messageContainer } = action.payload;
      const init = scrollService();
      init.update(messageContainer);
      state.scrollService = init;
      state.roomId = roomId;
      state.messageContainer = messageContainer;
    },

    inputMessage: (state, action) => {
      const { target, nativeEvent } = action.payload;
      if (nativeEvent.inputType === 'insertLineBreak') return;
      const separation = target.value.match(/\n/g)
      if (separation && separation.length < maxInputRows) {
        state.inputRows = separation.length
      } else if (!separation) {
        state.inputRows = 1
      }
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
      const currentAdds = state.adds || {};
      Array.from(files).forEach((file) => {
        const parseType = parseFileByType(file);
        if (parseType) {
          if (!currentAdds[parseType]) currentAdds[parseType] = [];
          const nextId = generateAddsId(currentAdds[parseType]);
          currentAdds[parseType].push({
            ...file,
            id: nextId,
          });
        }
      });
      state.adds = { ...currentAdds } as TMessageAdds;
      state.showCaptureModal = true;
    });

    builder.addCase(CHANGE_FILES, (state, action) => {
      const { files, id } = action.payload;
      const parseType = parseFileByType(files[0]);
      const fileIndex = state.adds[parseType].findIndex(
        (file) => file.id === id
      );
      if (fileIndex >= 0)
        state.adds[parseType].splice(fileIndex, 1, {
          id,
          type: parseType,
          file: files[0],
          name: files[0].name,
        });
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
          state.replyIds.splice(replyIndex, 1);
        }
      });
    });

    builder.addCase(INPUT_PRESS, (state, action) => {
      const event = action.payload;
      if (!state.pressButtons.includes(event.key)) {
        state.pressButtons.push(event.key);
      }
    });

    builder.addCase(INPUT_UNPRESS, (state, action) => {
      const event = action.payload;
      const keyIndex = state.pressButtons.indexOf(event.key);
      if (keyIndex >= 0) {
        console.log(state.pressButtons[keyIndex], 'unpress')
        state.pressButtons.splice(keyIndex, 1);
      }
    });

    builder.addCase(SET_INPUT_ROW, (state, action) => {
      const input = state.messageInput;
      const { count, event } = action.payload;
      const { target } = event;
      const { selectionStart, selectionEnd } = target;
      if (typeof count === 'number') {
        if (count < maxInputRows) {
          state.inputRows = count;
        } else {
          console.warn(
            `max input rows count is set to ${maxInputRows}.` + 
          'please change config to make more'
          )
        }
      } else
        state.messageInput =
        input.slice(0, selectionStart) +
        `\n` +
        input.slice(selectionEnd, input.length - 1);
          if (state.inputRows < maxInputRows) ++state.inputRows;
    });

    builder.addCase(MARKDOWN_MESSAGES, (state, action) => {
      const markupMessages = action.payload
      console.log(state.messageContainer, markupMessages, 'in message')
    })
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
  onAddReplyId,
  onCliseCaptureModal,
} = chatSlice.actions;

export default chatSlice.reducer;
