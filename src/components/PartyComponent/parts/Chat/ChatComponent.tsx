import {Stack, styled } from "@mui/material"
import React from "react"
import MessagesList from "./controls/Messages/MessagesList"
import { ChatHeader } from "./controls/ChatHeader"
import { ChatInput } from "./controls/ChatInput/ChatInput"

function ChatComponent() {
    return (
        <ChatBox>
            <Stack spacing={1}>
            <ChatHeader/>
            <MessagesList/>
            </Stack>
            <ChatInput/>
        </ChatBox>
    )
}

const ChatBox = styled(Stack)({
    position: 'relative',
})

export {
    ChatComponent
}