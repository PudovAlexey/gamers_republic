import { TMessage } from './../../../types/types';

function filterMessagesTop({ messagesFromChat, offset, startForm }) {
  let filterMessages = [];
  const endCount = startForm - offset;
  for (let i = startForm; i > endCount; i--) {
    if (!messagesFromChat[i]) break;
    filterMessages.push(messagesFromChat[i]);
  }
  return filterMessages;
}

function filterMessagesMiddle({ messagesFromChat, offset, startForm }) {
  let filterMessages: TMessage[] = [];
  for (let i = startForm; i < offset / 2 + startForm; i++) {
    if (!messagesFromChat[i + 1]) break;
    filterMessages.push(messagesFromChat[i + 1]);
  }
  for (let i = startForm; i > startForm - offset / 2; i--) {
    if (!messagesFromChat[i]) break;
    filterMessages.push(messagesFromChat[i]);
  }
  return filterMessages.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.messageId).valueOf()
  );
}

function filterMessagesBottom({ messagesFromChat, offset, startForm }) {
  let filterMessages = [];
  const messageEnd = startForm + offset;
  for (let i = startForm; i < messageEnd; i++) {
    if (!messagesFromChat[i]) break;
    filterMessages.push(messagesFromChat[i]);
  }
  return filterMessages;
}

export { filterMessagesTop, filterMessagesMiddle, filterMessagesBottom };
