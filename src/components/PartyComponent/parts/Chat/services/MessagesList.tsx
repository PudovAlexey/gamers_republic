import React from "react"
import { useAppSelector } from "../../../../../hooks/typedReduxHooks"
import Message from "../components/Message/Message"

function MessagesList() {
    const messages = useAppSelector((store) => store.partySlice.messages)
    return (
        <>
            {messages.map(message => (
                <Message key={message} messageId={message}/>
            ))}
        </>
    )

}

export default React.memo(MessagesList)