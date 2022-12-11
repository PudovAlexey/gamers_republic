import { createSelector, createSlice } from "@reduxjs/toolkit"
import { fetchMessages } from "./messagesSlice"

const initialState = {}

const selectItems = state => state
const selectItemId = (state, itemId) => itemId

export const selectItemById = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items?.[itemId]
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
                state[messageId] = message
                 
            })
        })
    }
})

export const {
    onInit,
    onExit
} = messagesInfoSlice.actions

export default messagesInfoSlice.reducer