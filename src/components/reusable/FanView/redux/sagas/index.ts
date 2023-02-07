import { put, call, all, takeEvery, select, delay, takeLatest, debounce } from "redux-saga/effects"
import { afterChange, onScroll, onFireScroll, onFireChange } from ".."
import { EScrollDirection } from "../../../../../api/types"
import { AFTER_CHANGE, SCROLL } from "../actionCreators"
import { scrollDirectionSelector } from "../selectors"
import {onNext, onPrev} from '../index'

function* scrollSaga(action) {
    yield put(onScroll(action.payload))
    const scrollDirection = yield select(scrollDirectionSelector)
    if (scrollDirection === EScrollDirection.Up) {
        yield put(onNext())
    } else if (scrollDirection === EScrollDirection.Down) {
        yield put(onPrev())
    }
    // yield put(onFireChange(true))
    // yield delay(1000)
    // yield put(onFireChange(false))
}

function* afterChangeSaga(action) {
    // yield put(afterChange(action.payload))
  

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