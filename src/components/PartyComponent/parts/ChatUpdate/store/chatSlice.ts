import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./messagesSlice";
import store from "../../../../../store/store";

const initialState = {
    scrollService: null,
    roomId: null
}

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        onInit: (state, action) => {
            const {scrollService, roomId} = action.payload
            const init = scrollService()
            state.scrollService = init
            state.roomId = roomId
        },
        onChatScroll: (state, action) => {
            const messagesData = state.scrollService
            const {scrollTop, scrollHeight} = action.payload.target
            const { scrollDirection, queryMessage} =
              messagesData.update(action.payload.target);
              console.log(scrollTop)
            if (scrollTop < -3666) {
              store.dispatch(
                fetchMessages({
                  roomId: state.roomId,
                  messageStart: queryMessage,
                  offset: 20,
                  where: scrollDirection,
                })
              );
            }
            const e = action.payload
        },
        onExit: (state) => {

        }
    }
})

export const {
    onInit,
    onChatScroll,
    onExit
} = chatSlice.actions

export default chatSlice.reducer