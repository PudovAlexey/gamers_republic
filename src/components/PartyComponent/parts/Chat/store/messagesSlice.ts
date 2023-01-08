import { createSlice, current } from "@reduxjs/toolkit"
import { ADD_MESSAGE, ADD_MESSAGES, NAVIGATION_PROGRESS, SENDMESSAGE } from "./actionCreators"
const initialState= {
    messages: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        onExit: (store) => {
            store.messages = []
        }
    },
    extraReducers: (builder) => {
          builder.addCase(ADD_MESSAGES, (state, action) => {
            let currentMessages = [...current(state.messages)]
            let changed = false
            if (Array.isArray(action.payload)) action.payload.forEach(({messageId}) => {
                const isSameMessage = currentMessages.indexOf(messageId)
                   if (isSameMessage < 0) {
                    changed = true
                    currentMessages.push(messageId)
                   }
            })
            currentMessages.sort((a, b) => b - a)
            currentMessages = [...new Set(currentMessages)]
            if (changed) state.messages = currentMessages
          })
          builder.addCase(SENDMESSAGE, (store, action) => {
            const {lastMessageId} = action.payload
            store.unshift(lastMessageId + 1)
          })
          builder.addCase(ADD_MESSAGE, (state, action) => {
            const {messageId, frontId} = action.payload
            // console.log('in Messages')
            // state.unshift(messageId)
            const messageIds = current(state)
            const findFrontId = messageIds.indexOf(frontId)
            if (frontId >= 0) {
                state.splice(findFrontId, 1, messageId)
            }            
          })
          builder.addCase(NAVIGATION_PROGRESS, (store, action) => {
            const {fetchedMessages} = action.payload
            const currentMessages = current(store.messages)
            if (Array.isArray(fetchedMessages) && fetchedMessages.length) {
                fetchedMessages.forEach(({messageId}) => {
                    const isSameMessage = currentMessages.indexOf(messageId)
                    if (isSameMessage < 0) store.messages.push(messageId)
                })
            } 
          })
    }
})

export const {
    onInit,
    onExit,
} = messagesSlice.actions

export default messagesSlice.reducer

