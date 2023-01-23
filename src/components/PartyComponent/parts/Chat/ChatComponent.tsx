import {Stack, styled } from "@mui/material"
import React from "react"
import MessagesList from "./controls/Messages/MessagesList"
import { ChatHeader } from "./controls/ChatHeader"
import { SwitchInputComponent } from "./controls/SwitchInputComponent"

function ChatComponent() {
    return (
        <ChatBox>
            <Stack spacing={1}>
            <ChatHeader/>
            <MessagesList/>
            </Stack>
            <SwitchInputComponent/>
        </ChatBox>
    )
}

const ChatBox = styled(Stack)({
    position: 'relative',
})

export {
    ChatComponent
}