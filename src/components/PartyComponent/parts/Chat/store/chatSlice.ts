import { createSlice, current } from '@reduxjs/toolkit';
import { TMessageAdds, TMessage, TRoom } from '../../../../../api/types';
import { parseFileByType } from '../../../../../utils/formatters/formatters';
import { generateAddsId } from '../services/helpers';
import { TScrollService } from '../services/scrollService/types';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  INPUT_PRESS,
  INPUT_UNPRESS,
  INSERT_EMOJI,
  MARKDOWN_MESSAGES,
  SEARCH_MESSAGES_START,
  SELECTION_ENDING,
  SENDMESSAGE,
  SET_IMAGES,
  SET_INPUT_ROW,
  SET_ROOM_INFO,
  SHOW_LOADER,
  START_NAVIGATION,
  TOGGLE_NAV_ITEMS,
  UPDATE_MESSAGES_ON_SCREEN,
} from './actionCreators';
import { maxInputRows } from './constants';
import { $ } from '../../../../../utils/DOM/DOM';

const initialState: {
  chatInputRef: null | HTMLInputElement;
  emojiAnchor: null | HTMLElement;
  roomInfo: TRoom | null,
  messagesOnScreen: HTMLElement[];
  showEmptySearch: boolean;
  showNavItems: boolean;
  showSearchPanel: boolean;
  roomId: null | number;
  adds: object | TMessageAdds;
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
  searchMessages:
    | {
        id: number;
        searchMessage: (string | { tag: string; value: string })[];
      }[]
    | null;
  searchMessageId: number | null;
  scrollService: null | TScrollService;
  pressButtons: string[];
  inputRows: number;
  previousSelectionId: number | null;
} = {
  chatInputRef: null,
  emojiAnchor: null,
  roomInfo: null,
  messagesOnScreen: [],
  showNavItems: false,
  previousSelectionId: null,
  inputRows: 1,
  roomId: null,
  showEmptySearch: false,
  messageContainer: null,
  showCaptureModal: false,
  showSearchPanel: false,
  loadingBottom: false,
  loadingTop: false,
  messageInput: '',
  replyHeight: 70,
  chatHeight: 500,
  showReply: false,
  replyMessage: null,
  replyAdds: null,
  adds: {},
  loadMessageIds: [],
  replyIds: [],
  scrollService: null,
  pressButtons: [],
  searchMessages: null,
  searchMessageId: null,
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
    setChatInputRef: (state, action) => {
      state.chatInputRef = action.payload
    },

    inputMessage: (state, action) => {
      const { target, nativeEvent } = action.payload;
      if (nativeEvent.inputType === 'insertLineBreak') return;
      const separation = target.value.match(/\n/g);
      if (separation && separation.length < maxInputRows) {
        state.inputRows = separation.length;
      } else if (!separation) {
        const valueWidth = $.getMeasureText(target)
        const inputWidth = target.offsetWidth
        const rows = Math.ceil(valueWidth / inputWidth)
        state.inputRows = rows
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

    toggleEmojiAnchor: (state, action) => {
      if (!action.payload) {
        state.emojiAnchor = null
        return;
      }
      if (state.emojiAnchor) {
        state.emojiAnchor = null
      } else {
        state.emojiAnchor = action.payload
      }
    },

    onSearchMessageDown: (state) => {
      const scrollService = current(state.scrollService);
      const allMessages = scrollService.getAllMessages();
      const currentSelection = state.searchMessageId;
      const selectionIds = state.searchMessages;
      if (selectionIds && selectionIds.length) {
        const currentIndex = selectionIds.findIndex(
          ({ id }) => id === currentSelection
        );
        if (selectionIds[currentIndex + 1]?.id) {
          state.searchMessageId = selectionIds[currentIndex + 1]?.id;
          const currentMesage = allMessages.find(
            (m) => +m.dataset.messageid === selectionIds[currentIndex + 1]?.id
          );
          if (currentMesage) {
            $.selectAndLight(currentMesage);
          }
        }
      }
    },

    onSearchMessageUp: (state) => {
      const scrollService = current(state.scrollService);
      const allMessages = scrollService.getAllMessages();
      const currentSelection = state.searchMessageId;
      const selectionIds = state.searchMessages;
      if (selectionIds && selectionIds.length) {
        const currentIndex = selectionIds.findIndex(
          ({ id }) => id === currentSelection
        );
        if (selectionIds[currentIndex - 1]?.id) {
          state.searchMessageId = selectionIds[currentIndex - 1]?.id;
          const currentMesage = allMessages.find(
            (m) => +m.dataset.messageid === selectionIds[currentIndex - 1]?.id
          );
          if (currentMesage) {
            $.selectAndLight(currentMesage);
          }
        }
      }
    },

    toggleSearchPanel: (
      state,
      action: {
        payload: boolean;
      }
    ) => {
      state.showSearchPanel = action.payload;
      state.showEmptySearch = action.payload
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
      state.inputRows = 1;
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
      console.log('scrolled message')
      if (scrolledMessage) {
        $.selectAndLight(scrolledMessage);
      } else {
        const firstMessage = scrollService.getLastMessage();
        firstMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
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
      array.forEach((id, idx, all) => {
        const firstSelection = all[0];
        const replyIndex = state.replyIds.indexOf(id);
        const firstSelectionIdx = state.replyIds.indexOf(firstSelection);
        if (replyIndex < 0 && firstSelectionIdx < 0) {
          state.replyIds.push(id);
        } else if (firstSelectionIdx >= 0) {
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
        state.pressButtons.splice(keyIndex, 1);
      }
    });

    builder.addCase(SET_INPUT_ROW, (state, action) => {
      const input = state.messageInput;
      const { count, event } = action.payload;
      const { target } = event;
      const { selectionStart, selectionEnd } = target as HTMLInputElement;
      if (typeof count === 'number') {
        if (count < maxInputRows) {
          state.inputRows = count;
        } else {
          console.warn(
            `max input rows count is set to ${maxInputRows}.` +
              'please change config to make more'
          );
        }
      } else
        state.messageInput =
          input.slice(0, selectionStart) +
          `\n` +
          input.slice(selectionEnd, input.length - 1);
      if (state.inputRows < maxInputRows) ++state.inputRows;
    });

    builder.addCase(TOGGLE_NAV_ITEMS, (state, action) => {
      state.showNavItems = action.payload;
      state.loadingBottom = false;
      state.loadingTop = false;
    });

    builder.addCase(UPDATE_MESSAGES_ON_SCREEN, (state, action) => {
      state.messagesOnScreen = action.payload as any
    });

    builder.addCase(SEARCH_MESSAGES_START, (state, action) => {
      const { messages, searchValue } = action.payload;
      if (searchValue && (!messages || messages.length === 0)) {
        state.showEmptySearch = true
        return;
      } else if (!messages) {
        state.searchMessages = null
        return;
      } else if (!searchValue) {
        state.showSearchPanel = false
        return;
      }
      state.searchMessages = messages
        .map((mes) => {
          const { messageId, message } = mes;
          return {
            id: messageId,
            searchMessage: String(message)
              .split(new RegExp(searchValue, 'g'))
              .reduce((words, word, idx, all) => {
                words.push(word);
                if (all.length - 1 !== idx)
                  words.push({
                    tag: 'strong',
                    searchValue: searchValue,
                  });
                return words;
              }, []),
          };
        })
        .filter((m) => m.searchMessage.length > 1);
      state.searchMessageId = messages[messages.length - 1].messageId;
      state.showEmptySearch = false
    });

    builder.addCase(SET_ROOM_INFO, (state, action) => {
      state.roomInfo = action.payload
    })

    builder.addCase(INSERT_EMOJI, (state, action) => {
      const chatInput = state.chatInputRef
      const insertEmoji = $.insertText(chatInput, action.payload.emoji)
      state.messageInput = insertEmoji
    })

    builder.addCase(MARKDOWN_MESSAGES, (state, action) => {});
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
  onSearchMessageDown,
  onSearchMessageUp,
  toggleSearchPanel,
  toggleEmojiAnchor,
  setChatInputRef
} = chatSlice.actions;

export default chatSlice.reducer;
