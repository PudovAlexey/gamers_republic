import { createAction } from '@reduxjs/toolkit';
import { EMessageAdd, TMessage, TMessageAdds, TQueryMessage, TUser } from '../../../../../../api/types';

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
  type: EMessageAdd,
  id: number
}) => ({
  payload: data
}));

const CHANGE_FILES = createAction('chat/change_files', (data: {
  files: File[],
  type: EMessageAdd,
  id: number
}) => ({
  payload: data
}));

const REPLY_NAVIGATE = createAction('chat/replyNavigate');

const START_NAVIGATION = createAction('chat/startNavigate', (data: {
  messageId: number
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
};
