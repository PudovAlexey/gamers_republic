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
  debounce,
  throttle,
  fork,
} from 'redux-saga/effects';
import api from '../../../../../../api/api/api';
import { EScrollDirection } from '../../../../../../api/types';
import { userSelector } from '../../../../../../store/authSlice/selectors';
import { $ } from '../../../../../../utils/DOM/DOM';
import { parseToBase64 } from '../../../../../../utils/encoders';
import { scrollService } from '../../services/scrollService/scrollService';
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  CHANGE_FILES,
  INPUT_PRESS,
  INPUT_PRESS_BY_ACTION,
  REPLY_NAVIGATE,
  RESTORE_MESSAGES,
  ROOM_INIT,
  SEARCH_MESSAGE,
  SEARCH_MESSAGES_START,
  SELECTION_ENDING,
  SELECT_MESSAGES,
  SENDMESSAGE,
  SET_IMAGES,
  SET_INPUT_ROW,
  SET_ROOM_INFO,
  SHOW_LOADER,
  START_NAVIGATION,
  TOGGLE_NAV_ITEMS,
  UPDATE_MESSAGES_ON_SCREEN,
  UPLOAD_FILES,
  UPLOAD_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../actionCreators';
import { onInit, toggleSearchPanel } from '../chatSlice';
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
  } else if (event.key === 'Enter' && input) {
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
        where: EScrollDirection.Draw,
        offset: 50,
        roomId,
      },
    ]);
    // yield put(ADD_MESSAGES(fetchedMessages));
    yield apply(lazyMessagesUpdate, lazyMessagesUpdate, [fetchedMessages]);
    yield delay(30)
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
      where: EScrollDirection.Down,
      offset: 50,
      roomId,
    },
  ]);
  if (fetchedMessages.some(({ messageId }) => messageId === firstMessage)) {
    return;
  }

  yield apply (lazyMessagesUpdate, lazyMessagesUpdate, [fetchedMessages])
  // yield put(ADD_MESSAGES(fetchedMessages));
  delay(100)
  yield call(restoreMessages, {
   messageId: fetchedMessages[fetchedMessages.length - 1].messageId
  })
}

function* messageQuery(action) {
  const {
    roomId,
    messageStart = 'end',
    offset = 50,
    where = EScrollDirection.Up,
  } = action.payload;
  const messages = yield apply(api, api.getMessagesByRoomId, [
    {
      roomId,
      messageStart,
      offset,
      where,
    },
  ]);
  yield apply(lazyMessagesUpdate, lazyMessagesUpdate, [messages]);
  // yield put(ADD_MESSAGES(messages));
}

function* showLoader(action) {
  yield delay(1000);
  yield put(SHOW_LOADER(action.payload.where));
}

function* fetchMessages(action) {
  yield fork(showLoader, action);
  yield fork(messageQuery, action);
}

let sliceCount = 2;
let startSlice = 0;
let endSlice = sliceCount;
function* lazyMessagesUpdate(allMessages) {
  const messageSlice = allMessages.slice(startSlice, endSlice);
  yield delay(0);
  yield put(ADD_MESSAGES(messageSlice));
  if (
    messageSlice[messageSlice.length - 1] &&
    messageSlice[messageSlice.length - 1]?.messageId !==
      allMessages[allMessages.length - 1]?.messageId
  ) {
    startSlice = startSlice + sliceCount;
    endSlice = endSlice + sliceCount;
    yield apply(lazyMessagesUpdate, lazyMessagesUpdate, [allMessages]);
  } else {
    startSlice = 0;
    endSlice = sliceCount;
  }
}

