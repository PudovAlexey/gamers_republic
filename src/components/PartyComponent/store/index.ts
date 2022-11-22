import { createSlice } from "@reduxjs/toolkit"

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
            store.replyMessage = action.payload
        }
    }
})

export const {
    setContainer,
    init,
    setReplyMessage
} = partySlice.actions

export default partySlice.reducer