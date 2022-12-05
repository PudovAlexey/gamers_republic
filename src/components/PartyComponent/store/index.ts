import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import api from "../../../api/api"
import { getMessagesData } from "../parts/Chat/services/scrollService"

const initialState = {
    activeContainer: null,
    roomData: null,
    messages: [],
    messagesData: null,
    replyMessage: null
}

// function fetchMessages() {
//     const messages = await api.getMessagesByRoomId({
//         roomId,
//         messageStart: 'end',
//         offset: 20,
//         where: 'up'
//     })
// }
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

const partySlice = createSlice({
    name: 'partySlice',
    initialState,
    reducers: {
        setContainer(store, action) {
            store.activeContainer = action.payload
        },
        init: (store, action) => {
            const messagesData = getMessagesData()
            const {roomId} = action.payload
            // const messages = await api.getMessagesByRoomId({
            //         roomId,
            //         messageStart: 'end',
            //         offset: 20,
            //         where: 'up'
            //     })
            store.roomData = {
                roomId
            }
            // store.messages = messages
            store.messagesData = messagesData
        },
        setReplyMessage: (store, action) => {
            // const messages = current(store.messages)
            // store.replyMessage = 
            // messages.find(message => message.messageId === action.payload)
        },
        // onUpdateMessages: async (store, action) => {
        //     const {scrollDirection, messagesOnScreen} = action.payload
        //     const roomData = current(store.roomData)
        //     const messages  = current(store.messages)
        //     const newMessages = api.getMessagesByRoomId({
        //         offset: scrollDirection,
        //         roomId: roomData.roomId,
        //         messageStart: messagesOnScreen
        //     })
        //     state.messages = [...messages, ...newMessages]
        // },
        removeReplyMessage: (store) => {
            store.replyMessage = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            // Add user to the state array
            // const messages = 
            //     messages.push(action.payload)
            // state.messages = messages
            console.log(action.payload, 'scroll')
            if (Array.isArray(action.payload)) action.payload.forEach(message => {
                state.messages.push(message)
            })
          })
    }
})

export const {
    setContainer,
    init,
    // setReplyMessage,
    // onUpdateMessages,

} = partySlice.actions

export default partySlice.reducer