import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeContainer: null,
    messages: []
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
        }
    }
})

export const {
    setContainer,
    init
} = partySlice.actions

export default partySlice.reducer