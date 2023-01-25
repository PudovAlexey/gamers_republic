import { createSelector } from '@reduxjs/toolkit';
const userSelector = store => store.authSlice.user

const usersOnlineSelector = store => store.authSlice.usersOnline
const byId = (_, id) => id

const userOnlineByIdSelector = createSelector(
    [usersOnlineSelector, byId],
    (users, id) => users.find(userId => userId === id)
)

export {
    userSelector,
    usersOnlineSelector,
    userOnlineByIdSelector
}