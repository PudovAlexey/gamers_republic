import { TFriendInvitation, TGameInvitation, TGetMessage, TParseEvent, TRoomInvite } from "./types"
import store from '../../../../store/store'
import { INVITE_FRIEND_SOCKET, INVITE_GAME_SOCKET, INVITE_ROOM_SOCKET } from "../actionCreators"
import { ADD_MESSAGE } from "../../parts/Chat/store/actionCreators"
const partyEvents = {
    newMessage(data: TGetMessage) {
        store.dispatch({
            type: ADD_MESSAGE,
            payload: data.message
        })
    },
    
    roomInvite(data: TRoomInvite) {
        store.dispatch({
            type: INVITE_ROOM_SOCKET,
            payload: data
        })
    },
    
    friendInvitation(data: TFriendInvitation) {
        store.dispatch({
            type: INVITE_FRIEND_SOCKET,
            payload: data
        })
    },
    
    gameInvitation(data: TGameInvitation) {
        store.dispatch({
            type: INVITE_GAME_SOCKET,
            payload: data
        })
    }
}

const parseEvent: TParseEvent = function ({event, data}) {
    if (typeof partyEvents[event] === 'function') {
        partyEvents[event](data)
    } else {
        console.warn(`Recognised unnown event ${event}`)
    }
}

export {
    parseEvent
}