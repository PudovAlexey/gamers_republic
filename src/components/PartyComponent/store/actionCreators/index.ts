import { createAction } from '@reduxjs/toolkit';
import { TFriendInvitation, TGameInvitation, TRoomInvite } from '../socketEvents/types';

const INVITE_FRIEND_SOCKET = createAction('party/inviteFriend', (data: TFriendInvitation) => ({
    payload: data
}))

const INVITE_GAME_SOCKET = createAction('party/inviteGame', (data: TGameInvitation) => ({
    payload: data
}))

const INVITE_ROOM_SOCKET = createAction('party/inviteGame', (data: TRoomInvite) => ({
    payload: data
}))

export {
    INVITE_FRIEND_SOCKET,
    INVITE_GAME_SOCKET,
    INVITE_ROOM_SOCKET
}

