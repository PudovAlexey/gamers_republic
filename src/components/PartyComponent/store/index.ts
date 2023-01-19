import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    activeContainer: null,
    roomData: null,
    messages: [],
    messageById: {},
    messagesData: null,
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
          
        },
        setReplyMessage: (store, action) => {

        },

        removeReplyMessage: (store) => {
        }
    },
    extraReducers: (builder) => {
    }
})

export const {
    setContainer,
    init,

} = partySlice.actions

export default partySlice.reducer