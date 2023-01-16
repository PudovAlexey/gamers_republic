import { createAction } from '@reduxjs/toolkit';
import { TMessage, TMessageAdds, TQueryMessage, TUser } from '../../../../../../api/types';

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

const SET_IMAGES = createAction('chat/upload_files');

const CHANGE_FILES = createAction('chat/change_files');

const REPLY_NAVIGATE = createAction('chat/replyNavigate');

const START_NAVIGATION = createAction('chat/startNavigate');

const NAVIGATION_PROGRESS = createAction('chat/navigationProgress');

const RESTORE_MESSAGES = createAction('chat/restoreMessages');

const SHOW_LOADER = createAction('chat/showLoader');

const SELECT_MESSAGES = createAction('chat/selectMessages');

const SELECTION_ENDING = createAction('chat/selectionEnding');

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
