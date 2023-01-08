import { createSelector, createSlice, current } from "@reduxjs/toolkit"
import { makeTimeString } from "../../../../../utils/timer/timer"
import { ADD_MESSAGE, ADD_MESSAGES, NAVIGATION_PROGRESS, SENDMESSAGE, START_NAVIGATION } from "./actionCreators"
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
        builder.addCase(ADD_MESSAGES, (state, action) => {
            if (Array.isArray(action.payload)) action.payload.forEach((message) => {
                const {messageId} = message
                if (!state[messageId]) {
                    state[messageId] = message
                }
                 
            })
        })
        builder.addCase(SENDMESSAGE, (state, action) => {
            const {message, adds, userData, lastMessageId} = action.payload
            const countNextMessage = lastMessageId + 1 
            state[countNextMessage] = {
                message,
                createdAt: makeTimeString(),
                adds: adds,
                reply: {},
                userId: userData.id,
                roomId: userData.roomId,
                messageId: countNextMessage,
                frontId: countNextMessage
            }
        })
        builder.addCase(ADD_MESSAGE, (state, action) => {
            const {messageId, frontId} = action.payload
            if (state[frontId]) {
                delete state[frontId]
                state[messageId] = action.payload
            }
        })

        builder.addCase(NAVIGATION_PROGRESS, (store, action) => {
            const {fetchedMessages} = action.payload
            if (Array.isArray(fetchedMessages) && fetchedMessages.length) {
                fetchedMessages.forEach((message) => {
                    const {messageId} = message
                   store[messageId] = message
                })
            } 
          })
    }
})

export const {
    onInit,
    onExit
} = messagesInfoSlice.actions

export default messagesInfoSlice.reducer