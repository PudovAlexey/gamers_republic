import { combineReducers } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import messageInfoSlice from "./messageInfoSlice";
import messagesSlice from "./messagesSlice";

const chatRedusers = combineReducers({
    chatSlice: chatSlice,
    messagesIds: messagesSlice,
    messages: messageInfoSlice
})

export {
    chatRedusers
}