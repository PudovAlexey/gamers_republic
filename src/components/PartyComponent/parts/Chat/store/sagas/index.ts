import {takeLatest, call, take, takeEvery, select, put, apply} from 'redux-saga/effects'
import api from '../../../../../../api/api'
import { ADD_MESSAGE, getMessagesByOffset, SENDMESSAGE } from '../actionCreators'

function* fetchMessageSend (messageData) {
    const state = yield select(state => state.chatSlice);
    const authUser = yield select(state => state.authSlice.user)
    try {
       const newMessage = yield apply(api, api.sendMessage, [{
        message: state.messageInput,
        adds: state.adds,
        userId: authUser.id,
        roomId: authUser.roomId,
        replyMessageId: state.replyMessageId,
    }])
        yield put({
            type: ADD_MESSAGE,
            payload: newMessage
        })
    } catch(err) {
        console.log(err)
    }
}

function* sendMessage() {
    yield takeLatest(SENDMESSAGE, fetchMessageSend)

}

function* chatSagas() {
    yield call(sendMessage)
}

export {
    sendMessage,
    chatSagas
}