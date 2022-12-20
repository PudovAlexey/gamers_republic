import { configureStore, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import store from "../../../store"
import api from "../../../../../api/api"
import { ADD_MESSAGE, SENDMESSAGE } from "./actionCreators"
const initialState = []

export const fetchMessages = createAsyncThunk(null, 
    async({
        roomId,
        messageStart = 'end',
        offset = 20,
        where = 'up'
    }, _) => {
        const messages = await api.getMessagesByRoomId({
            roomId,
            messageStart,
            offset,
            where
        })
return messages
    }
    )

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        onInit: (state, action) => {
        },
        onExit: (store) => {
            store = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            const currentMessages = current(state)
            if (Array.isArray(action.payload)) action.payload.forEach(({messageId}) => {
                const isSameMessage = currentMessages.indexOf(messageId)
                   if (isSameMessage < 0) state.push(messageId)
            })
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
    }
})

export const {
    onInit,
    onExit,
} = messagesSlice.actions

export default messagesSlice.reducer

