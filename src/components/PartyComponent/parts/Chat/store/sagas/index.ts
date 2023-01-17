import { eventChannel } from 'redux-saga';
import {
  call,
  takeEvery,
  select,
  put,
  apply,
  all,
  delay,
} from 'redux-saga/effects';
import api from '../../../../../../api/api/api';
import { parseToBase64 } from '../../../../../../utils/encoders';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  NAVIGATION_PROGRESS,
  REPLY_NAVIGATE,
  RESTORE_MESSAGES,
  SELECTION_ENDING,
  SELECT_MESSAGES,
  SENDMESSAGE,
  SET_IMAGES,
  SHOW_LOADER,
  START_NAVIGATION,
  UPLOAD_FILES,
  UPLOAD_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../actionCreators';
import {
  messageScrollContainerSelector,
  messagesIdsSelector,
  roomIdSelector,
  scrollServiceSelector,
} from '../selectors/chatSelector';

function* fetchMessageSend() {
  const state = yield select((state) => state.chatSlice);
  const ids = yield select(messagesIdsSelector);
  const authUser = yield select((state) => state.authSlice.user);
  const maxId = ids.length ? Math.max(...ids) : 0;
  try {
    const newMessage = yield apply(api, api.sendMessage, [
      {
        message: state.messageInput,
        adds: state.adds,
        userId: authUser.id,
        roomId: authUser.roomId,
        replyIds: state.replyIds,
        frontId: maxId,
      },
    ]);
    yield put(ADD_MESSAGE(newMessage));
  } catch (err) {}
}

function* parseImages(action) {
  const { event, id, operation } = action.payload;
  const files: File[] = event.target.files;
  const parsed = yield all(
    Array.from(files).map(async (file) => {
      const parsedFile = await parseToBase64(file);
      return {
        type: file.type,
        name: file.name,
        file: parsedFile,
      };
    })
  );
  switch (operation) {
    case 'create':
      yield put(
        SET_IMAGES({
          files: parsed,
          id,
        })
      );
      break;
    case 'update':
      yield put(
        CHANGE_FILES({
          files: parsed,
          id,
        })
      );
      break;
  }
}

function* replyNavigation(action) {
  const { messageId } = action.payload;
  const messagesIds = yield select(messagesIdsSelector);
  const roomId = yield select(roomIdSelector);
  if (messagesIds.indexOf(messageId) >= 0) {
    yield put(
      START_NAVIGATION({
        messageId,
      })
    );
  } else {
    yield put(
      START_NAVIGATION({
        messageId,
      })
    );
    const fetchedMessages = yield apply(api, api.getMessagesByRoomId, [
      {
        messageStart: messageId,
        where: 'center',
        offset: 50,
        roomId,
      },
    ]);
    yield put(
      NAVIGATION_PROGRESS({
        messageId,
        fetchedMessages,
      })
    );
    yield delay(0);
    yield put(
      START_NAVIGATION({
        messageId,
      })
    );
    yield put(
      RESTORE_MESSAGES({
        messageId,
      })
    );
  }
}

function* restoreMessages(action) {
  const { messageId } = action.payload;
  const roomId = yield select(roomIdSelector);
  const messagesIds = yield select(messagesIdsSelector);
  const firstMessage = messagesIds[0];
  yield put(SHOW_LOADER('down'));
  const fetchedMessages = yield apply(api, api.getMessagesByRoomId, [
    {
      messageStart: messageId,
      where: 'down',
      offset: 50,
      roomId,
    },
  ]);
  if (fetchedMessages.some(({ messageId }) => messageId === firstMessage)) {
    return;
  }
  yield put(ADD_MESSAGES(fetchedMessages));
  yield put(
    RESTORE_MESSAGES({
      messageId: fetchedMessages[fetchedMessages.length - 1].messageId,
    })
  );
}

function* fetchMessages(action) {
  const {
    roomId,
    messageStart = 'end',
    offset = 50,
    where = 'up',
  } = action.payload;
  yield put(SHOW_LOADER(where));
  const messages = yield apply(api, api.getMessagesByRoomId, [
    {
      roomId,
      messageStart,
      offset,
      where,
    },
  ]);
  yield put(ADD_MESSAGES(messages));
}

function* fetchMessagesByOffset() {
  const scrollService = yield select(scrollServiceSelector);
  const roomId = yield select(roomIdSelector);
  const messageContainer = yield select(messageScrollContainerSelector);
  const { scrollDirection, queryMessage } =
    scrollService.update(messageContainer);
  if (queryMessage !== null) {
    yield put(
      UPLOAD_MESSAGES({
        roomId,
        messageStart: queryMessage,
        offset: 50,
        where: scrollDirection,
      })
    );
  }
}

function* handleSelect({ target }) {
  const scrollService = yield select(scrollServiceSelector);
  const scrollContainer = yield select(messageScrollContainerSelector);
  scrollService.update(scrollContainer);
  const allMessages = scrollService.getAllMessages();
  const selectionIds = [];
  const findTargetMessage = allMessages.find((message) =>
    target.closest(`[data-messageid="${message.dataset.messageid}"]`)
  );
  const replyIndex = selectionIds.indexOf(
    +findTargetMessage?.dataset?.messageid
  );
  if (replyIndex < 0) {
    selectionIds.push(+findTargetMessage?.dataset?.messageid);
  }
  yield put(SELECTION_ENDING(selectionIds));
}

function* messagesSelection(action) {
  const scrollContainer = yield select(messageScrollContainerSelector);
  const clickChannel = eventChannel((emitter) => {
    function onMouseUp() {
      scrollContainer.removeEventListener('mousemove', emitter);
      scrollContainer.removeEventListener('mouseup', onMouseUp);
    }
    scrollContainer.addEventListener('mouseup', onMouseUp);
    scrollContainer.addEventListener('mousemove', emitter);
    return () => {
      scrollContainer.removeEventListener('mousemove', emitter);
      scrollContainer.removeEventListener('mousemove', onMouseUp);
    };
  });
  yield takeEvery(clickChannel, handleSelect);
}

function* sendMessage() {
  yield takeEvery(SENDMESSAGE, fetchMessageSend);
}

function* parseImage() {
  yield takeEvery(UPLOAD_FILES, parseImages);
}

function* replyNavigate() {
  yield takeEvery(REPLY_NAVIGATE, replyNavigation);
  yield takeEvery(RESTORE_MESSAGES, restoreMessages);
}

function* chatUpload() {
  yield takeEvery(UPLOAD_MESSAGES, fetchMessages);
  yield takeEvery(UPLOAD_MESSAGES_BY_OFFSET, fetchMessagesByOffset);
}

function* chatSelect() {
  yield takeEvery(SELECT_MESSAGES, messagesSelection);
}

function* chatSagas() {
  yield all([
    call(sendMessage),
    call(parseImage),
    call(replyNavigate),
    call(chatUpload),
    call(chatSelect),
  ]);
}

export { sendMessage, chatSagas };
