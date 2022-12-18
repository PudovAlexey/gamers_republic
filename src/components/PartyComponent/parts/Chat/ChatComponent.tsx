import { Box, Stack, styled } from "@mui/material"
import React, { useContext } from "react"
import { useAppDispatch } from "../../../../hooks/typedReduxHooks"
import { AuthContext } from "../../../AuthContext/AuthContext"
import { onExit } from "./controls/AudioViewer/store/playAudioSlice"
import MessagesList from "./controls/Messages/MessagesList"
import { ChatHeader } from "./controls/ChatHeader"
import { ChatInput } from "./controls/ChatInput/ChatInput"
import { fetchMessages } from "./store/messagesSlice"
import { fetchChat, onInit } from "./store/chatSlice"
import { scrollService } from "./services/scrollService"
import Message from "./controls/Messages/controls/Message/Message"

function ChatComponent() {
    const [AuthUser] = useContext(AuthContext)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        if (AuthUser?.roomId) 
        dispatch(onInit({
            scrollService,
            roomId: AuthUser?.roomId
        }))
        dispatch(fetchChat(AuthUser?.roomId))
        dispatch(fetchMessages({
            roomId: AuthUser?.roomId
        }))
        return () => {
            dispatch(onExit())
        }
    })
    return (
        <Stack>
            <ChatHeader/>
            <MessagesList/>
            <ChatInput/>
        </Stack>
    )
}

export {
    ChatComponent
}