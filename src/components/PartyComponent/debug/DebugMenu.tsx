import { Button } from "@mui/material"
import { Box } from "@mui/system"
import {parseEvent} from '../store/socketEvents'
import { ESocketEvents } from "../store/socketEvents/types"
import { friendInvitation, gameInvitation, getFakeMessage, getFakeRoomInvite } from "./fakeEventData"

function DebugMenu() {
    return (
        <Box sx={{background: 'black'}}>
            <Button onClick={(e) => parseEvent({
                event: ESocketEvents.NewMessage,
                data: getFakeMessage
            })}>
                Get Message
            </Button>
            <Button onClick={(e) => parseEvent({
                event: ESocketEvents.RoomInvite,
                data: getFakeRoomInvite
            })}>
                Invite Room
            </Button>
            <Button onClick={(e) => parseEvent({
                event: ESocketEvents.FriendInvitation,
                data: friendInvitation
            })}>
                Invite Frient
            </Button>
            <Button onClick={(e) => parseEvent({
                event: ESocketEvents.GameInvitation,
                data: gameInvitation
            })}>
                Invite Game
            </Button>
        </Box>
    )
}

export {
    DebugMenu
}