function* fetchMessagesByOffset() {
  const scrollService = yield select(scrollServiceSelector);
  const roomId = yield select(roomIdSelector);
  const { scrollDirection, queryMessage } = scrollService.update();
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
  let navigate = true;
  const maxSpeed = 300;
  let speed = 15;
  function handleNavigate(e) {
    function navigateHandler() {
      const scrollContainerRect = $.rect(scrollContainer);
      setTimeout(() => {
        const scrollContainerTop = scrollContainerRect.top;
        const scrollContainerBottom = scrollContainerRect.bottom;
        const { clientY } = e;
        if (
          scrollContainerTop + 100 > clientY &&
          scrollContainerTop + 100 > clientY
        ) {
          scrollContainer.scrollTo({
            top: (scrollContainer.scrollTop -= speed + 70),
            left: 0,
            behavior: 'auto',
          });
        } else if (
          scrollContainerBottom - 100 < clientY &&
          scrollContainerBottom - 100 < clientY
        ) {
          scrollContainer.scrollTo({
            top: (scrollContainer.scrollTop += speed + 70),
            left: 0,
            behavior: 'auto',
          });
        } else {
          navigate = false;
          speed = 70;
        }
        speed = speed + 70;
        if (speed >= maxSpeed) speed = maxSpeed;
        if (navigate) requestAnimationFrame(navigateHandler);
      }, speed);
    }

    requestAnimationFrame(navigateHandler);
  }
  const scrollContainer = yield select(messageScrollContainerSelector);
  const clickChannel = eventChannel((emitter) => {
    function onMouseUp() {
      selectionIds = [];
      speed = 70;
      navigate = false;
      document.removeEventListener('mouseover', handleNavigate);
      scrollContainer.removeEventListener('mouseover', emitter);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleNavigate);
    scrollContainer.addEventListener('mouseover', emitter);
    return () => {
      scrollContainer.removeEventListener('mouseover', emitter);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleNavigate);
    };
  });
  yield takeLatest(clickChannel, handleSelect);
}

function* progressNavItems() {
  yield put(TOGGLE_NAV_ITEMS(false));
}

function* startNavItems() {
  const scrollSelector = yield select(scrollServiceSelector);
  const { messagesOnScreen } = scrollSelector.update();
  yield put(UPDATE_MESSAGES_ON_SCREEN(messagesOnScreen));
  yield put(TOGGLE_NAV_ITEMS(true));
}

function* searchMessage(action) {
  const searchValue = action.payload;
  const roomId = yield select(roomIdSelector);
  const findMessages = yield apply(api, api.findMessageBySearch, [
    {
      roomId,
      search: searchValue,
    },
  ]);
  if (findMessages.length) {
    yield put(
      START_NAVIGATION({
        messageId: findMessages[findMessages.length - 1].messageId,
      })
    );
    yield put(
      SEARCH_MESSAGES_START({
        messages: findMessages,
        searchValue,
      })
    );
    yield put(toggleSearchPanel(true));
  } else {
    yield put(
      SEARCH_MESSAGES_START({
        messages: null,
        searchValue,
      })
    );
  }
}

function* roomInit(action) {
  const { roomId, messageContainer } = action.payload;
  const roomInfo = yield apply(api, api.getRoomById, [roomId]);

  yield put(
    onInit({
      roomId,
      messageContainer,
      scrollService,
    })
  );
  yield put(
    UPLOAD_MESSAGES({
      roomId,
    })
  );
  yield put(SET_ROOM_INFO(roomInfo));
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
  yield takeLatest(RESTORE_MESSAGES, restoreMessages);
  yield takeEvery(SEARCH_MESSAGE, searchMessage);
}

function* chatUpload() {
  yield takeLatest(ROOM_INIT, roomInit);
  yield takeLatest(UPLOAD_MESSAGES, fetchMessages);
  yield throttle(1000, UPLOAD_MESSAGES_BY_OFFSET, fetchMessagesByOffset);
  yield throttle(500, UPLOAD_MESSAGES_BY_OFFSET, startNavItems);
  yield debounce(2500, UPLOAD_MESSAGES_BY_OFFSET, progressNavItems);
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
