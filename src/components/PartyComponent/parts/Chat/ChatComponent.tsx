import { Stack, styled } from "@mui/material"
import {useRef} from 'react'
import React, { useContext } from "react"
import { useAppDispatch } from "../../../../hooks/typedReduxHooks"
import { AuthContext } from "../../../AuthContext/AuthContext"
import { onExit } from "./controls/AudioViewer/store/playAudioSlice"
import MessagesList from "./controls/Messages/MessagesList"
import { ChatHeader } from "./controls/ChatHeader"
import { ChatInput } from "./controls/ChatInput/ChatInput"
import { onInit } from "./store/chatSlice"
import { scrollService } from "./services/scrollService/scrollService"
import { UPLOAD_MESSAGES } from "./store/actionCreators"

function ChatComponent() {
    const messageContainer = useRef()
    const [AuthUser] = useContext(AuthContext)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        if (AuthUser?.roomId) {
            dispatch(onInit({
                scrollService,
                roomId: AuthUser?.roomId,
                messageContainer: messageContainer.current
            }))
            
            dispatch(UPLOAD_MESSAGES({
                roomId: AuthUser?.roomId
            }))
        }
        return () => {
            dispatch(onExit())
        }
    })
    return (
        <ChatBox spacing={1}>
            <Stack spacing={1}>
            <ChatHeader/>
            <MessagesList messageContainer={messageContainer}/>
        </Stack>
            <ChatInput/>
        </ChatBox>
    )
}

const ChatBox = styled(Stack)({
    maxHeight: '700px'
})

export {
    ChatComponent
}