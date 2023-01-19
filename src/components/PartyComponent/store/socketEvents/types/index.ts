import { TMessage } from "../../../../../api/types"
type TGetMessage = {
    roomId: number,
    message: TMessage
}

type TRoomInvite = {
    userId: number,
    roomId: number
}

type TFriendInvitation = {
    userId: number,
    friendId: number
}

type TGameInvitation = {
    gameId: number,
    userId: number
}

enum ESocketEvents  {
    NewMessage = 'newMessage',
    RoomInvite = 'roomInvite',
    FriendInvitation = 'friendInvitation',
    GameInvitation = 'gameInvitation',
}

type TParseEvent = {
    (value: {
        event: ESocketEvents.NewMessage,
        data: TGetMessage
    }) : void
    (value: {
        event: ESocketEvents.RoomInvite,
        data: TRoomInvite
    }) : void
    (value: {
        event: ESocketEvents.FriendInvitation,
        data: TFriendInvitation
    }) : void
    (value: {
        event: ESocketEvents.GameInvitation,
        data: TGameInvitation
    }) : void
}

export {
    ESocketEvents
}

export type {
    TParseEvent,
    TGetMessage,
    TRoomInvite,
    TFriendInvitation,
    TGameInvitation,
}