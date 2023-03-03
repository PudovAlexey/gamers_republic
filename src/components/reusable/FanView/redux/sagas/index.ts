import { put, call, all, takeEvery, delay, select } from "redux-saga/effects"
import { afterChange, onFireChange, onScroll } from ".."
import { AFTER_CHANGE, SCROLL } from "../actionCreators"
import {onSlideNavigate} from '../index'

function* scrollSaga(action) {
    yield put(onScroll(action.payload))
    yield put(onSlideNavigate())
}

function* afterChangeSaga(action) {
    const fireChange = yield select(s => s.fanSlice.fireChange)

    yield put(afterChange(action.payload))
    if (fireChange) return
    yield put(onFireChange(true))
    yield delay(1000)
    yield put(onFireChange(false))
}

function* fanEffects() {
    yield takeEvery(SCROLL, scrollSaga)
    yield takeEvery(AFTER_CHANGE, afterChangeSaga)
}

function* fanSaga() {
    yield all([
        call(fanEffects)
    ])
}

export {
    fanSaga
}