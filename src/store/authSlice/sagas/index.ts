import { all, call, apply, put, delay, takeEvery } from "redux-saga/effects";
import api from "../../../api/api/api";
import { CHANGE_USER_ONLINE, CHECK_USER_ONLINE } from "../actionCreators";

function* checkUserOnlineTimeout(action) {
    const {userId} = action.payload
    const isOnline = yield apply(api, api.userIsOnline, [userId])

    yield put(CHANGE_USER_ONLINE({
        isOnline,
        userId
    }))

    yield delay(60000)
    yield call(checkUserOnlineTimeout, {
        payload: {userId}
    })
}

function* userQuery() {
    yield takeEvery(CHECK_USER_ONLINE, checkUserOnlineTimeout)
}

function* userSagas() {
    yield all([
        call(userQuery)
    ])
}

export {
    userSagas
}