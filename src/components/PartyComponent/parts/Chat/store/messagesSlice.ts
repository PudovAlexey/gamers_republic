import { createSlice, current } from "@reduxjs/toolkit"
import { ADD_MESSAGE, ADD_MESSAGES, SENDMESSAGE } from "./actionCreators"
const initialState= {
    messages: [],
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
            let currentMessages = state.messages
            let changed = false
            if (Array.isArray(action.payload)) {
                action.payload.forEach(({messageId}) => {
                    const isSameMessage = currentMessages.indexOf(messageId)
                       if (isSameMessage < 0) {
                        changed = true
                        currentMessages.push(messageId)
                       }
                })
            }
            if (changed) {
                currentMessages.sort((a, b) => b - a)
                currentMessages = [...new Set(currentMessages)]
                state.messages = currentMessages
            }
          })
          builder.addCase(SENDMESSAGE, (store, action) => {
            const {lastMessageId} = action.payload
            store.messages.unshift(lastMessageId + 1)
          })
          builder.addCase(ADD_MESSAGE, (state, action) => {
            const {messageId, frontId} = action.payload
            const messageIds = current(state.messages)
            const findFrontId = messageIds.indexOf(frontId)
            if (frontId >= 0) {
                state.messages.splice(findFrontId, 1, messageId)
            } else if (!frontId && !state.messages.includes(messageId)) {
                state.messages.unshift(messageId)
            }
          })
    }
})

export const {
    onExit,
} = messagesSlice.actions

export default messagesSlice.reducer

