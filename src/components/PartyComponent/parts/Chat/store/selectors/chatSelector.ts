import { createSelector } from '@reduxjs/toolkit';

const chatInfoSelector = (store) => store.chatSlice.chatInfo

const inputRowsSelector = (store) => store.chatRedusers.chatSlice.inputRows

const loadMessages = (store) => store.chatRedusers.chatSlice.loadMessageIds;

const replyHeightSelector = (state) => state.chatRedusers.chatSlice.replyHeight;

const pressedButtonsSelector = (state) => state.chatRedusers.chatSlice.pressButtons;

const chatHeightSelector = (state) => state.chatRedusers.chatSlice.chatHeight;

const showReplySelector = (state) => state.chatRedusers.chatSlice.showReply;

const roomIdSelector = (state) => state.chatRedusers.chatSlice.roomId;

const messages = (state) => state.chatRedusers.messages;

const scrollServiceSelector = (state) =>
  state.chatRedusers.chatSlice.scrollService;

const messageScrollContainerSelector = (state) =>
  state.chatRedusers.chatSlice.messageContainer;

const replyIdsSelector = (state) => state.chatRedusers.chatSlice.replyIds;

const messageInputSelector = (state) =>
  state.chatRedusers.chatSlice.messageInput;

const replyMessageSelector = (state) =>
  state.chatRedusers.chatSlice.replyMessage;

const addsSelector = (state) => (state.chatRedusers.chatSlice.adds || {});

const showCaptureModalSelector = (state) =>
  state.chatRedusers.chatSlice.showCaptureModal;

const countAddsSelector = (state) => {
  const adds = state.chatRedusers.chatSlice.adds;

  return Object.values(adds || {}).flat(2).length;
};
const replyAddsSelector = (state) => state.chatRedusers.chatSlice.replyAdds;

const messagesIdsSelector = (state) => state.chatRedusers.messagesIds.messages;

const selectItemId = (_, itemId) => itemId;


const maxMessagesIdsSelector = (state) => {
  const messagesIds = state.chatRedusers.messagesIds.messages;

  return messagesIds.length > 0 ? Math.max(...messagesIds) : 0;
};

const loadMessageById = createSelector(
  [loadMessages, selectItemId],
  (items, itemId) => items.find((item) => item === itemId)
);

const messageByIdSelector = createSelector(
  [messages, selectItemId],
  (items, itemId) => items[itemId]
);

const previousMessageSelector = createSelector(
  [messages, selectItemId, messagesIdsSelector],
  (items, itemId, allMessages) => {
    const messageIndex = allMessages.indexOf(itemId)
    const nextMessage = messageIndex > 0 && allMessages[messageIndex - 1]
    return items[nextMessage] || {}
  }
);

const nextMessageSelector = createSelector(
  [messages, selectItemId, messagesIdsSelector],
  (items, itemId, allMessages) => {
    const messageIndex = allMessages.indexOf(itemId)
    const nextMessage = messageIndex > 0 && allMessages[messageIndex + 1]
    return items[nextMessage] || {}
  }
);

const isSelectedMessagesSelector = createSelector(
  [replyIdsSelector, selectItemId],
  (items, itemId) => items.some((i) => i === itemId)
);

const replyFirstMessageById = createSelector(
  [messages, selectItemId],
  (items, itemId) => {
    return items?.[itemId]?.replyMessages?.[0];
  }
);

export {
  loadMessageById,
  replyHeightSelector,
  chatHeightSelector,
  showReplySelector,
  roomIdSelector,
  scrollServiceSelector,
  messageInputSelector,
  addsSelector,
  messagesIdsSelector,
  maxMessagesIdsSelector,
  replyMessageSelector,
  replyAddsSelector,
  showCaptureModalSelector,
  countAddsSelector,
  replyFirstMessageById,
  messageScrollContainerSelector,
  isSelectedMessagesSelector,
  replyIdsSelector,
  chatInfoSelector,
  pressedButtonsSelector,
  inputRowsSelector,
  previousMessageSelector,
  nextMessageSelector,
  messageByIdSelector
};
