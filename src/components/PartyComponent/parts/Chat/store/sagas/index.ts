import {takeLatest, call, take, takeEvery, select, put, apply} from 'redux-saga/effects'
import api from '../../../../../../api/api'
import { ADD_MESSAGE, getMessagesByOffset, SENDMESSAGE } from '../actionCreators'

function* fetchMessageSend (messageData) {
    const state = yield select(state => state.chatSlice);
    const ids = yield select(state => state.chatRedusers.messagesIds)
    const authUser = yield select(state => state.authSlice.user)
    const maxId = (ids.length ? Math.max(...ids) : 0)
    try {
       const newMessage = yield apply(api, api.sendMessage, [{
        message: state.messageInput,
        adds: state.adds,
        userId: authUser.id,
        roomId: authUser.roomId,
        replyMessageId: state.replyMessageId,
        frontId: maxId
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
    yield takeEvery(SENDMESSAGE, fetchMessageSend)

}

function* chatSagas() {
    yield call(sendMessage)
}

export {
    sendMessage,
    chatSagas
}