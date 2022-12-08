import { Stack } from "@mui/material"
import MessagesList from "../Chat/services/MessagesList"
import { ChatHeader } from "./controls/ChatHeader"
import { ChatInput } from "./controls/ChatInput/ChatInput"

function ChatComponent() {
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