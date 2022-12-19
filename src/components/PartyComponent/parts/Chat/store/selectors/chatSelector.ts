import { createSelector } from "@reduxjs/toolkit"

const loadMessages = store => store.chatRedusers.chatSlice.loadMessageIds
const selectItemId = (_, itemId) => itemId

const loadMessageById =  createSelector(
    [loadMessages, selectItemId],
    (items, itemId) => items.find(item => item === itemId)
  )
export {
    loadMessageById
}