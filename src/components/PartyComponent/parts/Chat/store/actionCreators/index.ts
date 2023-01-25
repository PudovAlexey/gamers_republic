import { createAction } from '@reduxjs/toolkit';
import { TMessage, TMessageAdds, TQueryMessage, TRoom, TUser } from '../../../../../../api/types';

const SENDMESSAGE = createAction(
  'chat/sendMessage',
  (data: {
    message: TMessage;
    adds: TMessageAdds;
    userData: TUser;
    lastMessageId: number;
  }) => ({
    payload: data,
  })
);

const ADD_MESSAGE = createAction('chat/addMessage', (data: TMessage) => ({
    payload: data
}));

const UPLOAD_MESSAGES = createAction('chat/uploadMessages', (data: TQueryMessage) => ({
    payload: data
}));

const UPLOAD_MESSAGES_BY_OFFSET = createAction('chat/uploadMessagesByOffset');

const ADD_MESSAGES = createAction('chat/addMesssages', (data: TMessage[]) => ({
    payload: data
}));

const UPLOAD_FILES = createAction('chat/upload_image', (data: {
    event: React.ChangeEvent<HTMLInputElement>,
    operation: 'create' | "update",
    id?: number,
    type?: string 
}) => ({
    payload: data
}));

const SET_IMAGES = createAction('chat/upload_files', (data: {
  files: File[],
  id: number
}) => ({
  payload: data
}));

const CHANGE_FILES = createAction('chat/change_files', (data: {
  files: File[],
  id: number
}) => ({
  payload: data
}));

const REPLY_NAVIGATE = createAction('chat/replyNavigate');

const START_NAVIGATION = createAction('chat/startNavigate', (data: {
  messageId: number,
}) => ({
  payload: data
}));

const NAVIGATION_PROGRESS = createAction('chat/navigationProgress', (data: {
  messageId: number,
  fetchedMessages: TMessage[]
}) => ({
  payload: data
}));

const RESTORE_MESSAGES = createAction('chat/restoreMessages', (data: {
  messageId: number
}) => ({
  payload: data
}));

const SHOW_LOADER = createAction('chat/showLoader', (data: 'up' | 'down') => ({
  payload: data
}));

const SELECT_MESSAGES = createAction('chat/selectMessages', (data: React.MouseEvent<HTMLElement>) => ({
  payload: data
}));

const SELECTION_ENDING = createAction('chat/selectionEnding', (data: number[]) => ({
  payload: data
}));

const INPUT_PRESS = createAction('chat/INPUTPRESS', (data: React.KeyboardEvent<HTMLDivElement>) => ({
  payload: data
}))

const SET_INPUT_ROW = createAction('chat/SET_INPUT_ROW', (data: {
  event: React.MouseEvent<HTMLInputElement>
  count?: number 
}) => ({
  payload: data
}))

const INPUT_PRESS_BY_ACTION = createAction('chat/INPUT_PRESS_BY_ACTION', (data: React.KeyboardEvent<HTMLDivElement>) => ({
  payload: data
}))

const INPUT_UNPRESS = createAction('chat/INPUT_UNPRESS', (data: React.KeyboardEvent<HTMLDivElement>) => ({
  payload: data
}))

const SEARCH_MESSAGE = createAction('chat/SEARCH_MESSAGE', (data: string) => ({
  payload: data
}))

const MARKDOWN_MESSAGES = createAction('chat/SEARCH_MESSAGE', (data: {
  messageId: number,
  searchText,
}[]) => ({
  payload: data
}))

const TOGGLE_NAV_ITEMS = createAction('chat/TOGGLE_NAV_ITEMS', (data: boolean) => ({
  payload: data
}))

const UPDATE_MESSAGES_ON_SCREEN = createAction('chat/updateMessagesOnScreen', (data: HTMLElement[]) => ({
  payload: data
}))

const SEARCH_MESSAGES_START = createAction('chat/SEARCH_MESSAGES_START', (data: {
  messages: TMessage[],
  searchValue: string
}) => ({
  payload: data
}))

const SET_ROOM_INFO = createAction("chat/SET_ROOM_INFO", (data: TRoom) => ({
  payload: data
}))

const ROOM_INIT = createAction('chat/ROOM_INIT', (data: {
  roomId: number,
  messageContainer: HTMLElement
}) => ({
  payload: data
}))

const INSERT_EMOJI = createAction('chat/INSERT_EMOJI', (data) => ({
  payload: data
}))

export {
  SENDMESSAGE,
  ADD_MESSAGE,
  UPLOAD_FILES,
  SET_IMAGES,
  CHANGE_FILES,
  REPLY_NAVIGATE,
  START_NAVIGATION,
  NAVIGATION_PROGRESS,
  RESTORE_MESSAGES,
  ADD_MESSAGES,
  UPLOAD_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
  SHOW_LOADER,
  SELECT_MESSAGES,
  SELECTION_ENDING,
  INPUT_PRESS,
  INPUT_UNPRESS,
  INPUT_PRESS_BY_ACTION,
  SET_INPUT_ROW,
  SEARCH_MESSAGE,
  MARKDOWN_MESSAGES,
  TOGGLE_NAV_ITEMS,
  UPDATE_MESSAGES_ON_SCREEN,
  SEARCH_MESSAGES_START,
  SET_ROOM_INFO,
  ROOM_INIT,
  INSERT_EMOJI
};
