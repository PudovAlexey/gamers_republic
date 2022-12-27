import {call, takeEvery, select, put, apply, all} from 'redux-saga/effects'
import api from '../../../../../../api/api'
import { parseToBase64 } from '../../../../../../utils/encoders';
import { ADD_MESSAGE, SENDMESSAGE, SET_IMAGES, UPLOAD_FILES } from '../actionCreators'

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

function* parseImages(e) {
    const files = e.payload.target.files
   const parsed = yield all(Array.from(files).map(async file => {
    const parsedFile = await parseToBase64(file)
    console.log(file, 'in file')
    return {
        type: file.type,
        name: file.name,
        file: parsedFile
    }
   }))
   yield put({
    type: SET_IMAGES,
    payload: parsed
   })
}

function* sendMessage() {
    yield takeEvery(SENDMESSAGE, fetchMessageSend)
}

function* parseImage() {
    yield takeEvery(UPLOAD_FILES, parseImages)
}

function* chatSagas() {
    yield call(parseImage)
    yield call(sendMessage)
}

export {
    sendMessage,
    chatSagas
}