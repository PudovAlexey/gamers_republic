import { createSelector } from '@reduxjs/toolkit';

const chatInfoSelector = (store) => store.chatRedusers.chatSlice.roomInfo

const inputRowsSelector = (store) => store.chatRedusers.chatSlice.inputRows

const loadMessages = (store) => store.chatRedusers.chatSlice.loadMessageIds;

const replyHeightSelector = (state) => state.chatRedusers.chatSlice.replyHeight;

const pressedButtonsSelector = (state) => state.chatRedusers.chatSlice.pressButtons;

const chatHeightSelector = (state) => state.chatRedusers.chatSlice.chatHeight;

const showSearchPanelSelector = (state) => state.chatRedusers.chatSlice.showSearchPanel;

const showNavItemsSelector = (state) => state.chatRedusers.chatSlice.showNavItems;

const showReplySelector = (state) => state.chatRedusers.chatSlice.showReply;

const emojiAnchorSelector = (state) => state.chatRedusers.chatSlice.emojiAnchor;

const roomIdSelector = (state) => state.chatRedusers.chatSlice.roomId;

const messages = (state) => state.chatRedusers.messages;

const scrollServiceSelector = (state) =>
  state.chatRedusers.chatSlice.scrollService;

const messageScrollContainerSelector = (state) =>
  state.chatRedusers.chatSlice.messageContainer;

const replyIdsSelector = (state) => state.chatRedusers.chatSlice.replyIds;

const searchMessagesIdsSelector = (state) => state.chatRedusers.chatSlice.searchMessages

const searchMessageSelectionSelector = (state) => state.chatRedusers.chatSlice.searchMessageId

const isSearchEmptySelector = (state) => {
  return state.chatRedusers.chatSlice.showEmptySearch
}

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
const messagesOnScreenSelector = (state) => state.chatRedusers.chatSlice.messagesOnScreen
const replyAddsSelector = (state) => state.chatRedusers.chatSlice.replyAdds;

const messagesIdsSelector = (state) => state.chatRedusers.messagesIds.messages;

const selectItemId = (_, itemId) => itemId;

const firstMessageDateOnScreenSelector = state => {
  const messagesOnScreen = state.chatRedusers.chatSlice.messagesOnScreen
  const firstMessage = messagesOnScreen[0]
  const messageId = +firstMessage?.dataset?.messageid
  return messages(state)[messageId]
}


const maxMessagesIdsSelector = (state) => {
  const messagesIds = state.chatRedusers.messagesIds.messages;

  return messagesIds.length > 0 ? Math.max(...messagesIds) : 0;
};

const loadMessageById = createSelector(
  [loadMessages, selectItemId],
  (items, itemId) => items.find((item) => item === itemId)
);

const searchMessageIndexSelector = createSelector(
  [searchMessagesIdsSelector, searchMessageSelectionSelector],
  (searchMessagesIds, searchId) => {
    if (!searchMessagesIds) return null
    return  searchMessagesIds.length - searchMessagesIds.findIndex(searchMessage => searchMessage.id === searchId)
  }
)

const getSearchSelectedIndex = createSelector(
  [searchMessagesIdsSelector, selectItemId],
  (searchMessagesIds, searchId) => {
    if (!searchMessagesIds) return null
    const searchIndex = searchMessagesIds.findIndex(searchMessage => searchMessage.id === searchId)
    return searchMessagesIds[searchIndex]
  }
)

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
  messageByIdSelector,
  showNavItemsSelector,
  firstMessageDateOnScreenSelector,
  showSearchPanelSelector,
  searchMessagesIdsSelector,
  searchMessageSelectionSelector,
  searchMessageIndexSelector,
  getSearchSelectedIndex,
  isSearchEmptySelector,
  messagesOnScreenSelector,
  emojiAnchorSelector
};
