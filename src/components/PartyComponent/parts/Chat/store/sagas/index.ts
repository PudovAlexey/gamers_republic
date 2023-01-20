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
import { takeFirst } from '../../../../../../store/sagas';
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
  yield apply (lazyMessagesUpdate, lazyMessagesUpdate, [fetchedMessages])
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
  yield apply(lazyMessagesUpdate, lazyMessagesUpdate,  [messages])
}
let sliceCount = 5
let startSlice = 0
let endSlice = sliceCount
function* lazyMessagesUpdate(allMessages) {
  const messageSlice = allMessages.slice(startSlice, endSlice)
  // yield delay(2);
  yield put(ADD_MESSAGES(messageSlice));
    if (messageSlice[messageSlice.length - 1] && (messageSlice[messageSlice.length - 1]?.messageId !== allMessages[allMessages.length - 1]?.messageId)) {
      startSlice = startSlice + sliceCount
      endSlice = endSlice + sliceCount
      yield apply(lazyMessagesUpdate, lazyMessagesUpdate,  [allMessages])
    } else {
      startSlice = 0
      endSlice = sliceCount
    }
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

let selectionIds = [];
function* handleSelect({ target }) {
  const scrollService = yield select(scrollServiceSelector);
  const allMessages = scrollService.getAllMessages();
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
  let navigate = true
  const maxSpeed = 300;
  let speed = 50
  function handleNavigate(e) {
    function navigateHandler() {
    const scrollContainerRect = $.rect(scrollContainer)
     setTimeout(() => {
      const scrollContainerTop = scrollContainerRect.top
      const scrollContainerBottom = scrollContainerRect.bottom
      const {clientY} = e
      if (scrollContainerTop + 100 > clientY &&  scrollContainerTop + 100 > clientY) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop -= (speed + 70),
          left: 0,
          behavior: 'auto'
        })
      } else if (scrollContainerBottom - 100 < clientY && scrollContainerBottom - 100 < clientY) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop += (speed + 70),
          left: 0,
          behavior: 'auto'
        })
      } else {
        navigate = false
        speed = 70
      }
      speed = speed + 70
      if (speed >= maxSpeed) speed = maxSpeed 
      if (navigate) requestAnimationFrame(navigateHandler)
    }, speed)
      }
    
      requestAnimationFrame(navigateHandler)
  }
  const scrollContainer = yield select(messageScrollContainerSelector);
  const clickChannel = eventChannel((emitter) => {
    function onMouseUp() {
      selectionIds = []
      speed = 70
      navigate = false
      document.removeEventListener('mouseover', handleNavigate)
      scrollContainer.removeEventListener('mouseover', emitter);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleNavigate)
    scrollContainer.addEventListener('mouseover', emitter);
    return () => {
      scrollContainer.removeEventListener('mouseover', emitter);
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
  yield takeEvery(SEARCH_MESSAGE, searchMessage)
}

function* chatUpload() {
  yield takeLatest(UPLOAD_MESSAGES, fetchMessages);
  yield takeLatest(UPLOAD_MESSAGES_BY_OFFSET, fetchMessagesByOffset);
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
