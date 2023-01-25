import { createAction } from '@reduxjs/toolkit';
const CHECK_USER_ONLINE = createAction('users/CHECK_USER_ONLINE', (data: {
    userId: number
}) => ({
    payload: data
}))

const CHANGE_USER_ONLINE = createAction('users/CHANGE_USER_ONLINE', (data: {
    isOnline: boolean,
    userId: number
}) => ({
    payload: data
}))

export {
    CHECK_USER_ONLINE,
    CHANGE_USER_ONLINE
}