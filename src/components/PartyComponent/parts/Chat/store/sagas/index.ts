import { eventChannel } from 'redux-saga';
import {
  call,
  takeEvery,
  select,
  put,
  apply,
  all,
  delay,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../../../../../api/api/api';
import { userSelector } from '../../../../../../store/authSlice/selectors';
import { $ } from '../../../../../../utils/DOM/DOM';
import { parseToBase64 } from '../../../../../../utils/encoders';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  INPUT_PRESS,
  INPUT_PRESS_BY_ACTION,
  MARKDOWN_MESSAGES,
  NAVIGATION_PROGRESS,
  REPLY_NAVIGATE,
  RESTORE_MESSAGES,
  SEARCH_MESSAGE,
  SELECTION_ENDING,
  SELECT_MESSAGES,
  SENDMESSAGE,
  SET_IMAGES,
  SET_INPUT_ROW,
  SHOW_LOADER,
  START_NAVIGATION,
  UPLOAD_FILES,
  UPLOAD_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../actionCreators';
import {
  addsSelector,
  maxMessagesIdsSelector,
  messageInputSelector,
  messageScrollContainerSelector,
  messagesIdsSelector,
  pressedButtonsSelector,
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

function* inputPress(action) {
  const event = action.payload;
  const pressedButtons = yield select(pressedButtonsSelector);
  const input = yield select(messageInputSelector);
  const adds = yield select(addsSelector);
  const userData = yield select(userSelector);
  const maxMessageId = yield select(maxMessagesIdsSelector);
  yield put(INPUT_PRESS(event));
  const splitCombination =
    (pressedButtons.includes('Control') || pressedButtons.includes('Shift')) &&
    event.key === 'Enter';
  if (splitCombination) {
    yield put(
      SET_INPUT_ROW({
        event,
      })
    );
  } else if (event.key === 'Enter') {
    yield put(
      SENDMESSAGE({
        message: input,
        adds: adds,
        userData: userData,
        lastMessageId: maxMessageId,
      })
    );
  }
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
let previousSelectionId = null
function* handleSelect({ target }) {
  const scrollService = yield select(scrollServiceSelector);
  const scrollContainer = yield select(messageScrollContainerSelector);
  scrollService.update(scrollContainer);
  const allMessages = scrollService.getAllMessages();
  const selectionIds = [];
  const findTargetMessage = allMessages.find((message) =>
    target.closest(`[data-messageid="${message.dataset.messageid}"]`)
  );
  
  if (+findTargetMessage?.dataset?.messageid === previousSelectionId) {
    return
  }
  const replyIndex = selectionIds.indexOf(
    +findTargetMessage?.dataset?.messageid
    );
    previousSelectionId = +findTargetMessage?.dataset?.messageid
  if (replyIndex < 0) {
    selectionIds.push(+findTargetMessage?.dataset?.messageid);
  }
  yield put(SELECTION_ENDING(selectionIds));
}

function* messagesSelection(action) {
  let navigate = true
  const maxSpeed = 250;
  let speed = 50
  function handleNavigate(e) {
    function navigateHandler() {
    const scrollContainerRect = $.rect(scrollContainer)
    if (speed >= maxSpeed) speed = maxSpeed 
     setTimeout(() => {
      const scrollContainerTop = scrollContainerRect.top
      const scrollContainerBottom = scrollContainerRect.bottom
      const {clientY} = e
      if (scrollContainerTop > clientY &&  scrollContainerTop + 60 > clientY) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop -= (50),
          left: 0,
          behavior: 'smooth'
        })
      } else if (scrollContainerBottom - 30 < clientY && scrollContainerBottom - 60 < clientY) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop += (50),
          left: 0,
          behavior: 'smooth'
        })
      } else {
        console.log('cancel navigation')
      }
      speed = speed * 50
      if (navigate) requestAnimationFrame(navigateHandler)
    }, speed)
      }
    
      requestAnimationFrame(navigateHandler)
  }
  const scrollContainer = yield select(messageScrollContainerSelector);
  const clickChannel = eventChannel((emitter) => {
    function onMouseUp() {
      console.log('mouse up')
      navigate = false
      document.removeEventListener('mouseover', handleNavigate)
      scrollContainer.removeEventListener('mousemove', emitter);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleNavigate)
    scrollContainer.addEventListener('mousemove', emitter);
    return () => {
      scrollContainer.removeEventListener('mousemove', emitter);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleNavigate)
    };
  });
  yield takeLatest(clickChannel, handleSelect);
}

function* searchMessage(action) {
  const searchValue = action.payload
  const roomId = yield select(roomIdSelector)
  const findMessages = yield apply(api, api.findMessageBySearch, [{
    roomId,
    search: searchValue
  }])
  if (findMessages.length) {
    yield put(START_NAVIGATION({
      messageId: findMessages[findMessages.length - 1]
    }))
    yield put(MARKDOWN_MESSAGES(findMessages.map(messageId => ({
      messageId,
      searchText: searchValue
    }))))
  }
}

function* sendMessage() {
  yield takeEvery(SENDMESSAGE, fetchMessageSend);
  yield takeEvery(INPUT_PRESS_BY_ACTION, inputPress);
}

function* parseImage() {
  yield takeEvery(UPLOAD_FILES, parseImages);
}

function* replyNavigate() {
  yield takeEvery(REPLY_NAVIGATE, replyNavigation);
  yield takeEvery(RESTORE_MESSAGES, restoreMessages);
  yield takeLatest(SEARCH_MESSAGE, searchMessage)
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
