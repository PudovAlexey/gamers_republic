import { createSelector } from "@reduxjs/toolkit"

const loadMessages = store => store.chatRedusers.chatSlice.loadMessageIds
const replyHeightSelector = state => state.chatRedusers.chatSlice.replyHeight
const chatHeightSelector  = state => state.chatRedusers.chatSlice.chatHeight
const showReplySelector = state => state.chatRedusers.chatSlice.showReply
const roomIdSelector = state => state.chatRedusers.chatSlice.roomId
const scrollServiceSelector = state => state.chatRedusers.chatSlice.scrollService
const messageInputSelector = state =>  state.chatRedusers.chatSlice.messageInput
const replyMessageSelector = state => state.chatRedusers.chatSlice.replyMessage
const addsSelector = state => state.chatRedusers.chatSlice.adds
const showCaptureModalSelector = state => state.chatRedusers.chatSlice.showCaptureModal
const countAddsSelector = state => {
  const adds = state.chatRedusers.chatSlice.adds
  return Object.values(adds).flat(2).length
}
const replyAddsSelector = state => state.chatRedusers.chatSlice.replyAdds
const messagesIdsSelector = state => state.chatRedusers.messagesIds
const selectItemId = (_, itemId) => itemId

const maxMessagesIdsSelector = state => {
  const messagesIds = state.chatRedusers.messagesIds
  return (messagesIds.length > 0 ? Math.max(...messagesIds) : 0)
}

const loadMessageById =  createSelector(
    [loadMessages, selectItemId],
    (items, itemId) => items.find(item => item === itemId)
  )



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
    countAddsSelector
}