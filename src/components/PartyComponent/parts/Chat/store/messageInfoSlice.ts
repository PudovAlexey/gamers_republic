import { createSelector, createSlice } from "@reduxjs/toolkit"
import { ADD_MESSAGE, SENDMESSAGE } from "./actionCreators"
import { fetchMessages } from "./messagesSlice"

const initialState = {}

const selectItems = state => state
const selectItemId = (state, itemId) => itemId

export const selectItemById = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items?.[itemId]
  )

  export const selectUserByMessageId = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items?.[itemId].user
  )

export const messagesInfoSlice = createSlice({
    name: 'messagesInfo',
    initialState,
    reducers: {
        onInit: (store, action) => {
        },
        onExit: (store) => {
            store = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            if (Array.isArray(action.payload)) action.payload.forEach((message) => {
                const {messageId} = message
                if (!state[messageId]) {
                    state[messageId] = message
                }
                 
            })
        })
        builder.addCase(ADD_MESSAGE, (state, action) => {
            console.log(action, 'test')
            const {messageId} = action.payload
            state[messageId] = action.payload
        })
    }
})

export const {
    onInit,
    onExit
} = messagesInfoSlice.actions

export default messagesInfoSlice.reducer