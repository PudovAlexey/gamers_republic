import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    activeContainer: null,
    messages: [],
    replyMessage: null
}

const partySlice = createSlice({
    name: 'partySlice',
    initialState,
    reducers: {
        setContainer(store, action) {
            store.activeContainer = action.payload
        },
        init: (store, action) => {
            const {messages} = action.payload
            store.messages = messages
        },
        setReplyMessage: (store, action) => {
            const messages = current(store.messages)
            store.replyMessage = 
            messages.find(message => message.messageId === action.payload)
        },
        removeReplyMessage: (store) => {
            store.replyMessage = null
        }
    }
})

export const {
    setContainer,
    init,
    setReplyMessage
} = partySlice.actions

export default partySlice.reducer