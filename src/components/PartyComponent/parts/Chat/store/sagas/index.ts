import { eventChannel } from 'redux-saga';
import {call, takeEvery, select, put, apply, all, delay} from 'redux-saga/effects'
import api from '../../../../../../api/api'
import { parseToBase64 } from '../../../../../../utils/encoders';
import { ADD_MESSAGE, ADD_MESSAGES, CHANGE_FILES, NAVIGATION_PROGRESS, REPLY_NAVIGATE, RESTORE_MESSAGES, SELECTION_ENDING, SELECT_MESSAGES, SENDMESSAGE, SET_IMAGES, SHOW_LOADER, START_NAVIGATION, UPDATE_FILES, UPLOAD_FILES, UPLOAD_MESSAGES, UPLOAD_MESSAGES_BY_OFFSET } from '../actionCreators'
import { messageScrollContainerSelector, messagesIdsSelector, roomIdSelector, scrollServiceSelector } from '../selectors/chatSelector';

function* fetchMessageSend () {
    const state = yield select(state => state.chatSlice);
    console.log(state)
    const ids = yield select(messagesIdsSelector)
    const authUser = yield select(state => state.authSlice.user)
    const maxId = (ids.length ? Math.max(...ids) : 0)
    try {
       const newMessage = yield apply(api, api.sendMessage, [{
        message: state.messageInput,
        adds: state.adds,
        userId: authUser.id,
        roomId: authUser.roomId,
        replyIds: state.replyIds,
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

function* parseImages(action) {
    const {event, type, id, operation} = action.payload
    const files = event.target.files
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
    type: operation === 'create' ? SET_IMAGES : CHANGE_FILES,
    payload: {
        files: parsed, 
        type, 
        id
    }
   })
}

function* replyNavigation(action) {
    const {messageId} = action.payload
    const messagesIds = yield select(messagesIdsSelector)
    const roomId = yield select(roomIdSelector)
    if (messagesIds.indexOf(messageId) >= 0) {
        yield put({
          type: START_NAVIGATION,
          payload: {
            messageId
          }  
        })
    } else {
        yield put({
            type: START_NAVIGATION,
            payload: {
              messageId
            }  
          })
        const fetchedMessages = yield apply(api, api.getMessagesByRoomId, [{
            messageStart: messageId,
            where: 'center',
            offset: 50,
            roomId
        }])
        yield put({
            type: NAVIGATION_PROGRESS,
            payload: {
                messageId,
                fetchedMessages
            }
        })
        yield delay(0)
        yield put({
            type: START_NAVIGATION,
            payload: {
              messageId
            }  
          })
        yield put({
            type: RESTORE_MESSAGES,
            payload: {
                messageId
            }
        })
    }
}

function* restoreMessages(action) {
    const {messageId} = action.payload
    const roomId = yield select(roomIdSelector)
    const messagesIds = yield select(messagesIdsSelector)
    const firstMessage = messagesIds[0]
    yield put({
        type: SHOW_LOADER,
        payload: 'down'
    })
    const fetchedMessages = yield apply(api, api.getMessagesByRoomId, [{
        messageStart: messageId,
        where: 'down',
        offset: 50,
        roomId
    }])
    if (fetchedMessages.some(({messageId}) => messageId === firstMessage)) {
        return;
    }
    yield put({
        type: ADD_MESSAGES,
        payload: fetchedMessages
    })
   yield put({
        type: RESTORE_MESSAGES,
        payload: {
            messageId: fetchedMessages[fetchedMessages.length - 1].messageId
        }
    })

}

function* fetchMessages(action) {
    const {
        roomId,
        messageStart = 'end',
        offset = 50,
        where = 'up'
    } = action.payload
    // yield put({
    //     type: SHOW_LOADER,
    //     payload: where
    // })
    const messages = yield apply(api, api.getMessagesByRoomId, [{
        roomId,
        messageStart,
        offset,
        where
    }])

    yield put({
        type: ADD_MESSAGES,
        payload: messages
    })
}

function* fetchMessagesByOffset() {
    const scrollService = yield select(scrollServiceSelector)
    const roomId = yield select(roomIdSelector)
    const messageContainer = yield select(messageScrollContainerSelector)
    const {scrollDirection, queryMessage} = scrollService.update(messageContainer)
    if (queryMessage !== null) {
        yield put({
            type: UPLOAD_MESSAGES,
            payload: {
                roomId,
                messageStart: queryMessage,
                offset: 50,
                where: scrollDirection
            }
        })
    }

}

function* someFunc({target}) {
    const scrollService = yield select(scrollServiceSelector)
    const scrollContainer = yield select(messageScrollContainerSelector)
    scrollService.update(scrollContainer)
    const allMessages = scrollService.getAllMessages()
    const selectionIds = []
    const findTargetMessage = allMessages.find(message => target.closest(`[data-messageid="${message.dataset.messageid}"]`))
    const replyIndex = selectionIds.indexOf(+findTargetMessage?.dataset?.messageid)
    if (replyIndex < 0) {
        selectionIds.push(+findTargetMessage?.dataset?.messageid)
    }
    yield put({
      type: SELECTION_ENDING,
      payload: selectionIds
  })
}

function* messagesSelection(action) {
    const e = action.payload
    const scrollContainer = yield select(messageScrollContainerSelector)    
    const clickChannel = eventChannel((emitter) => {
        function onMouseUp() {
            scrollContainer.removeEventListener('mousemove', emitter)
            scrollContainer.removeEventListener('mouseup', onMouseUp)
        }
        scrollContainer.addEventListener('mouseup', onMouseUp)
        scrollContainer.addEventListener('mousemove', emitter);
        return () => {
            console.log('calling')
            scrollContainer.removeEventListener('mousemove', emitter);
            scrollContainer.removeEventListener('mousemove', onMouseUp);
        }
    });
    yield takeEvery(clickChannel, someFunc);
}

function* sendMessage() {
    yield takeEvery(SENDMESSAGE, fetchMessageSend)
}

function* parseImage() {
    yield takeEvery(UPLOAD_FILES, parseImages)
}

function* replyNavigate() {
    yield takeEvery(REPLY_NAVIGATE, replyNavigation)
    yield takeEvery(RESTORE_MESSAGES, restoreMessages)
}

function* chatUpload() {
    yield takeEvery(UPLOAD_MESSAGES, fetchMessages)
    yield takeEvery(UPLOAD_MESSAGES_BY_OFFSET, fetchMessagesByOffset)
}

function* chatSelect() {
    yield takeEvery(SELECT_MESSAGES, messagesSelection)
}

function* chatSagas() {
    yield all([
        call(sendMessage),
        call(parseImage),
        call(replyNavigate),
        call(chatUpload),
        call(chatSelect)
    ])
}

export {
    sendMessage,
    chatSagas
}