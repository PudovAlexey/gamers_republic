import { debounce, put, call, all, takeLatest, throttle } from "redux-saga/effects"
import { onScroll } from ".."
import { SCROLL } from "../actionCreators"

function* scrollSaga(action) {
    console.log('on scroll')
    yield put(onScroll(action.payload))
}

function* fanEffects() {
    yield throttle(100, SCROLL, scrollSaga)
    // yield takeLatest(SCROLL, scrollSaga)
}

function* fanSaga() {
    yield all([
        call(fanEffects)
    ])
}

export {
    fanSaga
}